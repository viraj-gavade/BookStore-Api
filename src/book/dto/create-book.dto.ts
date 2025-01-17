import { IsString, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsNumber()
  publishedAt: number;

  @IsString()
  genre: string;

  @IsNumber()
  price: number;

}
