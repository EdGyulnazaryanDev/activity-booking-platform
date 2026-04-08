import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class TopUpDto {
  @ApiProperty({ example: 5000 })
  @IsNumber() @Min(1)
  amount: number;

  @ApiPropertyOptional({ example: 'IDram top-up' })
  @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'IDRAM-REF-12345' })
  @IsOptional() @IsString()
  externalRef?: string;
}

class PayBookingDto {
  @ApiProperty({ example: 'booking-id' })
  @IsString()
  bookingId: string;
}

@ApiTags('wallet')
@Controller('wallet')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  @ApiOperation({ summary: 'Get my wallet balance and recent transactions' })
  getWallet(@CurrentUser() user: CurrentUserPayload) {
    return this.walletService.getOrCreate(user.id);
  }

  @Get('transactions')
  @ApiOperation({ summary: 'Get transaction history' })
  getTransactions(
    @CurrentUser() user: CurrentUserPayload,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.walletService.getTransactions(user.id, Number(page) || 1, Number(limit) || 20);
  }

  @Post('topup')
  @ApiOperation({ summary: 'Top up wallet (admin confirms or payment webhook)' })
  topUp(@CurrentUser() user: CurrentUserPayload, @Body() dto: TopUpDto) {
    return this.walletService.topUp(user.id, dto.amount, dto.description, dto.externalRef);
  }

  @Post('pay')
  @ApiOperation({ summary: 'Pay for a booking from wallet' })
  payBooking(@CurrentUser() user: CurrentUserPayload, @Body() dto: PayBookingDto) {
    return this.walletService.payBooking(user.id, dto.bookingId);
  }
}
