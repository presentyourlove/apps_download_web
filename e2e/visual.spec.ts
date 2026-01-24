import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  // CI 跳過視覺測試 (因平台差異導致截圖不一致)
  // 本地執行: npx playwright test e2e/visual.spec.ts --update-snapshots
  test.skip(!!process.env.CI, 'Skip visual regression in CI due to platform differences');

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
