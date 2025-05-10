import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Root controller of the application
 * Handles base route requests
 */
@Controller()
export class AppController {
  /**
   * Constructor injects the application service
   * @param appService - Service with base application functionality
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Handles GET requests to the root endpoint
   * @returns Welcome message string
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
