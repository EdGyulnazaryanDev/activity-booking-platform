import { NotificationType } from '../../../generated/prisma/client';
export declare class CreateNotificationDto {
    userId: string;
    title: string;
    message: string;
    type?: NotificationType;
    isRead?: boolean;
}
export declare class UpdateNotificationDto {
    title?: string;
    message?: string;
    type?: NotificationType;
    isRead?: boolean;
}
