import { NextRequest, NextResponse } from 'next/server';
import config from '../../../../config';

export async function GET(req: NextRequest) {
  return NextResponse.json({ config });
}
