import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

/**
 * Test suite for AuthController
 * Contains unit tests for controller endpoints
 */
describe('AuthController', () => {
  let controller: AuthController;

  /**
   * Setup before each test
   * Creates a testing module with AuthController
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  /**
   * Verifies that the AuthController is properly initialized
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
