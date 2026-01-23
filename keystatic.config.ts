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
      path: 'src/content/apps/*',
      format: { data: 'json' },
      schema: {
        id: fields.slug({ name: { label: 'App ID' } }),
        name: fields.text({ label: 'Name' }),
        displayName: fields.text({ label: 'Display Name' }),
        version: fields.text({ label: 'Version' }),
        releaseDate: fields.date({ label: 'Release Date' }),
        platforms: fields.object({
          android: fields.object({
            version: fields.text({ label: 'Android Version' }),
            downloadUrl: fields.url({ label: 'Download URL' }),
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
          }),
          web: fields.object({
            version: fields.text({ label: 'Web Version' }),
            url: fields.url({ label: 'URL' }),
          }),
        }),
      },
    }),
  },
});
