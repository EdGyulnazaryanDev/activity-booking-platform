import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../config/prisma.service';
import { RegisterDto, LoginDto, UpdateUserDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            role: import("../../generated/prisma/enums").Role;
        };
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            role: import("../../generated/prisma/enums").Role;
        };
        token: string;
    }>;
    validateUser(email: string, password: string): Promise<{
        id: string;
        name: string | null;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        role: import("../../generated/prisma/enums").Role;
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        role: import("../../generated/prisma/enums").Role;
    }>;
    updateProfile(userId: string, updateDto: UpdateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        role: import("../../generated/prisma/enums").Role;
    }>;
    private generateToken;
    refreshToken(userId: string): Promise<string>;
}
