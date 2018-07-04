var cache_name = 'note'
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
  'howler.js',
  'buttonpress.mp4',
  'buttonpress1.mp4',
  'edit.png'
]
self.addEventListener('install', function(event) {
  function onInstall () {
    console.log('Service worker installation', cache_name)
    return caches.open(cache_name)
      .then(function(cache) {
        console.log('Caching pre-defined assets on installation...', filesToCache)
        return cache.addAll(filesToCache)
      });
  }
  event.waitUntil(onInstall(event))
})

self.addEventListener('fetch', function(event) {
  console.log(event.request)
  var responsePromise = fetch(event.request)
    .then(function(response) {
      if (!response || !response.ok) {
        return response
      }
      var responseToCache = response.clone()
      caches.open(cache_name)
        .then(function(cache) {
          cache.put(event.request, responseToCache)
        });
      return response
    })
    .catch(function(err) {
      console.log('Fetch failed, maybe we are offline. Try cache...', err)
      return caches.match(event.request)
        .then(function(response) {
          if (response) {
            console.log('Cache hit', event.request)
            return response;
          } else {
            console.log('Offline cache miss =(')
          }
        });
    });
  event.respondWith(responsePromise)
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = [cache_name]
  event.waitUntil(
    caches.keys(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) == -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
