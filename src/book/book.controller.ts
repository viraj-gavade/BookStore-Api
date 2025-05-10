import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Req,Res } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Request,Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedRequest } from 'src/auth/auth.middleware';
// import { JwtAuthGuard } from 'src/auth/jwt-auth-gaurd';


/**
 * Controller handling book-related HTTP requests
 * Manages routes for book CRUD operations
 */
// @UseGuards(JwtAuthGuard)
@Controller('book')
export class BookController {
  /**
   * Constructor injects required services
   * @param bookService - Service handling book operations
   * @param jwtService - Service for JWT operations
   */
  constructor(private readonly bookService: BookService ,private jwtService:JwtService) {}

  /**
   * Endpoint to create a new book
   * @param createBookDto - Data transfer object with book details
   * @param req - Authenticated request with user information
   * @param res - Express response object
   * @returns New book data or error response
   */
  @Post('add')
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
      const book = await this.bookService.AddBook(req,createBookDto);
      return res.status(201).json(book); 
    } catch (error) {
      return res.status(500).json({ message: 'Error adding book', error: error.message });
    }
  }

  /**
   * Endpoint to retrieve all books
   * @param req - Request object
   * @returns Array of all books
   */
  @Get('')
  findAll(@Req() req: Request) {
    return this.bookService.GetAllBooks(req);
  }

  /**
   * Endpoint to retrieve a specific book by ID
   * @param id - Book identifier
   * @returns Single book data
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookService.FindSingleBook(+id);
  }

  /**
   * Endpoint to update a book by ID
   * @param id - Book identifier
   * @param updateBookDto - Data transfer object with updated book fields
   * @param req - Authenticated request with user information
   * @returns Updated book or error message
   */
  @Patch(':id')
  async updateBook(
    @Param('id') id: string, // Extract the 'id' from route parameters
    @Body() updateBookDto: UpdateBookDto, // Extract the book data from the request body
    @Req() req: AuthenticatedRequest // Access cookies or headers for authentication
  ) {

    return this.bookService.UpdateBook(req,+id, updateBookDto);
  }

  /**
   * Endpoint to delete a book by ID
   * @param id - Book identifier
   * @param req - Authenticated request with user information
   * @returns Success message or error
   */
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest 
  ) {
    return this.bookService.DeleteBook(req,+id);
  }
}
