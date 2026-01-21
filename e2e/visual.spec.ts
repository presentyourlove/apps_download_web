import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
    test('home page matches snapshot', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveScreenshot('home-page.png', { fullPage: true });
    });

    test('blog page matches snapshot', async ({ page }) => {
        await page.goto('/blog/');
        await expect(page).toHaveScreenshot('blog-page.png', { fullPage: true });
    });

    test('app detail page matches snapshot', async ({ page }) => {
        await page.goto('/financeapp/');
        await expect(page).toHaveScreenshot('financeapp-page.png', { fullPage: true });
    });
});
