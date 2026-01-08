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

## � 程式碼品質 (Code Quality)

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

## � 支援平台 (Supported Platforms)

| 瀏覽器 | 最低版本 | PWA 支援 | 備註 |
|--------|----------|----------|------|
| Chrome | 90+ | ✅ | 完整功能支援 |
| Edge | 90+ | ✅ | 完整功能支援 |
| Safari | 15+ | ⚠️ | 需手動「加入主畫面」 |
| Firefox | 88+ | ⚠️ | 支援 Service Worker |
| Android | 5.0+ | ✅ | 支援 WebAPK 安裝 |
| iOS | 14.0+ | ✅ | 支援 PWA 但限制較多 |

## 🛠️ 技術堆疊 (Tech Stack)

- **核心技術**: HTML5, CSS3 (Variables, Flexbox, Grid), Vanilla JavaScript (ES6+)
- **PWA 技術**: Service Worker, Web App Manifest
- **開發運維 (DevOps)**: Docker, Nginx, GitHub Actions
- **品質保證 (QA)**: Playwright (E2E Testing), ESLint

## 📂 專案結構 (Project Structure)

```plaintext
apps_download_web/
├── .github/                # GitHub Actions 自動化流程
├── tests/                  # Playwright 測試腳本
├── assets/                 # 圖片與安裝檔資源
├── components/             # HTML 共用元件 (Header/Footer)
├── css/                    # 樣式表 (Single Source of Truth)
├── js/
│   ├── script.js           # 核心邏輯
│   └── theme-init.js       # 主題初始化 (Anti-FOUC)
├── Dockerfile              # Docker 建置檔
├── nginx.conf              # Nginx 伺服器配置
└── playwright.config.ts    # 測試框架配置
```

## � 開發指南 (Development Guide)

### 推薦環境

- **IDE**: VS Code
- **Extensions**: ESLint, Prettier, Live Server

### 開發流程

1. **修改代碼**：編輯 HTML/CSS/JS 檔案。
2. **本地測試**：使用 `npm start` 預覽變更。
3. **執行檢查**：提交前執行 `npm run lint` 確保無語法錯誤。

## 🧪 測試 (Testing)

本專案使用 **Playwright** 進行端對端 (E2E) 測試。

```powershell
# 執行所有 E2E 測試 (Headless 模式)
npm run test

# 啟動 UI 模式進行除錯
npm run test:ui
```

測試範圍涵蓋：首頁載入、App 下載功能、主題切換、以及 404 錯誤頁面處理。

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

#### 自訂網域設定 (Optional)

1. 在 Repository 根目錄新增 `CNAME` 檔案，內容為您的網域名稱：

   ```
   www.example.com
   ```

2. 在 DNS 供應商處新增以下記錄：
   - **CNAME**: `www` → `presentyourlove.github.io`
   - **A Records** (apex domain):
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

3. 在 GitHub Pages Settings 中勾選 **Enforce HTTPS**

#### 注意事項

> ⚠️ **APK 檔案大小限制**：GitHub 單檔上限為 100MB。建議將 APK 上傳至 [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository) ，並在頁面中提供下載連結。

---

## 🔮 後續優化建議 (Future Roadmap)

以下是建議的後續優化方向，可依需求逐步實施：

### 1. 效能優化 (Performance)

| 項目 | 說明 | 優先級 |
|------|------|--------|
| **Brotli 壓縮** | 啟用 Brotli 壓縮靜態資源 | 中 |
| **Critical CSS** | 內嵌首屏關鍵 CSS，延遲載入非關鍵樣式 | 中 |

### 2. 功能擴展 (Features)

| 項目 | 說明 | 優先級 |
|------|------|--------|
| **多語系支援 (i18n)** | 支援英文/日文等多國語言 | 中 |
| **系統主題偵測** | 自動跟隨作業系統深淺色模式 (`prefers-color-scheme`) | 低 |
| **App 版本資訊 API** | 建立 JSON API 提供最新版本號與更新日誌 | 低 |

### 3. 資安強化 (Security)

| 項目 | 說明 | 優先級 |
|------|------|--------|
| **CSP 監控** | 配置 `report-uri` 收集 CSP 違規報告 | 低 |

---

## 🤝 貢獻 (Contribution)

歡迎任何形式的貢獻！

1. Fork 本專案
2. 建立您的 Feature Branch (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📚 文件 (Documentation)

更多詳細文件請參閱以下資源：

- [專案任務追蹤 (Task)](./task.md)
- [實作計畫 (Implementation Plan)](./implementation_plan.md)
- [優化歷程 (Walkthrough)](./walkthrough.md)

## 📄 授權 (License)

本專案採用 **MIT License** 授權。詳細內容請參閱 [LICENSE](./LICENSE) 文件。

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
