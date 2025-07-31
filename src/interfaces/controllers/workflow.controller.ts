// src/workflow/workflow.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateWorkflowDto } from '../dtos/workflow/create-workflow.dto';

@ApiTags('Workflows')
@Controller('workflows')
export class WorkflowController {
  constructor() {}

  @Post()
  @ApiBody({ type: CreateWorkflowDto })
  create(@Body() body: CreateWorkflowDto) {
    return null;
  }

  @Get()
  findAll() {
    return null;
  }

  @Post(':id/run')
  run(@Param('id') id: string) {
    return null;
  }
}
