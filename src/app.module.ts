import { Module,MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { BookModule } from './book/book.module';
import { BookService } from './book/book.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { NestModule } from '@nestjs/common';


@Module({
  imports: [UserModule, AuthModule, BookModule],
  controllers: [AppController],
  providers: [AppService, PrismaService,BookService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*'); // Apply middleware to all routes or specific ones
  }
}
