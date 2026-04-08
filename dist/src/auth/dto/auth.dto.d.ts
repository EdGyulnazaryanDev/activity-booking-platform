import { Role } from '../../../generated/prisma/client';
export declare class RegisterDto {
    email: string;
    password: string;
    name?: string;
    role?: Role;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class UpdateUserDto {
    name?: string;
    password?: string;
    role?: Role;
}
