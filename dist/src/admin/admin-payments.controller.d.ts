import { PrismaService } from '../config/prisma.service';
export declare class AdminPaymentsController {
    private prisma;
    constructor(prisma: PrismaService);
    getPayments(page?: string, limit?: string): Promise<{
        items: ({
            user: {
                id: string;
                name: string;
                email: string;
            };
            resource: {
                id: string;
                name: string;
                type: import("../../generated/prisma/enums").ResourceType;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            resourceId: string;
            staffId: string | null;
            partnerOfBookingId: string | null;
            quantity: number;
            startTime: Date;
            endTime: Date;
            status: import("../../generated/prisma/enums").BookingStatus;
            totalPrice: number;
            paymentMethod: import("../../generated/prisma/enums").PaymentMethod | null;
            paidAt: Date | null;
            notes: string | null;
            isOpenForPartners: boolean;
            softHoldKey: string | null;
            approvedBy: string | null;
            approvedAt: Date | null;
        })[];
        total: number;
        totalRevenue: number;
    }>;
}
