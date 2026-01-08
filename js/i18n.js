/**
 * Internationalization (i18n) Module
 * 多語系支援模組 - 支援繁體中文、英文、日文
 * 
 * 用法 (ES Module):
 * import { i18n } from './i18n.js';
 * await i18n.init();
 */

const STORAGE_KEY = 'pyl-language';
const DEFAULT_LANGUAGE = 'zh-TW';
const SUPPORTED_LANGUAGES = ['zh-TW', 'en'];

let translations = null;
let currentLanguage = DEFAULT_LANGUAGE;

/**
 * 載入翻譯檔
 */
async function loadTranslations() {
    try {
        const response = await fetch('./locales/translations.json');
        if (!response.ok) throw new Error('Failed to load translations');
        translations = await response.json();
        return true;
    } catch (error) {
        console.warn('i18n: 翻譯檔載入失敗，使用預設語言', error);
        return false;
    }
}

/**
 * 取得巢狀物件的值
 * @param {Object} obj - 物件
 * @param {string} path - 路徑 (e.g., "home.title")
 * @returns {string|null}
 */
function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, key) => {
        return acc && acc[key] !== undefined ? acc[key] : null;
    }, obj);
}

/**
 * 取得翻譯文字
 * @param {string} key - 翻譯鍵值 (e.g., "home.title")
 * @param {string} [fallback] - 備用文字
 * @returns {string}
 */
function t(key, fallback = '') {
    if (!translations || !translations[currentLanguage]) {
        return fallback || key;
    }

    const translation = getNestedValue(translations[currentLanguage], key);
    return translation || fallback || key;
}

/**
 * 套用翻譯至 DOM
 */
function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key, element.textContent);

        if (translation) {
            element.textContent = translation;
        }
    });

    // 更新 HTML lang 屬性
    if (document.documentElement) {
        document.documentElement.lang = currentLanguage === 'zh-TW' ? 'zh-TW' : currentLanguage;
    }
}

/**
 * 偵測使用者偏好語言
 * @returns {string}
 */
function detectLanguage() {
    // 1. 先檢查 localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
        return saved;
    }

    // 2. 檢查瀏覽器語言
    const browserLang = navigator.language || navigator.userLanguage;

    if (browserLang.startsWith('zh')) {
        return 'zh-TW';
    } else if (browserLang.startsWith('en')) {
        return 'en';
    }

    return DEFAULT_LANGUAGE;
}

/**
 * 設定語言
 * @param {string} lang - 語言代碼
 */
function setLanguage(lang) {
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
        console.warn(`i18n: 不支援的語言 "${lang}"`);
        return;
    }

    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations();

    // 觸發自訂事件
    document.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }));
}

/**
 * 取得目前語言
 * @returns {string}
 */
function getLanguage() {
    return currentLanguage;
}

/**
 * 取得支援的語言列表
 * @returns {string[]}
 */
function getSupportedLanguages() {
    return [...SUPPORTED_LANGUAGES];
}

/**
 * 初始化 i18n
 */
async function init() {
    currentLanguage = detectLanguage();
    await loadTranslations();
    applyTranslations();

    // console.log(`i18n: 已初始化，目前語言: ${currentLanguage}`);
}

// Export Public API
export const i18n = {
    init,
    t,
    setLanguage,
    getLanguage,
    getSupportedLanguages,
    applyTranslations
};
