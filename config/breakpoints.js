/* eslint-disable @typescript-eslint/no-require-imports */
// CommonJS mirror of breakpoints for Node scripts that cannot import TS directly.
// Keep in sync with breakpoints.ts
const baseConfig = require('./config.base');

if (!baseConfig.imageConfig || !baseConfig.imageConfig.deviceSizes) {
  throw new Error('Device sizes are not defined in the base config.');
}

const breakpoints = {
  mobile: `${baseConfig.imageConfig.deviceSizes[0]}px`,
  tablet: `${baseConfig.imageConfig.deviceSizes[2]}px`,
  laptop: `${baseConfig.imageConfig.deviceSizes[3]}px`,
  desktop: `${baseConfig.imageConfig.deviceSizes[4]}px`,
  wide: `${baseConfig.imageConfig.deviceSizes[4] + 336}px`,
};

module.exports = { breakpoints };
