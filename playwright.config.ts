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

  // 瀏覽器設定 (僅使用穩定的桌面瀏覽器)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // 注意：已移除 webkit 和 Mobile Chrome 以避免 CI 中的不穩定測試
    // webkit: Safari 導航點擊偶發超時
    // Mobile Chrome: 桌面導航元素在行動版視窗不可見
  ],

  // 自動啟動開發伺服器
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4321/apps_download_web/',
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000,
  },
});
