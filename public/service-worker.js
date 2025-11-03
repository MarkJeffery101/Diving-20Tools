const CACHE_NAME = 'diveplan-app-v1';
const MANIFEST_URL = '/manifest.json';

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Cache opened');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // For manifest.json, always fetch fresh to check version
  if (event.request.url.includes('manifest.json')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then((response) => {
          return response;
        })
        .catch(() => {
          // Fallback to cache if offline
          return caches.match(event.request);
        })
    );
    return;
  }

  // Network first strategy for all other requests
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache on network error
        return caches.match(event.request);
      })
  );
});

// Periodic background sync for update checking
self.addEventListener('sync', (event) => {
  if (event.tag === 'check-update') {
    event.waitUntil(checkForUpdate());
  }
});

// Check for app updates by monitoring manifest version
async function checkForUpdate() {
  try {
    const response = await fetch(MANIFEST_URL, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
    });
    const manifest = await response.json();
    const currentVersion = manifest.version;

    // Store version in indexed DB or local storage
    const db = await openDB();
    const storedVersion = await getStoredVersion(db);

    if (storedVersion && storedVersion !== currentVersion) {
      console.log('[Service Worker] New version detected:', currentVersion);
      // Notify all clients about the update
      const clients = await self.clients.matchAll();
      clients.forEach((client) => {
        client.postMessage({
          type: 'UPDATE_AVAILABLE',
          version: currentVersion
        });
      });
    } else if (!storedVersion) {
      // First time - store the version
      await storeVersion(db, currentVersion);
    }
  } catch (error) {
    console.error('[Service Worker] Update check error:', error);
  }
}

// Simple localStorage-based version tracking
function getStoredVersion() {
  try {
    return Promise.resolve(localStorage.getItem('app-version'));
  } catch {
    return Promise.resolve(null);
  }
}

function storeVersion(version) {
  try {
    localStorage.setItem('app-version', version);
    return Promise.resolve();
  } catch {
    return Promise.resolve();
  }
}

function openDB() {
  return Promise.resolve(null);
}

// Periodically check for updates
setInterval(() => {
  checkForUpdate();
}, 30000); // Check every 30 seconds

// Message handler for manual update checks from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CHECK_UPDATE') {
    checkForUpdate();
  }
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
