import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(dto: CreateBookingDto, user: CurrentUserPayload): Promise<{
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
    findAll(user: CurrentUserPayload): Promise<({
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
}
