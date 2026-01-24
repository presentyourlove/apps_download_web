# Apps Download Web

![Logo](https://presentyourlove.github.io/apps_download_web/assets/presentyourlove-logo-192.webp)

## Presentyourlove 應用程式下載中心

使用 Astro SSG 建置的現代化靜態網站

🌐 **線上網站**: <https://presentyourlove.github.io/apps_download_web/>

[![Deploy to GitHub Pages](https://github.com/presentyourlove/apps_download_web/actions/workflows/deploy.yml/badge.svg)](https://github.com/presentyourlove/apps_download_web/actions/workflows/deploy.yml)
[![CI](https://github.com/presentyourlove/apps_download_web/actions/workflows/ci.yml/badge.svg)](https://github.com/presentyourlove/apps_download_web/actions/workflows/ci.yml)

---

## 🌟 專案亮點

- 🚀 **極速載入** - 純靜態網站,無需伺服器端運算
- 🎨 **精美設計** - 玻璃擬態效果、流暢動畫
- 📱 **完美響應** - 適配手機、平板、桌面
- 🔍 **SEO 滿分** - Lighthouse SEO 100/100
- 🌙 **深淺主題** - 一鍵切換深色/淺色模式
- ♿ **無障礙友善** - 符合 WCAG 規範
- ⌨️ **命令面板** - `Ctrl+K` 快速導航全站

---

## ✨ 功能特色

| 功能             | 說明                               |
| :--------------- | :--------------------------------- |
| 🏠 首頁          | 展示所有應用程式,支援動態下拉選單  |
| 📱 應用詳情      | 顯示版本、支援平台、下載連結       |
| 📝 部落格        | 分享開發心得與技術文章 (V3 新功能) |
| 📋 AltStore 指南 | iOS 側載安裝說明                   |
| 👤 關於我們      | 社交連結與聯絡資訊                 |
| 🌓 主題切換      | 深色/淺色模式                      |
| 📊 PWA 支援      | 可安裝為桌面應用程式               |

---

## 🏆 程式碼品質

| 指標              | 分數    |
| :---------------- | :------ |
| 🚀 Performance    | 96/100  |
| ♿ Accessibility  | 100/100 |
| ✅ Best Practices | 96/100  |
| 🔍 SEO            | 100/100 |

### 使用的最佳實踐

- **TypeScript 嚴格模式** (Strict Types + Zod)
- **架構決策記錄** (ADR)
- 元件化架構 (Astro Components)
- CSS 變數管理主題
- 語義化 HTML
- 圖片優化 (WebP 格式)

---

## 🚀 快速開始

```bash
# 1. Clone 專案
git clone https://github.com/presentyourlove/apps_download_web.git
cd apps_download_web

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器
npm run dev

# 4. 開啟瀏覽器
# http://localhost:4321/apps_download_web/
```

---

## 📱 支援平台

| 應用程式     | Android | iOS    | Web |
| :----------- | :------ | :----- | :-- |
| 智慧理財助手 | ✅ APK  | 🔜 3月 | ✅  |
| 訂閱管理助手 | -       | 🔜 3月 | -   |
| 拼團小幫手   | -       | -      | ✅  |

> 🔜 = 預計 2026 年 3 月初上架

---

## 🛠 技術堆疊

| 類別      | 技術                                   |
| :-------- | :------------------------------------- |
| **框架**  | Astro 5.x (SSG)                        |
| **語言**  | TypeScript (Strict)                    |
| **樣式**  | CSS Variables + Glassmorphism          |
| **內容**  | Keystatic CMS                          |
| **建置**  | Vite + Docker (Multi-stage)            |
| **部署**  | GitHub Pages / Nginx (Container)       |
| **監控**  | Sentry                                 |
| **CI/CD** | GitHub Actions (Build, Test, Security) |
| **SEO**   | Sitemap, JSON-LD, OpenGraph            |
| **搜尋**  | Pagefind (Static Search)               |

---

## 📦 專案結構

```text
apps_download_web/
├── .github/
│   └── workflows/deploy.yml     # CI/CD 自動部署
├── public/
│   ├── assets/                  # 圖片、圖示
│   ├── manifest.json            # PWA 設定
│   └── robots.txt               # SEO
├── src/
│   ├── content.config.ts        # Content Collections 設定
│   ├── content/                 # 資料來源 (Apps, Blog)
│   ├── components/
│   │   ├── AppCard.astro        # 應用卡片
│   │   ├── Header.astro         # 導覽列
│   │   └── Footer.astro         # 頁尾
│   ├── layouts/
│   │   └── BaseLayout.astro     # 基礎版面
│   ├── lib/
│   │   └── data.ts              # 資料存取層
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── index.astro      # 部落格首頁
│   │   │   └── [...slug].astro  # 文章詳情頁
│   │   ├── index.astro          # 首頁
│   │   ├── [appId].astro        # 動態詳情頁
│   │   ├── about.astro          # 關於我們
│   │   └── 404.astro            # 404 頁面
│   └── styles/
│       └── global.css           # 全域樣式
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## � 開發指南

### 新增應用程式

1. 在 `src/content/apps/` 目錄下新增 `{appId}.json` 檔案
2. 依照 Schema 填入版本與下載資訊
3. 在 `public/assets/` 加入應用圖示 (命名: `{appId}-icon-192.webp`)
4. 建置並測試: `npm run build && npm run preview`

### 修改樣式

全域樣式位於 `src/styles/global.css`,使用 CSS 變數:

```css
:root {
  --accent-color: #6366f1;
  --bg-color: #0f172a;
  --text-primary: #f8fafc;
}
```

---

## 🧪 測試

### 自動化測試

```bash
# 單元測試
npm run test

# 單元測試 (含覆蓋率報告)
npm run test:coverage

# E2E 測試 (需先 npm run build)
npm run build
npm run test:e2e

# 程式碼檢查
npm run lint
npm run format:check
npm run type-check
```

### CI/CD 流程

推送到 `main` 分支會自動執行：

1. **Quality Check**: Lint, Format, Type Check, Unit Tests
2. **E2E Tests**: Playwright (Chromium, Firefox)
3. **Deploy**: 建置並部署至 GitHub Pages

---

## 📦 打包發布

### 自動部署 (推薦)

推送到 `main` 分支即自動觸發 GitHub Actions 部署:

```bash
git add .
git commit -m "feat: your changes"
git push origin main
```

### 手動建置

```bash
# 建置靜態網站
npm run build

# 產出目錄: ./dist/
```

---

## � API 文件與測試

### 資料格式 (Content Collections)

資料位置: `src/content/apps/*.json`

```json
{
  "id": "financeapp",
  "name": "FinanceApp",
  "displayName": "智慧理財助手",
  "version": "1.0.0",
  "releaseDate": "2026-03-01",
  "platforms": {
    "android": { "version": "1.0.0", "downloadUrl": "..." },
    "ios": { "version": "1.0.0", "status": "coming_soon" },
    "web": { "version": "1.0.0", "url": "..." }
  },
  "changelog": []
}
```

### 測試 API

```bash
# 取得應用程式資料
curl https://presentyourlove.github.io/apps_download_web/api/versions.json
```

---

## � 作者

### Presentyourlove

- 🌐 網站: [presentyourlove.github.io/apps_download_web](https://presentyourlove.github.io/apps_download_web/)
- 📘 Facebook: [@presentyourlove](https://facebook.com/presentyourlove)
- 📷 Instagram: [@presentyourlove](https://instagram.com/presentyourlove)
- ▶️ YouTube: [@presentyourlove](https://www.youtube.com/@presentyourlove)
- 📧 Email: <presentyourlove@yahoo.com>

---

## 🙏 致謝

- [Astro](https://astro.build/) - 優秀的靜態網站生成器
- [GitHub Pages](https://pages.github.com/) - 免費靜態網站託管
- [Google Fonts](https://fonts.google.com/) - Inter & Noto Sans TC 字體
- [Feather Icons](https://feathericons.com/) - 精美的開源圖示

---

## 🏗️ 系統架構 (Architecture)

### 📂 架構決策 (ADR)

本專案採用 **Architecture Decision Records** 記錄重大技術決策。
詳細文件請見: [`docs/adr/`](docs/adr/README.md)

### 🐳 容器化部署 (Containerization)

支援使用 Docker 進行標準化部署 (Based on Nginx Alpine)。

```bash
# 使用 Docker Compose 啟動
docker-compose up -d --build
```

### 🔌 API 文件

提供完整的應用程式版本資訊 API。
規格文件: [`public/openapi.yaml`](public/openapi.yaml)

---

## 🛡️ 資安與維運 (SecOps & DevOps)

### 🔒 資安防護 (Security++)

- **依賴掃描**: CI 流程整合 `npm audit` 阻擋高風險漏洞。
- **秘密掃描**: 整合 `gitleaks` 防止金鑰與敏感資訊外洩。
- **連結檢查**: 定期檢查站內死連結 (`lychee`)。

### 📡 監控與觀測 (Monitoring)

- **錯誤追蹤**: 整合 **Sentry** 即時捕捉前端錯誤。
- **效能分析**: 建置報告包含 Bundle Size 分析 (`rollup-plugin-visualizer`)。

---

---

---

## � 未來優化方向 (Roadmap)

基於目前的架構，下一階段的優化重點將包含：

### 1. 🤖 依賴更新自動化 (Dependency Automation)

- **Renovate/Dependabot**: 設定自動化 PR 以更新 npm 套件與 GitHub Actions，確保專案安全性與最新功能。

### 2. 🛡️ 嚴格 CSP 與 Nonce 自動化 (Strict CSP)

- **CSP Automation**: 透過 `astro-shield` 或 Middleware 自動生成 Nonce，並為所有 Inline Scripts 加上簽章，實現更嚴格的 Content Security Policy，此舉可進一步取代 Nginx 的靜態 CSP 設定。

### 3. 📊 搜尋行為分析 (Search Analytics)

- **Query Tracking**: 利用 `partytown` 將使用者的搜尋關鍵字 (Pagefind Queries) 發送至 Google Analytics，以了解使用者需求並優化內容。

### 4. � 元件級測試 (Component Testing)

- **Island Testing**: 針對 `Search.ts` 與 `ReloadPrompt` 等互動邏輯，使用 Vitest 或 Playwright Component Testing 進行隔離測試，確保互動行為穩定。

### 5. 🎞️ 視圖轉場優化 (View Transitions Polish)

### 6. 👁️ 視覺回歸測試 (Visual Regression)

- **UI Snapshot**: 啟用 Playwright 的 Visual Comparison 或整合 Chromatic (目前 CI 中已註解)，自動偵測 UI 意外變更，防止樣式跑版。

### 7. 📉 效能預算 (Performance Budget)

- **Lighthouse CI**: 在 `lighthouserc.json` 中設定嚴格的 Performance Budget (如 JS < 50KB, FCP < 1s)，確保隨著專案增長，效能分數不退步。

### 8. 🌐 邊緣計算 (Edge Middleware) ⏸️

> **備註**: 遷移至 Cloudflare Pages 才實作。

- **Cloudflare Pages**: 評估遷移至 Edge 平台，利用 Middleware 實作動態標頭 (Security Headers) 與 Geo-IP 路由 (自動導向對應語系)，即便是靜態網站也能擁有動態能力。

### 9. 🔐 資源完整性 (Subresource Integrity)

- **SRI Implementation**: 整合 `vite-plugin-sri` 於建置時自動為 JS/CSS 資源生成雜湊值 (Hash)，並在 CSP 標頭中強制檢查，防止 CDN 劫持或資源篡改。

### 10. 🧬 突變測試 (Mutation Testing)

- **Stryker JS**: 引入突變測試工具，自動修改程式碼 (如移除條件判斷) 來驗證單元測試是否能有效抓出錯誤，提升測試的可信度。

### 11. 📑 API 文件自動化 (Automated OpenAPI)

- **Zod to OpenAPI**: 利用 `src/content.config.ts` 中已定義的 Zod Schema，透過 `zod-to-openapi` 自動生成 `openapi.yaml`，確保 API 文件與實際資料結構永遠同步。

### 12. ⚡ 無伺服器表單 (Serverless Functions)

- **Cloudflare Workers**: 將 `mailto` 聯絡方式升級為真實的聯絡表單，利用 Serverless Function 處理後端邏輯並發送通知 (Telegram/Discord)，維持前端純靜態架構。

### 13. 📚 內部文件入口 (Documentation Portal)

- **Starlight Integration**: 引入 **Starlight** 建置專屬的 Developer Portal (`/docs`)，整合現有的 ADRs 與元件使用手冊，提升團隊協作效率。

### 14. 🏗️ 基礎設施即代碼 (IaC)

### 15. 📱 PWA 豐富安裝體驗 (Rich Install)

- **Manifest Screenshots**: 為 `manifest.json` 加入 `screenshots` 欄位，讓使用者在安裝 PWA 時能預覽應用程式畫面 (Rich Install UI)，提升安裝轉換率。

### 16. 🎯 建置目標一致性 (Target Consistency)

- **Browserslist**: 在 `package.json` 或 `.browserslistrc` 中明確定義支援的瀏覽器範圍 (如 `> 0.2%, last 2 versions`)，統一 Babel/PostCSS 的轉譯目標，避免不必要的 Polyfill 肥大。

- **開源文件**: 建立 `LICENSE` (MIT/Apache), `CONTRIBUTING.md` (貢獻指南), `CODE_OF_CONDUCT.md` (行為準則)，完善開源專案治理。

---

## �📄 授權

---

Copyright © 2026 Presentyourlove. All rights reserved.

---

## 📝 最近更新 (Latest Changes)

### V3.1.0 - Deep i18n Implementation

- **架構重構**: 將 `src/content` 遷移至 `zh-TW` 與 `en` 子目錄，支援多語系內容管理。
- **路由升級**: 新增 `src/pages/en/` 路由，並將頁面邏輯抽離至 `src/components/pages/` 以實現代碼共用。
- **功能新增**:
  - `LanguagePicker`: 新增語言切換功能。
  - `i18n/ui.ts`: 擴充全站 UI 翻譯字串。
  - `data.ts`: 支援依語言篩選應用程式資料。
- **修正**: 修復了 `AppCard` 與 Blog Post 的連結生成邏輯，確保在不同語系下導向正確路徑。
