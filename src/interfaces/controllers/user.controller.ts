import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CreateUserDto } from '../dtos/aaa/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { UserService } from 'src/modules/user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { DisplayUserDto } from '../dtos/aaa/display-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: [DisplayUserDto] })
  create(@Body() data: any) {
    return this.userService.create(data);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: DisplayUserDto })
  getProfile(@Req() req) {
    return req.user;
  }

  @Get()
  @ApiOkResponse({ type: [DisplayUserDto] })
  findAll(): Promise<DisplayUserDto[]> {
    return this.userService.findAll();
  }
}
