import { Injectable, ConflictException, Logger } from '@nestjs/common';
import { RedisService } from '../common/redis/redis.service';
import { randomUUID } from 'crypto';

const HOLD_TTL = 600; // 10 minutes

@Injectable()
export class SoftHoldService {
  private readonly logger = new Logger(SoftHoldService.name);

  constructor(private redis: RedisService) {}

  /**
   * Acquire a soft-hold for a resource time slot.
   * Key format: hold:{resourceId}:{startISO}:{endISO}
   * Returns the holdKey (UUID) to be stored with the booking.
   */
  async acquire(resourceId: string, startTime: Date, endTime: Date, userId: string): Promise<string> {
    const key = this.buildKey(resourceId, startTime, endTime);
    const holdId = randomUUID();
    const value = `${userId}:${holdId}`;

    const acquired = await this.redis.acquireLock(key, value, HOLD_TTL);
    if (!acquired) {
      const existing = await this.redis.getLock(key);
      const existingUser = existing?.split(':')[0];
      if (existingUser && existingUser !== userId) {
        throw new ConflictException(
          'This time slot is currently being checked out by another user. Please try again in a few minutes.',
        );
      }
    }

    this.logger.log(`Soft-hold acquired: ${key} by ${userId}`);
    return key;
  }

  async release(key: string, userId: string): Promise<void> {
    const existing = await this.redis.getLock(key);
    if (existing?.startsWith(userId)) {
      await this.redis.releaseLock(key, existing);
      this.logger.log(`Soft-hold released: ${key}`);
    }
  }

  async extend(key: string, userId: string): Promise<boolean> {
    const existing = await this.redis.getLock(key);
    if (!existing?.startsWith(userId)) return false;
    return this.redis.extendLock(key, existing, HOLD_TTL);
  }

  private buildKey(resourceId: string, startTime: Date, endTime: Date): string {
    return `hold:${resourceId}:${startTime.toISOString()}:${endTime.toISOString()}`;
  }
}
