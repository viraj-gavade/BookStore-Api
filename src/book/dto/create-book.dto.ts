import { IsString, IsNumber } from 'class-validator';

/**
 * Data Transfer Object for creating a new book
 * Contains validated book information fields
 */
export class CreateBookDto {
  /**
   * Title of the book
   * Must be a string
   */
  @IsString()
  title: string;

  /**
   * Author of the book
   * Must be a string
   */
  @IsString()
  author: string;

  /**
   * Publication year of the book
   * Must be a number
   */
  @IsNumber()
  publishedAt: number;

  /**
   * Genre or category of the book
   * Must be a string
   */
  @IsString()
  genre: string;

  /**
   * Price of the book
   * Must be a number
   */
  @IsNumber()
  price: number;

}
