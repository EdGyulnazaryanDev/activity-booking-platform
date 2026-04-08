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
var IdramController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdramController = void 0;
const common_1 = require("@nestjs/common");
const idram_service_1 = require("./idram.service");
const prisma_service_1 = require("../config/prisma.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_2 = require("@nestjs/swagger");
class InitiateTopUpDto {
}
__decorate([
    (0, swagger_2.ApiProperty)({ example: 5000, description: 'Amount in AMD' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(100),
    __metadata("design:type", Number)
], InitiateTopUpDto.prototype, "amount", void 0);
class InitiateBookingPaymentDto {
}
__decorate([
    (0, swagger_2.ApiProperty)({ example: 'booking-id' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InitiateBookingPaymentDto.prototype, "bookingId", void 0);
let IdramController = IdramController_1 = class IdramController {
    constructor(idramService, prisma) {
        this.idramService = idramService;
        this.prisma = prisma;
        this.logger = new common_1.Logger(IdramController_1.name);
    }
    initiateTopUp(dto, user) {
        const billNo = this.idramService.generateTopUpBillNo(user.id);
        return this.idramService.initiatePayment(user.id, dto.amount, billNo);
    }
    async initiateBookingPayment(dto, user) {
        const booking = await this.prisma.booking.findUnique({ where: { id: dto.bookingId } });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        const billNo = this.idramService.generateBookingBillNo(user.id, dto.bookingId);
        return this.idramService.initiatePayment(user.id, booking.totalPrice, billNo);
    }
    async callback(body, res) {
        this.logger.log(`IDram callback: ${JSON.stringify(body)}`);
        const result = await this.idramService.handleCallback(body);
        res.setHeader('Content-Type', 'text/plain');
        res.send(result);
    }
};
exports.IdramController = IdramController;
__decorate([
    (0, common_1.Post)('initiate/topup'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Initiate IDram wallet top-up — returns form fields to POST to IDram' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InitiateTopUpDto, Object]),
    __metadata("design:returntype", void 0)
], IdramController.prototype, "initiateTopUp", null);
__decorate([
    (0, common_1.Post)('initiate/booking'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Initiate IDram booking payment' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InitiateBookingPaymentDto, Object]),
    __metadata("design:returntype", Promise)
], IdramController.prototype, "initiateBookingPayment", null);
__decorate([
    (0, common_1.Post)('callback'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'IDram payment callback (server-to-server, no auth)' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdramController.prototype, "callback", null);
exports.IdramController = IdramController = IdramController_1 = __decorate([
    (0, swagger_1.ApiTags)('payments'),
    (0, common_1.Controller)('payments/idram'),
    __metadata("design:paramtypes", [idram_service_1.IdramService,
        prisma_service_1.PrismaService])
], IdramController);
//# sourceMappingURL=idram.controller.js.map