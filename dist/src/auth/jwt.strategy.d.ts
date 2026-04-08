import { Strategy } from 'passport-jwt';
import { PrismaService } from '../config/prisma.service';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService, config: ConfigService);
    validate(payload: any): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("../../generated/prisma/enums").Role;
    }>;
}
export {};
