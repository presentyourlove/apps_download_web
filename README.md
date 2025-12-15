# Presentyourlove - 應用程式下載中心

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PWA](https://img.shields.io/badge/PWA-Supported-orange.svg)

Presentyourlove 官方應用程式下載中心。這裡匯集了我們開發的所有實用工具，包括理財記帳、訂閱管理與拼團媒合服務。

## 🌟 應用程式列表

### 1. FinanceApp - 智慧理財助手

- 📊 **收支追蹤** - 快速記錄每日收入與支出
- 💰 **預算管理** - 設定預算目標,掌握財務狀況
- 📈 **數據分析** - 視覺化圖表,清楚了解財務趨勢

### 2. SubTrack - 訂閱管理助手

- 📅 **週期追蹤** - 自動計算下期扣款日
- 🔔 **付款提醒** - 避免忘記取消試用或過期
- 💵 **支出統計** - 掌握每月/每年固定訂閱開銷

### 3. Sub-Buddy - 拼團小幫手

- 🤝 **合購媒合** - 尋找 Netflix, Spotify 分母夥伴
- 💬 **即時聊天** - 內建聊天室，溝通更順暢
- ⭐ **信譽評價** - 安全可靠的拼團環境

## 📥 下載與使用

本網站支援 **Progressive Web App (PWA)** 技術，您可以直接將此頁面安裝至手機桌面，享受如同原生 App 的離線瀏覽體驗。

### 網頁版 (Web App)

訪問: [https://presentyourlove.github.io/apps_download_web/](https://presentyourlove.github.io/apps_download_web/)

### 行動裝置 (Android / iOS)

- **Android**: 提供 APK 直接下載。
- **iOS**: 提供 IPA 檔案 (需透過 AltStore 安裝)。

## 🎨 網站特色

- **最佳化 PWA 體驗**：支援手機與平板安裝，並具備離線瀏覽能力 (Service Worker)。全站支援 iOS `apple-touch-icon` 主畫面圖示。
- **無障礙友善 (A11y)**：完整的 ARIA 標籤、鍵盤導航支援、焦點指示器與螢幕閱讀器優化。
- **極致效能**：LCP 優化 (資源瘦身)、Anti-FOUC (無閃爍主題切換)、BFcache 支援、DNS Prefetch。
- **現代化體驗**：View Transitions API (原生轉場動畫)、Print CSS (列印最佳化)、PWA 離線支援。
- **隱私與安全**：Content-Security-Policy (CSP), Safe Storage 機制, HTTPS 強制, `noopener` 外鏈防護。
- **SEO 增強**：完整的 JSON-LD 結構化資料, Open Graph 本地化 (Locale), Sitemap 自動生成, 語意化 HTML 標籤。
- **代碼品質**：全書 JSDoc 註解, 嚴格的 Config 集中管理, 無 Magic Numbers, CSS 變數系統 (Single Source of Truth), ES6+ 語法。

## 📂 專案結構

```plaintext
Web/
├── index.html              # 下載中心首頁
├── financeapp-content.html # FinanceApp 介紹頁
├── subtrack-content.html   # SubTrack 介紹頁
├── sub-buddy-content.html  # Sub-Buddy 介紹頁
├── 404.html                # 自訂錯誤頁
├── offline.html            # 離線Fallback頁
├── css/                    # 樣式表 (style.css)
├── js/                     # 腳本 (script.js)
├── components/             # 共用元件 (Header, Footer)
├── assets/                 # 圖片與安裝檔資源
├── sw.js                   # Service Worker (PWA)
├── manifest.json           # Web App Manifest
├── humans.txt              # 開發團隊資訊
├── robots.txt              # 爬蟲規則
└── sitemap.xml             # 網站地圖
```

## 🛠️ 技術棧

- **Core**: HTML5, CSS3 (Variables, Flexbox, Grid), Vanilla JavaScript (ES6+)
- **PWA**: Service Worker, Web App Manifest
- **Performance**: Intersection Observer, Async/Defer Scripts
- **Tools**: VS Code, Git, PowerShell
- **Automation**: Custom PowerShell scripts for maintenance

## 🤖 自動化維護 (Automation)

本專案包含自動化腳本以簡化維護流程：

- **`tools/update_timestamp.ps1`**:
  - 自動掃描 HTML 檔案。
  - 更新 `sitemap.xml` 與 `humans.txt` 的日期戳記。
  - 執行方式: `.\tools\update_timestamp.ps1`

## 📄 授權

Copyright © 2025 Presentyourlove. All rights reserved.

## 🤝 貢獻與聯絡

歡迎透過 GitHub Issues 提交建議。
聯絡信箱: <presentyourlove@gmail.com>

---

Made with ❤️ by Presentyourlove Team
