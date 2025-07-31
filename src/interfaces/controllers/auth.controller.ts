import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/infrastructre/auth/auth.service';
import { LoginDto } from '../dtos/aaa/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    return this.authService.login(user);
  }
}
