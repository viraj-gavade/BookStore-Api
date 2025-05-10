import { Injectable, NotFoundException ,Res,Req, Param} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedRequest } from 'src/auth/auth.middleware';
// import { Request,Response } from '@nestjs/common';
import { Request,Response } from 'express';

/**
 * Service handling book-related operations
 * Manages CRUD operations for books using Prisma
 */
@Injectable()
export class BookService {
  /**
   * Constructor injects required services
   * @param prisma - Database service for book operations
   * @param jwtService - Service for JWT token operations
   */
  constructor(private readonly prisma: PrismaService,private jwtService:JwtService) {}

  /**
   * Helper method to decode JWT token and extract user ID
   * @param token - JWT token string to decode
   * @returns Decoded user ID object or null if invalid
   */
  decodeToken(token: string): { UserId: number } | null {
    try {
      const decoded = this.jwtService.decode(token) as { UserId: number };  // Decode the token
      return decoded ? decoded : null;  // Return the decoded userId or null
    } catch (error) {
      return null;  // Return null in case of any errors
    }
  }

  /**
   * Creates a new book record associated with the authenticated user
   * @param req - Authenticated request with user information
   * @param createBookDto - Book data transfer object with book details
   * @returns Newly created book record
   */
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

  /**
   * Retrieves all books from the database
   * @param req - Authenticated request with user information
   * @returns Array of book records or error message if none found
   */
  async GetAllBooks(@Req() req: AuthenticatedRequest) {
   const books = await  this.prisma.book.findMany();
   if(!books){
    return {message:"No books found",status:404};
   }
   return books;
  }

  /**
   * Finds a single book by its ID
   * @param id - Book identifier
   * @returns Book record if found
   * @throws NotFoundException if book doesn't exist
   */
  async FindSingleBook(id: number) {
    const book = await  this.prisma.book.findUnique({where:{id}})
    if(!book) throw new NotFoundException('Book Not Found')
      return book;
  }

  /**
   * Updates a book if the user is authorized (owner of the book)
   * @param req - Authenticated request with user information
   * @param id - Book identifier
   * @param updateBookDto - Data transfer object with updated book fields
   * @returns Updated book or error message if unauthorized/not found
   */
  async UpdateBook(@Req() req: AuthenticatedRequest, id: number, updateBookDto: UpdateBookDto) {
    const book = await  this.prisma.book.findUnique({where:{id}})
    if(!book) return {message:'book not found! ',status:404}
          if(req.user.UserId !== book.userId){
        return {message:'You are not authorized to update this book',status:401}
      }
      return this.prisma.book.update({where:{id:book.id},data:updateBookDto})
 
  }

  /**
   * Deletes a book if the user is authorized (owner of the book)
   * @param req - Authenticated request with user information
   * @param id - Book identifier
   * @returns Success message or error if unauthorized/not found
   */
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
