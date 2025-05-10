import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

/**
 * Test suite for UserController
 * Contains unit tests for user controller endpoints
 */
describe('UserController', () => {
  let controller: UserController;

  /**
   * Setup before each test
   * Creates a testing module with UserController
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  /**
   * Verifies that UserController is properly initialized
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
