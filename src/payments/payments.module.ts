import { Module } from '@nestjs/common';
import { IdramController } from './idram.controller';
import { IdramService } from './idram.service';
import { WalletModule } from '../wallet/wallet.module';
import { PrismaModule } from '../config/prisma.module';

@Module({
  imports: [PrismaModule, WalletModule],
  controllers: [IdramController],
  providers: [IdramService],
  exports: [IdramService],
})
export class PaymentsModule {}