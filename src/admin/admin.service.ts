import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { BookingsService } from '../bookings/bookings.service';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private bookingsService: BookingsService,
  ) {}

  /**
   * Approve a booking. Only ADMIN role allowed.
   * Optionally assigns a Staff member to the booking.
   */
  async approveBooking(bookingId: string, adminId: string, staffId?: string) {
    await this.assertAdmin(adminId);
    return this.bookingsService.approveBooking(bookingId, adminId, staffId);
  }

  /**
   * Reject a booking. Only ADMIN role allowed.
   */
  async rejectBooking(bookingId: string, adminId: string) {
    await this.assertAdmin(adminId);
    return this.bookingsService.rejectBooking(bookingId, adminId);
  }

  /**
   * Mark a booking as PAID. Only ADMIN role allowed.
   */
  async markAsPaid(bookingId: string, adminId: string) {
    await this.assertAdmin(adminId);
    return this.bookingsService.markAsPaid(bookingId);
  }

  /**
   * Get dashboard overview stats.
   */
  async getDashboardStats(adminId: string) {
    await this.assertAdmin(adminId);

    const [pending, approved, rejected, paid, upcoming] = await Promise.all([
      this.bookingsService.findByStatus('PENDING'),
      this.bookingsService.findByStatus('APPROVED'),
      this.bookingsService.findByStatus('REJECTED'),
      this.bookingsService.findByStatus('PAID'),
      this.bookingsService.getUpcomingBookings(),
    ]);

    return {
      stats: {
        pending: pending.length,
        approved: approved.length,
        rejected: rejected.length,
        paid: paid.length,
        upcoming: upcoming.length,
        total: pending.length + approved.length + rejected.length + paid.length,
      },
      upcomingBookings: upcoming.slice(0, 5),
    };
  }

  /**
   * Get all available staff members.
   */
  async getStaff(adminId: string) {
    await this.assertAdmin(adminId);
    return this.prisma.staff.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  // ── Private ─────────────────────────────────────────────────────────────────

  private async assertAdmin(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can perform this action');
    }
  }
}
