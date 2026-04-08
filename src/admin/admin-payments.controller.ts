import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PrismaService } from '../config/prisma.service';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin/payments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles('ADMIN')
export class AdminPaymentsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Get all paid bookings with payment info' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async getPayments(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const take = limit ? parseInt(limit) : 50;
    const skip = ((page ? parseInt(page) : 1) - 1) * take;

    const [items, total] = await Promise.all([
      this.prisma.booking.findMany({
        where: { status: 'PAID' },
        skip,
        take,
        include: {
          user: { select: { id: true, name: true, email: true } },
          resource: { select: { id: true, name: true, type: true } },
        },
        orderBy: { paidAt: 'desc' },
      }),
      this.prisma.booking.count({ where: { status: 'PAID' } }),
    ]);

    const totalRevenue = await this.prisma.booking.aggregate({
      where: { status: 'PAID' },
      _sum: { totalPrice: true },
    });

    return {
      items,
      total,
      totalRevenue: totalRevenue._sum.totalPrice ?? 0,
    };
  }
}
