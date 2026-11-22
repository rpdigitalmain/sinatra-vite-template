import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  outputDir: './tmp/playwright',
  use: { browserName: 'chromium' },
});
