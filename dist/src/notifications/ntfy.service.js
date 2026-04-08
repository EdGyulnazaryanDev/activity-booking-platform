"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NtfyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NtfyService = void 0;
const common_1 = require("@nestjs/common");
let NtfyService = NtfyService_1 = class NtfyService {
    constructor() {
        this.logger = new common_1.Logger(NtfyService_1.name);
        this.baseUrl = process.env.NTFY_URL ?? 'https://ntfy.sh';
        this.adminTopic = process.env.NTFY_ADMIN_TOPIC ?? 'booking-platform-admin';
        this.userTopic = process.env.NTFY_USER_TOPIC ?? 'booking-platform-user';
    }
    async send(payload) {
        try {
            await fetch(`${this.baseUrl}/${payload.topic}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Title: payload.title,
                    Priority: String(payload.priority ?? 3),
                    Tags: (payload.tags ?? []).join(','),
                },
                body: payload.message,
            });
        }
        catch (err) {
            this.logger.warn(`ntfy push failed: ${err.message}`);
        }
    }
    async notifyAdminNewBooking(bookingId, resourceName, userName) {
        await this.send({
            topic: this.adminTopic,
            title: '📅 New Booking Request',
            message: `${userName} booked "${resourceName}" — ID: ${bookingId}`,
            priority: 3,
            tags: ['calendar', 'new'],
        });
    }
    async notifyUserApproved(bookingId, resourceName, userTopic) {
        await this.send({
            topic: userTopic,
            title: '✅ Booking Approved',
            message: `Your booking for "${resourceName}" has been approved! (ID: ${bookingId})`,
            priority: 4,
            tags: ['white_check_mark'],
        });
    }
    async notifyUserRejected(bookingId, resourceName, userTopic) {
        await this.send({
            topic: userTopic,
            title: '❌ Booking Rejected',
            message: `Your booking for "${resourceName}" was rejected. (ID: ${bookingId})`,
            priority: 3,
            tags: ['x'],
        });
    }
    async notifyAdminStaffReassigned(bookingId, staffName) {
        await this.send({
            topic: this.adminTopic,
            title: '👤 Staff Reassigned',
            message: `Staff "${staffName}" assigned to booking ID: ${bookingId}`,
            priority: 2,
            tags: ['bust_in_silhouette'],
        });
    }
    getUserTopic(userId) {
        return `${this.userTopic}-${userId}`;
    }
    getAdminTopic() {
        return this.adminTopic;
    }
};
exports.NtfyService = NtfyService;
exports.NtfyService = NtfyService = NtfyService_1 = __decorate([
    (0, common_1.Injectable)()
], NtfyService);
//# sourceMappingURL=ntfy.service.js.map