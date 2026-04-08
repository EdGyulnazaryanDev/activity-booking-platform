import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private connectedClients;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinRoom(data: {
        room: string;
        userId?: string;
    }, client: Socket): void;
    handleLeaveRoom(data: {
        room: string;
    }, client: Socket): void;
    handleBookingUpdate(data: {
        bookingId: string;
        status: string;
    }, client: Socket): void;
    handleActivityUpdate(data: {
        activityId: string;
        update: any;
    }, client: Socket): void;
    handleNotification(data: {
        userId: string;
        notification: any;
    }, client: Socket): void;
    broadcastBookingUpdate(bookingId: string, status: string): void;
    broadcastActivityUpdate(activityId: string, update: any): void;
    sendNotificationToUser(userId: string, notification: any): void;
    getConnectedClientsCount(): number;
    broadcastSystemMessage(message: string): void;
}
