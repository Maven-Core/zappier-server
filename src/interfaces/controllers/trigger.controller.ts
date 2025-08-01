import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateTriggerDto } from '../dtos/trigger/create-trigger.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { TriggerService } from 'src/modules/trigger/trigger.service';
import { DisplayTriggerDto } from '../dtos/trigger/display-trigger.dto';

@Controller('triggers')
export class TriggerController {
  constructor(private readonly triggerService: TriggerService) {}

  @Post()
  @ApiBody({ type: CreateTriggerDto })
  @ApiOkResponse({ type: DisplayTriggerDto })
  create(@Body() data: any) {
    return this.triggerService.create(data);
  }

  @Get()
  @ApiOkResponse({ type: [DisplayTriggerDto] })
  findAll() {
    return this.triggerService.findAll();
  }
}
