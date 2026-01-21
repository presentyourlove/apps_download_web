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

## 🚀 未來優化方向 (Future Roadmap)

為了持續提升網站品質、使用者體驗與開發效率，以下是目前規劃的優化方向：

### 1. 🛠 功能增強 (Feature Enhancements)

- [x] **全站搜尋**：整合 Pagefind 或 Fuse.js 實作輕量級全站靜態搜尋。
- [x] **RSS 訂閱**：實作部落格文章與應用程式更新的 RSS Feed (`/rss.xml`)。
- [x] **多國語言 (i18n)**：支援英文、日文等多語言切換，擴展國際市場。
- [x] **深層連結 (Deep Link) 支援**：在下載頁面新增直接開啟 App 的 Universal Links 選項。

### 2. ⚡ 效能優化 (Performance Optimization)

- [x] **Astro Prefetching**：啟用 `astro:prefetch` 提升頁面切換的體感速度。
- [x] **圖片優化進階**：針對不同螢幕尺寸提供穩定的 `srcset` 資料，減少不必要的頻寬消耗。
- [x] **更精細的字體加載**：使用 `font-display: swap` 並優化自託管字體的子集化。

### 3. 🛡 品質與自動化 (Quality & CI/CD)

- [x] **CI 測試整合**：將目前的 Playwright (E2E) 與 Vitest (Unit) 整合至 GitHub Actions。
- [x] **Lighthouse CI**：在每次 PR 時自動執行 Lighthouse 監控，防止效能退化。
- [x] **自動化 Commit 檢查**：加強 Husky 與 Commitlint 確保訊息格式一致。

### 4. 🔍 SEO 與內容 (SEO & Content)

- [x] **動態 OG 圖片**：使用 Satori 生成包含應用程式標題與版本的動態分享圖 (目前為靜態 Fallback)。
- [x] **專屬下載按鈕動畫**：為不同平台 (App Store / Google Play) 加入更具質感的互動效果。
- [x] **隱私友善分析**：導入 Umami 或 Beam Analytics 追蹤下載轉化率而不侵犯隱私。

### 5. ✨ UI/UX 體驗

- [x] **更流暢的視圖過渡 (View Transitions)**：優化頁面切換時的動畫曲線與元件保留效果。
- [x] **離線功能強化**：優化 PWA 離線緩存策略，確保在無網路時仍能閱讀基本指南。
- [x] **載入 skeleton 設計**：在動態載入資料時提供骨架屏，減少佈局偏移 (CLS)。

### 6. ⚙️ 進階技術優化 (Advanced Technical Optimizations)

- [x] **內容集合 (Content Collections) 移轉**：將 `versions.json` 移至 Astro Content Collections，利用 Zod 進行 schema 驗證與強型別支援。
- [x] **SoftwareApplication 結構化資料**：在詳情頁實作進階 JSON-LD，讓搜尋引擎能直接顯示 App 版本、評分與下載連結。
- [x] **自定義安裝引導 (PWA Install UI)**：實作 `beforeinstallprompt` 監聽，提供與官網設計一致的軟體安裝引導彈窗。
- [x] **資安強化 (Security Headers)**：導入子資源完整性 (SRI) 檢查，並針對 GitHub Pages 環境優化 CSP 策略。
- [x] **視覺回歸測試**：使用 Playwright 實作截圖對比測試，確保 UI 在不同平台修改後不會跑版。

---

## 📄 授權

---

Copyright © 2026 Presentyourlove. All rights reserved.
