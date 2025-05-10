import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { BookModule } from './book/book.module';
import { BookService } from './book/book.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { NestModule } from '@nestjs/common';

/**
 * Root module of the application
 * Configures all modules, controllers, providers, and middleware
 */
@Module({
  imports: [UserModule, AuthModule, BookModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, BookService],
})
export class AppModule implements NestModule {
  /**
   * Configures middleware for specific routes
   * @param consumer - MiddlewareConsumer to register middleware
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/book', '/user'); // Apply middleware to all routes or specific ones
  }
}
