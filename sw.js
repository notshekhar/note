var cache_name = 'note';
var filesToCache = [
  'index.htm',
  'note.css',
  'note.js',
  'add.svg',
  'flurr.ttf',
  'list.svg',
  'manifest.json',
  'sw.js',
  'zero-state.svg',
  'menu-dots.svg',
  'logo.png',
  'logo144.png',
  'howler.js'
];
self.addEventListener('install', function(event) {
  function onInstall () {
    console.log('Service worker installation', cache_name);

    return caches.open(cache_name)
      .then(function(cache) {
        console.log('Caching pre-defined assets on installation...', filesToCache);
        return cache.addAll(filesToCache);
      });
  }
  event.waitUntil(onInstall(event));
});

/**
 * Cache other resources, e.g. the rest of the emojis, on fetch.
 */
self.addEventListener('fetch', function(event) {
  console.log(event.request)
  // If we can fetch latest version, then do so
  var responsePromise = fetch(event.request)
    .then(function(response) {
      // Don't cache response unless it's 2xx status
      if (!response || !response.ok) {
        return response;
      }
      // Clone it to allow us to cache it
      var responseToCache = response.clone();
      caches.open(cache_name)
        .then(function(cache) {
          cache.put(event.request, responseToCache);
        });
      return response;
    })
    .catch(function(err) {
      // NOTE: On a patchy network, it could take a long time for the fetch
      // to fail and for us to get here. TO DO: introduce a timeout.
      console.log('Fetch failed, maybe we are offline. Try cache...', err);
      return caches.match(event.request)
        .then(function(response) {
          if (response) {
            console.log('Cache hit', event.request);
            return response;
          } else {
            console.log('Offline cache miss =(');
          }
        });
    });
  event.respondWith(responsePromise);
});

/**
 * Clear out old caches on activation
 */
self.addEventListener('activate', function(event) {
  var cacheWhitelist = [cache_name];
  event.waitUntil(
    caches.keys(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // If it is not a current cache, delete it
          if (cacheWhitelist.indexOf(cacheName) == -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
