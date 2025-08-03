import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CreateUserDto } from '../dtos/aaa/create-user.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/modules/user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { DisplayUserDto } from '../dtos/aaa/display-user.dto';
import { UserHandler } from '../handlers/userHandler';
import { ApiOkResponseDto } from '../decorators/api-ok-response-dto.decorator';
import type { JwtPayloadDto } from 'src/infrastructre/auth/jwt-payload.dto';
import { plainToInstance } from 'class-transformer';
import { User } from '../decorators/user.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly userHandler: UserHandler,
  ) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponseDto(DisplayUserDto)
  create(@Body() data: CreateUserDto) {
    return this.userHandler.executeCreateUserCommand(data);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponseDto(DisplayUserDto)
  getProfile(@User() user: JwtPayloadDto) {
    const full_user = this.service.findByUsername(user.username);
    return plainToInstance(DisplayUserDto, full_user);
  }

  @Get()
  @ApiOkResponseDto([DisplayUserDto])
  findAll() {
    return this.userHandler.executeGetAllUserQuery();
  }
}
