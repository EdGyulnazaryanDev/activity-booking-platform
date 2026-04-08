import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NtfyProvider } from './providers/ntfy.provider';
import { PrismaModule } from '../config/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, NtfyProvider],
  exports: [NotificationsService],
})
export class NotificationsModule {}
