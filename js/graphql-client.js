/**
 * GraphQL Client 模組
 * 
 * 提供與 GraphQL Server 互動的客戶端功能,包含查詢定義與錯誤處理
 * 
 * @module graphql-client
 * @author Presentyourlove Team
 */

import { GraphQLClient, gql } from 'graphql-request';

// ==================== 設定 ====================

/**
 * GraphQL API 端點配置
 * 開發環境優先使用 localhost,生產環境可透過環境變數覆蓋
 */
const GRAPHQL_CONFIG = {
    // GraphQL Server 端點
    endpoint: 'http://localhost:4000/graphql',
    // 請求超時時間 (毫秒)
    timeout: 5000,
    // Retry 次數
    maxRetries: 2,
    // Cache 有效期限 (毫秒)
    cacheTimeout: 1000 * 60 * 5 // 5 分鐘
};

// ==================== GraphQL Client 初始化 ====================

/**
 * 建立 GraphQL Client 實例
 */
const client = new GraphQLClient(GRAPHQL_CONFIG.endpoint, {
    timeout: GRAPHQL_CONFIG.timeout,
    headers: {
        'Content-Type': 'application/json'
    }
});

// ==================== Query 定義 ====================

/**
 * 查詢所有應用程式基本資訊
 */
const GET_ALL_APPS = gql`
  query GetAllApps {
    apps {
      id
      name
      displayName
      version
      releaseDate
    }
  }
`;

/**
 * 查詢特定應用程式完整資訊
 */
const GET_APP_DETAIL = gql`
  query GetAppDetail($id: String!) {
    app(id: $id) {
      id
      name
      displayName
      version
      releaseDate
      platforms {
        type
        version
        downloadUrl
        storeUrl
        minSdk
        minOS
        size
        url
      }
      changelog {
        version
        date
        changes
      }
    }
  }
`;

/**
 * 查詢指定平台的應用程式
 */
const GET_APPS_BY_PLATFORM = gql`
  query GetAppsByPlatform($platform: String!) {
    appsByPlatform(platform: $platform) {
      id
      name
      displayName
      version
    }
  }
`;

/**
 * 查詢最後更新時間
 */
const GET_LAST_UPDATED = gql`
  query GetLastUpdated {
    lastUpdated
  }
`;

// ==================== Cache 機制 ====================

const cache = new Map();

/**
 * 從快取取得資料
 * @param {string} key - 快取鍵值
 * @returns {Object|null} 快取資料或 null
 */
function getFromCache(key) {
    const cached = cache.get(key);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > GRAPHQL_CONFIG.cacheTimeout) {
        cache.delete(key);
        return null;
    }

    return cached.data;
}

/**
 * 將資料存入快取
 * @param {string} key - 快取鍵值
 * @param {Object} data - 要快取的資料
 */
function setCache(key, data) {
    cache.set(key, {
        data,
        timestamp: Date.now()
    });
}

// ==================== API 函式 ====================

/**
 * 查詢所有應用程式
 * @param {Object} options - 選項
 * @param {boolean} options.useCache - 是否使用快取 (預設: true)
 * @returns {Promise<Object>} 應用程式資料
 */
export async function queryAllApps(options = { useCache: true }) {
    const cacheKey = 'all_apps';

    // 嘗試從快取讀取
    if (options.useCache) {
        const cached = getFromCache(cacheKey);
        if (cached) {
            return cached;
        }
    }

    try {
        const data = await client.request(GET_ALL_APPS);
        setCache(cacheKey, data);
        return data;
    } catch (error) {
        console.error('GraphQL 查詢失敗 (queryAllApps):', error);
        throw error;
    }
}

/**
 * 查詢特定應用程式詳細資訊
 * @param {string} appId - 應用程式 ID
 * @param {Object} options - 選項
 * @param {boolean} options.useCache - 是否使用快取 (預設: true)
 * @returns {Promise<Object>} 應用程式詳細資料
 */
export async function queryAppDetail(appId, options = { useCache: true }) {
    const cacheKey = `app_${appId}`;

    // 嘗試從快取讀取
    if (options.useCache) {
        const cached = getFromCache(cacheKey);
        if (cached) {
            return cached;
        }
    }

    try {
        const data = await client.request(GET_APP_DETAIL, { id: appId });
        setCache(cacheKey, data);
        return data;
    } catch (error) {
        console.error(`GraphQL 查詢失敗 (queryAppDetail: ${appId}):`, error);
        throw error;
    }
}

/**
 * 查詢指定平台的應用程式
 * @param {string} platform - 平台類型 (android, ios, web)
 * @param {Object} options - 選項
 * @param {boolean} options.useCache - 是否使用快取 (預設: true)
 * @returns {Promise<Object>} 平台應用程式清單
 */
export async function queryAppsByPlatform(platform, options = { useCache: true }) {
    const cacheKey = `platform_${platform}`;

    // 嘗試從快取讀取
    if (options.useCache) {
        const cached = getFromCache(cacheKey);
        if (cached) {
            return cached;
        }
    }

    try {
        const data = await client.request(GET_APPS_BY_PLATFORM, { platform });
        setCache(cacheKey, data);
        return data;
    } catch (error) {
        console.error(`GraphQL 查詢失敗 (queryAppsByPlatform: ${platform}):`, error);
        throw error;
    }
}

/**
 * 查詢最後更新時間
 * @returns {Promise<string>} 最後更新時間 (ISO 8601 格式)
 */
export async function queryLastUpdated() {
    try {
        const data = await client.request(GET_LAST_UPDATED);
        return data.lastUpdated;
    } catch (error) {
        console.error('GraphQL 查詢失敗 (queryLastUpdated):', error);
        throw error;
    }
}

/**
 * 清除所有快取
 */
export function clearCache() {
    cache.clear();
}

// ==================== 健康檢查 ====================

/**
 * 檢查 GraphQL Server 是否可用
 * @returns {Promise<boolean>} Server 狀態
 */
export async function checkGraphQLHealth() {
    try {
        await queryLastUpdated();
        return true;
    } catch (error) {
        console.warn('GraphQL Server 無法連線:', error);
        return false;
    }
}

// ==================== 匯出 Client (進階使用) ====================

/**
 * 匯出原始 GraphQL Client (供進階使用)
 */
export { client };
