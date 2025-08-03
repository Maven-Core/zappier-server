import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FilterTriggerUserMapDto {
  @ApiProperty()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsOptional()
  trigger_id?: number;

  @ApiProperty()
  @IsOptional()
  user_id?: number;

  @ApiProperty()
  @IsOptional()
  assigned_at?: Date;
}
