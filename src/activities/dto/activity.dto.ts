import { IsString, IsNumber, IsBoolean, IsOptional, IsInt, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateActivityDto {
  @ApiProperty({
    description: 'Title of the activity',
    example: 'Mountain Hiking Adventure'
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Detailed description of the activity',
    example: 'Experience the beautiful mountains with professional guides'
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Location where the activity takes place',
    example: 'Yerevan, Armenia'
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Maximum number of participants',
    example: 20,
    minimum: 1
  })
  @IsInt()
  @Min(1)
  capacity: number;

  @ApiProperty({
    description: 'Price per person in USD',
    example: 50.00,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Duration of the activity in minutes',
    example: 180,
    minimum: 1
  })
  @IsInt()
  @Min(1)
  duration: number;

  @ApiProperty({
    description: 'Category of the activity',
    example: 'Outdoor Adventure'
  })
  @IsString()
  category: string;

  @ApiPropertyOptional({
    description: 'URL to activity image',
    example: 'https://example.com/image.jpg'
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'Whether the activity is currently active',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateActivityDto {
  @ApiPropertyOptional({
    description: 'Title of the activity',
    example: 'Mountain Hiking Adventure'
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Detailed description of the activity',
    example: 'Experience the beautiful mountains with professional guides'
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Location where the activity takes place',
    example: 'Yerevan, Armenia'
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    description: 'Maximum number of participants',
    example: 20,
    minimum: 1
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;

  @ApiPropertyOptional({
    description: 'Price per person in USD',
    example: 50.00,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    description: 'Duration of the activity in minutes',
    example: 180,
    minimum: 1
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  duration?: number;

  @ApiPropertyOptional({
    description: 'Category of the activity',
    example: 'Outdoor Adventure'
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    description: 'URL to activity image',
    example: 'https://example.com/image.jpg'
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'Whether the activity is currently active',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
