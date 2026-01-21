import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // 測試環境
    environment: 'node',

    // 包含測試檔案
    include: ['src/**/*.{test,spec}.{js,ts}'],

    // 排除目錄
    exclude: ['node_modules', 'dist', '.astro'],

    // 覆蓋率設定
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/lib/**/*.ts'],
      exclude: ['src/lib/pwa.ts'], // PWA 模組使用虛擬模組，無法測試
    },

    // 全域設定
    globals: true,
  },
});
