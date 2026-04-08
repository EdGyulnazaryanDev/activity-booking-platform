import { NotificationsService } from './notifications.service';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(user: CurrentUserPayload): Promise<{
        id: string;
        userId: string;
        title: string;
        message: string;
        type: import("../../generated/prisma/enums").NotificationType;
        isRead: boolean;
        createdAt: Date;
    }[]>;
    findUnread(user: CurrentUserPayload): Promise<{
        id: string;
        userId: string;
        title: string;
        message: string;
        type: import("../../generated/prisma/enums").NotificationType;
        isRead: boolean;
        createdAt: Date;
    }[]>;
    getUnreadCount(user: CurrentUserPayload): Promise<number>;
    markAsRead(id: string): Promise<{
        id: string;
        userId: string;
        title: string;
        message: string;
        type: import("../../generated/prisma/enums").NotificationType;
        isRead: boolean;
        createdAt: Date;
    }>;
    markAllAsRead(user: CurrentUserPayload): Promise<import("../../generated/prisma/internal/prismaNamespace").BatchPayload>;
}
