import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { PricingEngineService } from './pricing-engine.service';
import { PrismaModule } from '../config/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PricingController],
  providers: [PricingService, PricingEngineService],
  exports: [PricingService, PricingEngineService],
})
export class PricingModule {}
