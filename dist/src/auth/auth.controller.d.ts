import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, UpdateUserDto } from './dto/auth.dto';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    getProfile(user: CurrentUserPayload): Promise<{
        email: string;
        name: string;
        role: import("../../generated/prisma/enums").Role;
        id: string;
        createdAt: Date;
    }>;
    updateProfile(user: CurrentUserPayload, updateDto: UpdateUserDto): Promise<{
        email: string;
        name: string;
        role: import("../../generated/prisma/enums").Role;
        id: string;
        createdAt: Date;
    }>;
    refreshToken(user: CurrentUserPayload): Promise<string>;
}
