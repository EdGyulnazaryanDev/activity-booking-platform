import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { CreatePricingDto, UpdatePricingDto } from './dto/pricing.dto';

@Injectable()
export class PricingService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePricingDto) {
    return this.prisma.pricingRule.create({ data: dto });
  }

  async findAll(resourceId?: string) {
    return this.prisma.pricingRule.findMany({
      where: { ...(resourceId ? { resourceId } : {}), isActive: true },
      include: { resource: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const rule = await this.prisma.pricingRule.findUnique({
      where: { id },
      include: { resource: true },
    });
    if (!rule) throw new NotFoundException('Pricing rule not found');
    return rule;
  }

  async update(id: string, dto: UpdatePricingDto) {
    return this.prisma.pricingRule.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return this.prisma.pricingRule.delete({ where: { id } });
  }

  /** Calculate total price for a booking based on resource pricing rules */
  async calculatePrice(resourceId: string, startTime: Date, endTime: Date): Promise<number> {
    const rules = await this.prisma.pricingRule.findMany({
      where: { resourceId, isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    if (rules.length === 0) {
      throw new NotFoundException(`No pricing rules configured for this resource`);
    }

    const durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    const bookingHour = `${String(startTime.getHours()).padStart(2, '0')}:${String(startTime.getMinutes()).padStart(2, '0')}`;

    // Find matching rule — exact window first, then fall back to last rule
    const matchingRule =
      rules.find(r => bookingHour >= r.startTime && bookingHour < r.endTime) ??
      rules[rules.length - 1];

    return parseFloat((matchingRule.hourlyRate * durationHours).toFixed(2));
  }
}
