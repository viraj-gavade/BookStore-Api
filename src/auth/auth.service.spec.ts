import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

/**
 * Test suite for AuthService
 * Contains unit tests for authentication functionality
 */
describe('AuthService', () => {
  let service: AuthService;

  /**
   * Setup before each test
   * Creates a testing module with AuthService provider
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  /**
   * Verifies that the AuthService is properly initialized
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
