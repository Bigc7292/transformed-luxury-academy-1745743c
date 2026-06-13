// Minimal service worker to enable PWA installability on Chrome/Android
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass-through fetch handler (Vite handles hot module replacement and routing dynamically)
  event.respondWith(fetch(event.request));
});
