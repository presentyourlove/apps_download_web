/**
 * Theme Initialization Script
 * 
 * WHY: 這個腳本必須在 <head> 中同步執行，以避免 FOUC (Flash of Unstyled Content)。
 * 如果等到 DOMContentLoaded 或外部腳本載入後才設定主題，使用者會看到短暫的主題閃爍。
 * 
 * SECURITY: 此腳本僅讀取 localStorage，不執行任何用戶輸入或外部資料，
 * 因此可安全地使用內嵌方式。未來若需移除 CSP 的 'unsafe-inline'，
 * 可使用 script hash 或 nonce 機制。
 */
'use strict';

(function () {
    try {
        const savedTheme = localStorage.getItem('pyl-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        const themeColor = savedTheme === 'dark' ? '#0f172a' : '#ffffff';
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', themeColor);
    } catch (e) {
        // Silently fail if localStorage is not available (e.g., private browsing)
        console.warn('Theme initialization failed:', e);
    }
})();
