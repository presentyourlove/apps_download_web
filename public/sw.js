const CACHE_NAME = 'apps-download-v3-cache';

// 我們不手動列出所有檔案，讓 Astro 的預設行為處理，或是保持最小化
self.addEventListener('install', (event) => {
    self.skipWaiting(); // 強制跳過等待，立即啟用新版本
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim(); // 確保新 SW 立即控制所有標籤頁
});

// 基本的網路優先策略，確保用戶看到最新內容
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
