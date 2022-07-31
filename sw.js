workbox.skipWaiting();
workbox.clientsClaim();

var cacheList = ["/", "/index.html"];

workbox.routing.registerRoute(
  new RegExp(/\.(?:html|css)$/),
  workbox.strategies.networkFirst({
    cacheName: "ql:html",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp(/\.(?:js|css)$/),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "ql:static",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp(/\.(?:png|gif|jpg|jpeg|webp|svg|cur)$/),
  workbox.strategies.cacheFirst({
    cacheName: "ql:img",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 12 * 60 * 60,
      }),
    ],
  })
);
