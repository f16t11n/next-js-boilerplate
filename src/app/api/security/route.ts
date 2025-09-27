import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    security: [
      'Helmet',
      'Rate Limiting',
      'CSRF',
      'CORS',
      'CSP',
      'Input Validation',
      'Secure Cookies',
      'JWT',
    ],
  });
}
