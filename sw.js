/**
 * Service Worker
 * Handles offline caching and PWA capabilities.
 * Strategy: Cache First, then Network (Stale-while-revalidate for some).
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
