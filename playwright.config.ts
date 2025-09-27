import { defineConfig } from '@playwright/test';
import config from './config';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  retries: 1,
  use: {
    baseURL: config.apiBaseUrl,
    headless: true,
    trace: 'on-first-retry',
  },
});
