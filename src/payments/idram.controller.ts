import {
  Controller, Post, Body, UseGuards, Res, HttpCode, Logger, NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { IdramService } from './idram.service';
import { PrismaService } from '../config/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class InitiateTopUpDto {
  @ApiProperty({ example: 5000, description: 'Amount in AMD' })
  @IsNumber() @Min(100)
  amount: number;
}

class InitiateBookingPaymentDto {
  @ApiProperty({ example: 'booking-id' })
  @IsString()
  bookingId: string;
}

@ApiTags('payments')
@Controller('payments/idram')
export class IdramController {
  private readonly logger = new Logger(IdramController.name);

  constructor(
    private readonly idramService: IdramService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('initiate/topup')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Initiate IDram wallet top-up — returns form fields to POST to IDram' })
  initiateTopUp(@Body() dto: InitiateTopUpDto, @CurrentUser() user: CurrentUserPayload) {
    const billNo = this.idramService.generateTopUpBillNo(user.id);
    return this.idramService.initiatePayment(user.id, dto.amount, billNo);
  }

  @Post('initiate/booking')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Initiate IDram booking payment' })
  async initiateBookingPayment(
    @Body() dto: InitiateBookingPaymentDto,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const booking = await this.prisma.booking.findUnique({ where: { id: dto.bookingId } });
    if (!booking) throw new NotFoundException('Booking not found');
    const billNo = this.idramService.generateBookingBillNo(user.id, dto.bookingId);
    return this.idramService.initiatePayment(user.id, booking.totalPrice, billNo);
  }

  /**
   * IDram server-to-server callback — must return plain text "OK"
   * This endpoint must be publicly accessible (no JWT guard)
   */
  @Post('callback')
  @HttpCode(200)
  @ApiOperation({ summary: 'IDram payment callback (server-to-server, no auth)' })
  async callback(@Body() body: Record<string, string>, @Res() res: Response) {
    this.logger.log(`IDram callback: ${JSON.stringify(body)}`);
    const result = await this.idramService.handleCallback(body);
    res.setHeader('Content-Type', 'text/plain');
    res.send(result);
  }
}
