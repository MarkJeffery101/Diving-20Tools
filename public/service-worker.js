const CACHE_NAME = "diveplan-app-v1";
const MANIFEST_URL = "/manifest.json";
let lastKnownVersion = null;

// Install event - cache essential assets
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Cache opened");
      return self.skipWaiting();
    }),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("[Service Worker] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// Fetch event - network first, fallback to cache
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // For manifest.json, always fetch fresh to check version
  if (event.request.url.includes("manifest.json")) {
    event.respondWith(
      fetch(event.request, { cache: "no-store" })
        .then((response) => {
          // Check version and notify clients if changed
          if (response.status === 200) {
            response
              .clone()
              .json()
              .then((manifest) => {
                const newVersion = manifest.version;
                console.log("[Service Worker] Manifest version:", newVersion);

                if (lastKnownVersion && lastKnownVersion !== newVersion) {
                  console.log(
                    "[Service Worker] Version changed from",
                    lastKnownVersion,
                    "to",
                    newVersion,
                  );
                  // Notify all clients about the update
                  self.clients.matchAll().then((clients) => {
                    clients.forEach((client) => {
                      console.log(
                        "[Service Worker] Posting UPDATE_AVAILABLE to client",
                      );
                      client.postMessage({
                        type: "UPDATE_AVAILABLE",
                        version: newVersion,
                      });
                    });
                  });
                }
                lastKnownVersion = newVersion;
              });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if offline
          return caches.match(event.request);
        }),
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
      }),
  );
});

// Message handler for manual update checks from clients
self.addEventListener("message", (event) => {
  console.log("[Service Worker] Message received:", event.data);

  if (event.data && event.data.type === "CHECK_UPDATE") {
    // Fetch manifest to check for updates
    fetch(MANIFEST_URL, { cache: "no-store" })
      .then((response) => response.json())
      .then((manifest) => {
        const newVersion = manifest.version;
        console.log(
          "[Service Worker] Checking for update. Current:",
          lastKnownVersion,
          "New:",
          newVersion,
        );

        if (lastKnownVersion && lastKnownVersion !== newVersion) {
          console.log("[Service Worker] Update available!");
          event.ports[0].postMessage({
            updateAvailable: true,
            version: newVersion,
          });
          lastKnownVersion = newVersion;

          // Notify all clients
          self.clients.matchAll().then((clients) => {
            clients.forEach((client) => {
              client.postMessage({
                type: "UPDATE_AVAILABLE",
                version: newVersion,
              });
            });
          });
        } else {
          lastKnownVersion = newVersion;
          event.ports[0].postMessage({ updateAvailable: false });
        }
      })
      .catch((err) => {
        console.error("[Service Worker] Update check error:", err);
        event.ports[0].postMessage({
          updateAvailable: false,
          error: err.message,
        });
      });
  }

  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Periodically check manifest for version changes (every 30 seconds)
setInterval(() => {
  fetch(MANIFEST_URL, { cache: "no-store" })
    .then((response) => response.json())
    .then((manifest) => {
      const newVersion = manifest.version;

      if (lastKnownVersion === null) {
        // First check - just store the version
        lastKnownVersion = newVersion;
        console.log("[Service Worker] Initial version set to:", newVersion);
      } else if (lastKnownVersion !== newVersion) {
        // Version changed - notify all clients
        console.log(
          "[Service Worker] Version changed! From:",
          lastKnownVersion,
          "To:",
          newVersion,
        );
        lastKnownVersion = newVersion;

        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            console.log("[Service Worker] Notifying client of update");
            client.postMessage({
              type: "UPDATE_AVAILABLE",
              version: newVersion,
            });
          });
        });
      }
    })
    .catch((err) => {
      console.error("[Service Worker] Periodic check failed:", err);
    });
}, 30000);
