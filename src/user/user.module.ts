import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  providers: [UserController, UserService,PrismaService],
  controllers: [UserController]
})
export class UserModule {}
