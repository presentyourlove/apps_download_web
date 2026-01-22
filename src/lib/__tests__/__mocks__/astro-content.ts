// Mock for astro:content virtual module
// Used by Vitest to simulate Astro's content collections

export interface CollectionEntry<T> {
  data: T;
  id: string;
  slug: string;
  body: string;
  collection: string;
}

// Mock getCollection - returns empty array by default
export async function getCollection(_collection: string): Promise<CollectionEntry<unknown>[]> {
  return [];
}

// Mock type export
export type { CollectionEntry as ContentCollectionEntry };
