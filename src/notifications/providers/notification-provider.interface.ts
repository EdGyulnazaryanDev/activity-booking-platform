export interface NotificationPayload {
  topic: string;
  title: string;
  message: string;
  priority?: 1 | 2 | 3 | 4 | 5;
  tags?: string[];
}

export abstract class NotificationProvider {
  abstract send(payload: NotificationPayload): Promise<void>;
}
