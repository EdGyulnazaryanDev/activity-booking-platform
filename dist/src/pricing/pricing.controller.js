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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingController = void 0;
const common_1 = require("@nestjs/common");
const pricing_service_1 = require("./pricing.service");
const pricing_engine_service_1 = require("./pricing-engine.service");
const pricing_dto_1 = require("./dto/pricing.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let PricingController = class PricingController {
    constructor(pricingService, pricingEngine) {
        this.pricingService = pricingService;
        this.pricingEngine = pricingEngine;
    }
    create(dto) {
        return this.pricingService.create(dto);
    }
    findAll(resourceId) {
        return this.pricingService.findAll(resourceId);
    }
    async calculatePrice(resourceId, startTime, endTime, breakdown) {
        if (breakdown === 'true') {
            return this.pricingEngine.getPriceBreakdown(resourceId, new Date(startTime), new Date(endTime));
        }
        const total = await this.pricingEngine.calculatePrice(resourceId, new Date(startTime), new Date(endTime));
        return { total };
    }
    findOne(id) {
        return this.pricingService.findOne(id);
    }
    update(id, dto) {
        return this.pricingService.update(id, dto);
    }
    remove(id) {
        return this.pricingService.remove(id);
    }
};
exports.PricingController = PricingController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create pricing rule' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pricing_dto_1.CreatePricingDto]),
    __metadata("design:returntype", void 0)
], PricingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all pricing rules' }),
    (0, swagger_1.ApiQuery)({ name: 'resourceId', required: false }),
    __param(0, (0, common_1.Query)('resourceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PricingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('calculate/:resourceId'),
    (0, swagger_1.ApiOperation)({ summary: 'Calculate price using 15-min slice engine with priority rules' }),
    (0, swagger_1.ApiParam)({ name: 'resourceId' }),
    (0, swagger_1.ApiQuery)({ name: 'startTime', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'endTime', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'breakdown', required: false, description: 'Return per-slice breakdown' }),
    __param(0, (0, common_1.Param)('resourceId')),
    __param(1, (0, common_1.Query)('startTime')),
    __param(2, (0, common_1.Query)('endTime')),
    __param(3, (0, common_1.Query)('breakdown')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "calculatePrice", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pricing rule by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PricingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update pricing rule' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pricing_dto_1.UpdatePricingDto]),
    __metadata("design:returntype", void 0)
], PricingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete pricing rule' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PricingController.prototype, "remove", null);
exports.PricingController = PricingController = __decorate([
    (0, swagger_1.ApiTags)('pricing'),
    (0, common_1.Controller)('pricing'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [pricing_service_1.PricingService,
        pricing_engine_service_1.PricingEngineService])
], PricingController);
//# sourceMappingURL=pricing.controller.js.map