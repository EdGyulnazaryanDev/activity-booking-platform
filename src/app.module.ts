import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './config/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ActivitiesModule } from './activities/activities.module';
import { ResourcesModule } from './resources/resources.module';
import { BookingsModule } from './bookings/bookings.module';
import { NotificationsModule } from './notifications/notifications.module';
import { WebsocketModule } from './websocket/websocket.module';
import { StaffModule } from './staff/staff.module';
import { AdminModule } from './admin/admin.module';
import { PricingModule } from './pricing/pricing.module';

import { RedisModule } from './common/redis/redis.module';
import { WalletModule } from './wallet/wallet.module';
import { ReportsModule } from './reports/reports.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    RedisModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    ActivitiesModule,
    ResourcesModule,
    BookingsModule,
    NotificationsModule,
    WebsocketModule,
    StaffModule,
    AdminModule,
    PricingModule,
    WalletModule,
    ReportsModule,
    PaymentsModule,
  ],
})
export class AppModule {}
