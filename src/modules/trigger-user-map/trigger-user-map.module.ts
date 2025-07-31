import { Module } from '@nestjs/common';
import { TriggerUserMapController } from 'src/interfaces/controllers/trigger-user-map.controller';
import { TriggerUserMapService } from './trigger-user-map.service';

@Module({
  controllers: [TriggerUserMapController],
  providers: [TriggerUserMapService],
})
export class TriggerUserMapModule {}
