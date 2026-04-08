import { PrismaService } from '../config/prisma.service';
import { NtfyProvider } from './providers/ntfy.provider';
import { NotificationType } from '../../generated/prisma/enums';
export declare class NotificationsService {
    private prisma;
    private ntfy;
    constructor(prisma: PrismaService, ntfy: NtfyProvider);
    findByUser(userId: string): Promise<{
        type: NotificationType;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        isRead: boolean;
    }[]>;
    findUnreadByUser(userId: string): Promise<{
        type: NotificationType;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        isRead: boolean;
    }[]>;
    getUnreadCount(userId: string): Promise<number>;
    markAsRead(id: string): Promise<{
        type: NotificationType;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        isRead: boolean;
    }>;
    markAllAsRead(userId: string): Promise<import("../../generated/prisma/internal/prismaNamespace").BatchPayload>;
    private save;
    onBookingCreated(bookingId: string, _userId: string, resourceName: string, userName: string, adminId: string): Promise<void>;
    onBookingApproved(bookingId: string, userId: string, resourceName: string, staffName?: string): Promise<void>;
    onBookingRejected(bookingId: string, userId: string, resourceName: string): Promise<void>;
    onStaffReassigned(bookingId: string, adminId: string, staffName: string): Promise<void>;
}
