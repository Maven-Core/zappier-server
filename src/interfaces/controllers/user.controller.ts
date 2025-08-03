import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CreateUserDto } from '../dtos/aaa/create-user.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/modules/user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { DisplayUserDto } from '../dtos/aaa/display-user.dto';
import { UserHandler } from '../handlers/userHandler';
import { ApiOkResponseDto } from '../decorators/api-ok-response-dto.decorator';
import { JwtPayloadDto } from 'src/infrastructre/auth/jwt-payload.dto';
import { plainToInstance } from 'class-transformer';

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
  getProfile(@Req() req: Request & { user: JwtPayloadDto }) {
    const user = this.service.findByUsername(req.user.username);
    return plainToInstance(DisplayUserDto, user);
  }

  @Get()
  @ApiOkResponseDto([DisplayUserDto])
  findAll() {
    return this.userHandler.executeGetAllUserQuery();
  }
}
