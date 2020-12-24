const version = 1;
const cacheName = `statistry-${version}`;

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                `/`,
                `/index.html`,
                `/css/main.min.css`,
                `/img/logo_nopad.png`,
                `/img/simon-migaj-Yui5vfKHuzs-unsplash.jpg`,
                `/img/markus-spiske-k0rVudBoB4c-unsplash.jpg`,
                `/img/dan-gold-4_jhDO54BYg-unsplash.jpg`,
                `/img/sandra-grunewald-Ph83nc27OeU-unsplash.jpg`
            ])
                .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName)
            .then(cache => cache.match(event.request, { ignoreSearch: true }))
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
