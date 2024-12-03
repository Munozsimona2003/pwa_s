//Asignar nombre y version de la cache
const CACHE_NAME = 'v1_cache_DiegoMartinezpwa'

//ficheros a cachear en la aplicación
var urlsToCache =[
    './',
    './css/styles.css',
    './img/favicon.png',
    './img/mapache.png',
    './img/hienas.jpeg',
    './img/erizo.jpeg',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    "img/favicon_1024x1024.png",
    "img/favicon_512x512.png",
    "img/favicon_384x384.png",
    "img/favicon_256x256.png",
    "img/favicon_192x192.png",
    "img/favicon_128x128.png",
    "img/favicon_96x96.png",
    "img/favicon_64x64.png",
    "img/favicon_32x32.png",
    "img/favicon_16x16.png",
];
//evento install
//instalación del servicio worker y guarda en cache los recursos estaticos

self.addEventListener('install', e =>{
    e.waitUtil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
            .then(() =>{
                self.skipWaiting();
            });
        })
        .catch(err => console.log('No se ha registrado el cache', err))
    );
});
//Evento activate
// Que la app funcione sin conexión
self.addEventListener('activate', e => {
	const cacheWhitelist =[CACHE_NAME];

	e.waitUntil(
		caches.keys()
			.then(cacheNames => {
				return Promise.all(
					cacheNames.map(cacheName => {

						if(cacheWhitelist.indexOf(cacheName) === -1){
							// Borrar elementos que no se necesitan
							return caches.delete(cacheName);
						}

					})
				);
			})
		.then(() => {
			//Activar cache
			self.clients.claim();
		})
	);
});

//Evento fetch
self.addEventListener('fetch', e => {

	e.respondWith(
		caches.match(e.request)
		.then(res =>{
			if(res){
				return res;
			}
			return fetch(e.request);
		})
	);
});