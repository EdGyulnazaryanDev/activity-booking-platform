import { ResourceType } from '../../../generated/prisma/enums';
export declare class CreateStaffDto {
    name: string;
    email: string;
    specialty?: string;
    allowedResourceTypes?: ResourceType[];
    availability?: Record<string, string[]>;
    phone?: string;
    isActive?: boolean;
}
export declare class UpdateStaffDto {
    name?: string;
    email?: string;
    specialty?: string;
    allowedResourceTypes?: ResourceType[];
    availability?: Record<string, string[]>;
    phone?: string;
    isActive?: boolean;
}
