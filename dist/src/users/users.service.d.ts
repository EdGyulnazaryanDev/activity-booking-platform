import { PrismaService } from '../config/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        name: string | null;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        role: import("../../generated/prisma/enums").Role;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string | null;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        role: import("../../generated/prisma/enums").Role;
    }>;
    create(data: any): Promise<{
        id: string;
        name: string | null;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        role: import("../../generated/prisma/enums").Role;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        name: string | null;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        role: import("../../generated/prisma/enums").Role;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string | null;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        role: import("../../generated/prisma/enums").Role;
    }>;
}
