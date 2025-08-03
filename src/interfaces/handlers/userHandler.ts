import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { CreateUserDto } from '../dtos/aaa/create-user.dto';
import { ApiResponseDto } from '../dtos/base/api-response-dto';
import { DisplayUserDto } from '../dtos/aaa/display-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserHandler {
  constructor(private readonly service: UserService) {}

  async executeCreateUserCommand(
    data: CreateUserDto,
  ): Promise<ApiResponseDto<DisplayUserDto>> {
    const user = await this.service.create(data);

    return {
      message: 'User Created Successfuly',
      data: plainToInstance(DisplayUserDto, user),
      success: true,
    };
  }

  async executeGetAllUserQuery(): Promise<ApiResponseDto<DisplayUserDto[]>> {
    const users = await this.service.findAll();
    return {
      data: plainToInstance(DisplayUserDto, users),
      success: true,
    };
  }
}
