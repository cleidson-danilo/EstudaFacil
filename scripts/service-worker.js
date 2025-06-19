const CACHE_NAME = "estudafacil-v1";
const urlsToCache = [
  "../index.html",
  "../page/cronograma.html",
  "../page/checklist.html",
  "../page/relatorio.html",
  "../page/dicas.html",
  "../page/materiais.html",
  "../page/contato.html",
  "../page/sobre.html",
  "../style/estilo.css",
  "../image/studying.ico",
  "../image/studying.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
