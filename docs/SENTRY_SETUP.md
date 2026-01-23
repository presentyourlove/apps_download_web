# Sentry 與 GitHub Secrets 設定指南

## 1. 取得 Sentry DSN (PUBLIC_SENTRY_DSN)

這用於告訴前端應用程式要將錯誤傳送到哪裡。

1. 登入 [Sentry.io](https://sentry.io/)。
2. 建立一個新專案 (Project)，選擇平台為 **Astro** (或 Browser JavaScript)。
3. 進入專案的 **Settings** (設定) > **Client Keys (DSN)**。
4. 複製 **DSN** 字串。
   - 格式通常為: `https://examplePublicKey@o0.ingest.sentry.io/0`
   - 這就是您的 `PUBLIC_SENTRY_DSN`。

## 2. 取得 Sentry Auth Token (SENTRY_AUTH_TOKEN)

這用於在建置時上傳 Source Maps，讓 Sentry 能顯示正確的程式碼行數。

1. 點擊左下角的個人頭像 > **User Settings** (使用者設定)。
2. 在左側選單選擇 **Auth Tokens** (API)。
3. 點擊 **Create New Token**。
4. 權限設定 (Scopes)：
   - 確保勾選 `project:releases` (Release management) 或 `project:write`。
   - 這是上傳 Source Maps 所必需的。
5. 建立後，複製這串 Token (以 `sntry_` 開頭)。
   - 這就是您的 `SENTRY_AUTH_TOKEN`。

## 3. 設定 GitHub Secrets

這用於讓 GitHub Actions (CI/CD) 能夠存取上述資訊。

1. 進入您的 GitHub 儲存庫頁面 (`apps_download_web`)。
2. 點擊上方選單的 **Settings** (設定)。
3. 在左側欄選單中，展開 **Secrets and variables** > 點擊 **Actions**。
4. 在 "Repository secrets" 區域，點擊 **New repository secret** (新增儲存庫密鑰)。
5. 新增以下兩組 Secret：

   | Name | Secret | 說明 |
   | :--- | :--- | :--- |
   | `PUBLIC_SENTRY_DSN` | (貼上步驟 1 的 DSN) | 雖然可以在前端公開，但在 Build 階段注入較安全 |
   | `SENTRY_AUTH_TOKEN` | (貼上步驟 2 的 Token) | **絕對不能公開**，僅限 CI 建置使用 |

6. 設定完成後，下次推送程式碼時，CI 流程就會自動讀取這些設定並上傳 Source Maps。

## 4. 本地開發設定 (可選)

若要在本地測試 Sentry，請將上述數值填入 `.env` 檔案：

```ini
PUBLIC_SENTRY_DSN=https://...
SENTRY_AUTH_TOKEN=sntry_...
```

> ⚠️ 注意：請確保 `.env` 已被列在 `.gitignore` 中，不要提交到版控！
