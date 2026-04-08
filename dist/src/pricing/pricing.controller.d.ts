import { PricingService } from './pricing.service';
import { PricingEngineService } from './pricing-engine.service';
import { CreatePricingDto, UpdatePricingDto } from './dto/pricing.dto';
export declare class PricingController {
    private readonly pricingService;
    private readonly pricingEngine;
    constructor(pricingService: PricingService, pricingEngine: PricingEngineService);
    create(dto: CreatePricingDto): Promise<{
        id: string;
        label: string | null;
        priority: import("../../generated/prisma/enums").PricingPriority;
        daysOfWeek: number[];
        startTime: string;
        endTime: string;
        hourlyRate: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        resourceId: string;
    }>;
    findAll(resourceId?: string): Promise<({
        resource: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            type: import("../../generated/prisma/enums").ResourceType;
            capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
            isQuantifiable: boolean;
            totalCapacity: number;
        };
    } & {
        id: string;
        label: string | null;
        priority: import("../../generated/prisma/enums").PricingPriority;
        daysOfWeek: number[];
        startTime: string;
        endTime: string;
        hourlyRate: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        resourceId: string;
    })[]>;
    calculatePrice(resourceId: string, startTime: string, endTime: string, breakdown?: string): Promise<{
        breakdown: {
            time: string;
            rule: string;
            priority: string;
            rate: number;
            cost: number;
        }[];
        total: number;
    } | {
        total: number;
    }>;
    findOne(id: string): Promise<{
        resource: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            type: import("../../generated/prisma/enums").ResourceType;
            capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
            isQuantifiable: boolean;
            totalCapacity: number;
        };
    } & {
        id: string;
        label: string | null;
        priority: import("../../generated/prisma/enums").PricingPriority;
        daysOfWeek: number[];
        startTime: string;
        endTime: string;
        hourlyRate: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        resourceId: string;
    }>;
    update(id: string, dto: UpdatePricingDto): Promise<{
        id: string;
        label: string | null;
        priority: import("../../generated/prisma/enums").PricingPriority;
        daysOfWeek: number[];
        startTime: string;
        endTime: string;
        hourlyRate: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        resourceId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        label: string | null;
        priority: import("../../generated/prisma/enums").PricingPriority;
        daysOfWeek: number[];
        startTime: string;
        endTime: string;
        hourlyRate: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        resourceId: string;
    }>;
}
