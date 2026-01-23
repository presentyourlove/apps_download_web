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

### 1. 📚 元件庫與設計系統 (Design System)

- **Storybook 覆蓋率**: 目前僅有 `AppCard` 範例，需為所有通用元件 (`Header`, `Footer`, `BaseLayout`, `BlogCard`) 建立 Storybook 文件。
- **視覺回歸測試**: 整合 Chromatic 進行自動化 UI 測試。

### 2. 🌍 完整國際化 (Deep i18n)

- **多語系內容**: 目前僅部分 UI 支援 i18n，需擴展至所有部落格文章與應用程式描述。
- **自動化翻譯**: 評估導入 AI 輔助翻譯工作流。

### 3. 🔍 進階搜尋體驗 (Advanced Search)

- **全站搜尋**: 優化 `Search.astro`，支援模糊搜尋與標籤過濾。
- **Cmd+K Command Palette**: 實作類似 Raycast 的命令面板，提升導航效率。

### 4. 🧪 測試覆蓋率 (Code Quality)

- **單元測試**: 為 `src/utils` 與 `src/lib` 中的核心邏輯補全 Vitest 測試。
- **E2E 測試**: 增加關於「深色模式切換」與「表單互動」的 Playwright 測試案例。

### 5. 🤖 效能與自動化 (Performance & DX)

- **圖片優化**: 實作 `astro:assets` 的自動格式轉換 (AVIF) 與 RWD 圖片集。
- **自動化部署**: 評估導入 Vercel 或 Cloudflare Pages 以獲得更佳的 Edge 效能 (目前為 GitHub Pages)。
- **CSS 渲染效能**: 在長列表 (如 Changelog) 實作 `content-visibility: auto` 以優化渲染效能。

### 6. 🛠 架構重構 (Refactoring)

- **CSS 模組化**: 將龐大的 `global.css` 拆分為 `base`, `components`, `utilities` 等獨立模組，提升維護性。
- **邏輯抽離**: 將 `Search.astro` 中的複雜互動邏輯抽離為獨立的 TypeScript Hook/Utility，以利單元測試。

### 7. 📲 PWA 使用者體驗 (App UX)

- **更新通知**: 實作 Service Worker 的 `onNeedRefresh` UI 提示 (Toast)，讓使用者手動觸發更新，而非僅在 Console 顯示。
- **離線頁面**: 設計專屬的 Offline Fallback 頁面，優化斷網體驗。

### 8. 🖼️ Open Graph 動態生成 (Dynamic OG)

- **修復 OG Image**: 解決 `resvg` 在建置時的 Panic 問題，恢復為每個應用程式動態生成專屬的 Social Sharing 圖片 (包含版本號、更新日期)。

### 9. 🛡️ API 契約測試 (Contract Testing)

- **API 穩定性**: 為 `versions.json` 加入 Zod Schema 輸出驗證，確保資料格式變更不會破壞既有的行動應用程式 (Backward Compatibility)。

### 10. 🛡️ 伺服器強化 (Server Hardening)

- **Nginx 資安標頭**: 設定 HSTS, X-Frame-Options, X-Content-Type-Options 等 HTTP Response Headers，強化安全性。
- **Brotli 壓縮**: 於 Nginx 啟用 Brotli 演算法，提供比 Gzip 更優異的壓縮率。

### 11. ♿ 無障礙細節 (A11y Polish)

- **焦點鎖定 (Focus Trap)**: 在搜尋視窗與手機版選單開啟時，強制將鍵盤焦點鎖定於視窗內，符合 WCAG 對於 Modal Dialog 的要求。

### 12. 🧹 維護自動化 (Maintenance Automation)

- **依賴更新**: 設定 **Dependabot** 或 **Renovate** 自動建立 Pull Request 更新 npm 套件，保持專案依賴的新鮮度。
- **死碼偵測**: 導入 **Knip** 掃描未使用的檔案與 export，定期清理累積的技術債。

### 13. 🧑‍💻 開發者體驗 (Developer Experience)

- **統一工具鏈**: 評估導入 **Biome** (前身為 Rome) 取代 ESLint + Prettier，提供更快速且設定更簡單的 Lint/Format 體驗。
- **Git Hooks**: 強化 `husky` 設定，加入 `commitlint` 確保提交訊息符合 Conventional Commits 規範 (目前已安裝但需確認強制性)。

### 14. 🤝 社群治理 (Community Health)

- **開源文件**: 建立 `LICENSE` (MIT/Apache), `CONTRIBUTING.md` (貢獻指南), `CODE_OF_CONDUCT.md` (行為準則)，完善開源專案治理。

### 15. 🏝️ 群島架構優化 (Islands Architecture)

- **部分水合 (Partial Hydration)**: 審計所有互動元件 (如 Theme Toggle)，確保使用 `client:visible` 或 `client:idle` 等指令，實現真正的 Zero-JS by default。

### 16. ⚙️ 開發環境一致性 (IDE Consistency)

- **EditorConfig**: 新增 `.editorconfig` 檔案，統一不同 IDE (VS Code, JetBrains) 間的縮排與編碼設定，減少 Git diff 雜訊。

### 17. 🔠 字體效能極致優化 (Font Performance)

- **字體子集化 (Subsetting)**: 針對中文字體 (Noto Sans TC) 實作 `unicode-range` 切割，僅載入頁面實際用到的字元，大幅降低 CJK 字體傳輸量。
- **Font Display**: 確保所有 `@font-face` 設定包含 `font-display: swap`，避免文字隱形 (FOIT)。

### 18. 🚨 無障礙持續整合 (A11y CI)

### 19. 🧭 結構化資料導航 (SEO Breadcrumbs)

- **麵包屑 Schema**: 為所有頁面 (尤其是部落格與 App 詳情頁) 實作 `BreadcrumbList` JSON-LD，明確告訴搜尋引擎頁面階層結構，提升 SERP 點擊率。

### 20. 🛡️ 流量速率限制 (Rate Limiting)

- **Nginx Limit Req**: 為了防止 DDoS 或暴力掃描，於 Nginx 設定 `limit_req_zone`，針對單一 IP 限制每秒請求數 (RPS)，保護靜態伺服器資源。

---

## �📄 授權

---

Copyright © 2026 Presentyourlove. All rights reserved.
