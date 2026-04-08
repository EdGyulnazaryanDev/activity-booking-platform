import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getMonthlyReport(year: number, month: number) {
    const start = new Date(Date.UTC(year, month - 1, 1));
    const end   = new Date(Date.UTC(year, month, 1));

    const bookings = await this.prisma.booking.findMany({
      where: { createdAt: { gte: start, lt: end } },
      include: { resource: true, user: { select: { id: true, name: true, email: true } } },
    });

    const paid     = bookings.filter(b => b.status === 'PAID');
    const pending  = bookings.filter(b => b.status === 'PENDING');
    const approved = bookings.filter(b => b.status === 'APPROVED');
    const rejected = bookings.filter(b => b.status === 'REJECTED');

    const revenue = paid.reduce((sum, b) => sum + b.totalPrice, 0);

    // Revenue by resource
    const byResource: Record<string, { name: string; count: number; revenue: number }> = {};
    for (const b of paid) {
      const key = b.resourceId;
      if (!byResource[key]) byResource[key] = { name: b.resource.name, count: 0, revenue: 0 };
      byResource[key].count++;
      byResource[key].revenue += b.totalPrice;
    }

    // Daily revenue breakdown
    const dailyMap: Record<string, number> = {};
    for (const b of paid) {
      const day = b.paidAt
        ? new Date(b.paidAt).toISOString().slice(0, 10)
        : new Date(b.createdAt).toISOString().slice(0, 10);
      dailyMap[day] = (dailyMap[day] ?? 0) + b.totalPrice;
    }
    const daily = Object.entries(dailyMap)
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Payment method breakdown
    const byPayment: Record<string, number> = {};
    for (const b of paid) {
      const method = b.paymentMethod ?? 'CASH'; // null = admin marked paid = cash/manual
      byPayment[method] = (byPayment[method] ?? 0) + b.totalPrice;
    }

    return {
      period: { year, month, start, end },
      summary: {
        totalBookings: bookings.length,
        paid: paid.length,
        pending: pending.length,
        approved: approved.length,
        rejected: rejected.length,
        revenue: parseFloat(revenue.toFixed(2)),
        avgBookingValue: paid.length ? parseFloat((revenue / paid.length).toFixed(2)) : 0,
      },
      byResource: Object.values(byResource).sort((a, b) => b.revenue - a.revenue),
      byPaymentMethod: Object.entries(byPayment).map(([method, revenue]) => ({ method, revenue })),
      daily,
      recentPaidBookings: paid.slice(0, 10),
    };
  }

  async getYearlyOverview(year: number) {
    const months = await Promise.all(
      Array.from({ length: 12 }, (_, i) => this.getMonthlyReport(year, i + 1)),
    );
    return months.map(m => ({
      month: m.period.month,
      revenue: m.summary.revenue,
      bookings: m.summary.totalBookings,
      paid: m.summary.paid,
    }));
  }
}
