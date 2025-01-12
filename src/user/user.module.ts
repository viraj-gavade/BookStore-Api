import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserController, UserService],
  controllers: [UserController]
})
export class UserModule {}
