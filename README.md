# Apps Download Web

<div align="center">

![Logo](https://presentyourlove.github.io/apps_download_web/assets/presentyourlove-logo-192.webp)

**Presentyourlove 應用程式下載中心**

使用 Astro SSG 建置的現代化靜態網站

🌐 **線上網站**: <https://presentyourlove.github.io/apps_download_web/>

[![Deploy to GitHub Pages](https://github.com/presentyourlove/apps_download_web/actions/workflows/deploy.yml/badge.svg)](https://github.com/presentyourlove/apps_download_web/actions/workflows/deploy.yml)

</div>

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

| 功能 | 說明 |
|------|------|
| 🏠 首頁 | 展示所有應用程式,支援動態下拉選單 |
| 📱 應用詳情 | 顯示版本、支援平台、下載連結 |
| 📋 AltStore 指南 | iOS 側載安裝說明 |
| 👤 關於我們 | 社交連結與聯絡資訊 |
| 🌓 主題切換 | 深色/淺色模式 |
| 📊 PWA 支援 | 可安裝為桌面應用程式 |

---

## 🏆 程式碼品質

| 指標 | 分數 |
|------|------|
| 🚀 Performance | 96/100 |
| ♿ Accessibility | 100/100 |
| ✅ Best Practices | 96/100 |
| � SEO | 100/100 |

**使用的最佳實踐**:

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

| 應用程式 | Android | iOS | Web |
|----------|---------|-----|-----|
| 智慧理財助手 | ✅ APK | 🔜 3月 | ✅ |
| 訂閱管理助手 | - | 🔜 3月 | - |
| 拼團小幫手 | - | - | ✅ |

> 🔜 = 預計 2026 年 3 月初上架

---

## 🛠 技術堆疊

| 類別 | 技術 |
|------|------|
| **框架** | Astro 5.x (SSG) |
| **語言** | TypeScript (Strict) |
| **樣式** | CSS Variables + Glassmorphism |
| **建置** | Vite |
| **部署** | GitHub Pages |
| **CI/CD** | GitHub Actions |
| **SEO** | Sitemap, JSON-LD, OpenGraph |

---

## 📦 專案結構

```
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

**Presentyourlove**

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

Copyright © 2026 Presentyourlove. All rights reserved.
