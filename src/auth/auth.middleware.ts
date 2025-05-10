import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

/**
 * Extended Request interface with user property
 * Adds user information from JWT payload to the request object
 */
export interface AuthenticatedRequest extends Request {
    user?: any; // Replace `any` with the appropriate type for your JWT payload
  }

/**
 * Authentication middleware
 * Verifies JWT token from cookies and attaches user data to request
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    /**
     * Middleware function to process requests
     * @param req - Extended request object with user property
     * @param res - Express response object
     * @param next - Function to pass control to the next middleware
     * @throws UnauthorizedException when token is missing or invalid
     */
    use(req: AuthenticatedRequest, res: Response, next: NextFunction)  {
    const token = req.cookies['access_token']; // Get the access token from cookies

    if (!token) {
      throw new UnauthorizedException('Access token not found');
    }

    try {
      // Verify the JWT token using the environment secret key
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      // Attach the decoded user object to the request
      req.user = decoded;

      // Proceed to the next middleware or route handler
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
