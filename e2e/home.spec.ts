import { test, expect } from '@playwright/test';

test.describe('首頁測試', () => {
  test('應正確載入首頁', async ({ page }) => {
    await page.goto('');

    // 檢查頁面標題
    await expect(page).toHaveTitle(/Presentyourlove/);

    // 檢查歡迎標題
    await expect(page.locator('.welcome-title')).toBeVisible();
  });

  test('應顯示所有應用程式卡片', async ({ page }) => {
    await page.goto('');

    // 檢查應用程式網格存在
    await expect(page.locator('.app-grid')).toBeVisible();

    // 檢查至少有 1 個應用卡片
    const appCards = page.locator('.app-card');
    await expect(appCards).toHaveCount(3); // financeapp, subtrack, sub-buddy
  });

  test('應能點擊應用卡片導航至詳情頁', async ({ page }) => {
    await page.goto('');

    // 點擊第一個應用卡片
    const firstCard = page.locator('.app-card').first();
    await firstCard.click();

    // 等待導航完成 (URL 包含應用 ID)
    await page.waitForURL(/(financeapp|subtrack|sub-buddy)/);

    // 確認 URL 包含應用 ID
    await expect(page).toHaveURL(/(financeapp|subtrack|sub-buddy)/);
  });
});

test.describe('主題切換測試', () => {
  test('應能切換深淺主題', async ({ page }) => {
    await page.goto('');

    // 預設應為深色主題
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');

    // 點擊主題切換按鈕
    const themeBtn = page.locator('#theme-toggle');
    await themeBtn.click();

    // 確認切換為淺色主題
    await expect(html).toHaveAttribute('data-theme', 'light');

    // 再次點擊應切換回深色
    await themeBtn.click();
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });
});

test.describe('Header 導航測試', () => {
  test('應顯示桌面導航欄', async ({ page }) => {
    await page.goto('');

    // 桌面版應顯示導航
    await expect(page.locator('.desktop-nav')).toBeVisible();
  });

  test('應能導航至部落格', async ({ page }) => {
    await page.goto('');

    // 點擊部落格連結
    await page.click('a.nav-tab:has-text("部落格")');

    // 確認導航成功
    await expect(page).toHaveURL(/\/blog\//);
  });

  test('應能導航至關於我們', async ({ page }) => {
    await page.goto('');

    // 點擊關於我們連結
    await page.click('a.nav-tab:has-text("關於我們")');

    // 確認導航成功
    await expect(page).toHaveURL(/\/about\//);
  });
});
