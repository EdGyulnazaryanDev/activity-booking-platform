import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
export declare class RedisService implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    private client;
    onModuleInit(): void;
    onModuleDestroy(): void;
    acquireLock(key: string, value: string, ttlSeconds?: number): Promise<boolean>;
    releaseLock(key: string, value: string): Promise<void>;
    getLock(key: string): Promise<string | null>;
    extendLock(key: string, value: string, ttlSeconds?: number): Promise<boolean>;
}
