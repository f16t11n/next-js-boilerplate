import config from '../../config';

export function isFeatureEnabled(flag: string): boolean {
  return !!config.featureFlags[flag];
}
