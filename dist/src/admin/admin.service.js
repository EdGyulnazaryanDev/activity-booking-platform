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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../config/prisma.service");
const bookings_service_1 = require("../bookings/bookings.service");
let AdminService = class AdminService {
    constructor(prisma, bookingsService) {
        this.prisma = prisma;
        this.bookingsService = bookingsService;
    }
    async approveBooking(bookingId, adminId, staffId) {
        await this.assertAdmin(adminId);
        return this.bookingsService.approveBooking(bookingId, adminId, staffId);
    }
    async rejectBooking(bookingId, adminId) {
        await this.assertAdmin(adminId);
        return this.bookingsService.rejectBooking(bookingId, adminId);
    }
    async markAsPaid(bookingId, adminId) {
        await this.assertAdmin(adminId);
        return this.bookingsService.markAsPaid(bookingId);
    }
    async getDashboardStats(adminId) {
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
    async getStaff(adminId) {
        await this.assertAdmin(adminId);
        return this.prisma.staff.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' },
        });
    }
    async assertAdmin(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only admins can perform this action');
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        bookings_service_1.BookingsService])
], AdminService);
//# sourceMappingURL=admin.service.js.map