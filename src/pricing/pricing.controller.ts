import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingEngineService } from './pricing-engine.service';
import { CreatePricingDto, UpdatePricingDto } from './dto/pricing.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('pricing')
@Controller('pricing')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PricingController {
  constructor(
    private readonly pricingService: PricingService,
    private readonly pricingEngine: PricingEngineService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create pricing rule' })
  create(@Body() dto: CreatePricingDto) {
    return this.pricingService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all pricing rules' })
  @ApiQuery({ name: 'resourceId', required: false })
  findAll(@Query('resourceId') resourceId?: string) {
    return this.pricingService.findAll(resourceId);
  }

  @Get('calculate/:resourceId')
  @ApiOperation({ summary: 'Calculate price using 15-min slice engine with priority rules' })
  @ApiParam({ name: 'resourceId' })
  @ApiQuery({ name: 'startTime', required: true })
  @ApiQuery({ name: 'endTime', required: true })
  @ApiQuery({ name: 'breakdown', required: false, description: 'Return per-slice breakdown' })
  async calculatePrice(
    @Param('resourceId') resourceId: string,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
    @Query('breakdown') breakdown?: string,
  ) {
    if (breakdown === 'true') {
      return this.pricingEngine.getPriceBreakdown(resourceId, new Date(startTime), new Date(endTime));
    }
    const total = await this.pricingEngine.calculatePrice(resourceId, new Date(startTime), new Date(endTime));
    return { total };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get pricing rule by ID' })
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string) {
    return this.pricingService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update pricing rule' })
  @ApiParam({ name: 'id' })
  update(@Param('id') id: string, @Body() dto: UpdatePricingDto) {
    return this.pricingService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete pricing rule' })
  @ApiParam({ name: 'id' })
  remove(@Param('id') id: string) {
    return this.pricingService.remove(id);
  }
}
