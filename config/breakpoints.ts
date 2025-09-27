import baseConfig from './config.base';

if (!baseConfig.imageConfig || !baseConfig.imageConfig.deviceSizes) {
  throw new Error('Device sizes are not defined in the base config.');
}

export const breakpoints = {
  mobile: `${baseConfig.imageConfig.deviceSizes[0]}px`,
  tablet: `${baseConfig.imageConfig.deviceSizes[2]}px`,
  laptop: `${baseConfig.imageConfig.deviceSizes[3]}px`,
  desktop: `${baseConfig.imageConfig.deviceSizes[4]}px`,
  wide: `${baseConfig.imageConfig.deviceSizes[4] + 336}px`,
} as const;

export type Breakpoint = keyof typeof breakpoints;
