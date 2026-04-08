import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { CreateResourceDto, UpdateResourceDto } from './dto/resource.dto';
import { ResourceType } from '../../generated/prisma/enums';

@Injectable()
export class ResourcesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.resource.findMany({
      where: { isActive: true },
      include: { pricingRules: true },
    });
  }

  async findOne(id: string) {
    const resource = await this.prisma.resource.findUnique({
      where: { id },
      include: { pricingRules: true },
    });
    if (!resource) throw new NotFoundException('Resource not found');
    return resource;
  }

  async create(data: CreateResourceDto) {
    return this.prisma.resource.create({ data });
  }

  async update(id: string, data: UpdateResourceDto) {
    return this.prisma.resource.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.resource.update({ where: { id }, data: { isActive: false } });
  }

  async findByType(type: ResourceType) {
    return this.prisma.resource.findMany({
      where: { type, isActive: true },
      include: { pricingRules: true },
    });
  }
}
