import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { NtfyProvider } from './providers/ntfy.provider';
import { NotificationType } from '../../generated/prisma/enums';

const ADMIN_TOPIC = process.env.NTFY_ADMIN_TOPIC ?? 'booking-platform-admin';

@Injectable()
export class NotificationsService {
  constructor(
    private prisma: PrismaService,
    private ntfy: NtfyProvider,
  ) {}

  // ── DB notifications ────────────────────────────────────────────────────────

  async findByUser(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findUnreadByUser(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId, isRead: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getUnreadCount(userId: string) {
    return this.prisma.notification.count({ where: { userId, isRead: false } });
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({ where: { id }, data: { isRead: true } });
  }

  async markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  }

  private async save(userId: string, title: string, message: string, type: NotificationType) {
    return this.prisma.notification.create({ data: { userId, title, message, type } });
  }

  // ── Booking events ──────────────────────────────────────────────────────────

  /** BookingCreated — notify admin via DB + ntfy */
  async onBookingCreated(
    bookingId: string,
    _userId: string,
    resourceName: string,
    userName: string,
    adminId: string,
  ) {
    await this.save(
      adminId,
      'New Booking Request',
      `${userName} requested "${resourceName}" — #${bookingId}`,
      NotificationType.INFO,
    );
    await this.ntfy.send({
      topic: ADMIN_TOPIC,
      title: '📅 New Booking Request',
      message: `${userName} booked "${resourceName}"`,
      priority: 3,
      tags: ['calendar'],
    });
  }

  /** StatusChanged: Approved — notify user via DB + ntfy (admin topic) */
  async onBookingApproved(
    bookingId: string,
    userId: string,
    resourceName: string,
    staffName?: string,
  ) {
    const msg = staffName
      ? `Your booking for "${resourceName}" is approved. Staff: ${staffName}`
      : `Your booking for "${resourceName}" has been approved!`;

    await this.save(userId, 'Booking Approved', msg, NotificationType.BOOKING_APPROVED);
    await this.ntfy.send({
      topic: ADMIN_TOPIC,
      title: '✅ Booking Approved',
      message: msg,
      priority: 4,
      tags: ['white_check_mark'],
    });
  }

  /** StatusChanged: Rejected — notify user via DB + ntfy (admin topic) */
  async onBookingRejected(bookingId: string, userId: string, resourceName: string) {
    const msg = `Your booking for "${resourceName}" was rejected.`;
    await this.save(userId, 'Booking Rejected', msg, NotificationType.BOOKING_REJECTED);
    await this.ntfy.send({
      topic: ADMIN_TOPIC,
      title: '❌ Booking Rejected',
      message: msg,
      priority: 3,
      tags: ['x'],
    });
  }

  /** Staff reassigned — admin notification */
  async onStaffReassigned(bookingId: string, adminId: string, staffName: string) {
    const msg = `Staff "${staffName}" assigned to booking #${bookingId}`;
    await this.save(adminId, 'Staff Assigned', msg, NotificationType.INFO);
    await this.ntfy.send({
      topic: ADMIN_TOPIC,
      title: '👤 Staff Assigned',
      message: msg,
      priority: 2,
      tags: ['bust_in_silhouette'],
    });
  }
}
