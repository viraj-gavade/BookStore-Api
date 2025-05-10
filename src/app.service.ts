import { Injectable } from '@nestjs/common';

/**
 * Base application service
 * Provides core functionality for the application
 */
@Injectable()
export class AppService {
  /**
   * Returns a welcome message for the application
   * @returns Welcome message string
   */
  getHello(): string {
    return 'Hello World!';
  }
}
