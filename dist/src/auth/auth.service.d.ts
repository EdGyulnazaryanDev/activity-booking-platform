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
        email: string;
        name: string | null;
        password: string;
        role: import("../../generated/prisma/enums").Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("../../generated/prisma/enums").Role;
        createdAt: Date;
    }>;
    updateProfile(userId: string, updateDto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("../../generated/prisma/enums").Role;
        createdAt: Date;
    }>;
    private generateToken;
    refreshToken(userId: string): Promise<string>;
}
