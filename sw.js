const CACHE_NAME = 'iqra-tech-cache-v8';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/academy.html',
  '/quran.html',
  '/dictionary.html',
  '/style.css',
  '/script.js',
  '/grammarData.js',
  'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force the new service worker to activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    clients.claim().then(() => { // Take control of all open pages immediately
      return caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
