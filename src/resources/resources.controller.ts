import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto, UpdateResourceDto } from './dto/resource.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResourceType } from '../../generated/prisma/enums';

@ApiTags('resources')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  @ApiOperation({ summary: 'Create resource' })
  create(@Body() dto: CreateResourceDto) {
    return this.resourcesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all resources' })
  @ApiQuery({ name: 'type', required: false, enum: ResourceType })
  findAll(@Query('type') type?: ResourceType) {
    if (type) return this.resourcesService.findByType(type);
    return this.resourcesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get resource by ID' })
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string) {
    return this.resourcesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update resource' })
  @ApiParam({ name: 'id' })
  update(@Param('id') id: string, @Body() dto: UpdateResourceDto) {
    return this.resourcesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deactivate resource' })
  @ApiParam({ name: 'id' })
  remove(@Param('id') id: string) {
    return this.resourcesService.remove(id);
  }
}
