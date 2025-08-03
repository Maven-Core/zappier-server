import { Module } from '@nestjs/common';
import { TriggerController } from 'src/interfaces/controllers/trigger.controller';
import { TriggerService } from './trigger.service';
import { TriggerHandler } from 'src/interfaces/handlers/triggerHandler';
import { TriggerUserMapModule } from '../trigger-user-map/trigger-user-map.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  controllers: [TriggerController],
  providers: [TriggerService, TriggerHandler],
  imports: [TriggerUserMapModule, NotificationModule],
})
export class TriggerModule {}
