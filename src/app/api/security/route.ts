import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
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
