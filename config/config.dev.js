// config.dev.js
module.exports = {
  env: 'development',
  apiBaseUrl: process.env.API_URL || 'http://localhost:3000/api',
  logger: { level: 'debug' },
  featureFlags: { debugToolbar: true },
  debug: true,
};
