# Apps Download Web

Presentyourlove 應用程式下載中心 - 使用 Astro SSG 建置的靜態網站。

🌐 **線上網站**: <https://presentyourlove.github.io/apps_download_web/>

---

## 📋 專案簡介

完全靜態生成(SSG)的應用程式下載中心,提供多個應用程式的下載資訊、版本記錄和支援平台資訊。

### 特色功能

- ⚡ **完全靜態生成** - 無需 runtime server
- 🎨 **現代化設計** - 深色主題、玻璃擬態效果
- 📱 **完全響應式** - 支援各種裝置尺寸
- 🔍 **SEO 優化** - Lighthouse SEO 分數 100/100
- ♿ **無障礙友善** - Accessibility 分數 100/100
- 🚀 **自動化部署** - GitHub Actions CI/CD

---

## 🛠 技術堆疊

| 技術 | 版本 |
|------|------|
| Astro | v5.16.7 |
| TypeScript | Strict mode |
| Node.js | 20.x |
| 部署 | GitHub Pages |
| CI/CD | GitHub Actions |

---

## 📦 專案結構

```
apps_download_web/
├── .github/workflows/deploy.yml    # 自動部署設定
├── public/
│   ├── api/versions.json           # 應用程式資料
│   ├── assets/                     # 圖片、Icon
│   └── manifest.json               # PWA manifest
├── src/
│   ├── components/                 # UI 元件
│   ├── layouts/BaseLayout.astro    # 基礎版面
│   ├── lib/data.ts                 # 資料存取層
│   ├── pages/
│   │   ├── [appId].astro           # 動態詳細頁
│   │   ├── 404.astro               # 404 頁面
│   │   ├── about.astro             # 關於我們
│   │   └── index.astro             # 首頁
│   └── styles/global.css           # 全域樣式
├── astro.config.mjs
└── tsconfig.json
```

---

## 🚀 本地開發

### 安裝與執行

```bash
# Clone
git clone https://github.com/presentyourlove/apps_download_web.git
cd apps_download_web

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

開啟: `http://localhost:4321/apps_download_web/`

---

## 📜 可用指令

| 指令 | 說明 |
|------|------|
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | 建置靜態網站 |
| `npm run preview` | 預覽建置結果 |

---

## 📊 效能指標 (Lighthouse)

- **Performance**: 96/100
- **Accessibility**: 100/100
- **Best Practices**: 96/100
- **SEO**: 100/100

---

## 📄 授權

Copyright © 2026 Presentyourlove. All rights reserved.
