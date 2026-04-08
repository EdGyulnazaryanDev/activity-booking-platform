"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../config/prisma.service");
let ReportsService = class ReportsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMonthlyReport(year, month) {
        const start = new Date(Date.UTC(year, month - 1, 1));
        const end = new Date(Date.UTC(year, month, 1));
        const bookings = await this.prisma.booking.findMany({
            where: { createdAt: { gte: start, lt: end } },
            include: { resource: true, user: { select: { id: true, name: true, email: true } } },
        });
        const paid = bookings.filter(b => b.status === 'PAID');
        const pending = bookings.filter(b => b.status === 'PENDING');
        const approved = bookings.filter(b => b.status === 'APPROVED');
        const rejected = bookings.filter(b => b.status === 'REJECTED');
        const revenue = paid.reduce((sum, b) => sum + b.totalPrice, 0);
        const byResource = {};
        for (const b of paid) {
            const key = b.resourceId;
            if (!byResource[key])
                byResource[key] = { name: b.resource.name, count: 0, revenue: 0 };
            byResource[key].count++;
            byResource[key].revenue += b.totalPrice;
        }
        const dailyMap = {};
        for (const b of paid) {
            const day = b.paidAt
                ? new Date(b.paidAt).toISOString().slice(0, 10)
                : new Date(b.createdAt).toISOString().slice(0, 10);
            dailyMap[day] = (dailyMap[day] ?? 0) + b.totalPrice;
        }
        const daily = Object.entries(dailyMap)
            .map(([date, revenue]) => ({ date, revenue }))
            .sort((a, b) => a.date.localeCompare(b.date));
        const byPayment = {};
        for (const b of paid) {
            const method = b.paymentMethod ?? 'CASH';
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
    async getYearlyOverview(year) {
        const months = await Promise.all(Array.from({ length: 12 }, (_, i) => this.getMonthlyReport(year, i + 1)));
        return months.map(m => ({
            month: m.period.month,
            revenue: m.summary.revenue,
            bookings: m.summary.totalBookings,
            paid: m.summary.paid,
        }));
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map