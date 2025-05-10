import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

/**
 * Data Transfer Object for updating a book
 * Extends CreateBookDto but makes all fields optional using PartialType
 * Allows partial updates of book properties
 */
export class UpdateBookDto extends PartialType(CreateBookDto) {}
