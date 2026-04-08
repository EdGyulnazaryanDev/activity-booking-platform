"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let WebsocketGateway = class WebsocketGateway {
    constructor() {
        this.connectedClients = new Map();
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
        this.connectedClients.set(client.id, client);
        client.emit('connected', {
            message: 'Connected to Activity Booking Platform',
            clientId: client.id,
        });
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
        this.connectedClients.delete(client.id);
    }
    handleJoinRoom(data, client) {
        client.join(data.room);
        if (data.userId) {
            client.data.userId = data.userId;
        }
        client.emit('joined-room', { room: data.room });
    }
    handleLeaveRoom(data, client) {
        client.leave(data.room);
        client.emit('left-room', { room: data.room });
    }
    handleBookingUpdate(data, client) {
        this.server.emit('booking-updated', {
            bookingId: data.bookingId,
            status: data.status,
            timestamp: new Date(),
        });
    }
    handleActivityUpdate(data, client) {
        this.server.emit('activity-updated', {
            activityId: data.activityId,
            update: data.update,
            timestamp: new Date(),
        });
    }
    handleNotification(data, client) {
        this.server.to(`user-${data.userId}`).emit('new-notification', {
            ...data.notification,
            timestamp: new Date(),
        });
    }
    broadcastBookingUpdate(bookingId, status) {
        this.server.emit('booking-updated', {
            bookingId,
            status,
            timestamp: new Date(),
        });
    }
    broadcastActivityUpdate(activityId, update) {
        this.server.emit('activity-updated', {
            activityId,
            update,
            timestamp: new Date(),
        });
    }
    sendNotificationToUser(userId, notification) {
        this.server.to(`user-${userId}`).emit('new-notification', {
            ...notification,
            timestamp: new Date(),
        });
    }
    getConnectedClientsCount() {
        return this.connectedClients.size;
    }
    broadcastSystemMessage(message) {
        this.server.emit('system-message', {
            message,
            timestamp: new Date(),
        });
    }
};
exports.WebsocketGateway = WebsocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebsocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-room'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave-room'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handleLeaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('booking-update'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handleBookingUpdate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('activity-update'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handleActivityUpdate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('notification'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handleNotification", null);
exports.WebsocketGateway = WebsocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:3050',
            credentials: true,
        },
    })
], WebsocketGateway);
//# sourceMappingURL=websocket.gateway.js.map