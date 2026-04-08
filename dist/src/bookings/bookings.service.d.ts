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
    findOne(id: string): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
        };
        resource: {
            pricingRules: {
                id: string;
                createdAt: Date;
                resourceId: string;
                startTime: string;
                endTime: string;
                updatedAt: Date;
                isActive: boolean;
                label: string | null;
                priority: import("../../generated/prisma/enums").PricingPriority;
                daysOfWeek: number[];
                hourlyRate: number;
            }[];
        } & {
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
    }>;
    findByUser(userId: string): Promise<({
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
    })[]>;
    findByStatus(status: string): Promise<({
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
    })[]>;
    getUpcomingBookings(): Promise<({
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
    })[]>;
    getLobby(): Promise<{
        availableSlots: number;
        user: {
            id: string;
            name: string;
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
    }[]>;
    createBooking(dto: CreateBookingDto & {
        userId: string;
    }): Promise<{
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
    update(id: string, dto: UpdateBookingDto): Promise<{
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
    remove(id: string): Promise<{
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
    approveBooking(id: string, adminId: string, staffId?: string): Promise<{
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
    rejectBooking(id: string, adminId: string): Promise<{
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
    markAsPaid(id: string): Promise<{
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
    private getBookedQuantity;
}
