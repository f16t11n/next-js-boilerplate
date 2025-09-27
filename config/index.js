/* eslint-disable @typescript-eslint/no-require-imports */
// Static environment config resolution to satisfy Turbopack (no dynamic requires)
const baseConfig = require('./config.base');

const env = process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV || 'development';

function deepMerge(target, source) {
  if (!source) return target;
  for (const key of Object.keys(source)) {
    if (
      Object.prototype.hasOwnProperty.call(source, key) &&
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
switch (env) {
  case 'production':
    try { envConfig = require('./config.production'); } catch { /* noop */ }
    break;
  case 'staging':
    try { envConfig = require('./config.staging'); } catch { /* noop */ }
    break;
  case 'qa':
    try { envConfig = require('./config.qa'); } catch { /* noop */ }
    break;
  case 'development':
  default:
    try { envConfig = require('./config.development'); } catch { /* noop */ }
    break;
}

// Test-time dynamic fallback: if running under Jest (NODE_ENV begins with 'test')
// and a config.<env>.js file exists (created ad-hoc in unit tests), attempt to load it.
if (/^test/.test(env)) {
  try { // eslint-disable-next-line @typescript-eslint/no-var-requires
    envConfig = require(`./config.${env}`);
  } catch { /* ignore if not present */ }
}

const mergedConfig = deepMerge({ ...baseConfig }, envConfig || {});
mergedConfig.deepMerge = deepMerge;
module.exports = mergedConfig;
