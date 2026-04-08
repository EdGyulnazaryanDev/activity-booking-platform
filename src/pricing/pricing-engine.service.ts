import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';

const SLICE_MINUTES = 15;
const PRIORITY_ORDER = { WEEKDAY: 1, WEEKEND: 2, HOLIDAY: 3 };

/**
 * Calculates booking price by slicing the duration into 15-minute intervals.
 * For each slice, finds the PricingRule with the highest priority that covers it.
 * This correctly handles overlapping rules (Holiday > Weekend > Weekday).
 */
@Injectable()
export class PricingEngineService {
  constructor(private prisma: PrismaService) {}

  async calculatePrice(resourceId: string, startTime: Date, endTime: Date): Promise<number> {
    const rules = await this.prisma.pricingRule.findMany({
      where: { resourceId, isActive: true },
    });

    if (rules.length === 0) {
      throw new NotFoundException(`No active pricing rules for resource ${resourceId}`);
    }

    const slices = this.generateSlices(startTime, endTime);
    let totalPrice = 0;

    for (const slice of slices) {
      const rule = this.findBestRule(rules, slice);
      if (!rule) {
        throw new NotFoundException(
          `No pricing rule covers ${slice.toISOString().slice(11, 16)} on ${slice.toISOString().slice(0, 10)}`,
        );
      }
      // Each slice is 15 min = 0.25 hours
      totalPrice += rule.hourlyRate * (SLICE_MINUTES / 60);
    }

    return parseFloat(totalPrice.toFixed(2));
  }

  /**
   * Generate array of Date objects, one per 15-minute slice start.
   */
  private generateSlices(start: Date, end: Date): Date[] {
    const slices: Date[] = [];
    const current = new Date(start);
    while (current < end) {
      slices.push(new Date(current));
      current.setMinutes(current.getMinutes() + SLICE_MINUTES);
    }
    return slices;
  }

  /**
   * Find the highest-priority rule that covers this slice.
   * Rule matches if:
   *   1. daysOfWeek is empty OR includes the slice's day of week
   *   2. slice time falls within [startTime, endTime)
   */
  private findBestRule(rules: any[], slice: Date): any | null {
    const sliceHHMM = `${String(slice.getUTCHours()).padStart(2, '0')}:${String(slice.getUTCMinutes()).padStart(2, '0')}`;
    const sliceDow = slice.getUTCDay(); // 0=Sun … 6=Sat

    const matching = rules.filter(r => {
      const dayMatch = r.daysOfWeek.length === 0 || r.daysOfWeek.includes(sliceDow);
      const timeMatch = sliceHHMM >= r.startTime && sliceHHMM < r.endTime;
      return dayMatch && timeMatch;
    });

    if (matching.length === 0) return null;

    // Return highest priority rule
    return matching.sort(
      (a, b) => (PRIORITY_ORDER[b.priority as keyof typeof PRIORITY_ORDER] ?? 0)
               - (PRIORITY_ORDER[a.priority as keyof typeof PRIORITY_ORDER] ?? 0),
    )[0];
  }

  /**
   * Preview: return a breakdown of slices with their matched rules.
   * Useful for showing users a price breakdown.
   */
  async getPriceBreakdown(resourceId: string, startTime: Date, endTime: Date) {
    const rules = await this.prisma.pricingRule.findMany({
      where: { resourceId, isActive: true },
    });

    const slices = this.generateSlices(startTime, endTime);
    const breakdown: { time: string; rule: string; priority: string; rate: number; cost: number }[] = [];

    for (const slice of slices) {
      const rule = this.findBestRule(rules, slice);
      if (rule) {
        const cost = rule.hourlyRate * (SLICE_MINUTES / 60);
        breakdown.push({
          time: slice.toISOString().slice(11, 16),
          rule: rule.label ?? rule.id,
          priority: rule.priority,
          rate: rule.hourlyRate,
          cost: parseFloat(cost.toFixed(2)),
        });
      }
    }

    const total = breakdown.reduce((s, b) => s + b.cost, 0);
    return { breakdown, total: parseFloat(total.toFixed(2)) };
  }
}
