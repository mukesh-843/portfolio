/*===== SERVICE WORKER FOR CACHING =====*/
const CACHE_NAME = 'mukesh-portfolio-v3.0-' + Date.now();
const urlsToCache = [
    '/',
    '/index.html',
    '/assets/css/styles.css',
    '/assets/js/main.js',
    '/assets/js/performance-manager.js',
    '/assets/js/code-cube.js',
    '/assets/js/terminal.js',
    '/assets/js/particles.js',
    '/assets/js/skills-radar.js',
    '/assets/img/front.png',
    '/assets/img/front_1.png',
    '/Mukesh_Gautam_C.pdf',
    'https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css',
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching resources');
                return cache.addAll(urlsToCache.map(url => {
                    return new Request(url, { mode: 'no-cors' });
                })).catch(error => {
                    console.error('Failed to cache some resources:', error);
                    // Continue installation even if some resources fail
                    return Promise.resolve();
                });
            })
    );
    
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    
    // Take control of all pages
    self.clients.claim();
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    // Skip external APIs that need fresh data
    if (event.request.url.includes('api.github.com')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                if (response) {
                    console.log('Serving from cache:', event.request.url);
                    return response;
                }
                
                console.log('Fetching from network:', event.request.url);
                return fetch(event.request).then((response) => {
                    // Don't cache non-successful responses
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clone the response
                    const responseToCache = response.clone();
                    
                    // Add to cache for future use
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                }).catch(error => {
                    console.error('Fetch failed:', error);
                    
                    // Return a custom offline page for navigation requests
                    if (event.request.destination === 'document') {
                        return new Response(`
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <title>Offline - Mukesh Gautam Portfolio</title>
                                <style>
                                    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                                    .offline-message { color: #666; }
                                </style>
                            </head>
                            <body>
                                <h1>You're Offline</h1>
                                <p class="offline-message">Please check your internet connection and try again.</p>
                                <button onclick="location.reload()">Retry</button>
                            </body>
                            </html>
                        `, {
                            headers: { 'Content-Type': 'text/html' }
                        });
                    }
                    
                    throw error;
                });
            })
    );
});

// Background sync for failed requests
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        console.log('Background sync triggered');
        event.waitUntil(
            // Retry failed requests here
            Promise.resolve()
        );
    }
});

// Push notifications (if needed in future)
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/assets/img/favicon.ico',
            badge: '/assets/img/favicon.ico',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: '1'
            }
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    console.log('Notification click received.');
    
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});