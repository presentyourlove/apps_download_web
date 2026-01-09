# Presentyourlove - 應用程式下載中心

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PWA](https://img.shields.io/badge/PWA-Supported-orange.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen)

Presentyourlove 官方應用程式下載中心。我們致力於開發提升生活效率的工具，包括理財記帳、訂閱管理與拼團媒合服務。

---

## 🌟 專案亮點 (Project Highlights)

本專案不僅是一個靜態下載頁面，更是一個符合企業級標準的現代化 Web 專案：

- **企業級規範**：嚴格遵循 `GEMINI.md` 開發規範，實作 Content Security Policy (CSP) 與 Docker 容器化。
- **極致效能**：LCP 優化、資源快取策略 (Caching Strategy)、支援 PWA 離線瀏覽。
- **全站多語系 (Deep i18n)**：全站內容支援繁體中文與英文即時切換。
- **Web Push 推播通知**：整合 Push API 與 Service Worker，支援新版本發布或重要公告的瀏覽器推播通知。
- **自動化維運**：整合 GitHub Actions 實現 CI/CD，每次推送自動執行 ESLint 靜態檢查與 Playwright 端對端測試。

## 🚀 功能特色 (Features)

我們提供三大核心應用程式：

1. **FinanceApp - 智慧理財助手**
    - 📊 **收支追蹤** - 快速記錄每日收入與支出
    - 💰 **預算管理** - 設定預算目標,掌握財務狀況
    - 📈 **數據分析** - 視覺化圖表,清楚了解財務趨勢

2. **SubTrack - 訂閱管理助手**
    - 📅 **週期追蹤** - 自動計算下期扣款日
    - 🔔 **付款提醒** - 避免忘記取消試用或過期
    - 💵 **支出統計** - 掌握每月/每年固定訂閱開銷

3. **Sub-Buddy - 拼團小幫手**
    - 🤝 **合購媒合** - 尋找 Netflix, Spotify 分母夥伴
    - 💬 **即時聊天** - 內建聊天室，溝通更順暢
    - ⭐ **信譽評價** - 安全可靠的拼團環境

## 🛡️ 程式碼品質 (Code Quality)

我們堅持最高的代碼品質標準：

- **靜態分析**：使用 ESLint 與 Prettier 確保代碼風格一致且無錯誤。
- **類型安全**：雖然是原生 JS 專案，但透過 JSDoc 與 TypeScript 檢查 (`checkJs`) 確保類型正確。
- **無 Magic Numbers**：所有常數集中管理於 `CONFIG` 物件。
- **嚴格 CSP**：移除所有 `'unsafe-inline'`，確保腳本執行安全。

## ⚡ 快速開始 (Quick Start)

若要在本地端預覽本專案：

```powershell
# 1. 複製專案
git clone https://github.com/presentyourlove/apps_download_web.git

# 2. 進入目錄
cd apps_download_web

# 3. 安裝依賴
npm install

# 4. 啟動開發伺服器
npm start
# 訪問 http://localhost:8080
```

## 📱 支援平台 (Supported Platforms)

| 瀏覽器 | 最低版本 | PWA 支援 | 備註 |
| :--- | :--- | :--- | :--- |
| Chrome | 90+ | ✅ | 完整功能支援 |
| Edge | 90+ | ✅ | 完整功能支援 |
| Safari | 15+ | ⚠️ | 需手動「加入主畫面」 |
| Firefox | 88+ | ⚠️ | 支援 Service Worker |
| Android | 5.0+ | ✅ | 支援 WebAPK 安裝 |
| iOS | 14.0+ | ✅ | 支援 PWA 但限制較多 |

## 🛠️ 技術堆疊 (Tech Stack)

- **核心技術**: HTML5, CSS3 (Variables, Flexbox, Grid), Vanilla JavaScript (ES6+)
- **後端 API**: GraphQL (Apollo Server), RESTful JSON (向後相容)
- **PWA 技術**: Service Worker, Web App Manifest
- **開發運維 (DevOps)**: Docker, Nginx, GitHub Actions
- **品質保證 (QA)**: Vitest (Unit Testing), Playwright (E2E Testing), ESLint

## 📂 專案結構 (Project Structure)

本專案目錄結構詳解：

```plaintext
apps_download_web/
├── .github/                        # GitHub 設定
│   └── workflows/                  # CI/CD 自動化流程 (Security, Lighthouse 等)
├── .husky/                         # Git Hooks 工具
│   └── _/                          # Husky 內部腳本 (git commit 前自動執行 lint)
├── .storybook/                     # Storybook 專案設定
│   ├── main.ts                     # 各種 Addon 與路徑設定
│   └── preview.ts                  # 全域 CSS 與 Decorator 設定
├── api/                            # 模擬後端 API 資料
│   └── versions.json               # App 版本資訊 (供 script.js 檢查更新用)
├── assets/                         # 靜態資源目錄
│   ├── icon-*.png                  # PWA 應用程式圖示
│   ├── presentyourlove-logo.png    # 網站 Logo
│   └── source/                     # 原始設計檔案
├── components/                     # 可重用的 HTML 片段
│   ├── header.html                 # 網站頁首 (導航列)
│   └── footer.html                 # 網站頁尾 (版權資訊)
├── css/                            # 樣式表目錄
│   └── style.css                   # 主樣式表 (CSS Variables, RWD 設定)
├── docs/                           # 專案文件目錄
│   └── GRAPHQL_API.md              # GraphQL API 使用文件
├── js/                             # 前端 JavaScript 原始碼
│   ├── script.js                   # 核心邏輯 (PWA, UI 互動, 更新檢查, GraphQL 整合)
│   ├── theme-init.js               # 深色模式初始化 (防止閃爍)
│   ├── i18n.js                     # 多語系切換模組 (ES Module)
│   ├── utils.js                    # 通用工具函式庫 (版本比較, 排程判斷)
│   ├── graphql-client.js           # GraphQL 客戶端模組 (查詢, 快取, Fallback)
│   ├── csp-monitor.js              # CSP 違規回報邏輯
│   └── push-client.js              # Web Push 客戶端訂閱邏輯
├── locales/                        # Internationalization (i18n) 翻譯檔
│   └── translations.json           # 包含 中/英/日 介面字串
├── node_modules/                   # npm 套件安裝目錄 (不納入版本控制)
├── scripts/                        # 開發與建置輔助腳本
│   ├── convert-images.js           # 圖片轉檔工具 (PNG -> WebP)
│   └── generate-critical.mjs       # Critical CSS 自動提取工具
├── server/                         # 輕量級後端服務
│   ├── csp-server.js               # 接收並記錄 CSP 違規報告的 Node.js 服務
│   ├── push-server.mjs             # Web Push 通知伺服器 (VAPID, 訂閱管理)
│   └── graphql-server.mjs          # GraphQL API 伺服器 (Apollo Server)
├── stories/                        # Storybook 元件展示文件
│   ├── Header.stories.ts           # Header 元件的狀態展示
│   └── Footer.stories.ts           # Footer 元件的狀態展示
├── tests/                          # 自動化測試腳本
│   ├── unit/                       # 單元測試目錄 (Vitest)
│   │   ├── i18n.test.ts            # i18n 模組測試
│   │   └── utils.test.ts           # 工具函式測試
│   └── e2e.spec.ts                 # Playwright 端對端測試 (首頁, 下載, 404)
├── .eslintrc.json                  # ESLint 程式碼檢查規則配置
├── .gitignore                      # Git 忽略檔案清單 (如 node_modules)
├── 404.html                        # 自訂 404 找不到網頁錯誤頁
├── Dockerfile                      # 用於建置 Docker 映像檔的描述檔
├── financeapp-content.html         # FinanceApp 詳細介紹頁面
├── index.html                      # 網站入口首頁 (PWA Entry Point)
├── lighthouse-budget.json          # Google Lighthouse 效能預算指標
├── lighthouserc.json               # Lighthouse CI 自動化設定
├── links.html                      # 相關連結與關於我們頁面
├── manifest.json                   # PWA 安裝設定檔 (名稱, 圖示, 啟動模式)
├── nginx.conf                      # Nginx 伺服器配置 (設定 HSTS, 壓縮, 安全標頭)
├── offline.html                    # 網路斷線時顯示的替代畫面
├── package.json                    # 專案資訊與 npm scripts 定義
├── package-lock.json               # npm 依賴套件版本鎖定檔
├── playwright.config.ts            # Playwright 測試框架全域設定
├── README.md                       # 本說明文件
├── robots.txt                      # 網路爬蟲索引規則設定
├── sitemap.xml                     # 網站地圖 (SEO 優化)
├── sub-buddy-content.html          # Sub-Buddy 詳細介紹頁面
├── subtrack-content.html           # SubTrack 詳細介紹頁面
├── sw.js                           # Service Worker (負責快取與離線存取)
├── vitest.config.ts                # Vitest 單元測試設定檔
├── vitest.shims.d.ts               # Vitest 全域類型宣告
└── tsconfig.json                   # TypeScript 設定檔 (供 VSCode 智慧提示用)
```

## 📖 開發指南 (Development Guide)

### 推薦環境

- **IDE**: VS Code
- **Extensions**: ESLint, Prettier, Live Server

### 開發流程

1. **修改代碼**:編輯 HTML/CSS/JS 檔案。
2. **本地測試**:使用 `npm start` 預覽變更。
3. **執行檢查**:提交前執行 `npm run lint` 確保無語法錯誤。

### GraphQL API 使用

本專案提供 GraphQL API 供前端查詢應用程式版本資訊。

#### 啟動 GraphQL Server

```powershell
npm run serve:graphql
```

Server 將運行於 `http://localhost:4000/`,可透過 Apollo Sandbox 介面進行互動式查詢。

#### Query 範例

```graphql
# 查詢所有應用程式
query {
  apps {
    id
    name
    version
  }
}

# 查詢特定應用程式
query {
  app(id: "financeapp") {
    name
    displayName
    platforms {
      type
      downloadUrl
    }
  }
}
```

完整 API 文件請參閱 [GRAPHQL_API.md](docs/GRAPHQL_API.md)。

## 🧪 測試 (Testing)

本專案使用 **Playwright** 進行端對端 (E2E) 測試。

```powershell
# 執行所有 E2E 測試 (Headless 模式)
npm run test

# 啟動 UI 模式進行除錯
npm run test:ui

# 執行單元測試
npm run test:unit
```

測試範圍涵蓋：首頁載入、App 下載功能、主題切換、404 錯誤頁面處理，以及核心商業邏輯 (`utils.js`, `i18n.js`) 的單元測試。

## 📦 打包發布 (Build & Deploy)

### Docker 部署 (推薦)

```powershell
# 建置映像檔
npm run docker:build

# 啟動容器
npm run docker:run
```

### GitHub Pages (靜態託管)

本專案已部署至 GitHub Pages：

🌐 **線上網址**: [https://presentyourlove.github.io/apps_download_web/](https://presentyourlove.github.io/apps_download_web/)

---

## 🚀 未來優化建議 (Future Roadmap)

以下為根據目前專案狀態，建議的下一階段優化方向：

| 項目 | 說明 | 預估工時 |
| :--- | :--- | :--- |
| **伺服器端渲染 (SSR)** | 考慮長期遷移至 Next.js 或 Astro，進一步提升 SEO 與動態內容管理能力。 | 20hr |
| **GraphQL API** | ✅ **已完成** - 已實作 GraphQL API,提供更靈活的資料查詢方式,保留 RESTful API 作為 Fallback。詳見 [GraphQL API 文件](docs/GRAPHQL_API.md)。 | 15hr (已完成) |

---

## ✍️ 作者 (Author)

### Presentyourlove Team

- Email: <presentyourlove@gmail.com>
- GitHub: [@presentyourlove](https://github.com/presentyourlove)

## 致謝 (Acknowledgments)

感謝以下開源專案與工具的支援：

- [Playwright](https://playwright.dev/) - 強大的 E2E 測試框架
- [Docker](https://www.docker.com/) - 容器化解決方案
- [Nginx](https://nginx.org/) - 高效能網頁伺服器
- [GitHub Actions](https://github.com/features/actions) - 自動化 CI/CD 平台

---
Made with ❤️ by Presentyourlove Team
