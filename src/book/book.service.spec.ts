import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';

/**
 * Test suite for BookService
 * Contains unit tests for book service operations
 */
describe('BookService', () => {
  let service: BookService;

  /**
   * Setup before each test
   * Creates a testing module with BookService
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  /**
   * Verifies that BookService is properly initialized
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
