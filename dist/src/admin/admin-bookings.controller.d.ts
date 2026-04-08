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
                specialty: string;
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
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getPending(page?: string, limit?: string): Promise<{
        items: ({
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
                specialty: string;
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
    getStaff(user: CurrentUserPayload): Promise<{
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
    approveBooking(id: string, dto: ApproveBookingDto, user: CurrentUserPayload): Promise<{
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
    rejectBooking(id: string, user: CurrentUserPayload): Promise<{
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
    markAsPaid(id: string, user: CurrentUserPayload): Promise<{
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
}
