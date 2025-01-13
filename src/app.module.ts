import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { BookModule } from './book/book.module';
@Module({
  imports: [UserModule, AuthModule, BookModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
