// Offline shell for the Receipts app. Receipts themselves live in IndexedDB on the phone.
const VERSION = 'receipts-v9';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// Network first (so updates land), cache fallback (so it opens with no signal). The app's own files skip the
// browser's HTTP cache (GitHub Pages lets it keep them for 10 minutes), so a new version shows up on the next open.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const own = new URL(e.request.url).origin === self.location.origin;
  e.respondWith(
    (own ? fetch(e.request.url, { cache: 'no-store', credentials: 'same-origin' }) : fetch(e.request)).then(r => {
      const copy = r.clone();
      caches.open(VERSION).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('index.html')))
  );
});
