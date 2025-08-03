import { Module } from '@nestjs/common';
import { TriggerUserMapController } from 'src/interfaces/controllers/trigger-user-map.controller';
import { TriggerUserMapService } from './trigger-user-map.service';
import { TriggerUserMapHandler } from 'src/interfaces/handlers/triggerUserMapHandler';

@Module({
  controllers: [TriggerUserMapController],
  providers: [TriggerUserMapService, TriggerUserMapHandler],
  exports: [TriggerUserMapService],
})
export class TriggerUserMapModule {}
