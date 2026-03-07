const CACHE_NAME = "notepad-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/tailwind.css",
  "/manifest.json",
  "/js/main.js",
  "/js/App.js",
  "/js/NotesAPI.js",
  "/js/NotesView.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

// Install — cache all assets
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch — serve from cache, fallback to network
self.addEventListener("fetch", (e) => {
  // Skip non-GET and external requests
  if (e.request.method !== "GET") return;

  e.respondWith(
    caches.match(e.request).then((cached) => {
      // Return cached version, but also update cache in background
      const fetchPromise = fetch(e.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => cached);

      return cached || fetchPromise;
    })
  );
});
