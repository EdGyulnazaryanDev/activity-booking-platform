import { Module } from '@nestjs/common';
import { AdminBookingsController } from './admin-bookings.controller';
import { AdminPaymentsController } from './admin-payments.controller';
import { AdminService } from './admin.service';
import { BookingsModule } from '../bookings/bookings.module';
import { PrismaModule } from '../config/prisma.module';

@Module({
  imports: [BookingsModule, PrismaModule],
  controllers: [AdminBookingsController, AdminPaymentsController],
  providers: [AdminService],
})
export class AdminModule {}
