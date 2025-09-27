// config.prd.js
module.exports = {
  env: 'production',
  apiBaseUrl: process.env.API_URL || 'https://api.example.com',
  logger: { level: 'warn' },
  debug: false,
};
