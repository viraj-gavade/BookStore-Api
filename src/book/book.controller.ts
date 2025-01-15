import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Req,Res } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Request,Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedRequest } from 'src/auth/auth.middleware';
// import { JwtAuthGuard } from 'src/auth/jwt-auth-gaurd';


// @UseGuards(JwtAuthGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService ,private jwtService:JwtService) {}

  
  @Post()
  async create(
    @Body() createBookDto: CreateBookDto, 
    @Req() req: AuthenticatedRequest, 
    @Res() res: Response
  ) { 
    const userId = req.user?.UserId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    }
    try {
      // Pass userId along with createBookDto to the service method
      const book = await this.bookService.AddBook(createBookDto, userId);
      return res.status(201).json(book); 
    } catch (error) {
      return res.status(500).json({ message: 'Error adding book', error: error.message });
    }
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.bookService.GetAllBooks(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.FindSingleBook(+id);
  }

  @Patch(':id')
  async updateBook(
    @Param('id') id: string, // Extract the 'id' from route parameters
    @Body() updateBookDto: UpdateBookDto, // Extract the book data from the request body
    @Req() req: AuthenticatedRequest // Access cookies or headers for authentication
  ) {
    // Pass all arguments to the service method
    return this.bookService.UpdateBook(req,+id, updateBookDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest 
  ) {
    const token = req.cookies['access_token']; // Extract the access token from cookies
    const decodedPayload = this.bookService.decodeToken(token); 
    const userId = decodedPayload?.UserId;
    return this.bookService.DeleteBook(req,+id);
  }
}
