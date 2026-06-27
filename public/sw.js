const CACHE_NAME = 'v1';
const ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // If network response is ok and HTML, return it
          if (response && response.ok && response.headers.get('Content-Type')?.includes('text/html')) {
            return response;
          }
          // Otherwise, serve the cached SPA shell (index.html)
          return caches.match('/index.html');
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  } else {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request))
    );
  }
});
