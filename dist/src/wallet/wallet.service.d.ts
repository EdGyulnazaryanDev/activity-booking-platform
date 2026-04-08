import { PrismaService } from '../config/prisma.service';
export declare class WalletService {
    private prisma;
    constructor(prisma: PrismaService);
    getOrCreate(userId: string): Promise<{
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
    topUp(userId: string, amount: number, description?: string, externalRef?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        balance: number;
        currency: string;
    }>;
    payBooking(userId: string, bookingId: string): Promise<{
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
    refund(userId: string, bookingId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        balance: number;
        currency: string;
    }>;
    getTransactions(userId: string, page?: number, limit?: number): Promise<{
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
}
