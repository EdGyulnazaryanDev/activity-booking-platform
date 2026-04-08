import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { PricingEngineService } from '../pricing/pricing-engine.service';
import { NotificationsService } from '../notifications/notifications.service';
import { SoftHoldService } from './soft-hold.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    private prisma: PrismaService,
    private pricingEngine: PricingEngineService,
    private notificationsService: NotificationsService,
    private softHold: SoftHoldService,
  ) {}

  // ── Queries ─────────────────────────────────────────────────────────────────

  async findAll(page = 1, limit = 10, userId?: string, status?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};
    if (userId) where.userId = userId;
    if (status) where.status = status;

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

  async findOne(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, email: true, name: true } },
        resource: { include: { pricingRules: true } },
        staff: { select: { id: true, name: true, specialty: true } },
      },
    });
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async findByUser(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        resource: true,
        staff: { select: { id: true, name: true, specialty: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByStatus(status: string) {
    return this.prisma.booking.findMany({
      where: { status: status as any },
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

  // ── Partner Lobby ───────────────────────────────────────────────────────────

  async getLobby() {
    const bookings = await this.prisma.booking.findMany({
      where: { status: 'APPROVED', isOpenForPartners: true, startTime: { gte: new Date() } },
      include: { user: { select: { id: true, name: true } }, resource: true },
      orderBy: { startTime: 'asc' },
    });

    const lobby = await Promise.all(
      bookings.map(async (b) => {
        const booked = await this.getBookedQuantity(b.resourceId, b.startTime, b.endTime, b.id);
        return { ...b, availableSlots: b.resource.totalCapacity - booked };
      }),
    );
    return lobby.filter(b => b.availableSlots > 0);
  }

  // ── Core: createBooking ─────────────────────────────────────────────────────
  // Uses: Soft-Hold (Redis) → 15-min slice pricing → Serializable $transaction

  async createBooking(dto: CreateBookingDto & { userId: string }) {
    const start = new Date(dto.startTime);
    const end   = new Date(dto.endTime);
    const quantity = dto.quantity ?? 1;

    if (start >= end) throw new BadRequestException('endTime must be after startTime');

    const resource = await this.prisma.resource.findUnique({ where: { id: dto.resourceId } });
    if (!resource) throw new NotFoundException('Resource not found');
    if (!resource.isActive) throw new ConflictException('Resource is not currently active');

    const isPool = resource.capacityType === 'POOL';
    if (!isPool && quantity !== 1) {
      throw new BadRequestException(`${resource.name} is a UNIT resource — quantity must be 1`);
    }

    // 1. Acquire distributed soft-hold (10 min TTL)
    const holdKey = await this.softHold.acquire(dto.resourceId, start, end, dto.userId);

    try {
      // 2. Calculate price via 15-min slice engine (Holiday > Weekend > Weekday)
      const totalPrice = await this.pricingEngine.calculatePrice(dto.resourceId, start, end);

      // 3. Atomic write — Serializable isolation prevents race conditions
      const booking = await this.prisma.$transaction(async (tx) => {
        // Re-verify inside transaction
        const overlapping = await tx.booking.findMany({
          where: {
            resourceId: dto.resourceId,
            status: { in: ['PENDING', 'APPROVED'] },
            startTime: { lt: end },
            endTime:   { gt: start },
          },
          select: { quantity: true, isOpenForPartners: true, userId: true, id: true },
        });

        const bookedQty = overlapping.reduce((s, b) => s + b.quantity, 0);

        // Partner join: UNIT resource with an open-for-partners booking
        const partnerBooking = !isPool
          ? overlapping.find(b => b.isOpenForPartners && b.userId !== dto.userId) ?? null
          : null;
        const isPartnerJoin = !!partnerBooking;

        if (!isPartnerJoin) {
          if (!isPool && bookedQty > 0) {
            throw new ConflictException(`${resource.name} is already booked for this slot`);
          }
          if (isPool && bookedQty + quantity > resource.totalCapacity) {
            throw new ConflictException(
              `Not enough capacity. Requested: ${quantity}, Available: ${resource.totalCapacity - bookedQty}`,
            );
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

      // 4. Notify admins — BookingCreated event
      const admins = await this.prisma.user.findMany({ where: { role: 'ADMIN' } });
      await Promise.all(
        admins.map(admin =>
          this.notificationsService.onBookingCreated(
            booking.id, dto.userId, resource.name,
            booking.user.name ?? booking.user.email, admin.id,
          ),
        ),
      );

      return booking;
    } catch (err) {
      await this.softHold.release(holdKey, dto.userId);
      throw err;
    }
  }

  async update(id: string, dto: UpdateBookingDto) {
    await this.findOne(id);
    return this.prisma.booking.update({
      where: { id },
      data: {
        ...dto,
        startTime: dto.startTime ? new Date(dto.startTime) : undefined,
        endTime:   dto.endTime   ? new Date(dto.endTime)   : undefined,
      },
      include: {
        user: { select: { id: true, email: true, name: true } },
        resource: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.booking.delete({ where: { id } });
  }

  // ── Admin actions ───────────────────────────────────────────────────────────

  async approveBooking(id: string, adminId: string, staffId?: string) {
    const booking = await this.findOne(id);

    let staffName: string | undefined;
    if (staffId) {
      const staff = await this.prisma.staff.findUnique({ where: { id: staffId } });
      if (!staff) throw new NotFoundException('Staff member not found');
      if (!staff.isActive) throw new ConflictException('Staff member is not active');
      staffName = staff.name;

      // Validate resource type compatibility
      if (staff.allowedResourceTypes.length > 0 && !staff.allowedResourceTypes.includes(booking.resource.type)) {
        throw new ConflictException(
          `${staffName} is not qualified for ${booking.resource.type} resources. ` +
          `Allowed: ${staff.allowedResourceTypes.join(', ')}`,
        );
      }

      // Check time conflict (exclude current booking for re-assignment)
      const conflict = await this.prisma.booking.findFirst({
        where: {
          staffId,
          id: { not: id },
          status: { in: ['APPROVED', 'PENDING'] },
          startTime: { lt: booking.endTime },
          endTime:   { gt: booking.startTime },
        },
        include: { resource: true },
      });

      if (conflict) {
        throw new ConflictException(
          `${staffName} is already assigned to "${conflict.resource.name}" ` +
          `${conflict.startTime.toISOString()} – ${conflict.endTime.toISOString()}`,
        );
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

    // StatusChanged event → notify user
    await this.notificationsService.onBookingApproved(id, booking.userId, booking.resource.name, staffName);
    if (staffId && staffName) {
      await this.notificationsService.onStaffReassigned(id, adminId, staffName);
    }

    return updated;
  }

  async rejectBooking(id: string, adminId: string) {
    const booking = await this.findOne(id);
    const updated = await this.prisma.booking.update({
      where: { id },
      data: { status: 'REJECTED', approvedBy: adminId, approvedAt: new Date() },
      include: {
        user: { select: { id: true, email: true, name: true } },
        resource: true,
      },
    });
    // StatusChanged event → notify user
    await this.notificationsService.onBookingRejected(id, booking.userId, booking.resource.name);
    return updated;
  }

  async markAsPaid(id: string) {
    await this.findOne(id);
    return this.prisma.booking.update({
      where: { id },
      data: { status: 'PAID' },
      include: { resource: true },
    });
  }

  // ── Private helpers ─────────────────────────────────────────────────────────

  private async getBookedQuantity(
    resourceId: string,
    startTime: Date,
    endTime: Date,
    excludeBookingId?: string,
  ): Promise<number> {
    const where: any = {
      resourceId,
      status: { in: ['PENDING', 'APPROVED'] },
      startTime: { lt: endTime },
      endTime:   { gt: startTime },
    };
    if (excludeBookingId) where.id = { not: excludeBookingId };
    const rows = await this.prisma.booking.findMany({ where, select: { quantity: true } });
    return rows.reduce((s, b) => s + b.quantity, 0);
  }
}
