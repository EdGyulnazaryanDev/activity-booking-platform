import { NotificationsService } from './notifications.service';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(user: CurrentUserPayload): Promise<{
        type: import("../../generated/prisma/enums").NotificationType;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        isRead: boolean;
    }[]>;
    findUnread(user: CurrentUserPayload): Promise<{
        type: import("../../generated/prisma/enums").NotificationType;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        isRead: boolean;
    }[]>;
    getUnreadCount(user: CurrentUserPayload): Promise<number>;
    markAsRead(id: string): Promise<{
        type: import("../../generated/prisma/enums").NotificationType;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        isRead: boolean;
    }>;
    markAllAsRead(user: CurrentUserPayload): Promise<import("../../generated/prisma/internal/prismaNamespace").BatchPayload>;
}
