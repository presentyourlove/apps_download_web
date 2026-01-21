import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker() {
    registerSW({
        immediate: true,
        onNeedRefresh() {
            console.log('New content available, reload to update.');
        },
        onOfflineReady() {
            console.log('App is ready for offline usage.');
        },
    });
}
