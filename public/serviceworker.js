
const CACHE_NAME = "CoffeeGame";
/*

var networkDataReceived = false;


// fetch fresh data
var networkUpdate = fetch('/data.json').then(function(response) {
    return response.json();
}).then(function(data) {
    networkDataReceived = true;
    updatePage(data);
});
*/


/*
self.addEventListener("activate", function (event) {
    console.log("[SW] activating sw...", event);
});
*/


self.addEventListener("activate", function(e) {
    var t = Object.keys(CACHE_NAME).map(function (e) {
        return CACHE_NAME[e]
    });
    e.waitUntil(caches.keys().then(function (e) {
        return Promise.all(e.map(function (e) {
            if (-1 === t.indexOf(e)) return caches.delete(e)
        }))
    }).then(function () {
        self.clients.claim()
    }))
});



self.addEventListener('install', function(event) {
  // /  console.log("[SW] installing sw...", event);
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(
                [
                    '/css/*.css',
                    '/image/cups/cup_empty.png',
                    '/image/cups/cup_fill_1.png',
                    '/image/cups/cup_fill_2.png',
                    '/image/cups/cup_fill_3.png',
                    '/image/cups/cup_full.png',
                    '/image/cups/cup_too_full.png',
                    '/index.html',
                    '/fav.ico',
                    '/*.js'
                ]
            );
        })
    );
});


self.addEventListener('fetch', function(event) {
 //   console.log("[SW] fetching sw...", event);
    event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function(response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});
