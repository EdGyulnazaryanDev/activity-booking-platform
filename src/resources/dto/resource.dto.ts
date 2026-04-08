import { IsString, IsBoolean, IsOptional, IsInt, Min, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResourceType } from '../../../generated/prisma/enums';

export class CreateResourceDto {
  @ApiProperty({ example: 'Tennis Court A' })
  @IsString()
  name: string;

  @ApiProperty({ enum: ResourceType, example: 'COURT' })
  @IsEnum(ResourceType)
  type: ResourceType;

  @ApiProperty({ example: false, description: 'true = multiple units (PCs), false = single unit (court)' })
  @IsBoolean()
  isQuantifiable: boolean;

  @ApiProperty({ example: 1, description: 'Max concurrent bookable units' })
  @IsInt()
  @Min(1)
  totalCapacity: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateResourceDto {
  @ApiPropertyOptional({ example: 'Tennis Court A' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: ResourceType })
  @IsOptional()
  @IsEnum(ResourceType)
  type?: ResourceType;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isQuantifiable?: boolean;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  totalCapacity?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
