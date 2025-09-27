// config.stg.js
module.exports = {
  env: 'staging',
  apiBaseUrl: process.env.API_URL || 'https://staging.api.example.com',
  logger: { level: 'info' },
  debug: false,
};
