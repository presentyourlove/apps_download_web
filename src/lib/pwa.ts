export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            const swUrl = `${import.meta.env.BASE_URL}/sw.js`;

            navigator.serviceWorker.register(swUrl).then(registration => {
                // 強制要求瀏覽器立即去伺服器檢查 sw.js 是否有更新
                registration.update();

                // 如果發現新版本的 SW 正在安裝
                registration.onupdatefound = () => {
                    const installingWorker = registration.installing;
                    if (installingWorker) {
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // 新內容已下載完成且準備就緒
                                console.log('New content detected, force activating...');
                                // 發送指令給 SW 叫它不用等了，直接啟用
                                installingWorker.postMessage({ type: 'SKIP_WAITING' });
                            }
                        };
                    }
                };
            }).catch(error => {
                console.error('SW registration failed:', error);
            });
        });

        // 核心：一旦 Service Worker 被新版本替換並接管控制權，立即刷新頁面
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (refreshing) return;
            refreshing = true;
            console.log('Controller changed, reloading page for latest version...');
            window.location.reload();
        });
    }
}
