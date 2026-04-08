import { PrismaService } from '../config/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        email: string;
        name: string | null;
        password: string;
        role: import("../../generated/prisma/enums").Role;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        password: string;
        role: import("../../generated/prisma/enums").Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(data: any): Promise<{
        id: string;
        email: string;
        name: string | null;
        password: string;
        role: import("../../generated/prisma/enums").Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        email: string;
        name: string | null;
        password: string;
        role: import("../../generated/prisma/enums").Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        password: string;
        role: import("../../generated/prisma/enums").Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
