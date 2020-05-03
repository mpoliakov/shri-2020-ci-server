const CACHE_VERSION = '1.0';
const TIMEOUT = 500;

const resNetworkPriority = [
  '/bundle.js'
];

const resCachePriority = [
  '/img/settings-logo.svg',
  'http://yastatic.net/islands/_/PyVcRbwHetz0gOVWLonWH7Od8zM.woff2',
  'http://yastatic.net/islands/_/7_GKBdKFbUPzKlghJRv55xgz0FQ.woff2',
  'http://yastatic.net/islands/_/6Roy0LCd05cK4nNCipgzheYcNVU.woff2'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(function (cache) {
        return cache.addAll([
          ...resNetworkPriority,
          ...resCachePriority
        ]);
      })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    // clear now actual resources
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName !== CACHE_VERSION;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

function fromNetwork(request, timeout) {
  return new Promise((resolve, reject) => {
    var timeoutId = setTimeout(reject, timeout);
    fetch(request).then((response) => {
      clearTimeout(timeoutId);
      resolve(response);
    }, reject);
  });
}

function update(key, response) {
  let responseCopy = response.clone();

  caches.open(CACHE_VERSION).then(function (cache) {
    cache.put(key, responseCopy);
  });
}

self.addEventListener('fetch', function (event) {
  const url = new URL(event.request.url);

  // Network falling back to cache
  const key1 = resNetworkPriority.find((res) => res === url.pathname || res === url.href);

  if (key1) {
    event.respondWith(
      fromNetwork(event.request, TIMEOUT)
        .then(function (response) {
          update(key1, response);
          return response;
        })
        .catch(function () {
          return caches.match(key1)
            .then(function (response) {
              return response || fetch(event.request)
                .then(function (response) {
                  update(key1, response);
                  return response;
                });
            })
        })
    );
  }

  // Cache, falling back to network
  const key2 = resCachePriority.find((res) => res === url.pathname || res === url.href);

  if (key2) {
    event.respondWith(
      caches.match(url.pathname)
        .then(function (response) {
          return response || fetch(event.request)
            .then(function (response) {
              update(key2, response);
              return response;
            });
        })
    );
  }
});

