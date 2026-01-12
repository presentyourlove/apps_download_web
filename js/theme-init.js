/**
 * 主題初始化腳本 (Theme Initialization Script)
 * 
 * WHY: 這個腳本必須在 <head> 中同步執行，以避免 FOUC (Flash of Unstyled Content)。
 * 如果等到 DOMContentLoaded 或外部腳本載入後才設定主題，使用者會看到短暫的主題閃爍。
 * 
 * SECURITY: 此腳本僅讀取 localStorage，不執行任何用戶輸入或外部資料，
 * 因此可安全地使用內嵌方式。未來若需移除 CSP 的 'unsafe-inline'，
 * 可使用 script hash 或 nonce 機制。
 * 
 * MODES:
 * - 'light': 強制淺色模式
 * - 'dark': 強制深色模式  
 * - 'system': 跟隨作業系統設定 (prefers-color-scheme)
 */
'use strict';

(function () {
    /**
     * 檢查是否在深色模式時間範圍內 (18:00 - 06:00)
     * @returns {boolean}
     */
    function isNightTime() {
        const hour = new Date().getHours();
        return hour >= 18 || hour < 6;
    }

    /**
     * 根據設定取得實際的主題色
     * @param {string} savedTheme - 儲存的主題設定 ('light' | 'dark' | 'system' | 'schedule')
     * @returns {string} 實際要套用的主題 ('light' | 'dark')
     */
    function getEffectiveTheme(savedTheme) {
        if (savedTheme === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return prefersDark ? 'dark' : 'light';
        }
        if (savedTheme === 'schedule') {
            return isNightTime() ? 'dark' : 'light';
        }
        return savedTheme;
    }

    /**
     * 套用主題到 document
     * @param {string} theme - 主題色 ('light' | 'dark')
     */
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const themeColor = theme === 'dark' ? '#0f172a' : '#ffffff';
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', themeColor);
    }

    try {
        // 支援四種模式：light, dark, system, schedule (預設為 dark)
        const savedTheme = localStorage.getItem('pyl-theme') || 'dark';
        const effectiveTheme = getEffectiveTheme(savedTheme);
        applyTheme(effectiveTheme);

        // 監聽系統主題變更（僅當設定為 'system' 時生效）
        if (savedTheme === 'system') {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
                const newTheme = e.matches ? 'dark' : 'light';
                applyTheme(newTheme);
            });
        }
    } catch (e) {
        // 如果 localStorage 無法存取，則靜默失敗
        console.warn('主題初始化失敗:', e);
    }
})();
