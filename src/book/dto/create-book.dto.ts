import { IsString, IsNumber, IsOptional } from 'class-validator';

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

  @IsNumber()
  userId: number; // Ensure this field matches the relation in the schema
}
