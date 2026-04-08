import { PrismaService } from '../config/prisma.service';
import { BookingsService } from '../bookings/bookings.service';
export declare class AdminService {
    private prisma;
    private bookingsService;
    constructor(prisma: PrismaService, bookingsService: BookingsService);
    approveBooking(bookingId: string, adminId: string, staffId?: string): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
        };
        resource: {
            id: string;
            type: import("../../generated/prisma/enums").ResourceType;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            isActive: boolean;
            capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
            isQuantifiable: boolean;
            totalCapacity: number;
        };
        staff: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        userId: string;
        createdAt: Date;
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
        updatedAt: Date;
    }>;
    rejectBooking(bookingId: string, adminId: string): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
        };
        resource: {
            id: string;
            type: import("../../generated/prisma/enums").ResourceType;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            isActive: boolean;
            capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
            isQuantifiable: boolean;
            totalCapacity: number;
        };
    } & {
        id: string;
        userId: string;
        createdAt: Date;
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
        updatedAt: Date;
    }>;
    markAsPaid(bookingId: string, adminId: string): Promise<{
        resource: {
            id: string;
            type: import("../../generated/prisma/enums").ResourceType;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            isActive: boolean;
            capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
            isQuantifiable: boolean;
            totalCapacity: number;
        };
    } & {
        id: string;
        userId: string;
        createdAt: Date;
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
        updatedAt: Date;
    }>;
    getDashboardStats(adminId: string): Promise<{
        stats: {
            pending: number;
            approved: number;
            rejected: number;
            paid: number;
            upcoming: number;
            total: number;
        };
        upcomingBookings: ({
            user: {
                id: string;
                name: string;
                email: string;
            };
            resource: {
                id: string;
                type: import("../../generated/prisma/enums").ResourceType;
                createdAt: Date;
                name: string;
                updatedAt: Date;
                isActive: boolean;
                capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
                isQuantifiable: boolean;
                totalCapacity: number;
            };
        } & {
            id: string;
            userId: string;
            createdAt: Date;
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
            updatedAt: Date;
        })[];
    }>;
    getStaff(adminId: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        email: string;
        specialty: string | null;
        allowedResourceTypes: import("../../generated/prisma/enums").ResourceType[];
        availability: import("@prisma/client/runtime/client").JsonValue | null;
        phone: string | null;
        isActive: boolean;
    }[]>;
    private assertAdmin;
}
