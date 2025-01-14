import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}
  async AddBook(createBookDto: CreateBookDto,userId:number) { 
    return this.prisma.book.create({
      data: {
        ...createBookDto,
        userId:userId
      },
    });
  }

  async GetAllBooks() {
   return this.prisma.book.findMany();
  }

  async FindSingleBook(id: number) {
    const book = await  this.prisma.book.findUnique({where:{id}})
    if(!book) throw new NotFoundException('Book Not Found')
      return book;
  }


  async UpdateBook(id: number, updateBookDto: UpdateBookDto) {
    const book = await  this.prisma.book.findUnique({where:{id}})
    if(!book) throw new NotFoundException('Book Not Found')
      return this.prisma.book.update({where:{id:book.id},data:updateBookDto})
 
  }

  async DeleteBook(id: number) {
   const book = await this.FindSingleBook(id)
   if(!book) throw new NotFoundException('Book Not Found')
  return this.prisma.book.delete({where:{id}})
  }
}
