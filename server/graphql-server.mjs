/**
 * GraphQL Server - Apps Download API
 * 
 * 提供應用程式版本資訊的 GraphQL API 服務
 * 
 * @author Presentyourlove Team
 * @version 1.0.0
 */

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// 取得當前檔案路徑 (ESM 環境)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ==================== GraphQL Schema 定義 ====================

const typeDefs = `#graphql
  """
  應用程式平台資訊
  """
  type Platform {
    """平台類型 (android, ios, web)"""
    type: String!
    
    """應用程式版本號"""
    version: String!
    
    """下載網址 (直接下載 APK 等)"""
    downloadUrl: String
    
    """商店網址 (App Store, Google Play)"""
    storeUrl: String
    
    """Android 最低 SDK 版本"""
    minSdk: Int
    
    """iOS 最低系統版本"""
    minOS: String
    
    """應用程式大小"""
    size: String
    
    """App 網址 (Web App 專用)"""
    url: String
  }

  """
  應用程式變更記錄
  """
  type Changelog {
    """版本號"""
    version: String!
    
    """發布日期 (YYYY-MM-DD)"""
    date: String!
    
    """變更項目清單"""
    changes: [String!]!
  }

  """
  應用程式詳細資訊
  """
  type App {
    """應用程式唯一識別碼"""
    id: ID!
    
    """應用程式英文名稱"""
    name: String!
    
    """應用程式顯示名稱 (中文)"""
    displayName: String!
    
    """目前版本號"""
    version: String!
    
    """發布日期 (YYYY-MM-DD)"""
    releaseDate: String!
    
    """支援平台清單"""
    platforms: [Platform!]!
    
    """變更記錄"""
    changelog: [Changelog!]!
  }

  """
  可用查詢 (Queries)
  """
  type Query {
    """
    取得所有應用程式清單
    """
    apps: [App!]!
    
    """
    取得特定應用程式詳細資訊
    """
    app(id: String!): App
    
    """
    依平台類型篩選應用程式
    @param platform - 平台類型 (android, ios, web)
    """
    appsByPlatform(platform: String!): [App!]!
    
    """
    取得最後更新時間
    """
    lastUpdated: String!
  }
`;

// ==================== 資料來源 ====================

/**
 * 從 versions.json 讀取應用程式資料
 * @returns {Promise<Object>} 應用程式資料
 */
async function loadAppsData() {
  try {
    const dataPath = join(__dirname, '../api/versions.json');
    const fileContent = await readFile(dataPath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('無法讀取 versions.json:', error);
    throw new Error('資料來源載入失敗');
  }
}

// ==================== GraphQL Resolvers ====================

const resolvers = {
  Query: {
    /**
     * 查詢所有應用程式
     */
    apps: async () => {
      const data = await loadAppsData();
      return data.apps;
    },

    /**
     * 查詢特定應用程式
     * @param {Object} _ - Parent (未使用)
     * @param {Object} args - 查詢參數
     * @param {string} args.id - 應用程式 ID
     */
    app: async (_, { id }) => {
      const data = await loadAppsData();
      return data.apps.find(app => app.id === id) || null;
    },

    /**
     * 依平台篩選應用程式
     * @param {Object} _ - Parent (未使用)
     * @param {Object} args - 查詢參數
     * @param {string} args.platform - 平台類型
     */
    appsByPlatform: async (_, { platform }) => {
      const data = await loadAppsData();
      return data.apps.filter(app => 
        Object.keys(app.platforms).includes(platform)
      );
    },

    /**
     * 取得最後更新時間
     */
    lastUpdated: async () => {
      const data = await loadAppsData();
      return data.lastUpdated;
    }
  },

  /**
   * Platform 類型解析器
   * 將 platforms 物件轉換為 GraphQL Platform 陣列
   */
  App: {
    platforms: (parent) => {
      return Object.entries(parent.platforms).map(([type, details]) => ({
        type,
        ...details
      }));
    }
  }
};

// ==================== Apollo Server 初始化 ====================

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // 啟用 GraphQL Playground (開發環境)
  introspection: true,
  // 格式化錯誤訊息
  formatError: (formattedError, error) => {
    console.error('GraphQL Error:', error);
    return {
      message: formattedError.message,
      locations: formattedError.locations,
      path: formattedError.path
    };
  }
});

// ==================== 啟動伺服器 ====================

const PORT = process.env.GRAPHQL_PORT || 4000;

startStandaloneServer(server, {
  listen: { port: PORT },
}).then(({ url }) => {
  console.log(`🚀 GraphQL Server 已啟動於 ${url}`);
  console.log(`📊 GraphQL Playground: ${url}`);
  console.log(`💡 提示: 在瀏覽器中開啟 ${url} 即可進行互動式查詢`);
}).catch((error) => {
  console.error('❌ GraphQL Server 啟動失敗:', error);
  process.exit(1);
});

// ==================== 優雅停機處理 ====================

process.on('SIGINT', () => {
  console.log('\n⏸️  正在關閉 GraphQL Server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n⏸️  正在關閉 GraphQL Server...');
  process.exit(0);
});
