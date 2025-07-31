// src/trigger/dto/create-trigger.dto.ts

import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTriggerDto {
  @ApiProperty({ example: 'Lead → Email Campaign' })
  @IsString()
  name: string;

  @ApiProperty({ example: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms' })
  @IsString()
  external_id: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  created_by: number;

  @ApiProperty({ required: false })
  @IsOptional()
  created_at?: Date;
}
