/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

// Always load base config
const baseConfig = require('./config.base');

// Determine environment
const env = process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV || 'development';


// Deep merge utility
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object'
    ) {
      target[key] = deepMerge({ ...target[key] }, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

let envConfig = {};
const envPath = path.join(__dirname, `config.${env}.js`);
if (fs.existsSync(envPath)) {
  envConfig = require(envPath);
}

const mergedConfig = deepMerge({ ...baseConfig }, envConfig);
mergedConfig.deepMerge = deepMerge;
module.exports = mergedConfig;
