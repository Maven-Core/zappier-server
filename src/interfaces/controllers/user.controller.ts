import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CreateUserDto } from '../dtos/aaa/create-user.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UserService } from 'src/modules/user/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  create(@Body() data: any) {
    return this.userService.create(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Req() req) {
    return req.user;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
