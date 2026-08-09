const NOME_CACHE = 'nautica-app-v1';

// Questa è la lista di tutti i file che l'app scaricherà per funzionare offline
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
    // Salviamo anche le librerie della mappa!
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// FASE 1: Installazione (scarica tutto e lo mette in stiva)
self.addEventListener('install', (evento) => {
    event.waitUntil(
        caches.open(NOME_CACHE)
            .then((cache) => {
                console.log('Service Worker: File salvati in cache per uso offline');
                return cache.addAll(FILE_DA_SALVARE);
            })
    );
});

// FASE 2: Ascolto (quando sei offline, pesca i file dalla stiva)
self.addEventListener('fetch', (evento) => {
    evento.respondWith(
        caches.match(evento.request)
            .then((risposta_offline) => {
                // Se trova il file in memoria, usa quello, altrimenti usa internet
                return risposta_offline || fetch(evento.request);
            })
    );
});