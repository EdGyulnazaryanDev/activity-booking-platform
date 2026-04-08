"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = __importDefault(require("ioredis"));
let RedisService = RedisService_1 = class RedisService {
    constructor() {
        this.logger = new common_1.Logger(RedisService_1.name);
    }
    onModuleInit() {
        this.client = new ioredis_1.default({
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
    async acquireLock(key, value, ttlSeconds = 600) {
        try {
            const result = await this.client.set(key, value, 'EX', ttlSeconds, 'NX');
            return result === 'OK';
        }
        catch {
            return true;
        }
    }
    async releaseLock(key, value) {
        try {
            const script = `
        if redis.call("get", KEYS[1]) == ARGV[1] then
          return redis.call("del", KEYS[1])
        else
          return 0
        end
      `;
            await this.client.eval(script, 1, key, value);
        }
        catch { }
    }
    async getLock(key) {
        try {
            return await this.client.get(key);
        }
        catch {
            return null;
        }
    }
    async extendLock(key, value, ttlSeconds = 600) {
        try {
            const current = await this.client.get(key);
            if (current !== value)
                return false;
            await this.client.expire(key, ttlSeconds);
            return true;
        }
        catch {
            return false;
        }
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)()
], RedisService);
//# sourceMappingURL=redis.service.js.map