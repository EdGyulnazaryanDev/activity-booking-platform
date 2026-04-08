import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3050',
    credentials: true,
  },
})
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients = new Map<string, Socket>();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.connectedClients.set(client.id, client);
    
    client.emit('connected', {
      message: 'Connected to Activity Booking Platform',
      clientId: client.id,
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(@MessageBody() data: { room: string; userId?: string }, @ConnectedSocket() client: Socket) {
    client.join(data.room);
    
    if (data.userId) {
      client.data.userId = data.userId;
    }
    
    client.emit('joined-room', { room: data.room });
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(@MessageBody() data: { room: string }, @ConnectedSocket() client: Socket) {
    client.leave(data.room);
    client.emit('left-room', { room: data.room });
  }

  @SubscribeMessage('booking-update')
  handleBookingUpdate(@MessageBody() data: { bookingId: string; status: string }, @ConnectedSocket() client: Socket) {
    this.server.emit('booking-updated', {
      bookingId: data.bookingId,
      status: data.status,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('activity-update')
  handleActivityUpdate(@MessageBody() data: { activityId: string; update: any }, @ConnectedSocket() client: Socket) {
    this.server.emit('activity-updated', {
      activityId: data.activityId,
      update: data.update,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('notification')
  handleNotification(@MessageBody() data: { userId: string; notification: any }, @ConnectedSocket() client: Socket) {
    // Send to specific user
    this.server.to(`user-${data.userId}`).emit('new-notification', {
      ...data.notification,
      timestamp: new Date(),
    });
  }

  // Helper methods for other services to use
  broadcastBookingUpdate(bookingId: string, status: string) {
    this.server.emit('booking-updated', {
      bookingId,
      status,
      timestamp: new Date(),
    });
  }

  broadcastActivityUpdate(activityId: string, update: any) {
    this.server.emit('activity-updated', {
      activityId,
      update,
      timestamp: new Date(),
    });
  }

  sendNotificationToUser(userId: string, notification: any) {
    this.server.to(`user-${userId}`).emit('new-notification', {
      ...notification,
      timestamp: new Date(),
    });
  }

  getConnectedClientsCount(): number {
    return this.connectedClients.size;
  }

  broadcastSystemMessage(message: string) {
    this.server.emit('system-message', {
      message,
      timestamp: new Date(),
    });
  }
}
