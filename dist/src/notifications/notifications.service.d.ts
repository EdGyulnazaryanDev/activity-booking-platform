import { PrismaService } from '../config/prisma.service';
import { NtfyProvider } from './providers/ntfy.provider';
import { NotificationType } from '../../generated/prisma/enums';
export declare class NotificationsService {
    private prisma;
    private ntfy;
    constructor(prisma: PrismaService, ntfy: NtfyProvider);
    findByUser(userId: string): Promise<{
        id: string;
        userId: string;
        title: string;
        message: string;
        type: NotificationType;
        isRead: boolean;
        createdAt: Date;
    }[]>;
    findUnreadByUser(userId: string): Promise<{
        id: string;
        userId: string;
        title: string;
        message: string;
        type: NotificationType;
        isRead: boolean;
        createdAt: Date;
    }[]>;
    getUnreadCount(userId: string): Promise<number>;
    markAsRead(id: string): Promise<{
        id: string;
        userId: string;
        title: string;
        message: string;
        type: NotificationType;
        isRead: boolean;
        createdAt: Date;
    }>;
    markAllAsRead(userId: string): Promise<import("../../generated/prisma/internal/prismaNamespace").BatchPayload>;
    private save;
    onBookingCreated(bookingId: string, _userId: string, resourceName: string, userName: string, adminId: string): Promise<void>;
    onBookingApproved(bookingId: string, userId: string, resourceName: string, staffName?: string): Promise<void>;
    onBookingRejected(bookingId: string, userId: string, resourceName: string): Promise<void>;
    onStaffReassigned(bookingId: string, adminId: string, staffName: string): Promise<void>;
}
