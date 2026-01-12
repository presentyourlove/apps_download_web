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
}

export interface Changelog {
    version: string;
    date: string;
    changes: string[];
}

export interface App {
    id: string;
    name: string;
    displayName: string;
    version: string;
    releaseDate: string;
    platforms: Record<string, Omit<Platform, 'type'>>;
    changelog: Changelog[];
}

export interface AppsData {
    lastUpdated: string;
    apps: App[];
}

// 資料獲取函式 (Build Time)
export async function getAppsData(): Promise<AppsData> {
    // 在 SSG build 時,使用 fs 讀取檔案
    const fs = await import('node:fs');
    const path = await import('node:path');

    const filePath = path.join(process.cwd(), 'public', 'api', 'versions.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
}

// 輔助函式:將 platforms 物件轉為陣列
export function getPlatformsArray(app: App): Platform[] {
    return Object.entries(app.platforms).map(([type, details]) => ({
        type,
        ...details
    }));
}

// 輔助函式:依 ID 查詢應用程式
export function getAppById(apps: App[], id: string): App | undefined {
    return apps.find(app => app.id === id);
}
