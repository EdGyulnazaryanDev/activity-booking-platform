import { PrismaService } from '../config/prisma.service';
import { CreateResourceDto, UpdateResourceDto } from './dto/resource.dto';
import { ResourceType } from '../../generated/prisma/enums';
export declare class ResourcesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
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
    create(data: CreateResourceDto): Promise<{
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
    update(id: string, data: UpdateResourceDto): Promise<{
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
    findByType(type: ResourceType): Promise<({
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
}
