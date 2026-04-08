import { PrismaService } from '../config/prisma.service';
import { WalletService } from '../wallet/wallet.service';
export declare class IdramService {
    private prisma;
    private walletService;
    private readonly logger;
    private readonly merchantId;
    private readonly secretKey;
    private readonly successUrl;
    private readonly failUrl;
    private readonly appUrl;
    private readonly IDRAM_URL;
    constructor(prisma: PrismaService, walletService: WalletService);
    initiatePayment(userId: string, amountAMD: number, billNo: string): {
        paymentUrl: string;
        fields: {
            EDP_LANGUAGE: string;
            EDP_REC_ACCOUNT: string;
            EDP_DESCRIPTION: string;
            EDP_AMOUNT: string;
            EDP_BILL_NO: string;
            EDP_SUCCESS_URL: string;
            EDP_FAIL_URL: string;
        };
    };
    handleCallback(body: Record<string, string>): Promise<string>;
    generateTopUpBillNo(userId: string): string;
    generateBookingBillNo(userId: string, bookingId: string): string;
}
