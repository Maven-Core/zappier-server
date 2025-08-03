import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FilterNotificationDto {
  @ApiProperty()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsOptional()
  user_id?: number;

  @ApiProperty()
  @IsOptional()
  trigger_id?: number;

  @ApiProperty()
  @IsOptional()
  message?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  metadata?: any; // Or `Record<string, any>` if you want stricter typing

  @ApiProperty()
  @IsOptional()
  is_read?: boolean;

  @ApiProperty()
  @IsOptional()
  created_at?: Date;
}
