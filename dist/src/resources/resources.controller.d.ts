import { ResourcesService } from './resources.service';
import { CreateResourceDto, UpdateResourceDto } from './dto/resource.dto';
import { ResourceType } from '../../generated/prisma/enums';
export declare class ResourcesController {
    private readonly resourcesService;
    constructor(resourcesService: ResourcesService);
    create(dto: CreateResourceDto): Promise<{
        type: ResourceType;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isQuantifiable: boolean;
        totalCapacity: number;
        isActive: boolean;
        capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
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
        type: ResourceType;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isQuantifiable: boolean;
        totalCapacity: number;
        isActive: boolean;
        capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
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
        type: ResourceType;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isQuantifiable: boolean;
        totalCapacity: number;
        isActive: boolean;
        capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
    }>;
    update(id: string, dto: UpdateResourceDto): Promise<{
        type: ResourceType;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isQuantifiable: boolean;
        totalCapacity: number;
        isActive: boolean;
        capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
    }>;
    remove(id: string): Promise<{
        type: ResourceType;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isQuantifiable: boolean;
        totalCapacity: number;
        isActive: boolean;
        capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
    }>;
}
