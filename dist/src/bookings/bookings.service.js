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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../config/prisma.service");
const pricing_engine_service_1 = require("../pricing/pricing-engine.service");
const notifications_service_1 = require("../notifications/notifications.service");
const soft_hold_service_1 = require("./soft-hold.service");
let BookingsService = class BookingsService {
    constructor(prisma, pricingEngine, notificationsService, softHold) {
        this.prisma = prisma;
        this.pricingEngine = pricingEngine;
        this.notificationsService = notificationsService;
        this.softHold = softHold;
    }
    async findAll(page = 1, limit = 10, userId, status) {
        const skip = (page - 1) * limit;
        const where = {};
        if (userId)
            where.userId = userId;
        if (status)
            where.status = status;
        const [items, total] = await Promise.all([
            this.prisma.booking.findMany({
                where, skip, take: limit,
                include: {
                    user: { select: { id: true, email: true, name: true } },
                    resource: true,
                    staff: { select: { id: true, name: true, specialty: true } },
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.booking.count({ where }),
        ]);
        return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, email: true, name: true } },
                resource: { include: { pricingRules: true } },
                staff: { select: { id: true, name: true, specialty: true } },
            },
        });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        return booking;
    }
    async findByUser(userId) {
        return this.prisma.booking.findMany({
            where: { userId },
            include: {
                resource: true,
                staff: { select: { id: true, name: true, specialty: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findByStatus(status) {
        return this.prisma.booking.findMany({
            where: { status: status },
            include: {
                user: { select: { id: true, email: true, name: true } },
                resource: true,
                staff: { select: { id: true, name: true } },
            },
        });
    }
    async getUpcomingBookings() {
        return this.prisma.booking.findMany({
            where: {
                startTime: { gte: new Date() },
                status: { in: ['PENDING', 'APPROVED'] },
            },
            include: {
                user: { select: { id: true, email: true, name: true } },
                resource: true,
            },
            orderBy: { startTime: 'asc' },
        });
    }
    async getLobby() {
        const bookings = await this.prisma.booking.findMany({
            where: { status: 'APPROVED', isOpenForPartners: true, startTime: { gte: new Date() } },
            include: { user: { select: { id: true, name: true } }, resource: true },
            orderBy: { startTime: 'asc' },
        });
        const lobby = await Promise.all(bookings.map(async (b) => {
            const booked = await this.getBookedQuantity(b.resourceId, b.startTime, b.endTime, b.id);
            return { ...b, availableSlots: b.resource.totalCapacity - booked };
        }));
        return lobby.filter(b => b.availableSlots > 0);
    }
    async createBooking(dto) {
        const start = new Date(dto.startTime);
        const end = new Date(dto.endTime);
        const quantity = dto.quantity ?? 1;
        if (start >= end)
            throw new common_1.BadRequestException('endTime must be after startTime');
        const resource = await this.prisma.resource.findUnique({ where: { id: dto.resourceId } });
        if (!resource)
            throw new common_1.NotFoundException('Resource not found');
        if (!resource.isActive)
            throw new common_1.ConflictException('Resource is not currently active');
        const isPool = resource.capacityType === 'POOL';
        if (!isPool && quantity !== 1) {
            throw new common_1.BadRequestException(`${resource.name} is a UNIT resource — quantity must be 1`);
        }
        const holdKey = await this.softHold.acquire(dto.resourceId, start, end, dto.userId);
        try {
            const totalPrice = await this.pricingEngine.calculatePrice(dto.resourceId, start, end);
            const booking = await this.prisma.$transaction(async (tx) => {
                const overlapping = await tx.booking.findMany({
                    where: {
                        resourceId: dto.resourceId,
                        status: { in: ['PENDING', 'APPROVED'] },
                        startTime: { lt: end },
                        endTime: { gt: start },
                    },
                    select: { quantity: true, isOpenForPartners: true, userId: true, id: true },
                });
                const bookedQty = overlapping.reduce((s, b) => s + b.quantity, 0);
                const partnerBooking = !isPool
                    ? overlapping.find(b => b.isOpenForPartners && b.userId !== dto.userId) ?? null
                    : null;
                const isPartnerJoin = !!partnerBooking;
                if (!isPartnerJoin) {
                    if (!isPool && bookedQty > 0) {
                        throw new common_1.ConflictException(`${resource.name} is already booked for this slot`);
                    }
                    if (isPool && bookedQty + quantity > resource.totalCapacity) {
                        throw new common_1.ConflictException(`Not enough capacity. Requested: ${quantity}, Available: ${resource.totalCapacity - bookedQty}`);
                    }
                }
                return tx.booking.create({
                    data: {
                        userId: dto.userId,
                        resourceId: dto.resourceId,
                        startTime: start,
                        endTime: end,
                        quantity,
                        totalPrice,
                        notes: dto.notes,
                        isOpenForPartners: dto.isOpenForPartners ?? false,
                        partnerOfBookingId: partnerBooking?.id ?? null,
                        softHoldKey: holdKey,
                        status: 'PENDING',
                    },
                    include: {
                        user: { select: { id: true, email: true, name: true } },
                        resource: true,
                    },
                });
            }, { isolationLevel: 'Serializable', timeout: 10000 });
            const admins = await this.prisma.user.findMany({ where: { role: 'ADMIN' } });
            await Promise.all(admins.map(admin => this.notificationsService.onBookingCreated(booking.id, dto.userId, resource.name, booking.user.name ?? booking.user.email, admin.id)));
            return booking;
        }
        catch (err) {
            await this.softHold.release(holdKey, dto.userId);
            throw err;
        }
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.booking.update({
            where: { id },
            data: {
                ...dto,
                startTime: dto.startTime ? new Date(dto.startTime) : undefined,
                endTime: dto.endTime ? new Date(dto.endTime) : undefined,
            },
            include: {
                user: { select: { id: true, email: true, name: true } },
                resource: true,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.booking.delete({ where: { id } });
    }
    async approveBooking(id, adminId, staffId) {
        const booking = await this.findOne(id);
        let staffName;
        if (staffId) {
            const staff = await this.prisma.staff.findUnique({ where: { id: staffId } });
            if (!staff)
                throw new common_1.NotFoundException('Staff member not found');
            if (!staff.isActive)
                throw new common_1.ConflictException('Staff member is not active');
            staffName = staff.name;
            if (staff.allowedResourceTypes.length > 0 && !staff.allowedResourceTypes.includes(booking.resource.type)) {
                throw new common_1.ConflictException(`${staffName} is not qualified for ${booking.resource.type} resources. ` +
                    `Allowed: ${staff.allowedResourceTypes.join(', ')}`);
            }
            const conflict = await this.prisma.booking.findFirst({
                where: {
                    staffId,
                    id: { not: id },
                    status: { in: ['APPROVED', 'PENDING'] },
                    startTime: { lt: booking.endTime },
                    endTime: { gt: booking.startTime },
                },
                include: { resource: true },
            });
            if (conflict) {
                throw new common_1.ConflictException(`${staffName} is already assigned to "${conflict.resource.name}" ` +
                    `${conflict.startTime.toISOString()} – ${conflict.endTime.toISOString()}`);
            }
        }
        const updated = await this.prisma.booking.update({
            where: { id },
            data: {
                status: 'APPROVED',
                approvedBy: adminId,
                approvedAt: new Date(),
                ...(staffId ? { staffId } : {}),
            },
            include: {
                user: { select: { id: true, email: true, name: true } },
                resource: true,
                staff: { select: { id: true, name: true } },
            },
        });
        await this.notificationsService.onBookingApproved(id, booking.userId, booking.resource.name, staffName);
        if (staffId && staffName) {
            await this.notificationsService.onStaffReassigned(id, adminId, staffName);
        }
        return updated;
    }
    async rejectBooking(id, adminId) {
        const booking = await this.findOne(id);
        const updated = await this.prisma.booking.update({
            where: { id },
            data: { status: 'REJECTED', approvedBy: adminId, approvedAt: new Date() },
            include: {
                user: { select: { id: true, email: true, name: true } },
                resource: true,
            },
        });
        await this.notificationsService.onBookingRejected(id, booking.userId, booking.resource.name);
        return updated;
    }
    async markAsPaid(id) {
        await this.findOne(id);
        return this.prisma.booking.update({
            where: { id },
            data: { status: 'PAID' },
            include: { resource: true },
        });
    }
    async getBookedQuantity(resourceId, startTime, endTime, excludeBookingId) {
        const where = {
            resourceId,
            status: { in: ['PENDING', 'APPROVED'] },
            startTime: { lt: endTime },
            endTime: { gt: startTime },
        };
        if (excludeBookingId)
            where.id = { not: excludeBookingId };
        const rows = await this.prisma.booking.findMany({ where, select: { quantity: true } });
        return rows.reduce((s, b) => s + b.quantity, 0);
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pricing_engine_service_1.PricingEngineService,
        notifications_service_1.NotificationsService,
        soft_hold_service_1.SoftHoldService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map