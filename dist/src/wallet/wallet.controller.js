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
exports.WalletController = void 0;
const common_1 = require("@nestjs/common");
const wallet_service_1 = require("./wallet.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_2 = require("@nestjs/swagger");
class TopUpDto {
}
__decorate([
    (0, swagger_2.ApiProperty)({ example: 5000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], TopUpDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'IDram top-up' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TopUpDto.prototype, "description", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'IDRAM-REF-12345' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TopUpDto.prototype, "externalRef", void 0);
class PayBookingDto {
}
__decorate([
    (0, swagger_2.ApiProperty)({ example: 'booking-id' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PayBookingDto.prototype, "bookingId", void 0);
let WalletController = class WalletController {
    constructor(walletService) {
        this.walletService = walletService;
    }
    getWallet(user) {
        return this.walletService.getOrCreate(user.id);
    }
    getTransactions(user, page, limit) {
        return this.walletService.getTransactions(user.id, Number(page) || 1, Number(limit) || 20);
    }
    topUp(user, dto) {
        return this.walletService.topUp(user.id, dto.amount, dto.description, dto.externalRef);
    }
    payBooking(user, dto) {
        return this.walletService.payBooking(user.id, dto.bookingId);
    }
};
exports.WalletController = WalletController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get my wallet balance and recent transactions' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "getWallet", null);
__decorate([
    (0, common_1.Get)('transactions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get transaction history' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.Post)('topup'),
    (0, swagger_1.ApiOperation)({ summary: 'Top up wallet (admin confirms or payment webhook)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, TopUpDto]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "topUp", null);
__decorate([
    (0, common_1.Post)('pay'),
    (0, swagger_1.ApiOperation)({ summary: 'Pay for a booking from wallet' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, PayBookingDto]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "payBooking", null);
exports.WalletController = WalletController = __decorate([
    (0, swagger_1.ApiTags)('wallet'),
    (0, common_1.Controller)('wallet'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], WalletController);
//# sourceMappingURL=wallet.controller.js.map