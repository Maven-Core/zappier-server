import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { TriggerUserMapService } from 'src/modules/trigger-user-map/trigger-user-map.service';
import { CreateTriggerUserMapDto } from '../dtos/trigger-user-map/create-trigger-user-map.dto';
import { DisplayTriggerUserMapDto } from '../dtos/trigger-user-map/display-trigger-user-map.dto';
import { TriggerUserMapHandler } from '../handlers/triggerUserMapHandler';
import { ApiOkResponseDto } from '../decorators/api-ok-response-dto.decorator';

@ApiTags('trigger-user-map')
@Controller('trigger-user-map')
export class TriggerUserMapController {
  constructor(private readonly handler: TriggerUserMapHandler) {}

  @Post()
  @ApiBody({ type: CreateTriggerUserMapDto })
  @ApiOkResponseDto(DisplayTriggerUserMapDto)
  create(@Body() body: CreateTriggerUserMapDto) {
    return this.handler.executeCreateCommand(body);
  }

  @Delete('/:id')
  @ApiOkResponseDto()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.handler.executeDeleteCommand(id);
  }

  @Get()
  @ApiOkResponseDto([DisplayTriggerUserMapDto])
  findAll() {
    return this.handler.executeFindAllQuery();
  }

  @Get('user/:userId')
  @ApiOkResponseDto([DisplayTriggerUserMapDto])
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.handler.executeFindByUserQuery(userId);
  }
}
