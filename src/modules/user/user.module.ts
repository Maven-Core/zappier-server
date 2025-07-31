import { Module } from '@nestjs/common';
import { UserController } from 'src/interfaces/controllers/user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
