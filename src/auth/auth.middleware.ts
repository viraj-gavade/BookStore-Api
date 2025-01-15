import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
    user?: any; // Replace `any` with the appropriate type for your JWT payload
  }
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: AuthenticatedRequest, res: Response, next: NextFunction)  {
    const token = req.cookies['access_token']; // Get the access token from cookies

    if (!token) {
      throw new UnauthorizedException('Access token not found');
    }

    try {
      // Replace 'your_jwt_secret' with your actual secret key
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
