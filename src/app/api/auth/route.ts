import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import config from '../../../../config';

export async function POST(req: NextRequest) {
  const { username } = await req.json();
  // In real app, validate user credentials
  const token = jwt.sign({ username }, config.jwtSecret, {
    expiresIn: config.jwtConfig.expiresIn,
    algorithm: config.jwtConfig.algorithm as jwt.Algorithm,
  });
  const res = NextResponse.json({ token });
  res.cookies.set(config.cookieConfig.name, token, {
    httpOnly: config.cookieConfig.httpOnly,
    secure: config.cookieConfig.secure,
    sameSite: config.cookieConfig.sameSite,
    maxAge: config.cookieConfig.maxAge,
  });
  return res;
}
