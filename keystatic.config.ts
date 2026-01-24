import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: import.meta.env.PROD
    ? {
      kind: 'github',
      repo: 'presentyourlove/apps_download_web',
    }
    : {
      kind: 'local',
    },
  collections: {
    apps: collection({
      label: 'Apps',
      slugField: 'id',
      path: 'src/content/apps/**', // 支援巢狀結構
      format: { data: 'json' },
      schema: {
        id: fields.slug({ name: { label: 'App ID' } }),
        name: fields.text({ label: 'Name' }),
        displayName: fields.text({ label: 'Display Name' }),
        version: fields.text({ label: 'Version' }),
        releaseDate: fields.date({ label: 'Release Date' }),
        category: fields.text({ label: 'Category' }),
        scheme: fields.text({ label: 'URL Scheme' }),
        platforms: fields.object({
          android: fields.object({
            version: fields.text({ label: 'Android Version' }),
            minSdk: fields.integer({ label: 'Min SDK' }),
            downloadUrl: fields.url({ label: 'Download URL' }),
            size: fields.text({ label: 'Size (e.g. 50MB)' }),
          }),
          ios: fields.object({
            version: fields.text({ label: 'iOS Version' }),
            status: fields.select({
              label: 'Status',
              options: [
                { label: 'Released', value: 'released' },
                { label: 'Coming Soon', value: 'coming_soon' },
              ],
              defaultValue: 'coming_soon',
            }),
            expectedDate: fields.date({ label: 'Expected Date' }),
            minOS: fields.text({ label: 'Min OS' }),
          }),
          web: fields.object({
            version: fields.text({ label: 'Web Version' }),
            url: fields.url({ label: 'URL' }),
          }),
        }),
        changelog: fields.array(
          fields.object({
            version: fields.text({ label: 'Version' }),
            date: fields.date({ label: 'Date' }),
            changes: fields.array(fields.text({ label: 'Change' }), {
              label: 'Changes',
            }),
          }),
          { label: 'Changelog' }
        ),
      },
    }),
    blog: collection({
      label: 'Blog',
      slugField: 'slug',
      path: 'src/content/blog/**', // 支援 i18n
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Title' }),
        pubDate: fields.date({ label: 'Published Date' }),
        description: fields.text({ label: 'Description', multiline: true }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
  },
});
