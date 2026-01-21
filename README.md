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

## 🚀 未來優化方向 (Phase 8: Optimization & Automation)

目前專案已完成核心功能開發與基礎優化，下一階段將著重於自動化流程與極致效能：

1. **DevOps 與自動化**
   - [ ] **嚴格品質閘門 (Quality Gates)**: 在 CI 部署流程前強制執行 Lint, Type Check 與單元測試。
   - [ ] **自動化依賴更新**: 整合 Renovate 或 Dependabot 定期更新 npm 套件。
   - [ ] **無障礙自動化測試 (a11y)**: 整合 `axe-core` 至測試流程，確保符合 WCAG 標準。

2. **開發體驗 (DX)**
   - [ ] **路徑別名 (Import Aliases)**: 設定 `@/` 路徑別名以簡化深層引用。
   - [ ] **元件文件 (Storybook)**: 建立 UI 元件庫文件，獨立測試元件狀態。
   - [ ] **型別安全環境變數 (`astro:env`)**: 升級至 Astro 5 的 `astro:env` 模組，確保環境變數的型別安全與驗證。

3. **極致效能**
   - [ ] **資源壓縮 (Compression)**: 導入 `astro-compress` 進行 Gzip/Brotli 建置壓縮。
   - [ ] **Web Worker (Partytown)**: 將第三方腳本 (Analytics) 移至 Worker 執行以釋放主執行緒。

---

---

## 📄 授權

---

Copyright © 2026 Presentyourlove. All rights reserved.
