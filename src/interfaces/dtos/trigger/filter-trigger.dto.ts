import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FilterTriggerDto {
  @ApiProperty()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsOptional()
  external_id?: string;

  @ApiProperty()
  @IsOptional()
  created_by?: number;

  @ApiProperty()
  @IsOptional()
  created_at?: Date;
}
