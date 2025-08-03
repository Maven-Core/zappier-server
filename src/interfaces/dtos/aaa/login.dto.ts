import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DisplayUserDto } from './display-user.dto';

export class LoginDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class BackdoorLoginDto {
  @ApiProperty()
  @IsString()
  username: string;
}

export class DisplayLoginDto {
  @ApiProperty({ type: () => [DisplayUserDto] })
  user: DisplayUserDto;

  @ApiProperty()
  @IsString()
  access_token: string;
}
