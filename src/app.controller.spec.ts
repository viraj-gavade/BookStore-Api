import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/**
 * Test suite for AppController
 * Contains unit tests for application controller endpoints
 */
describe('AppController', () => {
  let appController: AppController;

  /**
   * Setup before each test
   * Creates a testing module with AppController and AppService
   */
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  /**
   * Tests for the root endpoint
   */
  describe('root', () => {
    /**
     * Verifies the root endpoint returns the expected message
     */
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
