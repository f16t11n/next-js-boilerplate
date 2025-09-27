import { NextResponse } from 'next/server';

export async function GET() {
  // In production, do not expose logs
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }
  // Example: return last 100 logs (placeholder)
  return NextResponse.json({ logs: ['Error log viewing is a placeholder. Integrate with your logger.'] });
}
