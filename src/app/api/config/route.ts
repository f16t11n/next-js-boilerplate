import config from '../../../../config';

export async function GET() {
  return NextResponse.json({
    env: config.env,
    config,
  });
}
