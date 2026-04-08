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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../config/prisma.service");
let PricingService = class PricingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.pricingRule.create({ data: dto });
    }
    async findAll(resourceId) {
        return this.prisma.pricingRule.findMany({
            where: { ...(resourceId ? { resourceId } : {}), isActive: true },
            include: { resource: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const rule = await this.prisma.pricingRule.findUnique({
            where: { id },
            include: { resource: true },
        });
        if (!rule)
            throw new common_1.NotFoundException('Pricing rule not found');
        return rule;
    }
    async update(id, dto) {
        return this.prisma.pricingRule.update({ where: { id }, data: dto });
    }
    async remove(id) {
        return this.prisma.pricingRule.delete({ where: { id } });
    }
    async calculatePrice(resourceId, startTime, endTime) {
        const rules = await this.prisma.pricingRule.findMany({
            where: { resourceId, isActive: true },
            orderBy: { createdAt: 'desc' },
        });
        if (rules.length === 0) {
            throw new common_1.NotFoundException(`No pricing rules configured for this resource`);
        }
        const durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        const bookingHour = `${String(startTime.getHours()).padStart(2, '0')}:${String(startTime.getMinutes()).padStart(2, '0')}`;
        const matchingRule = rules.find(r => bookingHour >= r.startTime && bookingHour < r.endTime) ??
            rules[rules.length - 1];
        return parseFloat((matchingRule.hourlyRate * durationHours).toFixed(2));
    }
};
exports.PricingService = PricingService;
exports.PricingService = PricingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PricingService);
//# sourceMappingURL=pricing.service.js.map