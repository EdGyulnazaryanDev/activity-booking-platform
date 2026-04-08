import { PrismaService } from '../config/prisma.service';
import { CreatePricingDto, UpdatePricingDto } from './dto/pricing.dto';
export declare class PricingService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePricingDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        resourceId: string;
        startTime: string;
        endTime: string;
        label: string | null;
        priority: import("../../generated/prisma/enums").PricingPriority;
        daysOfWeek: number[];
        hourlyRate: number;
    }>;
    findAll(resourceId?: string): Promise<({
        resource: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            type: import("../../generated/prisma/enums").ResourceType;
            capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
            isQuantifiable: boolean;
            totalCapacity: number;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        resourceId: string;
        startTime: string;
        endTime: string;
        label: string | null;
        priority: import("../../generated/prisma/enums").PricingPriority;
        daysOfWeek: number[];
        hourlyRate: number;
    })[]>;
    findOne(id: string): Promise<{
        resource: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            type: import("../../generated/prisma/enums").ResourceType;
            capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
            isQuantifiable: boolean;
            totalCapacity: number;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        resourceId: string;
        startTime: string;
        endTime: string;
        label: string | null;
        priority: import("../../generated/prisma/enums").PricingPriority;
        daysOfWeek: number[];
        hourlyRate: number;
    }>;
    update(id: string, dto: UpdatePricingDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        resourceId: string;
        startTime: string;
        endTime: string;
        label: string | null;
        priority: import("../../generated/prisma/enums").PricingPriority;
        daysOfWeek: number[];
        hourlyRate: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        resourceId: string;
        startTime: string;
        endTime: string;
        label: string | null;
        priority: import("../../generated/prisma/enums").PricingPriority;
        daysOfWeek: number[];
        hourlyRate: number;
    }>;
    calculatePrice(resourceId: string, startTime: Date, endTime: Date): Promise<number>;
}
