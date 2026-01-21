// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://presentyourlove.github.io',
  base: '/apps_download_web',
  output: 'static',

  prefetch: true,

  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap(),
    AstroPWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Presentyourlove 應用程式下載中心',
        short_name: 'Presentyourlove',
        description:
          'Presentyourlove 應用程式下載中心 - 提供 FinanceApp, SubTrack, Sub-Buddy 等應用程式下載',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        scope: '/apps_download_web/',
        start_url: '/apps_download_web/',
        icons: [
          {
            src: 'assets/presentyourlove-logo-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'assets/presentyourlove-logo-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'assets/presentyourlove-logo-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        navigateFallback: '/apps_download_web/404',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,json,webp}'],
        // 忽略一些不需快取的檔案
        globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js'],
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\/apps_download_web\//],
      },
    }),
  ],

  build: {
    assets: '_astro',
    inlineStylesheets: 'auto',
  },
});
