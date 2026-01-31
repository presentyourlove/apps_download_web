# Apps Download Web

![Logo](https://presentyourlove.github.io/apps_download_web/assets/presentyourlove-logo-192.webp)

## Presentyourlove 應用程式下載中心

使用 Astro SSG 建置的現代化靜態網站，提供極速的應用程式下載體驗。

🌐 **線上網站**: <https://presentyourlove.github.io/apps_download_web/>

[![Deploy to GitHub Pages](https://github.com/presentyourlove/apps_download_web/actions/workflows/deploy.yml/badge.svg)](https://github.com/presentyourlove/apps_download_web/actions/workflows/deploy.yml)
[![CI](https://github.com/presentyourlove/apps_download_web/actions/workflows/ci.yml/badge.svg)](https://github.com/presentyourlove/apps_download_web/actions/workflows/ci.yml)

---

## 🌟 專案亮點

- 🚀 **極速載入** - 純靜態網站 (SSG)，無需伺服器端運算，搭配 Astro Island 架構。
- 🎨 **精美設計** - 玻璃擬態 (Glassmorphism) 風格、流暢過場動畫。
- 📱 **完美響應** - 針對手機、平板、桌面進行最佳化適配。
- 🌐 **深度多語系** - 完整 i18n 支援 (路由/內容/RSS)，自動偵測語系。
- 🔍 **SEO 滿分** - Lighthouse SEO 100/100，內建 Sitemap, JSON-LD, Open Graph。
- 🌙 **深淺主題** - 支援系統自動偵測與手動切換深/淺色模式。
- ♿ **無障礙友善** - 符合 WCAG 規範，支援 Reduced Motion。
- 📊 **PWA 支援** - 支援 Rich Install UI，可安裝為桌面/手機原生應用。

---

## ✨ 功能特色

| 功能             | 說明                                           |
| :--------------- | :--------------------------------------------- |
| 🏠 **首頁**      | 展示所有應用程式，支援即時搜尋 (Pagefind)      |
| 📱 **應用詳情**  | 顯示版本、跨平台下載連結、更新日誌、Schema.org |
| 📝 **部落格**    | 分享開發心得與技術文章 (支援 Markdown/MDX)     |
| � **RSS 訂閱**   | 支援多語系 RSS (`/rss.xml`, `/en/rss.xml`)     |
| �📋 **AltStore** | iOS 側載安裝詳細圖文指南                       |
| 👤 **關於我們**  | 社交連結與團隊資訊                             |
| � **UI 文件**    | 內建 Storybook 元件庫                          |
| � **CMS 管理**   | 內建 Keystatic 後台管理內容                    |

---

## 🏆 程式碼品質

專案堅持最高的軟體工程標準：

| 指標              | 分數    | 說明                                    |
| :---------------- | :------ | :-------------------------------------- |
| 🚀 Performance    | 96/100  | 圖片優化 (AVIF), 資源壓縮 (Gzip/Brotli) |
| ♿ Accessibility  | 100/100 | 語義化標籤, ARIA, Focus Management      |
| ✅ Best Practices | 96/100  | HTTPS, Secure Headers (CSP, HSTS)       |
| 🔍 SEO            | 100/100 | Meta Tags, Sitemap, Robots.txt          |

### 開發規範

- **TypeScript 嚴格模式**: 全面啟用 `strict: true` 與 Zod Schema 驗證。
- **元件化架構**: 使用 Astro Components 拆分 UI，重用性高。
- **CSS 變數系統**: 統一管理色彩、字體、間距，支援自動切換主題。
- **架構決策記錄 (ADR)**: 記錄重大技術選型與演進。

---

## 🚀 快速開始

### 環境需求

- Node.js 18+
- npm 9+

### 安裝與啟動

```bash
# 1. Clone 專案
git clone https://github.com/presentyourlove/apps_download_web.git
cd apps_download_web

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器
npm run dev
# 訪問 http://localhost:4321/apps_download_web/
```

---

## 📱 支援平台

| 應用程式     | Android | iOS    | Web |
| :----------- | :------ | :----- | :-- |
| 智慧理財助手 | ✅ APK  | 🔜 3月 | ✅  |
| 訂閱管理助手 | ✅ APK  | 🔜 3月 | ✅  |
| 拼團小幫手   | -       | -      | ✅  |

> 🔜 = 預計 2026 年 3 月初上架

---

## 🛠 技術堆疊

| 類別     | 技術                                 |
| :------- | :----------------------------------- |
| **核心** | Astro 5.x (SSG)                      |
| **語言** | TypeScript (Strict)                  |
| **樣式** | CSS Variables + Glassmorphism        |
| **內容** | Keystatic CMS, Markdoc, MDX          |
| **互動** | Vanilla JS (Partytown for 3rd-party) |
| **建置** | Vite + Docker (Multi-stage)          |
| **測試** | Vitest (Unit), Playwright (E2E)      |
| **文檔** | Storybook (UI Components)            |
| **監控** | Sentry (Error Tracking)              |
| **部署** | GitHub Pages / Nginx (Container)     |

---

## 📦 專案結構

```text
apps_download_web/
├── .github/                 # CI/CD Workflows
├── .storybook/              # Storybook 設定
├── public/                  # 靜態資源 (images, manifest, robots)
├── src/
│   ├── components/          # UI 元件 (Header, Footer, Cards)
│   ├── content/             # 內容資料 (Apps/Blog, 分為 zh-TW/en)
│   ├── content.config.ts    # Content Collections Schema 定義
│   ├── i18n/                # 多語系字典與工具函式
│   ├── layouts/             # 頁面佈局
│   ├── lib/                 # 共用邏輯 (RSS, Data Access)
│   ├── pages/               # 路由定義 (含 Astro 與 API Endpoints)
│   │   ├── [appId].astro    # 動態應用詳情頁
│   │   ├── rss.xml.js       # 中文 RSS
│   │   └── en/              # 英文版路由
│   ├── stories/             # Storybook Stories
│   └── styles/              # CSS (Global, Reset, Typography, Print)
├── astro.config.mjs         # Astro 設定
├── keystatic.config.ts      # CMS 設定
└── package.json             # 專案依賴
```

---

## 開發指南

### 內容管理 (CMS)

本專案整合 **Keystatic**，可透過圖形化介面管理內容：

1. 啟動開發伺服器: `npm run dev`
2. 訪問: `http://localhost:4321/keystatic`

### 元件開發 (Storybook)

獨立開發與測試 UI 元件：

```bash
npm run storybook
# 訪問 http://localhost:6006
```

### 新增應用程式

1. 在 `src/content/apps/zh-TW/` (與 `en/`) 新增 `{appId}.json`。
2. 填寫 App Schema (包含 Version, Changelog, Category 等)。
3. 在 `public/assets/icons/` 加入圖示。

---

## 🧪 測試

### 自動化測試指令

```bash
# 單元測試 (Unit Tests)
npm run test

# 程式碼品質檢查
npm run lint          # ESLint
npm run format:check  # Prettier
npm run type-check    # TypeScript

# E2E 測試 (需先 Build)
npm run build
npm run test:e2e
```

### 突變測試 (Mutation Testing)

使用 Stryker 驗證測試案例的有效性：

```bash
npx stryker run
```

---

## 📦 打包發布

### CI/CD 自動部署 (推薦)

推送到 `main` 分支將觸發 GitHub Actions：

1. **Lint & Test**: 執行 ESLint, Prettier, Vitest。
2. **Build**: 建置 Astro 專案。
3. **E2E**: 執行 Playwright 測試。
4. **Deploy**: 部署至 GitHub Pages。

### 手動建置 (Docker)

```bash
docker-compose up -d --build
# 服務啟動於 http://localhost:8080 (Nginx)
```

---

## API 文件與測試

### 內部 API

提供唯讀的 JSON 資料供外部整合：

- `GET /api/versions.json`: 取得所有應用程式版本資訊。

### OpenAPI 規格

API 文件定義於 [`public/openapi.yaml`](public/openapi.yaml)。

---

## 作者

### Presentyourlove

- 🌐 網站: [presentyourlove.github.io/apps_download_web](https://presentyourlove.github.io/apps_download_web/)
- 📘 Facebook: [@presentyourlove](https://facebook.com/presentyourlove)
- 📷 Instagram: [@presentyourlove](https://instagram.com/presentyourlove)
- ▶️ YouTube: [@presentyourlove](https://www.youtube.com/@presentyourlove)
- 📧 Email: <presentyourlove@yahoo.com>

---

## 🙏 致謝

- [Astro](https://astro.build/) - 卓越的靜態網站框架。
- [Keystatic](https://keystatic.com/) - 優秀的 Git-based CMS。
- [Resvg/Satori](https://github.com/yisibl/resvg-js) - 高效能 OG Image 生成。
- [Open Source Community](https://github.com/) - 感謝所有開源貢獻者。

---

## 未來優化方向 (Roadmap)

> ✅ **狀態**: 專案已達靜態網站架構之邊際效應 (State of the Art)，暫無更多通用優化建議。

---

## ☁️ 待辦事項清單 (Backlog)

### � 需遷移至 Cloudflare Pages (Requires Migration)

| 功能                | 說明                                                  |
| :------------------ | :---------------------------------------------------- |
| **搜尋行為分析**    | 透過 `partytown` 追蹤 Pagefind 關鍵字並回傳至 GA4。   |
| **邊緣計算**        | 實作動態標頭 (Security Headers) 與 Geo-IP 自動導向。  |
| **自動化 API 文件** | 透過 `zod-to-openapi` 自動生成並同步 `openapi.yaml`。 |
| **無伺服器表單**    | 利用 Workers 處理聯絡表單後端邏輯與通知發送。         |

### 🛑 暫緩實作 (On Hold)

| 功能                 | 原因                                         |
| :------------------- | :------------------------------------------- |
| **資源完整性 (SRI)** | `vite-plugin-sri` 與 Astro 5 目前不相容。    |
| **內部文件入口**     | Starlight 與現有 i18n 設定衝突導致建置失敗。 |
