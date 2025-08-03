import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { DisplayUserDto } from 'src/interfaces/dtos/aaa/display-user.dto';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch)
      throw new UnauthorizedException(
        `Invalid credentials. pass is: ${user.password}`,
      );

    const result = plainToInstance(DisplayUserDto, user);
    return result;
  }

  async login(user: DisplayUserDto) {
    const payload = { username: user.username, sub: user.id, role: user.role };

    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
