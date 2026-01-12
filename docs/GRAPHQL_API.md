# GraphQL API 文件

本文件說明 `apps_download_web` 專案的 GraphQL API 使用方式,包含完整的 Schema 定義、Query 範例與最佳實踐。

---

## 📡 端點資訊

### 開發環境

- **GraphQL Endpoint**: `http://localhost:4000/graphql`
- **Apollo Sandbox**: `http://localhost:4000/` (互動式查詢介面)

### 生產環境

- **GraphQL Endpoint**: `https://your-domain.com/graphql` (需透過 Nginx Proxy)

---

## 📋 Schema 定義

### Type: App

應用程式完整資訊。

```graphql
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
```

---

### Type: Platform

平台資訊 (Android, iOS, Web)。

```graphql
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
```

---

### Type: Changelog

應用程式變更記錄。

```graphql
type Changelog {
  """版本號"""
  version: String!
  
  """發布日期 (YYYY-MM-DD)"""
  date: String!
  
  """變更項目清單"""
  changes: [String!]!
}
```

---

## 🔍 可用查詢 (Queries)

### 1. `apps` - 取得所有應用程式清單

**簽名**:

```graphql
apps: [App!]!
```

**範例查詢**:

```graphql
query {
  apps {
    id
    name
    displayName
    version
    releaseDate
  }
}
```

**回傳範例**:

```json
{
  "data": {
    "apps": [
      {
        "id": "financeapp",
        "name": "FinanceApp",
        "displayName": "智慧理財助手",
        "version": "1.0.0",
        "releaseDate": "2026-01-08"
      },
      {
        "id": "subtrack",
        "name": "SubTrack",
        "displayName": "訂閱管理助手",
        "version": "1.0.0",
        "releaseDate": "2026-01-08"
      },
      {
        "id": "sub-buddy",
        "name": "Sub-Buddy",
        "displayName": "拼團小幫手",
        "version": "1.0.0",
        "releaseDate": "2026-01-08"
      }
    ]
  }
}
```

---

### 2. `app(id)` - 取得特定應用程式詳細資訊

**簽名**:

```graphql
app(id: String!): App
```

**參數**:

- `id` (String, required): 應用程式識別碼 (financeapp, subtrack, sub-buddy)

**範例查詢**:

```graphql
query {
  app(id: "financeapp") {
    id
    name
    displayName
    version
    platforms {
      type
      version
      downloadUrl
      size
    }
    changelog {
      version
      date
      changes
    }
  }
}
```

**回傳範例**:

```json
{
  "data": {
    "app": {
      "id": "financeapp",
      "name": "FinanceApp",
      "displayName": "智慧理財助手",
      "version": "1.0.0",
      "platforms": [
        {
          "type": "android",
          "version": "1.0.0",
          "downloadUrl": "https://github.com/presentyourlove/apps_download_web/releases/download/v1.0.0/financeapp_android.apk",
          "size": "98MB"
        }
      ],
      "changelog": [
        {
          "version": "1.0.0",
          "date": "2026-01-08",
          "changes": [
            "首次公開版本",
            "收支追蹤功能",
            "預算管理功能",
            "數據分析圖表"
          ]
        }
      ]
    }
  }
}
```

**錯誤處理** (應用程式不存在):

```json
{
  "data": {
    "app": null
  }
}
```

---

### 3. `appsByPlatform(platform)` - 依平台篩選應用程式

**簽名**:

```graphql
appsByPlatform(platform: String!): [App!]!
```

**參數**:

- `platform` (String, required): 平台類型 (android, ios, web)

**範例查詢**:

```graphql
query {
  appsByPlatform(platform: "android") {
    id
    name
    displayName
  }
}
```

**回傳範例**:

```json
{
  "data": {
    "appsByPlatform": [
      {
        "id": "financeapp",
        "name": "FinanceApp",
        "displayName": "智慧理財助手"
      }
    ]
  }
}
```

