// config.qa.js
module.exports = {
  env: 'qa',
  apiBaseUrl: process.env.API_URL || 'https://qa.api.example.com',
  logger: { level: 'info' },
  debug: false,
};
