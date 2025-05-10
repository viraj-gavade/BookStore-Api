// src/types/express/index.d.ts
import * as express from 'express';

/**
 * Type declaration to extend Express Request interface
 * Adds cookies property to Express Request type
 */
declare global {
  namespace Express {
    interface Request {
      cookies: { [key: string]: string }; // You can specify more precise types if needed
    }
  }
}
