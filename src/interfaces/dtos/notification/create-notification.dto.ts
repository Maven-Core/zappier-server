// src/notification/dto/create-notification.dto.ts

import { IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 3 })
  @IsNumber()
  trigger_id: number;

  @ApiProperty({ example: 'New lead in Sheet X' })
  @IsNumber()
  message: string;

  @ApiProperty({ example: { row: 5, value: 'example data' }, required: false })
  @IsOptional()
  metadata?: Record<string, any>;

  @ApiProperty({ default: false })
  @IsOptional()
  @IsBoolean()
  is_read?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  created_at?: Date;
}
