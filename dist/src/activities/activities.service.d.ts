import { ResourcesService } from '../resources/resources.service';
export declare class ActivitiesService {
    private resources;
    constructor(resources: ResourcesService);
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
        type: import("../../generated/prisma/enums").ResourceType;
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
        type: import("../../generated/prisma/enums").ResourceType;
        capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
        isQuantifiable: boolean;
        totalCapacity: number;
    }>;
}
