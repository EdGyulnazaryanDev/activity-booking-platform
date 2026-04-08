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
exports.PricingEngineService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../config/prisma.service");
const SLICE_MINUTES = 15;
const PRIORITY_ORDER = { WEEKDAY: 1, WEEKEND: 2, HOLIDAY: 3 };
let PricingEngineService = class PricingEngineService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async calculatePrice(resourceId, startTime, endTime) {
        const rules = await this.prisma.pricingRule.findMany({
            where: { resourceId, isActive: true },
        });
        if (rules.length === 0) {
            throw new common_1.NotFoundException(`No active pricing rules for resource ${resourceId}`);
        }
        const slices = this.generateSlices(startTime, endTime);
        let totalPrice = 0;
        for (const slice of slices) {
            const rule = this.findBestRule(rules, slice);
            if (!rule) {
                throw new common_1.NotFoundException(`No pricing rule covers ${slice.toISOString().slice(11, 16)} on ${slice.toISOString().slice(0, 10)}`);
            }
            totalPrice += rule.hourlyRate * (SLICE_MINUTES / 60);
        }
        return parseFloat(totalPrice.toFixed(2));
    }
    generateSlices(start, end) {
        const slices = [];
        const current = new Date(start);
        while (current < end) {
            slices.push(new Date(current));
            current.setMinutes(current.getMinutes() + SLICE_MINUTES);
        }
        return slices;
    }
    findBestRule(rules, slice) {
        const sliceHHMM = `${String(slice.getUTCHours()).padStart(2, '0')}:${String(slice.getUTCMinutes()).padStart(2, '0')}`;
        const sliceDow = slice.getUTCDay();
        const matching = rules.filter(r => {
            const dayMatch = r.daysOfWeek.length === 0 || r.daysOfWeek.includes(sliceDow);
            const timeMatch = sliceHHMM >= r.startTime && sliceHHMM < r.endTime;
            return dayMatch && timeMatch;
        });
        if (matching.length === 0)
            return null;
        return matching.sort((a, b) => (PRIORITY_ORDER[b.priority] ?? 0)
            - (PRIORITY_ORDER[a.priority] ?? 0))[0];
    }
    async getPriceBreakdown(resourceId, startTime, endTime) {
        const rules = await this.prisma.pricingRule.findMany({
            where: { resourceId, isActive: true },
        });
        const slices = this.generateSlices(startTime, endTime);
        const breakdown = [];
        for (const slice of slices) {
            const rule = this.findBestRule(rules, slice);
            if (rule) {
                const cost = rule.hourlyRate * (SLICE_MINUTES / 60);
                breakdown.push({
                    time: slice.toISOString().slice(11, 16),
                    rule: rule.label ?? rule.id,
                    priority: rule.priority,
                    rate: rule.hourlyRate,
                    cost: parseFloat(cost.toFixed(2)),
                });
            }
        }
        const total = breakdown.reduce((s, b) => s + b.cost, 0);
        return { breakdown, total: parseFloat(total.toFixed(2)) };
    }
};
exports.PricingEngineService = PricingEngineService;
exports.PricingEngineService = PricingEngineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PricingEngineService);
//# sourceMappingURL=pricing-engine.service.js.map