import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  // 由于 CI 環境 (Linux) 與本地 (Windows) 截圖不一致且缺乏基準圖，暫時在 CI 跳過
  test.skip(!!process.env.CI, 'Skip visual regression in CI due to missing snapshots');

  test('home page matches snapshot', async ({ page }) => {
    await page.goto('');
    await expect(page).toHaveScreenshot('home-page.png', { fullPage: true });
  });

  test('blog page matches snapshot', async ({ page }) => {
    await page.goto('blog/');
    await expect(page).toHaveScreenshot('blog-page.png', { fullPage: true });
  });

  test('app detail page matches snapshot', async ({ page }) => {
    await page.goto('financeapp/');
    await expect(page).toHaveScreenshot('financeapp-page.png', { fullPage: true });
  });
});
