import { PrismaService } from '../config/prisma.service';
import { CreateResourceDto, UpdateResourceDto } from './dto/resource.dto';
import { ResourceType } from '../../generated/prisma/enums';
export declare class ResourcesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
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
    create(data: CreateResourceDto): Promise<{
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
    update(id: string, data: UpdateResourceDto): Promise<{
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
    findByType(type: ResourceType): Promise<({
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
}