---

### 4. `lastUpdated` - 取得最後更新時間

**簽名**:

```graphql
lastUpdated: String!
```

**範例查詢**:

```graphql
query {
  lastUpdated
}
```

**回傳範例**:

```json
{
  "data": {
    "lastUpdated": "2026-01-08T00:00:00+08:00"
  }
}
```

---

## 💡 最佳實踐

### 1. Field Selection (欄位選擇)

**只請求需要的欄位**,避免 Over-fetching:

```graphql
# ❌ 不佳實踐 - 請求過多資料
query {
  apps {
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

# ✅ 最佳實踐 - 僅請求必要欄位
query {
  apps {
    id
    name
    version
  }
}
```

---

### 2. 使用 Query 別名 (Aliases)

當需要查詢相同類型的多個資源時:

```graphql
query {
  finance: app(id: "financeapp") {
    name
    version
  }
  
  subtrack: app(id: "subtrack") {
    name
    version
  }
}
```

---

### 3. 使用 Fragments 減少重複

```graphql
fragment AppBasicInfo on App {
  id
  name
  displayName
  version
}

query {
  apps {
    ...AppBasicInfo
  }
  
  app(id: "financeapp") {
    ...AppBasicInfo
    platforms {
      type
    }
  }
}
```

---

### 4. 錯誤處理

GraphQL 查詢可能在 `data` 與 `errors` 同時回傳結果:

```javascript
const response = await fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: '...' })
});

const result = await response.json();

if (result.errors) {
  console.error('GraphQL Errors:', result.errors);
}

if (result.data) {
  console.log('Data:', result.data);
}
```

---

## 🔧 前端整合

### 使用 graphql-request

```javascript
import { queryAllApps, queryAppDetail } from './graphql-client.js';

// 查詢所有應用程式
const { apps } = await queryAllApps();

// 查詢特定應用程式
const { app } = await queryAppDetail('financeapp');
```

### 直接使用 Fetch API

```javascript
async function queryGraphQL(query, variables = {}) {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables })
  });
  
  return response.json();
}

// 使用範例
const result = await queryGraphQL(`
  query GetApp($id: String!) {
    app(id: $id) {
      name
      version
    }
  }
`, { id: 'financeapp' });
```

---

## ⚠️ 注意事項

### CSP 設定

確保 Content Security Policy 允許連線至 GraphQL Server:

```html
<meta http-equiv="Content-Security-Policy"
  content="... connect-src 'self' http://localhost:4000;">
```

### CORS 配置

若 GraphQL Server 與前端不在同一域名,需配置 CORS:

```javascript
// graphql-server.mjs
import cors from 'cors';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: ['http://localhost:8080', 'https://your-domain.com']
  }
});
```

### 效能優化

1. **啟用快取**: 使用 `graphql-client.js` 的內建快取機制
2. **批次查詢**: 使用 Query 別名一次查詢多個資源
3. **欄位選擇**: 只請求需要的欄位

---

## 🐛 常見問題

### Q1: GraphQL 查詢失敗,顯示 CORS 錯誤

**A**: 檢查 CSP 設定是否包含 GraphQL Server 網址,或確認 Server 端 CORS 配置正確。

### Q2: 查詢回傳 `null` 而非資料

**A**: 確認查詢參數正確 (例如 `app(id: "financeapp")` 的 ID 拼寫正確)。

### Q3: 如何測試 GraphQL API?

**A**: 開啟 `http://localhost:4000/` 使用 Apollo Sandbox 進行互動式查詢與測試。

---

## 📚 相關資源

- [GraphQL 官方文件](https://graphql.org/)
- [Apollo Server 文件](https://www.apollographql.com/docs/apollo-server/)
- [graphql-request 文件](https://github.com/jasonkuhrt/graphql-request)

---

**最後更新**: 2026-01-09  
**維護者**: Presentyourlove Team
