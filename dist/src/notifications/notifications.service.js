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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../config/prisma.service");
const ntfy_provider_1 = require("./providers/ntfy.provider");
const enums_1 = require("../../generated/prisma/enums");
const ADMIN_TOPIC = process.env.NTFY_ADMIN_TOPIC ?? 'booking-platform-admin';
let NotificationsService = class NotificationsService {
    constructor(prisma, ntfy) {
        this.prisma = prisma;
        this.ntfy = ntfy;
    }
    async findByUser(userId) {
        return this.prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findUnreadByUser(userId) {
        return this.prisma.notification.findMany({
            where: { userId, isRead: false },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getUnreadCount(userId) {
        return this.prisma.notification.count({ where: { userId, isRead: false } });
    }
    async markAsRead(id) {
        return this.prisma.notification.update({ where: { id }, data: { isRead: true } });
    }
    async markAllAsRead(userId) {
        return this.prisma.notification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true },
        });
    }
    async save(userId, title, message, type) {
        return this.prisma.notification.create({ data: { userId, title, message, type } });
    }
    async onBookingCreated(bookingId, _userId, resourceName, userName, adminId) {
        await this.save(adminId, 'New Booking Request', `${userName} requested "${resourceName}" — #${bookingId}`, enums_1.NotificationType.INFO);
        await this.ntfy.send({
            topic: ADMIN_TOPIC,
            title: '📅 New Booking Request',
            message: `${userName} booked "${resourceName}"`,
            priority: 3,
            tags: ['calendar'],
        });
    }
    async onBookingApproved(bookingId, userId, resourceName, staffName) {
        const msg = staffName
            ? `Your booking for "${resourceName}" is approved. Staff: ${staffName}`
            : `Your booking for "${resourceName}" has been approved!`;
        await this.save(userId, 'Booking Approved', msg, enums_1.NotificationType.BOOKING_APPROVED);
        await this.ntfy.send({
            topic: ADMIN_TOPIC,
            title: '✅ Booking Approved',
            message: msg,
            priority: 4,
            tags: ['white_check_mark'],
        });
    }
    async onBookingRejected(bookingId, userId, resourceName) {
        const msg = `Your booking for "${resourceName}" was rejected.`;
        await this.save(userId, 'Booking Rejected', msg, enums_1.NotificationType.BOOKING_REJECTED);
        await this.ntfy.send({
            topic: ADMIN_TOPIC,
            title: '❌ Booking Rejected',
            message: msg,
            priority: 3,
            tags: ['x'],
        });
    }
    async onStaffReassigned(bookingId, adminId, staffName) {
        const msg = `Staff "${staffName}" assigned to booking #${bookingId}`;
        await this.save(adminId, 'Staff Assigned', msg, enums_1.NotificationType.INFO);
        await this.ntfy.send({
            topic: ADMIN_TOPIC,
            title: '👤 Staff Assigned',
            message: msg,
            priority: 2,
            tags: ['bust_in_silhouette'],
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ntfy_provider_1.NtfyProvider])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map