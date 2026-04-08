import { PrismaService } from '../config/prisma.service';
import { BookingsService } from '../bookings/bookings.service';
export declare class AdminService {
    private prisma;
    private bookingsService;
    constructor(prisma: PrismaService, bookingsService: BookingsService);
    approveBooking(bookingId: string, adminId: string, staffId?: string): Promise<{
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
        staff: {
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
    }>;
    rejectBooking(bookingId: string, adminId: string): Promise<{
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
    }>;
    markAsPaid(bookingId: string, adminId: string): Promise<{
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
    getStaff(adminId: string): Promise<{
        email: string;
        name: string;
        id: string;
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
