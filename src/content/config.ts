import { defineCollection, z } from 'astro:content';

const appsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    name: z.string(),
    displayName: z.string(),
    version: z.string(),
    releaseDate: z.string(),
    scheme: z.string().optional(),
    platforms: z.object({
      android: z
        .object({
          version: z.string(),
          minSdk: z.number().optional(),
          downloadUrl: z.string().url().optional(),
          size: z.string().optional(),
        })
        .optional(),
      ios: z
        .object({
          version: z.string(),
          status: z.enum(['coming_soon', 'active']).optional(),
          expectedDate: z.string().optional(),
          minOS: z.string().optional(),
        })
        .optional(),
      web: z
        .object({
          version: z.string(),
          url: z.string().url(),
        })
        .optional(),
    }),
    changelog: z.array(
      z.object({
        version: z.string(),
        date: z.string(),
        changes: z.array(z.string()),
      })
    ),
  }),
});

export const collections = {
  apps: appsCollection,
};
