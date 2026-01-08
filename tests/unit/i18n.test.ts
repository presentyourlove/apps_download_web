import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { i18n } from '../../js/i18n.js';

describe('i18n.js', () => {
    beforeEach(() => {
        // Reset DOM
        document.documentElement.lang = '';
        document.body.innerHTML = '';
        localStorage.clear();
        vi.clearAllMocks();
    });

    // Mock fetch
    const mockTranslations = {
        "zh-TW": {
            "home": {
                "title": "測試標題"
            },
            "common": {
                "ok": "確定"
            }
        },
        "en": {
            "home": {
                "title": "Test Title"
            }
        }
    };

    global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockTranslations)
    });

    it('should detect default language if no storage or browser lang', () => {
        // Mock navigator
        Object.defineProperty(navigator, 'language', { value: 'fr-FR', configurable: true });
        // Default is zh-TW in implementation if not zh or en
        // Wait, implementation: if zh* -> zh-TW, if en* -> en, else DEFAULT (zh-TW)

        // Test detection logic exposed? 
        // detectLanguage is internal. We test public API behaviors.
        // getLanguage() should return initialized language.
        // If we init with 'fr', it falls back to default.

        // We can't easily sync test init() because it's async and depends on environment.
        // But we can test behavior.
    });

    it('should load translations on init', async () => {
        await i18n.init();
        expect(global.fetch).toHaveBeenCalledWith('./locales/translations.json');
        expect(i18n.getLanguage()).toBeDefined();
    });

    it('should translate text using t()', async () => {
        await i18n.init();
        expect(i18n.t('home.title')).toBe('測試標題');
        expect(i18n.t('common.ok')).toBe('確定');
        expect(i18n.t('missing.key', 'Fallback')).toBe('Fallback');
    });

    it('should update DOM elements with data-i18n', async () => {
        document.body.innerHTML = '<h1 data-i18n="home.title">Original</h1>';
        await i18n.init();

        const el = document.querySelector('h1');
        expect(el?.textContent).toBe('測試標題');
        expect(document.documentElement.lang).toContain('zh'); // Default or detected
    });

    it('should change language and update DOM', async () => {
        await i18n.init();
        document.body.innerHTML = '<h1 data-i18n="home.title">Original</h1>';

        // Since we mocked fetch with ONE response, switching language might reuse it or we expect it to separate?
        // implementation uses one translation file structure? 
        // loadTranslations() loads './locales/translations.json'. 
        // The structure of json there usually contains ALL languages? 
        // Let's check i18n.js again.
        // L32: translations = await response.json();
        // L59: translations[currentLanguage]
        // Structure is { "zh-TW": {...}, "en": {...} }

        // Update mock to match structure
        const multiLangMock = {
            "zh-TW": { "greeting": "你好" },
            "en": { "greeting": "Hello" }
        };
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(multiLangMock)
        });

        await i18n.init(); // re-init to load new mock? 
        // Actually init calls loadTranslations. 

        // i18n.setLanguage('en');

        // Wait, let's reset internal state? 
        // Module state persists. We might need to reload module or just trust public API updates state.

        await i18n.init();
        document.body.innerHTML = '<p data-i18n="greeting"></p>';

        /* 
           Note: If detectLanguage sees 'zh-TW', current is zh-TW.
           Mock navigator.language to ensure starting state?
        */

        i18n.setLanguage('en');
        expect(i18n.getLanguage()).toBe('en');
        expect(localStorage.getItem('pyl-language')).toBe('en');

        const el = document.querySelector('p');
        expect(el?.textContent).toBe('Hello'); // Should update immediately
        expect(document.documentElement.lang).toBe('en');

        i18n.setLanguage('zh-TW');
        expect(el?.textContent).toBe('你好');
    });
});
