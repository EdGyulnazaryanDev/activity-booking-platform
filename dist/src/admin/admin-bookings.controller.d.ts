import { AdminService } from './admin.service';
import { BookingsService } from '../bookings/bookings.service';
import { ApproveBookingDto } from '../bookings/dto/booking.dto';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
export declare class AdminBookingsController {
    private readonly adminService;
    private readonly bookingsService;
    constructor(adminService: AdminService, bookingsService: BookingsService);
    findAll(page?: string, limit?: string, status?: string, userId?: string): Promise<{
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
                specialty: string;
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
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getPending(page?: string, limit?: string): Promise<{
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
                specialty: string;
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
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getDashboard(user: CurrentUserPayload): Promise<{
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
    getStaff(user: CurrentUserPayload): Promise<{
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
    approveBooking(id: string, dto: ApproveBookingDto, user: CurrentUserPayload): Promise<{
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
    rejectBooking(id: string, user: CurrentUserPayload): Promise<{
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
    markAsPaid(id: string, user: CurrentUserPayload): Promise<{
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
}
