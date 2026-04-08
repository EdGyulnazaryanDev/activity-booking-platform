import { BookingStatus } from '../../../generated/prisma/enums';
export declare class CreateBookingDto {
    resourceId: string;
    startTime: string;
    endTime: string;
    quantity?: number;
    notes?: string;
    isOpenForPartners?: boolean;
}
export declare class UpdateBookingDto {
    startTime?: string;
    endTime?: string;
    status?: BookingStatus;
    quantity?: number;
    notes?: string;
}
export declare class ApproveBookingDto {
    staffId?: string;
}
