import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';

/**
 * Test suite for BookController
 * Contains unit tests for book controller endpoints
 */
describe('BookController', () => {
  let controller: BookController;

  /**
   * Setup before each test
   * Creates a testing module with BookController and BookService
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  /**
   * Verifies that BookController is properly initialized
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
