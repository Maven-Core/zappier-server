import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';

import {
  LoginDto,
  BackdoorLoginDto,
  DisplayLoginDto,
} from '../dtos/aaa/login.dto';
import { ApiOkResponseDto } from '../decorators/api-ok-response-dto.decorator';
import { AuthHandler } from '../handlers/authHandler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authHandler: AuthHandler) {}

  private setAccessTokenCookie(res: Response, token: string) {
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false, // ❗ Set to true in production (HTTPS)
      maxAge: 10 * 60 * 1000, // 10 minutes
      path: '/',
    });
  }

  private clearAccessTokenCookie(res: Response) {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: false, // ❗ Set to true in production (HTTPS)
      expires: new Date(0),
      path: '/',
    });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponseDto(DisplayLoginDto)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const response = await this.authHandler.executeLoginCommand(loginDto);

    if (response.data?.access_token) {
      this.setAccessTokenCookie(res, response.data.access_token);
    }

    return response;
  }

  @Post('login-backdoor')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponseDto(DisplayLoginDto)
  async backdoorLogin(
    @Body() loginDto: BackdoorLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const response =
      await this.authHandler.executeBackdoorLoginCommand(loginDto);

    if (response.data?.access_token) {
      this.setAccessTokenCookie(res, response.data.access_token);
    }

    return response;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponseDto()
  async logout(@Res({ passthrough: true }) res: Response) {
    this.clearAccessTokenCookie(res);
    return { success: true, message: 'Logged out successfully' };
  }
}
