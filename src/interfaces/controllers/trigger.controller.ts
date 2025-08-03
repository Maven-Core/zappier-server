import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateTriggerDto } from '../dtos/trigger/create-trigger.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { DisplayTriggerDto } from '../dtos/trigger/display-trigger.dto';
import { TriggerHandler } from '../handlers/triggerHandler';
import { ApiOkResponseDto } from '../decorators/api-ok-response-dto.decorator';
import { AuthGuard } from '@nestjs/passport';
import type { JwtPayloadDto } from 'src/infrastructre/auth/jwt-payload.dto';
import { User } from '../decorators/user.decorator';
import { ARD } from '../dtos/base/api-response-dto';

@ApiTags('triggers')
@Controller('triggers')
export class TriggerController {
  constructor(private readonly triggerHandler: TriggerHandler) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateTriggerDto })
  @ApiOkResponseDto(DisplayTriggerDto)
  create(
    @Body() data: CreateTriggerDto,
    @User() user: JwtPayloadDto,
  ): Promise<ARD<DisplayTriggerDto>> {
    return this.triggerHandler.executeCreateCommand(data, user);
  }

  @Get()
  @ApiOkResponseDto([DisplayTriggerDto])
  findAll(): Promise<ARD<DisplayTriggerDto[]>> {
    return this.triggerHandler.executeFindAllQuery();
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponseDto()
  delete(@Param('id', ParseIntPipe) id: number): Promise<ARD> {
    return this.triggerHandler.executeDeleteCommand(id);
  }

  @Post('run')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponseDto()
  run(@User() user: JwtPayloadDto): Promise<ARD> {
    return this.triggerHandler.executeRunAllTriggersCommand();
  }
}
