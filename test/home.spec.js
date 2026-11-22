import { expect } from '@playwright/test';
import { test } from './puma.js';

test('serves the Vite build and displays the API health', async ({ page }) => {
  const response = await page.goto('/');

  expect(response.status()).toBe(200);
  await expect(page.getByRole('heading', { name: 'Sinatra + Vite' })).toBeVisible();
  await expect(page.getByRole('status')).toHaveText('Online');
});
