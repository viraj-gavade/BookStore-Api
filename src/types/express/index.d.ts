// src/types/express/index.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      cookies: { [key: string]: string }; // You can specify more precise types if needed
    }
  }
}
