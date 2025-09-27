// config.base.js
module.exports = {
  env: process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV || 'development',
  apiBaseUrl: process.env.API_URL || 'https://api.example.com',
  rateLimit: { windowMs: 15 * 60 * 1000, max: 100 },
  jwtSecret: process.env.JWT_SECRET || 'default-secret',
  featureFlags: { exampleFeature: true },
  logger: { level: 'info' },
  cors: { origin: '*', credentials: true },
  csrf: { enabled: true },
  csp: { directives: { defaultSrc: ["'self'"] } },
  imageConfig: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96],
    minimumCacheTTL: 60,
    domains: [],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self';",
  },
  cookieConfig: {
    name: 'session',
    value: '',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 3600,
  },
  jwtConfig: {
    expiresIn: '1h',
    algorithm: 'HS256',
  },
  environments: ['development', 'staging', 'qa', 'production'],
};
