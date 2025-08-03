import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateTriggerDto } from '../dtos/trigger/create-trigger.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { DisplayTriggerDto } from '../dtos/trigger/display-trigger.dto';
import { TriggerHandler } from '../handlers/triggerHandler';
import { ApiOkResponseDto } from '../decorators/api-ok-response-dto.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayloadDto } from 'src/infrastructre/auth/jwt-payload.dto';

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
    @Req() req: Request & { user: JwtPayloadDto },
  ) {
    return this.triggerHandler.executeCreateCommand(data, req.user);
  }

  @Get()
  @ApiOkResponseDto([DisplayTriggerDto])
  findAll() {
    return this.triggerHandler.executeFindAllQuery();
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponseDto()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.triggerHandler.executeDeleteCommand(id);
  }

  @Post('run')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponseDto()
  run(@Req() req: Request & { user: JwtPayloadDto }) {
    return this.triggerHandler.executeRunAllTriggersCommand();
  }
}
