import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker() {
  registerSW({
    immediate: true,
    onNeedRefresh() {
      // eslint-disable-next-line no-console
      console.log('New content available, reload to update.');
    },
    onOfflineReady() {
      // eslint-disable-next-line no-console
      console.log('App is ready for offline usage.');
    },
  });
}
