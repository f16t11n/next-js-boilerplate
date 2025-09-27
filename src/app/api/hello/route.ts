import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { validate } from '../../../middleware';

const schema = z.object({ name: z.string().min(1) });

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const data = validate(schema, body);
    return NextResponse.json({ message: `Hello, ${data.name}!` });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
}
