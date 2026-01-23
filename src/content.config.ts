import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import path from 'node:path';
import process from 'node:process';

const appsCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: path.join(process.cwd(), 'src/content/apps') }),
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

const blogCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: path.join(process.cwd(), 'src/content/blog'),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      description: z.string(),
      author: z.string().optional(),
      heroImage: image().optional(),
      image: z
        .object({
          url: z.string(),
          alt: z.string(),
        })
        .optional(),
      tags: z.array(z.string()).optional(),
    }),
});

export const collections = {
  apps: appsCollection,
  blog: blogCollection,
};
