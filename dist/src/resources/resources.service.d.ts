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
    create(data: CreateResourceDto): Promise<{
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
    update(id: string, data: UpdateResourceDto): Promise<{
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
}
