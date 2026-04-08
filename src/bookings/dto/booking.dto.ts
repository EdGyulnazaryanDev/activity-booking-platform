import {
  IsString, IsOptional, IsDateString, IsEnum, IsInt, Min, IsBoolean,
  registerDecorator, ValidationOptions, ValidationArguments,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BookingStatus } from '../../../generated/prisma/enums';

// ── Custom validator: date must be in the future ──────────────────────────────
function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isFutureDate',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) return false;
          return new Date(value) > new Date();
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a future date/time`;
        },
      },
    });
  };
}

// ─────────────────────────────────────────────────────────────────────────────

export class CreateBookingDto {
  @ApiProperty({ example: 'court-tennis-a', description: 'Resource ID to book' })
  @IsString()
  resourceId: string;

  @ApiProperty({ example: '2026-04-10T09:00:00.000Z', description: 'Must be a future datetime' })
  @IsDateString()
  @IsFutureDate({ message: 'startTime must be in the future' })
  startTime: string;

  @ApiProperty({ example: '2026-04-10T10:00:00.000Z' })
  @IsDateString()
  endTime: string;

  @ApiPropertyOptional({
    example: 4,
    description: 'Number of units to book (e.g. 4 PCs). Must be ≥ 1.',
  })
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'quantity must be at least 1' })
  quantity?: number;

  @ApiPropertyOptional({ example: 'Please set up near the window' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Show this booking in the partner lobby so others can join',
  })
  @IsOptional()
  @IsBoolean()
  isOpenForPartners?: boolean;
}

export class UpdateBookingDto {
  @ApiPropertyOptional({ example: '2026-04-10T09:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  startTime?: string;

  @ApiPropertyOptional({ example: '2026-04-10T10:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  endTime?: string;

  @ApiPropertyOptional({ enum: BookingStatus })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'quantity must be at least 1' })
  quantity?: number;

  @ApiPropertyOptional({ example: 'Updated notes' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class ApproveBookingDto {
  @ApiPropertyOptional({
    example: 'staff-id-123',
    description: 'Optionally assign a staff member to this booking',
  })
  @IsOptional()
  @IsString()
  staffId?: string;
}
