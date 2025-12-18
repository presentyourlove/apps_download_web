import { test, expect } from '@playwright/test';

test.describe('Apps Download Center E2E Tests', () => {

    // 1. 首頁測試
    test('Homepage should load correctly', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Presentyourlove/);

        // 檢查主要導航是否存在
        const nav = page.locator('.desktop-nav');
        await expect(nav).toBeVisible();

        // 檢查是否有 App 卡片
        const appCards = page.locator('.app-card');
        await expect(appCards).toHaveCount(3); // 應該有 3 個 App
    });

    // 2. 內容頁測試 (FinanceApp)
    test('FinanceApp page should show download options', async ({ page }) => {
        await page.goto('/financeapp-content.html');
        await expect(page).toHaveTitle(/FinanceApp/);

        // 檢查下載區域
        const downloadSection = page.locator('.download-options');
        await expect(downloadSection).toBeVisible();
        await expect(page.getByText('下載 APK', { exact: true })).toBeVisible();
    });

    // 3. 內容頁測試 (SubTrack)
    test('SubTrack page should show iOS link', async ({ page }) => {
        await page.goto('/subtrack-content.html');
        await expect(page).toHaveTitle(/SubTrack/);
        await expect(page.getByText('前往商店')).toBeVisible();
    });

    // 4. 404 頁面測試
    test('404 Page should exist', async ({ page }) => {
        await page.goto('/404.html');
        await expect(page.locator('.error-code')).toHaveText('404');
        await expect(page.locator('.btn-primary')).toHaveText('返回首頁');
    });

    // 5. 主題切換測試
    test('Theme toggle should work', async ({ page }) => {
        await page.goto('/');
        const toggleBtn = page.locator('#theme-toggle');

        // 預設為暗色模式 (data-theme="dark")
        await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

        // 點擊切換
        await toggleBtn.click();
        await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    });
});
