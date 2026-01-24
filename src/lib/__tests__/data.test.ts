import { describe, it, expect } from 'vitest';
import { getPlatformsArray, getAppById, type App } from '../data';

// 測試用模擬資料
const mockApp: App = {
  id: 'testapp',
  name: 'TestApp',
  displayName: '測試應用程式',
  version: '1.0.0',
  releaseDate: '2026-01-01',
  platforms: {
    android: {
      version: '1.0.0',
      downloadUrl: 'https://example.com/download.apk',
      minSdk: 21,
      size: '50MB',
    },
    ios: {
      version: '1.0.0',
      minOS: '14.0',
    },
    web: {
      version: '1.0.0',
      url: 'https://example.com',
    },
  },
  changelog: [
    {
      version: '1.0.0',
      date: '2026-01-01',
      changes: ['初始版本'],
    },
  ],
};

const mockApps: App[] = [
  mockApp,
  {
    id: 'otherapp',
    name: 'OtherApp',
    displayName: '其他應用程式',
    version: '2.0.0',
    releaseDate: '2026-01-15',
    platforms: {
      web: {
        version: '2.0.0',
        url: 'https://other.example.com',
      },
    },
    changelog: [],
  },
];

describe('getPlatformsArray', () => {
  it('應正確將 platforms 物件轉換為陣列', () => {
    const result = getPlatformsArray(mockApp);

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(3);
  });

  it('應在每個平台項目中包含 type 屬性', () => {
    const result = getPlatformsArray(mockApp);

    const types = result.map((p) => p.type);
    expect(types).toContain('android');
    expect(types).toContain('ios');
    expect(types).toContain('web');
  });

  it('應保留原始平台屬性', () => {
    const result = getPlatformsArray(mockApp);

    const android = result.find((p) => p.type === 'android');
    expect(android).toBeDefined();
    expect(android?.version).toBe('1.0.0');
    expect(android?.downloadUrl).toBe('https://example.com/download.apk');
    expect(android?.minSdk).toBe(21);
    expect(android?.size).toBe('50MB');
  });

  it('應正確處理僅有單一平台的應用程式', () => {
    const singlePlatformApp: App = {
      ...mockApp,
      platforms: {
        web: { version: '1.0.0', url: 'https://test.com' },
      },
    };

    const result = getPlatformsArray(singlePlatformApp);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('web');
  });
});

describe('getAppById', () => {
  it('應根據 ID 回傳正確的應用程式', () => {
    const result = getAppById(mockApps, 'testapp');

    expect(result).toBeDefined();
    expect(result?.id).toBe('testapp');
    expect(result?.name).toBe('TestApp');
  });

  it('應回傳第二個應用程式', () => {
    const result = getAppById(mockApps, 'otherapp');

    expect(result).toBeDefined();
    expect(result?.id).toBe('otherapp');
    expect(result?.name).toBe('OtherApp');
  });

  it('找不到應用程式時應回傳 undefined', () => {
    const result = getAppById(mockApps, 'nonexistent');

    expect(result).toBeUndefined();
  });

  it('空陣列時應回傳 undefined', () => {
    const result = getAppById([], 'testapp');

    expect(result).toBeUndefined();
  });
});
