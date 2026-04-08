import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { BookingsService } from '../bookings/bookings.service';
import { ApproveBookingDto } from '../bookings/dto/booking.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';

@ApiTags('admin')
@Controller('admin/bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles('ADMIN')
export class AdminBookingsController {
  constructor(
    private readonly adminService: AdminService,
    private readonly bookingsService: BookingsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'status', required: false, enum: ['PENDING', 'APPROVED', 'REJECTED', 'PAID'] })
  @ApiQuery({ name: 'userId', required: false })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
    @Query('userId') userId?: string,
  ) {
    return this.bookingsService.findAll(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
      userId,
      status,
    );
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get all PENDING bookings' })
  getPending(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.bookingsService.findAll(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
      undefined,
      'PENDING',
    );
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Admin dashboard stats' })
  getDashboard(@CurrentUser() user: CurrentUserPayload) {
    return this.adminService.getDashboardStats(user.id);
  }

  @Get('staff')
  @ApiOperation({ summary: 'Get all active staff members' })
  getStaff(@CurrentUser() user: CurrentUserPayload) {
    return this.adminService.getStaff(user.id);
  }

  @Post(':id/approve')
  @ApiOperation({ summary: 'Approve a booking (optionally assign staff)' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: ApproveBookingDto })
  approveBooking(
    @Param('id') id: string,
    @Body() dto: ApproveBookingDto,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.adminService.approveBooking(id, user.id, dto.staffId);
  }

  @Post(':id/reject')
  @ApiOperation({ summary: 'Reject a booking' })
  @ApiParam({ name: 'id' })
  rejectBooking(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    return this.adminService.rejectBooking(id, user.id);
  }

  @Post(':id/paid')
  @ApiOperation({ summary: 'Mark a booking as PAID' })
  @ApiParam({ name: 'id' })
  markAsPaid(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    return this.adminService.markAsPaid(id, user.id);
  }
}
