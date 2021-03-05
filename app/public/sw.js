var CACHE_NAME = 'staticV2';

this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll([
                './',
                //
                 './css/style.css',
                 './css/bootstrap.min.css',
                                 //
                'img/ico_usuario.png',
                'img/login-bg.jpg',
                'img/multiroom_chat_2.png',
                'img/multiroom_chat.png',
                //
                '../../manifest.json',
             ]);
        })
    );
});

self.addEventListener('activate', function activator(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(keys
                .filter(function(key) {
                    return key.indexOf(CACHE_NAME) !== 0;
                })
                .map(function(key) {
                    return caches.delete(key);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(cachedResponse) {
            return cachedResponse || fetch(event.request);
        })
    );
});
