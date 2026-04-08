import { ResourcesService } from './resources.service';
import { CreateResourceDto, UpdateResourceDto } from './dto/resource.dto';
import { ResourceType } from '../../generated/prisma/enums';
export declare class ResourcesController {
    private readonly resourcesService;
    constructor(resourcesService: ResourcesService);
    create(dto: CreateResourceDto): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: ResourceType;
        capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
        isQuantifiable: boolean;
        totalCapacity: number;
    }>;
    findAll(type?: ResourceType): Promise<({
        pricingRules: {
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
        }[];
    } & {
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: ResourceType;
        capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
        isQuantifiable: boolean;
        totalCapacity: number;
    })[]>;
    findOne(id: string): Promise<{
        pricingRules: {
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
        }[];
    } & {
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: ResourceType;
        capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
        isQuantifiable: boolean;
        totalCapacity: number;
    }>;
    update(id: string, dto: UpdateResourceDto): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: ResourceType;
        capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
        isQuantifiable: boolean;
        totalCapacity: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: ResourceType;
        capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
        isQuantifiable: boolean;
        totalCapacity: number;
    }>;
}
