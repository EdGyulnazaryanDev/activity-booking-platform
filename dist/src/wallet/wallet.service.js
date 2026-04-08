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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../config/prisma.service");
let WalletService = class WalletService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOrCreate(userId) {
        const existing = await this.prisma.wallet.findUnique({
            where: { userId },
            include: { transactions: { orderBy: { createdAt: 'desc' }, take: 20 } },
        });
        if (existing)
            return existing;
        return this.prisma.wallet.create({
            data: { userId },
            include: { transactions: true },
        });
    }
    async topUp(userId, amount, description, externalRef) {
        if (amount <= 0)
            throw new common_1.BadRequestException('Amount must be positive');
        const wallet = await this.getOrCreate(userId);
        const [updatedWallet] = await this.prisma.$transaction([
            this.prisma.wallet.update({
                where: { id: wallet.id },
                data: { balance: { increment: amount } },
            }),
            this.prisma.transaction.create({
                data: {
                    walletId: wallet.id,
                    type: 'TOPUP',
                    status: 'COMPLETED',
                    amount,
                    description: description ?? 'Wallet top-up',
                    externalRef,
                },
            }),
        ]);
        return updatedWallet;
    }
    async payBooking(userId, bookingId) {
        const wallet = await this.prisma.wallet.findUnique({ where: { userId } });
        if (!wallet)
            throw new common_1.NotFoundException('Wallet not found');
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: { resource: true },
        });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        if (booking.userId !== userId)
            throw new common_1.BadRequestException('Not your booking');
        if (booking.status === 'PAID')
            throw new common_1.BadRequestException('Already paid');
        if (wallet.balance < booking.totalPrice) {
            throw new common_1.BadRequestException(`Insufficient balance. Need ${booking.totalPrice} AMD, have ${wallet.balance} AMD`);
        }
        const timeStr = `${new Date(booking.startTime).toISOString().slice(11, 16)}–${new Date(booking.endTime).toISOString().slice(11, 16)}`;
        const dateStr = new Date(booking.startTime).toISOString().slice(0, 10);
        const desc = `${booking.resource.name} · ${dateStr} · ${timeStr}`;
        const [updatedWallet] = await this.prisma.$transaction([
            this.prisma.wallet.update({
                where: { id: wallet.id },
                data: { balance: { decrement: booking.totalPrice } },
            }),
            this.prisma.transaction.create({
                data: {
                    walletId: wallet.id,
                    type: 'PAYMENT',
                    status: 'COMPLETED',
                    amount: booking.totalPrice,
                    description: desc,
                    bookingId,
                },
            }),
            this.prisma.booking.update({
                where: { id: bookingId },
                data: { status: 'PAID', paymentMethod: 'WALLET', paidAt: new Date() },
            }),
        ]);
        return { wallet: updatedWallet, bookingId };
    }
    async refund(userId, bookingId) {
        const wallet = await this.prisma.wallet.findUnique({ where: { userId } });
        if (!wallet)
            throw new common_1.NotFoundException('Wallet not found');
        const booking = await this.prisma.booking.findUnique({ where: { id: bookingId } });
        if (!booking || booking.userId !== userId)
            throw new common_1.NotFoundException('Booking not found');
        if (booking.paymentMethod !== 'WALLET')
            throw new common_1.BadRequestException('Only wallet payments can be refunded here');
        const [updatedWallet] = await this.prisma.$transaction([
            this.prisma.wallet.update({
                where: { id: wallet.id },
                data: { balance: { increment: booking.totalPrice } },
            }),
            this.prisma.transaction.create({
                data: {
                    walletId: wallet.id,
                    type: 'REFUND',
                    status: 'COMPLETED',
                    amount: booking.totalPrice,
                    description: `Refund for booking #${bookingId}`,
                    bookingId,
                },
            }),
        ]);
        return updatedWallet;
    }
    async getTransactions(userId, page = 1, limit = 20) {
        const wallet = await this.prisma.wallet.findUnique({ where: { userId } });
        if (!wallet)
            return { items: [], total: 0, balance: 0 };
        const [items, total] = await Promise.all([
            this.prisma.transaction.findMany({
                where: { walletId: wallet.id },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    wallet: false,
                },
            }),
            this.prisma.transaction.count({ where: { walletId: wallet.id } }),
        ]);
        const enriched = await Promise.all(items.map(async (tx) => {
            if (tx.bookingId) {
                const booking = await this.prisma.booking.findUnique({
                    where: { id: tx.bookingId },
                    include: { resource: { select: { name: true, type: true } } },
                });
                return { ...tx, booking };
            }
            return { ...tx, booking: null };
        }));
        return { items: enriched, total, balance: wallet.balance, currency: wallet.currency };
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WalletService);
//# sourceMappingURL=wallet.service.js.map