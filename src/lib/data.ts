import { getCollection, type CollectionEntry } from 'astro:content';

export type App = CollectionEntry<'apps'>['data'];

/**
 * 取得所有應用程式資料 (Build Time)
 */
export async function getAppsData() {
  const apps = await getCollection('apps');
  return {
    lastUpdated: new Date().toISOString(),
    apps: apps.map((app) => app.data),
  };
}

/**
 * 輔助函式:將 platforms 物件轉為陣列
 * 使用嚴格型別映射，確保輸出的物件符合預期
 */
export function getPlatformsArray(app: App) {
  const platforms: Array<{ type: string } & Record<string, unknown>> = [];

  if (app.platforms.android) {
    platforms.push({ type: 'android', ...app.platforms.android });
  }
  if (app.platforms.ios) {
    platforms.push({ type: 'ios', ...app.platforms.ios });
  }
  if (app.platforms.web) {
    platforms.push({ type: 'web', ...app.platforms.web });
  }

  return platforms;
}

/**
 * 輔助函式:依 ID 查詢應用程式
 */
export function getAppById(apps: App[], id: string) {
  return apps.find((app) => app.id === id);
}
