// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://presentyourlove.github.io',
    base: '/apps_download_web',
    output: 'static',

    integrations: [
        sitemap()
    ],

    build: {
        assets: '_astro',
        inlineStylesheets: 'auto'
    }
});
