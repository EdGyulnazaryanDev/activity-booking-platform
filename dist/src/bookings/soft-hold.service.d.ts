import { RedisService } from '../common/redis/redis.service';
export declare class SoftHoldService {
    private redis;
    private readonly logger;
    constructor(redis: RedisService);
    acquire(resourceId: string, startTime: Date, endTime: Date, userId: string): Promise<string>;
    release(key: string, userId: string): Promise<void>;
    extend(key: string, userId: string): Promise<boolean>;
    private buildKey;
}
