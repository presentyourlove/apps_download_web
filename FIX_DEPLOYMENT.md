# 修正 GitHub Pages 部署失敗說明 (V3)

由於本專案使用 **Astro (SSG)** 建置，GitHub 必須設定為透過 **Actions** 部署，而非預設的 Jekyll。

### 🛠 解決步驟

1. 開啟 GitHub 儲存庫頁面。
2. 點擊 **Settings** (設定)。
3. 在左側選單選擇 **Pages**。
4. 在 **Build and deployment** > **Source** 下拉選單中，將 `Deploy from a branch` 改為 **`GitHub Actions`**。

這樣 GitHub 就會正確執行 `.github/workflows/deploy.yml` 中的 Astro 建置流程，而不會嘗試使用 Jekyll 處理 Markdown 檔案。
