import { NextResponse } from 'next/server';
import { serialize } from 'cookie'; // Requires @types/cookie in devDependencies
import config from '../../../../config';

export async function GET() {
  const cookie = serialize(
    config.cookieConfig.name,
    config.cookieConfig.value,
    {
      httpOnly: config.cookieConfig.httpOnly,
      secure: config.cookieConfig.secure,
      sameSite: config.cookieConfig.sameSite,
      path: '/',
      maxAge: config.cookieConfig.maxAge,
    },
  );
  const res = NextResponse.json({ message: 'Secure cookie set' });
  res.headers.set('Set-Cookie', cookie);
  return res;
}
