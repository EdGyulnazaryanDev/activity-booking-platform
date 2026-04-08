import { WalletService } from './wallet.service';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
declare class TopUpDto {
    amount: number;
    description?: string;
    externalRef?: string;
}
declare class PayBookingDto {
    bookingId: string;
}
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    getWallet(user: CurrentUserPayload): Promise<{
        transactions: {
            id: string;
            createdAt: Date;
            type: import("../../generated/prisma/enums").TransactionType;
            status: import("../../generated/prisma/enums").TransactionStatus;
            walletId: string;
            amount: number;
            description: string | null;
            bookingId: string | null;
            externalRef: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        balance: number;
        currency: string;
    }>;
    getTransactions(user: CurrentUserPayload, page?: string, limit?: string): Promise<{
        items: any[];
        total: number;
        balance: number;
        currency?: undefined;
    } | {
        items: {
            booking: {
                resource: {
                    name: string;
                    type: import("../../generated/prisma/enums").ResourceType;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                resourceId: string;
                startTime: Date;
                endTime: Date;
                userId: string;
                staffId: string | null;
                partnerOfBookingId: string | null;
                quantity: number;
                status: import("../../generated/prisma/enums").BookingStatus;
                totalPrice: number;
                paymentMethod: import("../../generated/prisma/enums").PaymentMethod | null;
                paidAt: Date | null;
                notes: string | null;
                isOpenForPartners: boolean;
                softHoldKey: string | null;
                approvedBy: string | null;
                approvedAt: Date | null;
            };
            id: string;
            createdAt: Date;
            type: import("../../generated/prisma/enums").TransactionType;
            status: import("../../generated/prisma/enums").TransactionStatus;
            walletId: string;
            amount: number;
            description: string | null;
            bookingId: string | null;
            externalRef: string | null;
        }[];
        total: number;
        balance: number;
        currency: string;
    }>;
    topUp(user: CurrentUserPayload, dto: TopUpDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        balance: number;
        currency: string;
    }>;
    payBooking(user: CurrentUserPayload, dto: PayBookingDto): Promise<{
        wallet: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            balance: number;
            currency: string;
        };
        bookingId: string;
    }>;
}
export {};
