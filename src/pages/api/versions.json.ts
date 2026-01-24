import { getAppsData } from '../../lib/data';
import { z } from 'astro:content';

// Define the Contract Schema
// This ensures that we don't accidentally break the API for existing apps
const VersionsApiResponseSchema = z.object({
  lastUpdated: z.string().datetime(),
  apps: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      displayName: z.string(),
      version: z.string(),
      releaseDate: z.string(),
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
      changelog: z
        .array(
          z.object({
            version: z.string(),
            date: z.string(),
            changes: z.array(z.string()),
          })
        )
        .optional(),
    })
  ),
});

export async function GET() {
  const data = await getAppsData();

  // Validate against the contract
  const result = VersionsApiResponseSchema.safeParse(data);

  if (!result.success) {
    console.error(
      'API Contract Violation: versions.json output does not match schema.',
      result.error
    );
    // In production, you might want to return 500 or fallback.
    // For static build, throwing error is good to stop deployment of broken API.
    throw new Error(`API Contract Violation: ${result.error.message}`);
  }

  return new Response(JSON.stringify(result.data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getStaticPaths() {
  return [{ params: { path: 'versions.json' } }];
}
