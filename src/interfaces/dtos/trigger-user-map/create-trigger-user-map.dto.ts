// src/trigger-user-map/dto/create-trigger-user-map.dto.ts

import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTriggerUserMapDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  trigger_id: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  user_id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  assigned_at?: Date;
}
