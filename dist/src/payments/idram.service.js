"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var IdramService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdramService = void 0;
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
const prisma_service_1 = require("../config/prisma.service");
const wallet_service_1 = require("../wallet/wallet.service");
let IdramService = IdramService_1 = class IdramService {
    constructor(prisma, walletService) {
        this.prisma = prisma;
        this.walletService = walletService;
        this.logger = new common_1.Logger(IdramService_1.name);
        this.merchantId = process.env.IDRAM_MERCHANT_ID ?? '';
        this.secretKey = process.env.IDRAM_SECRET_KEY ?? '';
        this.successUrl = process.env.IDRAM_SUCCESS_URL ?? 'http://localhost:3001/wallet?payment=success';
        this.failUrl = process.env.IDRAM_FAIL_URL ?? 'http://localhost:3001/wallet?payment=fail';
        this.appUrl = process.env.APP_URL ?? 'http://localhost:3010';
        this.IDRAM_URL = 'https://banking.idram.am/Payment/GetPayment';
    }
    initiatePayment(userId, amountAMD, billNo) {
        if (!this.merchantId || !this.secretKey) {
            throw new common_1.BadRequestException('IDram merchant credentials not configured');
        }
        return {
            paymentUrl: this.IDRAM_URL,
            fields: {
                EDP_LANGUAGE: 'EN',
                EDP_REC_ACCOUNT: this.merchantId,
                EDP_DESCRIPTION: `Wallet top-up for user ${userId}`,
                EDP_AMOUNT: amountAMD.toFixed(2),
                EDP_BILL_NO: billNo,
                EDP_SUCCESS_URL: this.successUrl,
                EDP_FAIL_URL: this.failUrl,
            },
        };
    }
    async handleCallback(body) {
        const { EDP_PAYER_ACCOUNT, EDP_BILL_NO, EDP_REC_ACCOUNT, EDP_AMOUNT, EDP_TRANS_ID, EDP_CHECKSUM, } = body;
        this.logger.log(`IDram callback: bill=${EDP_BILL_NO} amount=${EDP_AMOUNT} trans=${EDP_TRANS_ID}`);
        if (EDP_REC_ACCOUNT !== this.merchantId) {
            this.logger.warn('IDram callback: merchant ID mismatch');
            return 'FAIL';
        }
        const expected = crypto
            .createHash('md5')
            .update(`${this.merchantId}:${EDP_AMOUNT}:${this.secretKey}:${EDP_BILL_NO}`)
            .digest('hex')
            .toUpperCase();
        if (expected !== EDP_CHECKSUM?.toUpperCase()) {
            this.logger.warn(`IDram callback: checksum mismatch. Expected ${expected}, got ${EDP_CHECKSUM}`);
            return 'FAIL';
        }
        const existing = await this.prisma.transaction.findFirst({
            where: { externalRef: EDP_TRANS_ID },
        });
        if (existing) {
            this.logger.log(`IDram callback: duplicate transaction ${EDP_TRANS_ID}, ignoring`);
            return 'OK';
        }
        const [userId, type] = EDP_BILL_NO.split('_');
        const amount = parseFloat(EDP_AMOUNT);
        if (type === 'topup') {
            await this.walletService.topUp(userId, amount, 'IDram top-up', EDP_TRANS_ID);
            this.logger.log(`IDram: topped up ${amount} AMD for user ${userId}`);
        }
        else {
            const bookingId = type;
            const booking = await this.prisma.booking.findUnique({ where: { id: bookingId } });
            if (booking && booking.userId === userId) {
                await this.walletService.topUp(userId, amount, 'IDram payment', EDP_TRANS_ID);
                await this.walletService.payBooking(userId, bookingId);
                this.logger.log(`IDram: paid booking ${bookingId} for user ${userId}`);
            }
        }
        return 'OK';
    }
    generateTopUpBillNo(userId) {
        return `${userId}_topup_${Date.now()}`;
    }
    generateBookingBillNo(userId, bookingId) {
        return `${userId}_${bookingId}_${Date.now()}`;
    }
};
exports.IdramService = IdramService;
exports.IdramService = IdramService = IdramService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        wallet_service_1.WalletService])
], IdramService);
//# sourceMappingURL=idram.service.js.map