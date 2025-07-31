import { Module } from '@nestjs/common';
import { WorkflowController } from 'src/interfaces/controllers/workflow.controller';

@Module({
  controllers: [WorkflowController],
})
export class WorkflowModule {}
