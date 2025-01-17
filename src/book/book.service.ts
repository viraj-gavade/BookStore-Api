import { Injectable, NotFoundException ,Res,Req, Param} from '@nestjs/common';
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

  async AddBook(@Req() req: AuthenticatedRequest,createBookDto: CreateBookDto) {
    const userId = req.user.UserId
    // Use Prisma to create the book associated with the userId
    return this.prisma.book.create({
      data: {
        ...createBookDto, 
        userId: userId, 
      },
    });
  }

  async GetAllBooks(@Req() req: AuthenticatedRequest) {
   const books = await  this.prisma.book.findMany();
   if(!books){
    return {message:"No books found",status:404};
   }
   return books;
  }

  async FindSingleBook(id: number) {
    const book = await  this.prisma.book.findUnique({where:{id}})
    if(!book) throw new NotFoundException('Book Not Found')
      return book;
  }


  async UpdateBook(@Req() req: AuthenticatedRequest, id: number, updateBookDto: UpdateBookDto) {
    const book = await  this.prisma.book.findUnique({where:{id}})
    if(!book) return {message:'book not found! ',status:404}
          if(req.user.UserId !== book.userId){
        return {message:'You are not authorized to update this book',status:401}
      }
      return this.prisma.book.update({where:{id:book.id},data:updateBookDto})
 
  }

  async DeleteBook(@Req() req: AuthenticatedRequest,id: number) {
   const book = await this.FindSingleBook(id)
   if(req.user.UserId !== book.userId){
return {message:'You are not authorized to delete this book',status:401}
}
   if(!book) return {message:'book not found! ',status:404}
  const books = await this.prisma.book.delete({where:{id}})
  return {message:'book deleted successfully!',status:200};
  }
}
