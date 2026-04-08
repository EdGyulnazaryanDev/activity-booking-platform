import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(dto: CreateBookingDto, user: CurrentUserPayload): Promise<{
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
    findAll(user: CurrentUserPayload): Promise<({
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
}
