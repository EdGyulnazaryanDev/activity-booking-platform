import { PrismaService } from '../config/prisma.service';
export declare class UsersController {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        role: import("../../generated/prisma/enums").Role;
    }[]>;
}
