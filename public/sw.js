const CACHE_NAME = 'diveplan-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/placeholder.svg',
  '/robots.txt',
];

const CSV_CACHE = 'diveplan-csv-v1';
const CSV_PATHS = [
  '/data/tables/ESOT_TABLES.csv',
  '/data/tables/HSOX15.csv',
  '/data/tables/H2NIA15.csv',
  '/data/tables/H2NIB15.csv',
  '/data/tables/H2SOX15.csv',
  '/data/tables/NIA15.csv',
  '/data/tables/NIB15.csv',
  '/data/tables/ND15.csv',
  '/data/tables/SAB15.csv',
  '/data/tables/SIL15.csv',
  '/data/tables/SOX15.csv',
];

// Install event - cache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.log('Could not cache some assets:', err);
      });
    }).then(() => {
      // Pre-cache CSV files
      return caches.open(CSV_CACHE).then((cache) => {
        return Promise.allSettled(
          CSV_PATHS.map((path) =>
            cache.add(path).catch((err) => {
              console.log(`Could not cache ${path}:`, err);
            })
          )
        );
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== CSV_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // For CSV files, use cache-first strategy
  if (url.pathname.startsWith('/data/tables/')) {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(request).then((response) => {
          // Cache successful responses
          if (response && response.status === 200) {
            const clonedResponse = response.clone();
            caches.open(CSV_CACHE).then((cache) => {
              cache.put(request, clonedResponse);
            });
          }
          return response;
        }).catch(() => {
          // If offline and no cache, return error page
          return new Response('CSV file not available offline', {
            status: 503,
            statusText: 'Service Unavailable',
          });
        });
      })
    );
    return;
  }

  // For everything else (JS, CSS, etc), use network-first strategy
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses
        if (response && response.status === 200) {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clonedResponse);
          });
        }
        return response;
      })
      .catch(() => {
        // Fall back to cache
        return caches.match(request).then((response) => {
          if (response) {
            return response;
          }
          // Return offline fallback for HTML pages
          if (request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/index.html');
          }
          return new Response('Not available offline', {
            status: 503,
            statusText: 'Service Unavailable',
          });
        });
      })
  );
});
