/**
 * Utility Functions Module
 * 通用工具函式庫 - 純函式 (Pure Functions)
 * 
 * 用法: import { compareVersions, getThemeFromSchedule } from './utils.js';
 */

/**
 * 比較版本號
 * @param {string} v1 - 本地版本 (e.g., '1.0.0')
 * @param {string} v2 - 遠端版本 (e.g., '1.0.1')
 * @returns {number} - 0:相等, 1:v1大, -1:v2大 (需要更新)
 */
export function compareVersions(v1, v2) {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);

    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
        const p1 = parts1[i] || 0;
        const p2 = parts2[i] || 0;

        if (p1 > p2) return 1;
        if (p1 < p2) return -1;
    }
    return 0;
}

/**
 * 根據排程判斷目前應使用的佈景主題
 * @param {Date} [now] - 目前時間 (可選，預設為 new Date())
 * @returns {'dark'|'light'}
 */
export function getThemeFromSchedule(now = new Date()) {
    const hour = now.getHours();
    // 晚上 6 點 (18:00) 到 早上 6 點 (06:00) 為深色模式
    const isNight = hour >= 18 || hour < 6;
    return isNight ? 'dark' : 'light';
}
