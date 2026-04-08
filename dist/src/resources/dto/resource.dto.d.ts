import { ResourceType } from '../../../generated/prisma/enums';
export declare class CreateResourceDto {
    name: string;
    type: ResourceType;
    isQuantifiable: boolean;
    totalCapacity: number;
    isActive?: boolean;
}
export declare class UpdateResourceDto {
    name?: string;
    type?: ResourceType;
    isQuantifiable?: boolean;
    totalCapacity?: number;
    isActive?: boolean;
}
