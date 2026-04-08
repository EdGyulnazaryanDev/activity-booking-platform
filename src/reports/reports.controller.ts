import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('reports')
@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles('ADMIN')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('monthly')
  @ApiOperation({ summary: 'Monthly revenue report' })
  @ApiQuery({ name: 'year', required: false })
  @ApiQuery({ name: 'month', required: false })
  getMonthly(@Query('year') year?: string, @Query('month') month?: string) {
    const now = new Date();
    return this.reportsService.getMonthlyReport(
      year ? parseInt(year) : now.getUTCFullYear(),
      month ? parseInt(month) : now.getUTCMonth() + 1,
    );
  }

  @Get('yearly')
  @ApiOperation({ summary: 'Yearly overview (all 12 months)' })
  @ApiQuery({ name: 'year', required: false })
  getYearly(@Query('year') year?: string) {
    return this.reportsService.getYearlyOverview(year ? parseInt(year) : new Date().getUTCFullYear());
  }
}
