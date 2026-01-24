/**
 * Stryker Mutation Testing 設定
 * @see https://stryker-mutator.io/docs/stryker-js/configuration
 *
 * 執行突變測試: npx stryker run
 * 注意: 突變測試耗時較長，建議手動執行，不納入 CI。
 */
export default {
    // 要突變的檔案 (測試目標)
    mutate: ['src/lib/**/*.ts', '!src/lib/__tests__/**', '!src/lib/pwa.ts'],

    // 測試執行器
    testRunner: 'vitest',

    // 報告器設定
    reporters: ['clear-text', 'progress', 'html'],

    // 覆蓋率分析模式
    coverageAnalysis: 'perTest',

    // 超時設定 (突變後的測試可能更慢)
    timeoutMS: 60000,
    timeoutFactor: 2.5,

    // 並行執行的突變數量
    concurrency: 4,

    // 略過純型別檔案和 PWA 模組 (依賴虛擬模組)
    disableTypeChecks: 'src/**/*.{js,ts,tsx}',
};
