import { PrismaService } from '../config/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(data: any): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: any): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
