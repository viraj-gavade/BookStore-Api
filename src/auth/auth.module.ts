import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './strategy/jwt.strategy';

/**
 * Authentication module configuration
 * Configures JWT, services, controllers, and strategies for authentication
 */
@Module({
  imports: [
    PassportModule, // Import Passport for authentication strategies
    JwtModule.register({
      secret: process.env.SECRET_KEY, // Use environment variable for JWT secret
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
  exports:[JwtModule] // Export JWT module to be available in other modules
})
export class AuthModule {}
