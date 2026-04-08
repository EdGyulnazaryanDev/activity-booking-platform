import { PrismaService } from '../config/prisma.service';
export declare class ReportsService {
    private prisma;
    constructor(prisma: PrismaService);
    getMonthlyReport(year: number, month: number): Promise<{
        period: {
            year: number;
            month: number;
            start: Date;
            end: Date;
        };
        summary: {
            totalBookings: number;
            paid: number;
            pending: number;
            approved: number;
            rejected: number;
            revenue: number;
            avgBookingValue: number;
        };
        byResource: {
            name: string;
            count: number;
            revenue: number;
        }[];
        byPaymentMethod: {
            method: string;
            revenue: number;
        }[];
        daily: {
            date: string;
            revenue: number;
        }[];
        recentPaidBookings: ({
            user: {
                email: string;
                name: string;
                id: string;
            };
            resource: {
                type: import("../../generated/prisma/enums").ResourceType;
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                isQuantifiable: boolean;
                totalCapacity: number;
                isActive: boolean;
                capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
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
    }>;
    getYearlyOverview(year: number): Promise<{
        month: number;
        revenue: number;
        bookings: number;
        paid: number;
    }[]>;
}
