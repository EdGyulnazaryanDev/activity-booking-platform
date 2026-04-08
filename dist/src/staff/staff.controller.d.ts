import { StaffService } from './staff.service';
import { CreateStaffDto, UpdateStaffDto } from './dto/staff.dto';
export declare class StaffController {
    private readonly staffService;
    constructor(staffService: StaffService);
    create(dto: CreateStaffDto): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        specialty: string | null;
        allowedResourceTypes: import("../../generated/prisma/enums").ResourceType[];
        availability: import("@prisma/client/runtime/client").JsonValue | null;
        phone: string | null;
    }>;
    findAll(page?: string, limit?: string, search?: string, isActive?: string): Promise<{
        items: {
            id: string;
            email: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            specialty: string | null;
            allowedResourceTypes: import("../../generated/prisma/enums").ResourceType[];
            availability: import("@prisma/client/runtime/client").JsonValue | null;
            phone: string | null;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        specialty: string | null;
        allowedResourceTypes: import("../../generated/prisma/enums").ResourceType[];
        availability: import("@prisma/client/runtime/client").JsonValue | null;
        phone: string | null;
    }>;
    update(id: string, dto: UpdateStaffDto): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        specialty: string | null;
        allowedResourceTypes: import("../../generated/prisma/enums").ResourceType[];
        availability: import("@prisma/client/runtime/client").JsonValue | null;
        phone: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        specialty: string | null;
        allowedResourceTypes: import("../../generated/prisma/enums").ResourceType[];
        availability: import("@prisma/client/runtime/client").JsonValue | null;
        phone: string | null;
    }>;
}
