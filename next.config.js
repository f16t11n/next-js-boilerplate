import runtimeConfig from './config/index.js';

const nextConfig = {
  images: {
    formats: runtimeConfig.imageConfig.formats,
    deviceSizes: runtimeConfig.imageConfig.deviceSizes,
    imageSizes: runtimeConfig.imageConfig.imageSizes,
    minimumCacheTTL: runtimeConfig.imageConfig.minimumCacheTTL,
    domains: runtimeConfig.imageConfig.domains,
    dangerouslyAllowSVG: runtimeConfig.imageConfig.dangerouslyAllowSVG,
    contentSecurityPolicy: runtimeConfig.imageConfig.contentSecurityPolicy,
  },
};

export default nextConfig;