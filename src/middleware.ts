// Edge-compatible middleware utilities only. Node.js-only packages (helmet, express-rate-limit, csurf, cors, winston, path) are not supported in Edge Runtime.
import { NextResponse } from 'next/server';

// Input validation helper (Edge-compatible)
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error('Validation failed');
  }
  return result.data;
}

// Minimal required middleware export for Next.js Edge Middleware
export function middleware() {
  // Add logic here if needed, or just pass through
  return NextResponse.next();
}

// Add any Edge-compatible middleware utilities here.
// For security, rate limiting, CORS, and logging, use traditional API routes (not Edge Middleware).
