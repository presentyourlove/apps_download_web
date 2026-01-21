import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, , lang] = url.pathname.split('/');
  // base path 是 /apps_download_web
  // 所以路徑會是 /apps_download_web/en/...
  // split 後會是 ['', 'apps_download_web', 'en', ...]
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
    const cleanPath = path.replace(/^\//, '');

    if (l === defaultLang) {
      return `${baseUrl}/${cleanPath}`;
    }
    return `${baseUrl}/${l}/${cleanPath}`;
  };
}
