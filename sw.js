self.addEventListener('install', function(e) {
    //installation will finish only after all files are cached
    e.waitUntil(
        caches.open('cache-rest').then(function(cache) {
            return cache.addAll(cacheRest);
        })
    );
});

//add files to the cache memory
const cacheRest = [
    '/',
    '/index.html',
    '/restaurant.html',
	'/css/styles.css',
	'/css/responsive.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
	'/img/10.jpg',
	'/img/11.jpg',
	'/img/12.jpg'
];

//it is responsible for recovering cache or network files
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if (response) {
                console.log('Found ', e.request, ' in cache');
                return response;
            }
            else {
                // if you can not find the files, request them to the network
                console.log('Could not find ', e.request, ' in cache, FETCHING!');
                return fetch(e.request)
                .then(function(response) {
                    const clonedResponse = response.clone(); 
                    caches.open('cache-rest1').then(function(cache) {
                        cache.put(e.request, clonedResponse);
                    })
                    return response;
                })
                .catch(function(err) {
                    console.error(err);
                });
            }
        })
    );
});
