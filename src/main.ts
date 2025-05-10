import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';

/**
 * Bootstrap function to initialize and start the NestJS application
 * Sets up middleware and starts the HTTP server
 */
async function bootstrap() {
  // Create a new NestJS application instance with AppModule as the root module
  const app = await NestFactory.create(AppModule);
  
  // Register cookie-parser middleware to parse cookies in requests
  app.use(cookieParser())
  
  // Start the HTTP server on the specified port or default to 3000
  await app.listen(process.env.PORT ?? 3000);
}

// Execute the bootstrap function to start the application
bootstrap();
