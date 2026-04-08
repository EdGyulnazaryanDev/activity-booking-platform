import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { NotificationProvider, NotificationPayload } from './notification-provider.interface';

/**
 * NtfyProvider — sends push notifications via ntfy.sh using Axios.
 * Implements the abstract NotificationProvider interface.
 */
@Injectable()
export class NtfyProvider extends NotificationProvider {
  private readonly logger = new Logger(NtfyProvider.name);
  private readonly baseUrl = process.env.NTFY_URL ?? 'https://ntfy.sh';

  async send(payload: NotificationPayload): Promise<void> {
    try {
      await axios.post(
        `${this.baseUrl}/${payload.topic}`,
        payload.message,
        {
          headers: {
            'Content-Type': 'text/plain',
            Title: payload.title,
            Priority: String(payload.priority ?? 3),
            Tags: (payload.tags ?? []).join(','),
          },
          timeout: 5000,
        },
      );
    } catch (err: any) {
      // Never crash the main flow
      this.logger.warn(`ntfy push failed [${payload.topic}]: ${err.message}`);
    }
  }
}
