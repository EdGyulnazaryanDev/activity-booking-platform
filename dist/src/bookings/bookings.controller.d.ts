import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(dto: CreateBookingDto, user: CurrentUserPayload): Promise<{
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
    findAll(user: CurrentUserPayload): Promise<({
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
}
