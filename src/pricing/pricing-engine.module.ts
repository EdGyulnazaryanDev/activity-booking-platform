import { Module } from '@nestjs/common';
import { PricingEngineService } from './pricing-engine.service';
import { PrismaModule } from '../config/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PricingEngineService],
  exports: [PricingEngineService],
})
export class PricingEngineModule {}
