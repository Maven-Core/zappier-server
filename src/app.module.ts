import { Module } from '@nestjs/common';

import { WorkflowModule } from './modules/workflow/workflow.module';
import { PrismaModule } from 'src/infrastructre/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { TriggerModule } from './modules/trigger/trigger.module';
import { AuthModule } from './infrastructre/auth/auth.module';
import { TriggerUserMapModule } from './modules/trigger-user-map/trigger-user-map.module';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [
    /* Base Modules */
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true, // makes config available everywhere without import
      envFilePath: '.env', // default, can be omitted
    }),
    /* Model-Based Modules */
    AuthModule,
    UserModule,
    TriggerModule,
    TriggerUserMapModule,
    NotificationModule,
    WorkflowModule,
  ],
})
export class AppModule {}
