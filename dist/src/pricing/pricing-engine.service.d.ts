import { PrismaService } from '../config/prisma.service';
export declare class PricingEngineService {
    private prisma;
    constructor(prisma: PrismaService);
    calculatePrice(resourceId: string, startTime: Date, endTime: Date): Promise<number>;
    private generateSlices;
    private findBestRule;
    getPriceBreakdown(resourceId: string, startTime: Date, endTime: Date): Promise<{
        breakdown: {
            time: string;
            rule: string;
            priority: string;
            rate: number;
            cost: number;
        }[];
        total: number;
    }>;
}
