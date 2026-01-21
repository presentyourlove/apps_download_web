import type { CollectionEntry } from 'astro:content';

export type App = CollectionEntry<'apps'>['data'];

// 型別定義
export interface Platform {
  type: string;
  version: string;
  downloadUrl?: string;
  storeUrl?: string;
  minSdk?: number;
  minOS?: string;
  size?: string;
  url?: string;
  universalLink?: string;
  status?: 'coming_soon' | 'active';
  expectedDate?: string;
  altstore?: { status: string };
}

export interface Changelog {
  version: string;
  date: string;
  changes: string[];
}

export interface AppsData {
  lastUpdated: string;
  apps: App[];
}

import { getCollection } from 'astro:content';

// 資料獲取函式 (Build Time)
export async function getAppsData(): Promise<AppsData> {
  const apps = await getCollection('apps');
  return {
    lastUpdated: new Date().toISOString(),
    apps: apps.map((app) => app.data),
  };
}

// 輔助函式:將 platforms 物件轉為陣列
export function getPlatformsArray(app: App): Platform[] {
  // @ts-ignore: Object.entries deduction on optional keys
  return Object.entries(app.platforms).map(([type, details]) => ({
    type,
    ...(details as any),
  }));
}

// 輔助函式:依 ID 查詢應用程式
export function getAppById(apps: App[], id: string): App | undefined {
  return apps.find((app) => app.id === id);
}
