// Service worker: salva l'app sul telefono per usarla anche senza rete.
// Quando pubblichi una nuova versione, cambia il numero qui sotto.
const CACHE = 'leggio-v2';
const CORE = ['./', 'index.html', 'manifest.json', 'apple-touch-icon.png',
              'icon-192.png', 'icon-512.png', 'icon-maskable-512.png',
              'songs.json', 'songs/back-to-black.txt'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Risponde subito dalla copia salvata e intanto la aggiorna in sottofondo.
// Vale anche per i font di Google, così restano disponibili offline.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const ok = url.origin === self.location.origin ||
             url.hostname === 'fonts.googleapis.com' ||
             url.hostname === 'fonts.gstatic.com';
  if (!ok) return;
  // Elenco e brani: prima la rete (così vedi subito le novità), poi la copia salvata.
  if (url.origin === self.location.origin && (url.pathname.endsWith('songs.json') || url.pathname.includes('/songs/'))) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.status === 200) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
        return res;
      }).catch(() => caches.match(e.request, { ignoreSearch: true }))
    );
    return;
  }
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(e.request, { ignoreSearch: true }).then(hit => {
        const net = fetch(e.request).then(res => {
          if (res && (res.status === 200 || res.type === 'opaque')) cache.put(e.request, res.clone());
          return res;
        }).catch(() => hit);
        return hit || net;
      })
    )
  );
});
