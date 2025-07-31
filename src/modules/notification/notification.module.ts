// notification.module.ts

import { Module } from '@nestjs/common';
import { NotificationController } from '../../interfaces/controllers/notification.controller';
import { NotificationService } from './notification.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
