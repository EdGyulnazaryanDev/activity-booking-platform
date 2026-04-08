import { NotificationsService } from './notifications.service';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(user: CurrentUserPayload): Promise<{
        id: string;
        createdAt: Date;
        type: import("../../generated/prisma/enums").NotificationType;
        userId: string;
        title: string;
        message: string;
        isRead: boolean;
    }[]>;
    findUnread(user: CurrentUserPayload): Promise<{
        id: string;
        createdAt: Date;
        type: import("../../generated/prisma/enums").NotificationType;
        userId: string;
        title: string;
        message: string;
        isRead: boolean;
    }[]>;
    getUnreadCount(user: CurrentUserPayload): Promise<number>;
    markAsRead(id: string): Promise<{
        id: string;
        createdAt: Date;
        type: import("../../generated/prisma/enums").NotificationType;
        userId: string;
        title: string;
        message: string;
        isRead: boolean;
    }>;
    markAllAsRead(user: CurrentUserPayload): Promise<import("../../generated/prisma/internal/prismaNamespace").BatchPayload>;
}
