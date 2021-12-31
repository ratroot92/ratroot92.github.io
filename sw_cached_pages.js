// Call install Event 


const cacheName = 'v1';
const cacheAssets = ['index.html', 'main.js']

self.addEventListener('install', (e) => {
    console.log("Service Worker Installed ==>")
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log(`Service Worker : Caching Files `);
            cache.addAll(cacheAssets)
        }).then(() => {
            self.skipWaiting()
        })

    )
})


self.addEventListener('activate', e => {
    console.log("Service Worker Activated ");
    // Remove unwanted caches 
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log("Service Worker : clearing old cache ")
                        return caches.delete(cache)
                    }
                })
            )
        })
    )

})


//Call fetch Event 
self.addEventListener('fetch', (e) => {
    console.log('Service Worker : Fetching ');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
})