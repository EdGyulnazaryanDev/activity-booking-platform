import { ActivitiesService } from './activities.service';
export declare class ActivitiesController {
    private readonly activitiesService;
    constructor(activitiesService: ActivitiesService);
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
        type: import("../../generated/prisma/enums").ResourceType;
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
        type: import("../../generated/prisma/enums").ResourceType;
        capacityType: import("../../generated/prisma/enums").ResourceCapacityType;
        isQuantifiable: boolean;
        totalCapacity: number;
        isActive: boolean;
    }>;
}
