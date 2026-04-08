import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  /** Get or create wallet for a user */
  async getOrCreate(userId: string) {
    const existing = await this.prisma.wallet.findUnique({
      where: { userId },
      include: { transactions: { orderBy: { createdAt: 'desc' }, take: 20 } },
    });
    if (existing) return existing;
    return this.prisma.wallet.create({
      data: { userId },
      include: { transactions: true },
    });
  }

  /** Top up wallet — admin confirms or external payment webhook */
  async topUp(userId: string, amount: number, description?: string, externalRef?: string) {
    if (amount <= 0) throw new BadRequestException('Amount must be positive');
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

  /** Pay for a booking from wallet */
  async payBooking(userId: string, bookingId: string) {
    const wallet = await this.prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) throw new NotFoundException('Wallet not found');

    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { resource: true },
    });
    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.userId !== userId) throw new BadRequestException('Not your booking');
    if (booking.status === 'PAID') throw new BadRequestException('Already paid');
    if (wallet.balance < booking.totalPrice) {
      throw new BadRequestException(
        `Insufficient balance. Need ${booking.totalPrice} AMD, have ${wallet.balance} AMD`,
      );
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

  /** Refund a booking back to wallet */
  async refund(userId: string, bookingId: string) {
    const wallet = await this.prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) throw new NotFoundException('Wallet not found');

    const booking = await this.prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking || booking.userId !== userId) throw new NotFoundException('Booking not found');
    if (booking.paymentMethod !== 'WALLET') throw new BadRequestException('Only wallet payments can be refunded here');

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

  /** Get transaction history */
  async getTransactions(userId: string, page = 1, limit = 20) {
    const wallet = await this.prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) return { items: [], total: 0, balance: 0 };

    const [items, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where: { walletId: wallet.id },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          wallet: false,
          // include booking resource info via raw join
        },
      }),
      this.prisma.transaction.count({ where: { walletId: wallet.id } }),
    ]);

    // Enrich with booking details
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
}
