import { ResourcesService } from './resources.service';
import { CreateResourceDto, UpdateResourceDto } from './dto/resource.dto';
import { ResourceType } from '../../generated/prisma/enums';
export declare class ResourcesController {
    private readonly resourcesService;
    constructor(resourcesService: ResourcesService);
    create(dto: CreateResourceDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: ResourceType;
        capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
        isQuantifiable: boolean;
        totalCapacity: number;
        isActive: boolean;
    }>;
    findAll(type?: ResourceType): Promise<({
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
        type: ResourceType;
        capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
        isQuantifiable: boolean;
        totalCapacity: number;
        isActive: boolean;
    })[]>;
    findOne(id: string): Promise<{
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
        type: ResourceType;
        capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
        isQuantifiable: boolean;
        totalCapacity: number;
        isActive: boolean;
    }>;
    update(id: string, dto: UpdateResourceDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: ResourceType;
        capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
        isQuantifiable: boolean;
        totalCapacity: number;
        isActive: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: ResourceType;
        capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
        isQuantifiable: boolean;
        totalCapacity: number;
        isActive: boolean;
    }>;
}
