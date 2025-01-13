import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-gaurd';



@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBookDto: CreateBookDto, @Request() req:any) {
    const user = req.user.userId;
    console.log("UserId",user)
    return this.bookService.AddBook(createBookDto);
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
