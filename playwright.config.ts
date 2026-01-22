import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E 測試設定
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // 測試目錄
  testDir: './e2e',

  // 每個測試的超時時間
  timeout: 30 * 1000,

  // 預期 (expect) 的超時時間
  expect: {
    timeout: 5000,
  },

  // 完整並行執行
  fullyParallel: true,

  // 禁止 test.only 在 CI 上執行
  forbidOnly: !!process.env.CI,

  // 測試失敗時重試次數
  retries: process.env.CI ? 2 : 0,

  // CI 上限制 worker 數量
  workers: process.env.CI ? 1 : undefined,

  // Reporter 設定
  reporter: [['html', { open: 'never' }], ['list']],

  // 共用設定
  use: {
    // 基礎 URL (需先啟動 preview server)
    baseURL: 'http://localhost:4321/apps_download_web/',

    // 收集追蹤資訊 (僅在失敗時)
    trace: 'on-first-retry',

    // 螢幕截圖 (僅在失敗時)
    screenshot: 'only-on-failure',
  },

  // 瀏覽器設定
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // 行動裝置測試
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  // 自動啟動開發伺服器
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4321/apps_download_web/',
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000,
  },
});
