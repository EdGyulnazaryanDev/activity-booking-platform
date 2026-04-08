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
    findOne(id: string): Promise<{
        user: {
            email: string;
            name: string;
            id: string;
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
    }>;
    findByUser(userId: string): Promise<({
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
    })[]>;
    findByStatus(status: string): Promise<({
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
    })[]>;
    getUpcomingBookings(): Promise<({
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
    })[]>;
    getLobby(): Promise<{
        availableSlots: number;
        user: {
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
    }[]>;
    createBooking(dto: CreateBookingDto & {
        userId: string;
    }): Promise<{
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
    update(id: string, dto: UpdateBookingDto): Promise<{
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
    remove(id: string): Promise<{
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
    approveBooking(id: string, adminId: string, staffId?: string): Promise<{
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
    rejectBooking(id: string, adminId: string): Promise<{
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
    markAsPaid(id: string): Promise<{
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
    private getBookedQuantity;
}
