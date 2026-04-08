import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('bookings')
@Controller('bookings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a booking' })
  create(@Body() dto: CreateBookingDto, @CurrentUser() user: CurrentUserPayload) {
    return this.bookingsService.createBooking({ ...dto, userId: user.id });
  }

  @Get('lobby')
  @ApiOperation({ summary: 'Partner lobby — approved bookings open for partners' })
  getLobby() {
    return this.bookingsService.getLobby();
  }

  @Get()
  @ApiOperation({ summary: 'Get my bookings' })
  findAll(@CurrentUser() user: CurrentUserPayload) {
    return this.bookingsService.findByUser(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking by ID' })
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update booking' })
  @ApiParam({ name: 'id' })
  update(@Param('id') id: string, @Body() dto: UpdateBookingDto) {
    return this.bookingsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancel booking' })
  @ApiParam({ name: 'id' })
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }
}
