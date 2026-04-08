import { PrismaService } from '../config/prisma.service';
export declare class AdminPaymentsController {
    private prisma;
    constructor(prisma: PrismaService);
    getPayments(page?: string, limit?: string): Promise<{
        items: ({
            user: {
                id: string;
                email: string;
                name: string;
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
        })[];
        total: number;
        totalRevenue: number;
    }>;
}
