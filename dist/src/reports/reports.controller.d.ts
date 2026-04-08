import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    getMonthly(year?: string, month?: string): Promise<{
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
                id: string;
                name: string;
                email: string;
            };
            resource: {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                type: import("../../generated/prisma/enums").ResourceType;
                capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
                isQuantifiable: boolean;
                totalCapacity: number;
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
    }>;
    getYearly(year?: string): Promise<{
        month: number;
        revenue: number;
        bookings: number;
        paid: number;
    }[]>;
}
