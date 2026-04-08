import { IsString, IsNumber, IsOptional, IsBoolean, Min, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePricingDto {
  @ApiProperty({ example: 'resource-id' })
  @IsString()
  resourceId: string;

  @ApiProperty({ example: '06:00', description: 'Start time HH:MM (24h)' })
  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'startTime must be HH:MM format' })
  startTime: string;

  @ApiProperty({ example: '12:00', description: 'End time HH:MM (24h)' })
  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'endTime must be HH:MM format' })
  endTime: string;

  @ApiProperty({ example: 10.0, description: 'Price per hour in this window' })
  @IsNumber()
  @Min(0)
  hourlyRate: number;

  @ApiPropertyOptional({ example: 'Morning Rate' })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdatePricingDto {
  @ApiPropertyOptional({ example: '06:00' })
  @IsOptional()
  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'startTime must be HH:MM format' })
  startTime?: string;

  @ApiPropertyOptional({ example: '12:00' })
  @IsOptional()
  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'endTime must be HH:MM format' })
  endTime?: string;

  @ApiPropertyOptional({ example: 10.0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  hourlyRate?: number;

  @ApiPropertyOptional({ example: 'Morning Rate' })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
