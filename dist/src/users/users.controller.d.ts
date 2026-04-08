import { PrismaService } from '../config/prisma.service';
export declare class UsersController {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        email: string;
        name: string;
        role: import("../../generated/prisma/enums").Role;
        id: string;
        createdAt: Date;
    }[]>;
}
