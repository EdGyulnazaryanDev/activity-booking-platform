import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis;

  onModuleInit() {
    this.client = new Redis({
      host: process.env.REDIS_HOST ?? 'localhost',
      port: parseInt(process.env.REDIS_PORT ?? '6379'),
      password: process.env.REDIS_PASSWORD ?? undefined,
      lazyConnect: true,
    });
    this.client.on('error', (err) => this.logger.warn(`Redis error: ${err.message}`));
    this.client.connect().catch(() => this.logger.warn('Redis not available — soft-holds disabled'));
  }

  onModuleDestroy() {
    this.client?.disconnect();
  }

  /**
   * Acquire a soft-hold lock.
   * Returns true if acquired, false if already held.
   * TTL in seconds (default 10 minutes).
   */
  async acquireLock(key: string, value: string, ttlSeconds = 600): Promise<boolean> {
    try {
      const result = await this.client.set(key, value, 'EX', ttlSeconds, 'NX');
      return result === 'OK';
    } catch {
      // Redis unavailable — allow booking to proceed (graceful degradation)
      return true;
    }
  }

  async releaseLock(key: string, value: string): Promise<void> {
    try {
      // Only release if we own the lock (Lua script for atomicity)
      const script = `
        if redis.call("get", KEYS[1]) == ARGV[1] then
          return redis.call("del", KEYS[1])
        else
          return 0
        end
      `;
      await this.client.eval(script, 1, key, value);
    } catch { /* ignore */ }
  }

  async getLock(key: string): Promise<string | null> {
    try { return await this.client.get(key); }
    catch { return null; }
  }

  async extendLock(key: string, value: string, ttlSeconds = 600): Promise<boolean> {
    try {
      const current = await this.client.get(key);
      if (current !== value) return false;
      await this.client.expire(key, ttlSeconds);
      return true;
    } catch { return false; }
  }
}
