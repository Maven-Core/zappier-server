// notification.module.ts

import { Module } from '@nestjs/common';
import { NotificationController } from '../../interfaces/controllers/notification.controller';
import { NotificationService } from './notification.service';
import { NotificationHandler } from 'src/interfaces/handlers/notificationHandler';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationHandler],
  exports: [NotificationService],
})
export class NotificationModule {}
