import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { TriggerUserMapService } from 'src/modules/trigger-user-map/trigger-user-map.service';
import { CreateTriggerUserMapDto } from '../dtos/trigger-user-map/create-trigger-user-map.dto';

@ApiTags('trigger-user-map')
@Controller('trigger-user-map')
export class TriggerUserMapController {
  constructor(private readonly service: TriggerUserMapService) {}

  @Post()
  @ApiBody({ type: CreateTriggerUserMapDto })
  create(@Body() body: CreateTriggerUserMapDto) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: number) {
    return this.service.findByUser(userId);
  }
}
