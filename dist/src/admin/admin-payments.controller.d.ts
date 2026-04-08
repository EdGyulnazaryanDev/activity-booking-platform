import { PrismaService } from '../config/prisma.service';
export declare class AdminPaymentsController {
    private prisma;
    constructor(prisma: PrismaService);
    getPayments(page?: string, limit?: string): Promise<{
        items: ({
            user: {
                email: string;
                name: string;
                id: string;
            };
            resource: {
                type: import("../../generated/prisma/enums").ResourceType;
                name: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            resourceId: string;
            startTime: Date;
            endTime: Date;
            userId: string;
            quantity: number;
            notes: string | null;
            isOpenForPartners: boolean;
            status: import("../../generated/prisma/enums").BookingStatus;
            staffId: string | null;
            partnerOfBookingId: string | null;
            totalPrice: number;
            paymentMethod: import("../../generated/prisma/enums").PaymentMethod | null;
            paidAt: Date | null;
            softHoldKey: string | null;
            approvedBy: string | null;
            approvedAt: Date | null;
        })[];
        total: number;
        totalRevenue: number;
    }>;
}
