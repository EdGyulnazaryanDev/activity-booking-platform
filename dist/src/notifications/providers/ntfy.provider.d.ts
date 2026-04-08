import { NotificationProvider, NotificationPayload } from './notification-provider.interface';
export declare class NtfyProvider extends NotificationProvider {
    private readonly logger;
    private readonly baseUrl;
    send(payload: NotificationPayload): Promise<void>;
}
