import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

/**
 * Book module configuration
 * Sets up controllers and providers for book operations
 */
@Module({
  controllers: [BookController],
  providers: [PrismaService,BookService,JwtService],
})
export class BookModule {}
