import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import AstroPWA from '@vite-pwa/astro';
import keystatic from '@keystatic/astro';
import sentry from '@sentry/astro';
import partytown from '@astrojs/partytown';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://presentyourlove.github.io',
  base: '/apps_download_web',
  output: 'static',

  prefetch: true,

  env: {
    schema: {
      PUBLIC_ANALYTICS_ID: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_ANALYTICS_SCRIPT_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        url: true,
      }),
      PUBLIC_SENTRY_DSN: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },

  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap(),
    process.env.NODE_ENV !== 'production' ? keystatic() : null,
    sentry({
      dsn: process.env.PUBLIC_SENTRY_DSN,
      ...(process.env.SENTRY_AUTH_TOKEN && {
        sourceMapsUploadOptions: {
          project: 'apps_download_web',
          authToken: process.env.SENTRY_AUTH_TOKEN,
        },
      }),
    }),
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
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MiB
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,json,webp}'],
        // 忽略一些不需快取的檔案
        globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\/apps_download_web\//],
      },
    }),
    // Partytown: 將第三方腳本移至 Web Worker
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    // Compress: 建置時壓縮資源 (放最後)
    compress({
      CSS: true,
      HTML: true,
      Image: false, // 圖片已由 Astro Image 優化
      JavaScript: true,
      SVG: true,
      Logger: 1,
    }),
  ],

  build: {
    assets: '_astro',
    inlineStylesheets: 'auto',
  },
});
