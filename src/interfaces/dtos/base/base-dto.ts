import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BaseDeleteDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;
}

export function withAudit<T>(data: T, userId: number): BaseCreateDto<T> {
  return {
    ...data,
    created_by: userId,
    created_at: new Date(),
  };
}

export type BaseCreateDto<T> = T & {
  created_by: number;
  created_at: Date;
};
