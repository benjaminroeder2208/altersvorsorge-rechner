/**
 * Service Worker — Asset Caching
 *
 * Strategy:
 *  - cache-first for hashed build assets (/assets/*.{js,css,woff2}) and /fonts/*.woff2.
 *    These have content-hashed filenames, so they are immutable: safe to serve from
 *    cache forever and never revalidate.
 *  - network-first (no cache) for everything else (HTML documents, API calls, images).
 *    This keeps deploys instant for users — new index.html is always fetched fresh,
 *    which then references new hashed asset URLs.
 *
 * Bump CACHE_VERSION when you intentionally want to invalidate everything (e.g. SW
 * logic change). Old caches are deleted on activate.
 */

const CACHE_VERSION = "v1";
const CACHE_NAME = `static-assets-${CACHE_VERSION}`;

// URL patterns we treat as long-lived, content-hashed assets.
const isCacheableAsset = (url) => {
  const path = url.pathname;
  if (path.startsWith("/assets/") && /\.(?:js|css|woff2?)$/i.test(path)) return true;
  if (path.startsWith("/fonts/") && /\.woff2?$/i.test(path)) return true;
  return false;
};

self.addEventListener("install", (event) => {
  // Activate the new SW immediately on next page load.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Drop any caches that don't match the current version.
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Only handle GET — never cache POST/PUT/etc.
  if (request.method !== "GET") return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }

  // Only handle same-origin assets. Cross-origin (Supabase, Resend, fonts CDN, etc.)
  // is left to the browser / their own cache headers.
  if (url.origin !== self.location.origin) return;

  if (!isCacheableAsset(url)) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      if (cached) return cached;

      try {
        const response = await fetch(request);
        // Only cache successful, basic (same-origin) responses.
        if (response && response.status === 200 && response.type === "basic") {
          // Clone before caching — body stream can only be consumed once.
          cache.put(request, response.clone());
        }
        return response;
      } catch (err) {
        // Offline + not in cache → propagate the error to the page.
        throw err;
      }
    })()
  );
});
