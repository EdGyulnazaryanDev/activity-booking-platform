import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { SoftHoldService } from './soft-hold.service';
import { PrismaModule } from '../config/prisma.module';
import { PricingEngineModule } from '../pricing/pricing-engine.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [PrismaModule, PricingEngineModule, NotificationsModule],
  controllers: [BookingsController],
  providers: [BookingsService, SoftHoldService],
  exports: [BookingsService],
})
export class BookingsModule {}
