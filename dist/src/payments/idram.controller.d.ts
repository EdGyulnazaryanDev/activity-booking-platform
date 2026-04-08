import { Response } from 'express';
import { IdramService } from './idram.service';
import { PrismaService } from '../config/prisma.service';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
declare class InitiateTopUpDto {
    amount: number;
}
declare class InitiateBookingPaymentDto {
    bookingId: string;
}
export declare class IdramController {
    private readonly idramService;
    private readonly prisma;
    private readonly logger;
    constructor(idramService: IdramService, prisma: PrismaService);
    initiateTopUp(dto: InitiateTopUpDto, user: CurrentUserPayload): {
        paymentUrl: string;
        fields: {
            EDP_LANGUAGE: string;
            EDP_REC_ACCOUNT: string;
            EDP_DESCRIPTION: string;
            EDP_AMOUNT: string;
            EDP_BILL_NO: string;
            EDP_SUCCESS_URL: string;
            EDP_FAIL_URL: string;
        };
    };
    initiateBookingPayment(dto: InitiateBookingPaymentDto, user: CurrentUserPayload): Promise<{
        paymentUrl: string;
        fields: {
            EDP_LANGUAGE: string;
            EDP_REC_ACCOUNT: string;
            EDP_DESCRIPTION: string;
            EDP_AMOUNT: string;
            EDP_BILL_NO: string;
            EDP_SUCCESS_URL: string;
            EDP_FAIL_URL: string;
        };
    }>;
    callback(body: Record<string, string>, res: Response): Promise<void>;
}
export {};
