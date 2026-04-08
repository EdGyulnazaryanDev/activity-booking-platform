import { PrismaService } from '../config/prisma.service';
import { BookingsService } from '../bookings/bookings.service';
export declare class AdminService {
    private prisma;
    private bookingsService;
    constructor(prisma: PrismaService, bookingsService: BookingsService);
    approveBooking(bookingId: string, adminId: string, staffId?: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
        resource: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            type: import("../../generated/prisma/enums").ResourceType;
            capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
            isQuantifiable: boolean;
            totalCapacity: number;
            isActive: boolean;
        };
        staff: {
            id: string;
            name: string;
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
    }>;
    rejectBooking(bookingId: string, adminId: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
        resource: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            type: import("../../generated/prisma/enums").ResourceType;
            capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
            isQuantifiable: boolean;
            totalCapacity: number;
            isActive: boolean;
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
    }>;
    markAsPaid(bookingId: string, adminId: string): Promise<{
        resource: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            type: import("../../generated/prisma/enums").ResourceType;
            capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
            isQuantifiable: boolean;
            totalCapacity: number;
            isActive: boolean;
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
                email: string;
                name: string;
            };
            resource: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                type: import("../../generated/prisma/enums").ResourceType;
                capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
                isQuantifiable: boolean;
                totalCapacity: number;
                isActive: boolean;
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
    }>;
    getStaff(adminId: string): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        specialty: string | null;
        allowedResourceTypes: import("../../generated/prisma/enums").ResourceType[];
        availability: import("@prisma/client/runtime/client").JsonValue | null;
        phone: string | null;
    }[]>;
    private assertAdmin;
}
