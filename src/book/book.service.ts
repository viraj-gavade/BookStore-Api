import { Injectable, NotFoundException ,Res,Req} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedRequest } from 'src/auth/auth.middleware';
// import { Request,Response } from '@nestjs/common';
import { Request,Response } from 'express';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService,private jwtService:JwtService) {}
  decodeToken(token: string): { UserId: number } | null {
    try {
      const decoded = this.jwtService.decode(token) as { UserId: number };  // Decode the token
      return decoded ? decoded : null;  // Return the decoded userId or null
    } catch (error) {
      return null;  // Return null in case of any errors
    }
  }

  async AddBook(createBookDto: CreateBookDto, userId: number) {
    // Use Prisma to create the book associated with the userId
    return this.prisma.book.create({
      data: {
        ...createBookDto, 
        userId: userId, 
      },
    });
  }

  async GetAllBooks(@Req() req: AuthenticatedRequest) {
   return this.prisma.book.findMany();
  }

  async FindSingleBook(id: number) {
    const book = await  this.prisma.book.findUnique({where:{id}})
    if(!book) throw new NotFoundException('Book Not Found')
      return book;
  }


  async UpdateBook(@Req() req: AuthenticatedRequest, id: number, updateBookDto: UpdateBookDto) {
    const book = await  this.prisma.book.findUnique({where:{id}})
    if(!book) throw new NotFoundException('Book Not Found')
      if(req.user.UserId !== book.userId){
        throw new NotFoundException('You are Not Authorized to update this book')
      }
      return this.prisma.book.update({where:{id:book.id},data:updateBookDto})
 
  }

  async DeleteBook(@Req() req: AuthenticatedRequest,id: number) {
   const book = await this.FindSingleBook(id)
   if(req.user.UserId !== book.userId){
    throw new NotFoundException('You are Not Authorized to delete this book')
   }
   if(!book) throw new NotFoundException('Book Not Found')
  return this.prisma.book.delete({where:{id}})
  }
}
