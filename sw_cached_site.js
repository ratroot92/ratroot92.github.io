// Call install Event 


const cacheName = 'v2';

self.addEventListener('install', (e) => {
    console.log("Service Worker Installed ==>")
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

        fetch(e.request).then((res) => {
            // Make copy/clone of response 
            const resClone = res.clone();
            caches.open(cacheName).then((cache) => {
                // Add response to cache 
                cache.put(e.request, resClone);

            })
            return res;
        }).catch(err => {
            console.log("Inside Error ")
            return caches.match(e.request).then((res) => res)
        })
    )
})