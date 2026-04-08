export interface NtfyPayload {
    topic: string;
    title: string;
    message: string;
    priority?: 1 | 2 | 3 | 4 | 5;
    tags?: string[];
}
export declare class NtfyService {
    private readonly logger;
    private readonly baseUrl;
    private readonly adminTopic;
    private readonly userTopic;
    send(payload: NtfyPayload): Promise<void>;
    notifyAdminNewBooking(bookingId: string, resourceName: string, userName: string): Promise<void>;
    notifyUserApproved(bookingId: string, resourceName: string, userTopic: string): Promise<void>;
    notifyUserRejected(bookingId: string, resourceName: string, userTopic: string): Promise<void>;
    notifyAdminStaffReassigned(bookingId: string, staffName: string): Promise<void>;
    getUserTopic(userId: string): string;
    getAdminTopic(): string;
}
