export declare class WebsocketService {
    constructor();
    getConnectedClientsCount(): number;
    broadcastMessage(event: string, data: any): void;
}
