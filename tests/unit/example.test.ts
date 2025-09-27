import { isFeatureEnabled } from '../../src/lib/featureFlags';

describe('Feature Flags', () => {
  it('should return true for enabled flag', () => {
    expect(isFeatureEnabled('exampleFeature')).toBe(true);
  });
});
