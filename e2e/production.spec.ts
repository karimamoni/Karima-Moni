import { test, expect } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'https://karimamoni.github.io/Karima-Moni/';

test.describe('production portfolio smoke test', () => {
  test('homepage loads and core sections are visible', async ({ page }) => {
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Karima|Moni/i);

    for (const id of ['about', 'services', 'portfolio', 'contact']) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }

    await expect(page.getByRole('heading', { name: /Digital Marketing/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /View My Work/i })).toBeVisible();
  });

  test('contact form is rendered without submitting data', async ({ page }) => {
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    const form = page.locator('#contact form');
    await expect(form).toBeVisible();
    await expect(form.locator('input').first()).toBeVisible();
    await expect(form.locator('textarea')).toBeVisible();
    await expect(form.getByRole('button', { name: /send|submit|inquiry/i })).toBeVisible();
  });

  test('critical assets do not return 404', async ({ page }) => {
    const failed: Array<{ status: number; url: string }> = [];
    page.on('response', (response) => {
      if (response.status() >= 400 && response.url().includes('/Karima-Moni/')) {
        failed.push({ status: response.status(), url: response.url() });
      }
    });
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    expect(failed, JSON.stringify(failed, null, 2)).toEqual([]);
  });
});
