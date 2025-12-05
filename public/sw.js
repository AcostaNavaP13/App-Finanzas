const CACHE_NAME = "aca-finance-v1";
const ASSETS = [
  "/App-Finanzas/",
  "/App-Finanzas/index.html",
  "/App-Finanzas/manifest.webmanifest",
  "/App-Finanzas/icon-192.png",
  "/App-Finanzas/icon-512.png",
  "/App-Finanzas/screen-1.png",
  "/App-Finanzas/screen-2.png",
  "/App-Finanzas/screen-3.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
