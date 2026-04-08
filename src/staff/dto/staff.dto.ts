import { IsString, IsEmail, IsOptional, IsBoolean, IsObject, IsArray, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResourceType } from '../../../generated/prisma/enums';

export class CreateStaffDto {
  @ApiProperty({ example: 'Alex Coach' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'alex@platform.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: 'Tennis' })
  @IsOptional()
  @IsString()
  specialty?: string;

  @ApiPropertyOptional({
    example: ['COURT'],
    description: 'Resource types this staff can be assigned to. Empty = all types.',
    enum: ResourceType,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(ResourceType, { each: true })
  allowedResourceTypes?: ResourceType[];

  @ApiPropertyOptional({ example: { mon: ['09:00-17:00'] } })
  @IsOptional()
  @IsObject()
  availability?: Record<string, string[]>;

  @ApiPropertyOptional({ example: '+37455123456' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateStaffDto {
  @ApiPropertyOptional({ example: 'Alex Coach' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'alex@platform.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'Tennis' })
  @IsOptional()
  @IsString()
  specialty?: string;

  @ApiPropertyOptional({ enum: ResourceType, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(ResourceType, { each: true })
  allowedResourceTypes?: ResourceType[];

  @ApiPropertyOptional({ example: { mon: ['09:00-17:00'] } })
  @IsOptional()
  @IsObject()
  availability?: Record<string, string[]>;

  @ApiPropertyOptional({ example: '+37455123456' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
