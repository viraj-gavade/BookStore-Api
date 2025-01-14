import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Req,Res } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Request,Response } from 'express';
import { JwtService } from '@nestjs/jwt';
// import { JwtAuthGuard } from 'src/auth/jwt-auth-gaurd';


// @UseGuards(JwtAuthGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService ,private jwtService:JwtService) {}

  
  @Post()
  async create(
    @Body() createBookDto: CreateBookDto, 
    @Req() req: Request, 
    @Res() res: Response
  ) {
    const token = req.cookies['access_token'];
    console.log(token)  // Access token from cookies
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - No Token Found' });
    }

    // Decode the token and extract the userId
    const decodedPayload = this.bookService.decodeToken(token); 
    console.log(decodedPayload)// Call decodeToken from the service
    const userId = decodedPayload?.UserId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    }

    try {
      // Pass userId along with createBookDto to the service method
      const book = await this.bookService.AddBook(createBookDto, userId);
      return res.status(201).json(book); 
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Error adding book', error: error.message });
    }
  }

  @Get()
  findAll() {
    return this.bookService.GetAllBooks();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.FindSingleBook(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.UpdateBook(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.DeleteBook(+id);
  }
}
