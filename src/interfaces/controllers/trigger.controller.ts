import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateTriggerDto } from '../dtos/trigger/create-trigger.dto';
import { ApiBody } from '@nestjs/swagger';
import { TriggerService } from 'src/modules/trigger/trigger.service';

@Controller('triggers')
export class TriggerController {
  constructor(private readonly triggerService: TriggerService) {}

  @Post()
  @ApiBody({ type: CreateTriggerDto })
  create(@Body() data: any) {
    return this.triggerService.create(data);
  }

  @Get()
  findAll() {
    return this.triggerService.findAll();
  }
}
