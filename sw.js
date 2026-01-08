/**
 * Service Worker
 * Handles offline caching and PWA capabilities.
 * Strategy: Cache First, then Network (Stale-while-revalidate for APIs).
 */
'use strict';

const CACHE_NAME = 'pyl-cache-v15';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './financeapp-content.html',
    './subtrack-content.html',
    './sub-buddy-content.html',
    './links.html',
    './404.html',
    './css/style.css',
    './js/script.js',
    './js/theme-init.js',
    './assets/presentyourlove-logo-32.png',
    './assets/presentyourlove-logo-192.png',
    './assets/presentyourlove-logo-512.png',
    './assets/financeapp-icon-192.png',
    './assets/subtrack-icon-192.png',
    './assets/sub-buddy-icon-192.png',
    './manifest.json',
    './components/header.html',
    './components/footer.html',
    './components/cookie-consent.html',
    './offline.html'
];

// Install Event
self.addEventListener('install', (event) => {
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Activate Event
self.addEventListener('activate', (event) => {
    // Claim any clients immediately, so that the page will be controlled by the service worker immediately
    event.waitUntil(
        Promise.all([
            self.clients.claim(),
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    // API Strategy: Stale-while-revalidate
    // 優先回傳快取內容，並同時在背景更新快取
    if (event.request.url.includes('/api/')) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(event.request).then((cachedResponse) => {
                    const fetchPromise = fetch(event.request).then((networkResponse) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                    return cachedResponse || fetchPromise;
                });
            })
        );
        return;
    }

    // Default Strategy: Cache First, then Network
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached response if found
                if (response) {
                    return response;
                }
                // Otherwise fetch from network
                return fetch(event.request).catch(() => {
                    // Check if request is for navigation (HTML page)
                    if (event.request.mode === 'navigate') {
                        return caches.match('./offline.html');
                    }
                });
            })
    );
});

// Push Event
self.addEventListener('push', event => {
    const data = event.data.json();
    console.log('Push Recieved...');

    // Customize notification based on payload's notification property
    const { title, ...options } = data.notification;

    self.registration.showNotification(title, options);
});

// Notification Click Event
self.addEventListener('notificationclick', function (event) {
    console.log('[Service Worker] Notification click Received.');

    event.notification.close();

    event.waitUntil(
        clients.openWindow('https://presentyourlove.github.io/apps_download_web/')
    );
});
