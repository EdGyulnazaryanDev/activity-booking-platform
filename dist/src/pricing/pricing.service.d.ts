import { PrismaService } from '../config/prisma.service';
import { CreatePricingDto, UpdatePricingDto } from './dto/pricing.dto';
export declare class PricingService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePricingDto): Promise<{
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
    }>;
    findAll(resourceId?: string): Promise<({
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
        isActive: boolean;
        resourceId: string;
        label: string | null;
        priority: import("../../generated/prisma/enums").PricingPriority;
        daysOfWeek: number[];
        startTime: string;
        endTime: string;
        hourlyRate: number;
    })[]>;
    findOne(id: string): Promise<{
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
        isActive: boolean;
        resourceId: string;
        label: string | null;
        priority: import("../../generated/prisma/enums").PricingPriority;
        daysOfWeek: number[];
        startTime: string;
        endTime: string;
        hourlyRate: number;
    }>;
    update(id: string, dto: UpdatePricingDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
    calculatePrice(resourceId: string, startTime: Date, endTime: Date): Promise<number>;
}
