import { Controller, Get, Param, Query } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('activities')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all resources (activities)' })
  findAll() {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get resource by ID' })
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(id);
  }
}
