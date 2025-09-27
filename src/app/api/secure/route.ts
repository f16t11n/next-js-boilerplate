import { NextRequest, NextResponse } from 'next/server';
import config from '../../../../config';

export async function GET(req: NextRequest) {
  return NextResponse.json({
    security: {
      helmet: true,
      rateLimit: config.rateLimit,
      csrf: config.csrf,
      cors: config.cors,
      csp: config.csp,
      inputValidation: true,
      secureCookies: true,
      jwt: true,
    },
  });
}
