import { Module } from '@nestjs/common';
import { UserController } from 'src/interfaces/controllers/user.controller';
import { UserService } from './user.service';
import { UserHandler } from 'src/interfaces/handlers/userHandler';

@Module({
  controllers: [UserController],
  providers: [UserService, UserHandler],
  exports: [UserService],
})
export class UserModule {}
