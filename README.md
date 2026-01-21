# Apps Download Web

![Logo](https://presentyourlove.github.io/apps_download_web/assets/presentyourlove-logo-192.webp)

### Presentyourlove 應用程式下載中心

使用 Astro SSG 建置的現代化靜態網站

🌐 **線上網站**: <https://presentyourlove.github.io/apps_download_web/>

[![Deploy to GitHub Pages](https://github.com/presentyourlove/apps_download_web/actions/workflows/deploy.yml/badge.svg)](https://github.com/presentyourlove/apps_download_web/actions/workflows/deploy.yml)

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

- TypeScript 嚴格模式
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

| 類別      | 技術                          |
| :-------- | :---------------------------- |
| **框架**  | Astro 5.x (SSG)               |
| **語言**  | TypeScript (Strict)           |
| **樣式**  | CSS Variables + Glassmorphism |
| **建置**  | Vite                          |
| **部署**  | GitHub Pages                  |
| **CI/CD** | GitHub Actions                |
| **SEO**   | Sitemap, JSON-LD, OpenGraph   |

---

## 📦 專案結構

```text
apps_download_web/
├── .github/
│   └── workflows/deploy.yml     # CI/CD 自動部署
├── public/
│   ├── api/versions.json        # 應用程式資料源
│   ├── assets/                  # 圖片、圖示
│   ├── manifest.json            # PWA 設定
│   └── robots.txt               # SEO
├── src/
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

1. 編輯 `public/api/versions.json`,新增應用程式資料
2. 在 `public/assets/` 加入應用圖示 (命名: `{appId}-icon-192.webp`)
3. 建置並測試: `npm run build && npm run preview`

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

```bash
# 建置測試
npm run build

# 本地預覽
npm run preview
```

**手動測試清單**:

- [ ] 首頁載入正常
- [ ] 應用程式下拉選單
- [ ] 主題切換
- [ ] 響應式設計
- [ ] 404 頁面

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

### 資料格式 (versions.json)

```json
{
  "apps": [
    {
      "id": "financeapp",
      "name": "FinanceApp",
      "displayName": "智慧理財助手",
      "version": "1.0.0",
      "platforms": {
        "android": { "downloadUrl": "..." },
        "ios": { "status": "coming_soon" },
        "web": { "url": "..." }
      }
    }
  ]
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

## 📄 授權

---

## 🔮 效能優化與常見問題 (Performance & Troubleshooting)

為了提供最佳的使用者體驗，本專案持續針對以下方向進行優化：

### 🚀 核心優化策略

1. **流暢轉場 (View Transitions)** ✅ (已完成)
   - 採用 Astro `ClientRouter` 技術，實現類似原生 App 的無縫換頁體驗。
   - 解決傳統網頁切換時的閃爍問題，保持視覺連貫性。

2. **PWA 架構現代化** ✅ (已完成)
   - 遷移至 `@vite-pwa/astro`，自動產生 Service Worker 與 Workbox 快取策略。
   - 預快取所有靜態資源，優化離線體驗與載入速度。

3. **相依性與效能升級** ✅ (已完成)
   - 使用 Astro 5.x 最新版本。
   - 移除手動 SW 實作，改用自動化生成。

### 🔧 進階功能擴充

1. **圖片載入最佳化** ✅ (已完成)
   - 重構 `AppCard` 元件，改用 Astro 內建 `<Image />` 元件搭配 `import.meta.glob`。
   - 自動產生多種解析度 srcsets，提升各種裝置的載入效能。

2. **內容訂閱服務 (RSS)**
   - 實作 RSS Feed (`rss.xml.js`)，讓使用者能訂閱部落格更新。
   - 擴大內容觸及率與讀者黏著度。

3. **CSS 架構重構** ✅ (已完成)
   - 將龐大的 `global.css` (1475 行) 重構為模組化 CSS (~380 行)。
   - 利用 Astro Scoped Styles 特性，將 Header、Footer、頁面專屬樣式遷移至各元件。

4. **404 頁面引導增強** ✅ (已完成)
   - 加入快速導覽連結 (首頁、部落格、關於我們)。
   - 動態顯示應用程式推薦卡片與最新部落格文章。

### 🛡️ 品質保證與深度 SEO

1. **自動化測試導入** ✅ (已完成)
   - 引入 Vitest 進行單元測試 (8 個測試案例)。
   - 使用 Playwright 進行 E2E 測試 (多瀏覽器 + 行動裝置)。

2. **深度 SEO 結構化資料** ✅ (已完成)
   - 為部落格文章加入 `SEO Schema (JSON-LD)`，支援 `Article` 或 `BlogPosting` 格式。
   - 提升文章在 Google 搜尋結果中的豐富顯示 (Rich Snippets)。

3. **字體本地化 (Self-hosted Fonts)** ✅ (已完成)
   - 改用 `@fontsource` 將 Google Fonts 本地化，避免第三方 CDN 請求。
   - 提升隱私隱私性與載入穩定度。

### ⚙️ 開發維運與資安 (DevOps & Security)

1. **程式碼規範自動化** ✅ (已完成)
   - 導入 `ESLint` 與 `Prettier` 並整合至 git hook (Husky)。
   - 強制統一程式碼風格，減少團隊協作衝突。

2. **網站安全強化**
   - 實作 `Content-Security-Policy (CSP)` Meta 標籤。
   - 限制外部資源載入來源，防範 XSS 攻擊。

### 📝 最近更新 (Latest Updates)

- [2026-01-21] **程式碼規範自動化**
  - `[ADD]` eslint.config.mjs, .prettierrc.mjs - 建立代碼規範設定
  - `[ADD]` .husky, .lintstagedrc - 設定 Git Commit Hook 自動檢查
  - `[MODIFY]` package.json - 新增 lint 與 format 腳本

- [2026-01-21] **字體本地化 (Self-hosted Fonts)**
  - `[ADD]` @fontsource/inter, @fontsource/noto-sans-tc - 安裝本地字體包
  - `[MODIFY]` src/layouts/BaseLayout.astro - 移除 Google Fonts CDN，改用本地引入

- [2026-01-21] **核心優化策略實作**
  - `[ADD]` @vite-pwa/astro - 遷移 PWA 架構至自動化 Workbox 生成
  - `[DELETE]` public/sw.js - 移除手動 Service Worker
  - `[DELETE]` public/manifest.json - 改由 @vite-pwa/astro 自動產生
  - `[MODIFY]` astro.config.mjs - 加入 AstroPWA 整合配置
  - `[MODIFY]` src/lib/pwa.ts - 使用 virtual:pwa-register 模組
  - `[MODIFY]` tsconfig.json - 加入 vite-plugin-pwa/client 型別

- [2026-01-21] **深度 SEO 結構化資料**
  - `[MODIFY]` src/pages/blog/[...slug].astro - 自動生成 JSON-LD (BlogPosting) 並注入 head

- [2026-01-21] **自動化測試導入**
  - `[ADD]` vitest.config.ts - Vitest 測試設定
  - `[ADD]` playwright.config.ts - Playwright E2E 設定
  - `[ADD]` src/lib/**tests**/data.test.ts - 單元測試 (8 案例)
  - `[ADD]` e2e/home.spec.ts - 首頁/導航 E2E 測試
  - `[ADD]` e2e/pages.spec.ts - 404/部落格/詳情頁 E2E 測試

- [2026-01-21] **404 頁面引導增強**
  - `[MODIFY]` src/pages/404.astro - 新增快速導覽、應用推薦、最新文章區塊

- [2026-01-21] **CSS 架構重構**
  - `[MODIFY]` src/styles/global.css - 從 1475 行精簡為 ~380 行
  - `[MODIFY]` src/components/Header.astro - 加入完整 Header/Nav/Sidebar 樣式
  - `[MODIFY]` src/components/Footer.astro - 加入完整 Footer 樣式
  - `[MODIFY]` src/pages/index.astro - 加入首頁專屬樣式

- [2026-01-21] **圖片載入最佳化**
  - `[MODIFY]` src/components/AppCard.astro - 改用 Astro Image 搭配 import.meta.glob
  - `[MODIFY]` src/pages/index.astro - 移除 iconPath 屬性
  - `[ADD]` src/assets/icons/ - 新增應用程式高解析圖示 (financeapp, subtrack, sub-buddy)

Copyright © 2026 Presentyourlove. All rights reserved.
