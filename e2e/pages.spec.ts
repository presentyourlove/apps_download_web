import { test, expect } from '@playwright/test';

test.describe('404 頁面測試', () => {
    test('應顯示 404 錯誤頁面', async ({ page }) => {
        // 訪問不存在的頁面
        await page.goto('/nonexistent-page-xyz/');

        // 檢查 404 錯誤碼
        await expect(page.locator('.error-code')).toContainText('404');
    });

    test('應顯示快速導覽連結', async ({ page }) => {
        await page.goto('/nonexistent-page-xyz/');

        // 檢查快速導覽區塊
        await expect(page.locator('.quick-nav')).toBeVisible();

        // 檢查導覽連結
        await expect(page.locator('.nav-link-btn')).toHaveCount(3);
    });

    test('應顯示應用程式推薦', async ({ page }) => {
        await page.goto('/nonexistent-page-xyz/');

        // 檢查應用程式區塊
        await expect(page.locator('.apps-section')).toBeVisible();

        // 檢查應用卡片
        await expect(page.locator('.app-card-mini')).toHaveCount(3);
    });

    test('應能從 404 頁面返回首頁', async ({ page }) => {
        await page.goto('/nonexistent-page-xyz/');

        // 點擊返回首頁按鈕
        await page.click('.btn-primary:has-text("返回首頁")');

        // 確認回到首頁
        await expect(page).toHaveURL(/\/$/);
    });
});

test.describe('部落格頁面測試', () => {
    test('應正確載入部落格列表', async ({ page }) => {
        await page.goto('/blog/');

        // 檢查頁面標題
        await expect(page).toHaveTitle(/部落格|Blog/i);
    });

    test('應能點擊文章進入詳情頁', async ({ page }) => {
        await page.goto('/blog/');

        // 等待文章卡片載入
        const articleCard = page.locator('a[href*="/blog/"]').first();

        if (await articleCard.isVisible()) {
            await articleCard.click();

            // 確認導航到文章詳情頁
            await expect(page).toHaveURL(/\/blog\/.+\//);
        }
    });
});

test.describe('應用詳情頁測試', () => {
    test('應正確載入 FinanceApp 詳情頁', async ({ page }) => {
        await page.goto('/financeapp/');

        // 檢查頁面載入成功
        await expect(page).toHaveURL(/\/financeapp\//);

        // 檢查頁面標題包含應用名稱
        await expect(page).toHaveTitle(/FinanceApp|智慧理財/i);
    });

    test('應顯示下載選項', async ({ page }) => {
        await page.goto('/financeapp/');

        // 檢查下載區塊或按鈕存在
        const downloadSection = page.locator('.download-section, .download-card, .btn-primary');
        await expect(downloadSection.first()).toBeVisible();
    });
});
