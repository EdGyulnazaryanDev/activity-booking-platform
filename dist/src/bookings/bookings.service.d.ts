import { PrismaService } from '../config/prisma.service';
import { PricingEngineService } from '../pricing/pricing-engine.service';
import { NotificationsService } from '../notifications/notifications.service';
import { SoftHoldService } from './soft-hold.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
export declare class BookingsService {
    private prisma;
    private pricingEngine;
    private notificationsService;
    private softHold;
    constructor(prisma: PrismaService, pricingEngine: PricingEngineService, notificationsService: NotificationsService, softHold: SoftHoldService);
    findAll(page?: number, limit?: number, userId?: string, status?: string): Promise<{
        items: ({
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
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
        resource: {
            pricingRules: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                isActive: boolean;
                resourceId: string;
                label: string | null;
                priority: import("../../generated/prisma/enums").PricingPriority;
                daysOfWeek: number[];
                startTime: string;
                endTime: string;
                hourlyRate: number;
            }[];
        } & {
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
    findByUser(userId: string): Promise<({
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
    })[]>;
    findByStatus(status: string): Promise<({
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
    })[]>;
    getUpcomingBookings(): Promise<({
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
    })[]>;
    getLobby(): Promise<{
        availableSlots: number;
        user: {
            id: string;
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
    }[]>;
    createBooking(dto: CreateBookingDto & {
        userId: string;
    }): Promise<{
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
    update(id: string, dto: UpdateBookingDto): Promise<{
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
    remove(id: string): Promise<{
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
    approveBooking(id: string, adminId: string, staffId?: string): Promise<{
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
    rejectBooking(id: string, adminId: string): Promise<{
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
    markAsPaid(id: string): Promise<{
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
    private getBookedQuantity;
}
