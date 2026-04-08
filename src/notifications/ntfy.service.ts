import { Injectable, Logger } from '@nestjs/common';

export interface NtfyPayload {
  topic: string;
  title: string;
  message: string;
  priority?: 1 | 2 | 3 | 4 | 5; // 1=min, 3=default, 5=urgent
  tags?: string[];
}

@Injectable()
export class NtfyService {
  private readonly logger = new Logger(NtfyService.name);
  private readonly baseUrl = process.env.NTFY_URL ?? 'https://ntfy.sh';
  private readonly adminTopic = process.env.NTFY_ADMIN_TOPIC ?? 'booking-platform-admin';
  private readonly userTopic = process.env.NTFY_USER_TOPIC ?? 'booking-platform-user';

  async send(payload: NtfyPayload): Promise<void> {
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
    } catch (err) {
      // Never crash the main flow due to notification failure
      this.logger.warn(`ntfy push failed: ${(err as Error).message}`);
    }
  }

  /** Admin alert: new booking created */
  async notifyAdminNewBooking(bookingId: string, resourceName: string, userName: string) {
    await this.send({
      topic: this.adminTopic,
      title: '📅 New Booking Request',
      message: `${userName} booked "${resourceName}" — ID: ${bookingId}`,
      priority: 3,
      tags: ['calendar', 'new'],
    });
  }

  /** User alert: booking approved */
  async notifyUserApproved(bookingId: string, resourceName: string, userTopic: string) {
    await this.send({
      topic: userTopic,
      title: '✅ Booking Approved',
      message: `Your booking for "${resourceName}" has been approved! (ID: ${bookingId})`,
      priority: 4,
      tags: ['white_check_mark'],
    });
  }

  /** User alert: booking rejected */
  async notifyUserRejected(bookingId: string, resourceName: string, userTopic: string) {
    await this.send({
      topic: userTopic,
      title: '❌ Booking Rejected',
      message: `Your booking for "${resourceName}" was rejected. (ID: ${bookingId})`,
      priority: 3,
      tags: ['x'],
    });
  }

  /** Admin alert: staff reassigned */
  async notifyAdminStaffReassigned(bookingId: string, staffName: string) {
    await this.send({
      topic: this.adminTopic,
      title: '👤 Staff Reassigned',
      message: `Staff "${staffName}" assigned to booking ID: ${bookingId}`,
      priority: 2,
      tags: ['bust_in_silhouette'],
    });
  }

  /** Generic user topic derived from userId (each user gets their own channel) */
  getUserTopic(userId: string): string {
    return `${this.userTopic}-${userId}`;
  }

  /** Admin topic from env — all notifications go here */
  getAdminTopic(): string {
    return this.adminTopic;
  }
}
