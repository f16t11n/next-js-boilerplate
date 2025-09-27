// Edge-compatible middleware utilities only. Node.js-only packages (helmet, express-rate-limit, csurf, cors, winston, path) are not supported in Edge Runtime.
import { NextResponse } from 'next/server';
import { z } from 'zod';
import config from '../config';

// Input validation helper (Edge-compatible)
export function validate(schema: z.ZodSchema<any>, data: any) {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error('Validation failed');
  }
  return result.data;
}

// Minimal required middleware export for Next.js Edge Middleware
export function middleware(request) {
  // Add logic here if needed, or just pass through
  return NextResponse.next();
}

// Add any Edge-compatible middleware utilities here.
// For security, rate limiting, CORS, and logging, use traditional API routes (not Edge Middleware).
