import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { TriggerUserMapService } from 'src/modules/trigger-user-map/trigger-user-map.service';
import { CreateTriggerUserMapDto } from '../dtos/trigger-user-map/create-trigger-user-map.dto';
import { DisplayTriggerUserMapDto } from '../dtos/trigger-user-map/display-trigger-user-map.dto';
import { BaseDeleteDto } from '../dtos/base/base-dto';

@ApiTags('trigger-user-map')
@Controller('trigger-user-map')
export class TriggerUserMapController {
  constructor(private readonly service: TriggerUserMapService) {}

  @Post()
  @ApiBody({ type: CreateTriggerUserMapDto })
  @ApiOkResponse({ type: DisplayTriggerUserMapDto })
  create(@Body() body: CreateTriggerUserMapDto) {
    return this.service.create(body);
  }

  @Delete()
  @ApiOkResponse({ type: DisplayTriggerUserMapDto })
  delete(@Body() body: BaseDeleteDto) {
    return this.service.delete(body.id);
  }

  @Get()
  @ApiOkResponse({ type: [DisplayTriggerUserMapDto] })
  findAll() {
    return this.service.findAll();
  }

  @Get('user/:userId')
  @ApiOkResponse({ type: [DisplayTriggerUserMapDto] })
  findByUser(@Param('userId') userId: number) {
    return this.service.findByUser(userId);
  }
}
