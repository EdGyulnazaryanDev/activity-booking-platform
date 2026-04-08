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
var SoftHoldService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftHoldService = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../common/redis/redis.service");
const crypto_1 = require("crypto");
const HOLD_TTL = 600;
let SoftHoldService = SoftHoldService_1 = class SoftHoldService {
    constructor(redis) {
        this.redis = redis;
        this.logger = new common_1.Logger(SoftHoldService_1.name);
    }
    async acquire(resourceId, startTime, endTime, userId) {
        const key = this.buildKey(resourceId, startTime, endTime);
        const holdId = (0, crypto_1.randomUUID)();
        const value = `${userId}:${holdId}`;
        const acquired = await this.redis.acquireLock(key, value, HOLD_TTL);
        if (!acquired) {
            const existing = await this.redis.getLock(key);
            const existingUser = existing?.split(':')[0];
            if (existingUser && existingUser !== userId) {
                throw new common_1.ConflictException('This time slot is currently being checked out by another user. Please try again in a few minutes.');
            }
        }
        this.logger.log(`Soft-hold acquired: ${key} by ${userId}`);
        return key;
    }
    async release(key, userId) {
        const existing = await this.redis.getLock(key);
        if (existing?.startsWith(userId)) {
            await this.redis.releaseLock(key, existing);
            this.logger.log(`Soft-hold released: ${key}`);
        }
    }
    async extend(key, userId) {
        const existing = await this.redis.getLock(key);
        if (!existing?.startsWith(userId))
            return false;
        return this.redis.extendLock(key, existing, HOLD_TTL);
    }
    buildKey(resourceId, startTime, endTime) {
        return `hold:${resourceId}:${startTime.toISOString()}:${endTime.toISOString()}`;
    }
};
exports.SoftHoldService = SoftHoldService;
exports.SoftHoldService = SoftHoldService = SoftHoldService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], SoftHoldService);
//# sourceMappingURL=soft-hold.service.js.map