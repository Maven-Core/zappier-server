// src/user/dto/create-user.dto.ts

import { IsString, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'user', enum: ['admin', 'user'] })
  @IsString()
  @IsIn(['admin', 'user'])
  role: string;

  @ApiProperty({ required: false })
  @IsOptional()
  created_at?: Date;
}
