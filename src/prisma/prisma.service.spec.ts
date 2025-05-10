import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

/**
 * Test suite for PrismaService
 * Contains unit tests for database service operations
 */
describe('PrismaService', () => {
  let service: PrismaService;

  /**
   * Setup before each test
   * Creates a testing module with PrismaService
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  /**
   * Verifies that PrismaService is properly initialized
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
