//Asignar nombre y version de la cache
const CACHE_NAME = 'v1_cache_DiegoMartinezpwa'

//ficheros a cachear en la aplicación
var urlsToCache =[
    './',
    './css/styles.css',
    './img/favicon1.png',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    "img/favicon1.png",
    "img/favicon2.png",
    "img/favicon3.png",
    "img/favicon4.png",
    "img/favicon5.png",
    "img/favicon6.png",
    "img/favicon7.png",
    "img/favicon8.png",
    "img/favicon9.png",
    "img/favicon10.png",
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
