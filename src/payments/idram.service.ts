import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from '../config/prisma.service';
import { WalletService } from '../wallet/wallet.service';

/**
 * IDram Merchant Payment Integration
 *
 * Flow:
 *  1. User clicks "Pay with IDram"
 *  2. Frontend POSTs to /payments/idram/initiate → gets redirect URL
 *  3. User is redirected to IDram payment page
 *  4. After payment, IDram POSTs to /payments/idram/callback (server-to-server)
 *  5. We verify MD5 checksum, top up wallet / mark booking paid
 *  6. IDram also redirects user browser to success/fail URL
 *
 * Required env vars:
 *   IDRAM_MERCHANT_ID   — your EDP_REC_ACCOUNT (e.g. "110000123")
 *   IDRAM_SECRET_KEY    — secret key from IDram merchant portal
 *   IDRAM_SUCCESS_URL   — where to redirect after success
 *   IDRAM_FAIL_URL      — where to redirect after failure
 *   APP_URL             — your backend public URL (for callback)
 */
@Injectable()
export class IdramService {
  private readonly logger = new Logger(IdramService.name);

  private readonly merchantId  = process.env.IDRAM_MERCHANT_ID  ?? '';
  private readonly secretKey   = process.env.IDRAM_SECRET_KEY   ?? '';
  private readonly successUrl  = process.env.IDRAM_SUCCESS_URL  ?? 'http://localhost:3001/wallet?payment=success';
  private readonly failUrl     = process.env.IDRAM_FAIL_URL     ?? 'http://localhost:3001/wallet?payment=fail';
  private readonly appUrl      = process.env.APP_URL            ?? 'http://localhost:3010';

  // IDram payment page URL
  private readonly IDRAM_URL = 'https://banking.idram.am/Payment/GetPayment';

  constructor(
    private prisma: PrismaService,
    private walletService: WalletService,
  ) {}

  /**
   * Build the IDram payment form data.
   * The frontend will POST this as a form to IDram's URL.
   */
  initiatePayment(userId: string, amountAMD: number, billNo: string) {
    if (!this.merchantId || !this.secretKey) {
      throw new BadRequestException('IDram merchant credentials not configured');
    }

    return {
      paymentUrl: this.IDRAM_URL,
      fields: {
        EDP_LANGUAGE:    'EN',
        EDP_REC_ACCOUNT: this.merchantId,
        EDP_DESCRIPTION: `Wallet top-up for user ${userId}`,
        EDP_AMOUNT:      amountAMD.toFixed(2),
        EDP_BILL_NO:     billNo,
        EDP_SUCCESS_URL: this.successUrl,
        EDP_FAIL_URL:    this.failUrl,
      },
    };
  }

  /**
   * Verify IDram callback and credit wallet.
   * IDram sends a POST with these fields:
   *   EDP_PAYER_ACCOUNT, EDP_BILL_NO, EDP_REC_ACCOUNT,
   *   EDP_AMOUNT, EDP_TRANS_ID, EDP_CHECKSUM
   *
   * Checksum = MD5(EDP_REC_ACCOUNT:EDP_AMOUNT:SECRET_KEY:EDP_BILL_NO)
   */
  async handleCallback(body: Record<string, string>): Promise<string> {
    const {
      EDP_PAYER_ACCOUNT,
      EDP_BILL_NO,
      EDP_REC_ACCOUNT,
      EDP_AMOUNT,
      EDP_TRANS_ID,
      EDP_CHECKSUM,
    } = body;

    this.logger.log(`IDram callback: bill=${EDP_BILL_NO} amount=${EDP_AMOUNT} trans=${EDP_TRANS_ID}`);

    // 1. Verify merchant account matches
    if (EDP_REC_ACCOUNT !== this.merchantId) {
      this.logger.warn('IDram callback: merchant ID mismatch');
      return 'FAIL';
    }

    // 2. Verify checksum
    const expected = crypto
      .createHash('md5')
      .update(`${this.merchantId}:${EDP_AMOUNT}:${this.secretKey}:${EDP_BILL_NO}`)
      .digest('hex')
      .toUpperCase();

    if (expected !== EDP_CHECKSUM?.toUpperCase()) {
      this.logger.warn(`IDram callback: checksum mismatch. Expected ${expected}, got ${EDP_CHECKSUM}`);
      return 'FAIL';
    }

    // 3. Check for duplicate (idempotency)
    const existing = await this.prisma.transaction.findFirst({
      where: { externalRef: EDP_TRANS_ID },
    });
    if (existing) {
      this.logger.log(`IDram callback: duplicate transaction ${EDP_TRANS_ID}, ignoring`);
      return 'OK'; // IDram expects OK even for duplicates
    }

    // 4. Parse bill number to find user and booking
    // Bill format: "userId_bookingId_timestamp" or "userId_topup_timestamp"
    const [userId, type] = EDP_BILL_NO.split('_');
    const amount = parseFloat(EDP_AMOUNT);

    if (type === 'topup') {
      // Top up wallet
      await this.walletService.topUp(userId, amount, 'IDram top-up', EDP_TRANS_ID);
      this.logger.log(`IDram: topped up ${amount} AMD for user ${userId}`);
    } else {
      // Pay for booking
      const bookingId = type;
      const booking = await this.prisma.booking.findUnique({ where: { id: bookingId } });
      if (booking && booking.userId === userId) {
        // Top up then immediately pay
        await this.walletService.topUp(userId, amount, 'IDram payment', EDP_TRANS_ID);
        await this.walletService.payBooking(userId, bookingId);
        this.logger.log(`IDram: paid booking ${bookingId} for user ${userId}`);
      }
    }

    return 'OK'; // IDram requires exactly "OK" response
  }

  /** Generate a unique bill number for a top-up */
  generateTopUpBillNo(userId: string): string {
    return `${userId}_topup_${Date.now()}`;
  }

  /** Generate a unique bill number for a booking payment */
  generateBookingBillNo(userId: string, bookingId: string): string {
    return `${userId}_${bookingId}_${Date.now()}`;
  }
}
