import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/infrastructre/auth/auth.service';
import {
  BackdoorLoginDto,
  DisplayLoginDto,
  LoginDto,
} from '../dtos/aaa/login.dto';
import { ApiResponseDto } from '../dtos/base/api-response-dto';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthHandler {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async executeLoginCommand(
    req: LoginDto,
  ): Promise<ApiResponseDto<DisplayLoginDto>> {
    const user = await this.authService.validateUser(
      req.username,
      req.password,
    );
    if (!user)
      return {
        success: false,
        message: 'Something went wrong',
      };

    const res = await this.authService.login(user);

    return {
      success: true,
      data: res,
      message: 'You Logged In Successfuly',
      statusCode: 200,
    };
  }

  async executeBackdoorLoginCommand(
    req: BackdoorLoginDto,
  ): Promise<ApiResponseDto<DisplayLoginDto>> {
    const user = await this.userService.findByUsername(req.username);
    if (!user)
      return {
        success: false,
        message: 'User Not Found',
        statusCode: 401,
      };

    const res = await this.authService.login(user);
    return {
      success: true,
      data: res,
      message: 'You Logged In Successfuly',
      statusCode: 200,
    };
  }
}
