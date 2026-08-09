const NOME_CACHE = 'nautica-app-v2'; // Aggiornato a v2!

// Lista aggiornata di TUTTI i file dell'app
const FILE_DA_SALVARE = [
    './',
    './index.html',
    './config.js',
    './css/style.css',
    './js/core_navigazione.js',
    './js/core_vela.js',
    './moduli/home.html',
    './moduli/carteggio.html',
    './moduli/quiz.html',
    './moduli/vela.html',
    './moduli/mappa.html',
    './moduli/meteo.html',
    './moduli/ancora.html',
    './moduli/fari.html',
    './moduli/maree.html',
    './moduli/motore.html',
    './moduli/vhf.html',
    './moduli/logbook.html'
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', (evento) => {
    evento.waitUntil(
        caches.open(NOME_CACHE)
            .then((cache) => {
                console.log('Service Worker V2: Nuovi file salvati in stiva.');
                return cache.addAll(FILE_DA_SALVARE);
            })
    );
});

self.addEventListener('fetch', (evento) => {
    evento.respondWith(
        caches.match(evento.request)
            .then((risposta_offline) => {
                return risposta_offline || fetch(evento.request);
            })
    );
});