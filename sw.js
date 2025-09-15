// StoryShelf Service Worker
// Version 1.0.0

const CACHE_NAME = 'storyshelf-v1.0.0';
const urlsToCache = [
    './',
    './index.html',
    './styles.css',
    './script.js',
    './manifest.json',
    './icon.jpg'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
    console.log('Service Worker: Install event');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Service Worker: Caching app resources');
                return cache.addAll(urlsToCache);
            })
            .catch(function(error) {
                console.error('Service Worker: Cache failed', error);
            })
    );

    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
    console.log('Service Worker: Activate event');

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    // Delete old caches that don't match current version
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(function() {
            console.log('Service Worker: Claiming clients');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', function(event) {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached version if available
                if (response) {
                    console.log('Service Worker: Serving from cache', event.request.url);
                    return response;
                }

                // Fetch from network
                console.log('Service Worker: Fetching from network', event.request.url);
                return fetch(event.request).then(function(response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response as it can only be consumed once
                    const responseToCache = response.clone();

                    // Add to cache for future requests
                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }).catch(function(error) {
                    console.error('Service Worker: Fetch failed', error);

                    // Return offline fallback for HTML requests
                    if (event.request.headers.get('accept').includes('text/html')) {
                        return caches.match('./index.html');
                    }
                });
            })
    );
});

// Background sync for future enhancements
self.addEventListener('sync', function(event) {
    console.log('Service Worker: Background sync', event.tag);

    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Could implement background book list synchronization here
            console.log('Service Worker: Background sync completed')
        );
    }
});

// Push notifications (for future reading reminders)
self.addEventListener('push', function(event) {
    console.log('Service Worker: Push received');

    const options = {
        body: event.data ? event.data.text() : 'Time to pick your next book!',
        icon: './icon.jpg',
        badge: './icon.jpg',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '2'
        },
        actions: [
            {
                action: 'explore',
                title: 'Pick Books',
                icon: './icon.jpg'
            },
            {
                action: 'close',
                title: 'Close',
                icon: './icon.jpg'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('StoryShelf', options)
    );
});

// Handle notification click
self.addEventListener('notificationclick', function(event) {
    console.log('Service Worker: Notification click received');

    event.notification.close();

    if (event.action === 'explore') {
        // Open the app
        event.waitUntil(
            clients.openWindow('./')
        );
    } else if (event.action === 'close') {
        // Just close the notification (already done above)
        console.log('Service Worker: Notification dismissed');
    } else {
        // Default action - open the app
        event.waitUntil(
            clients.openWindow('./')
        );
    }
});

// Handle messages from main thread
self.addEventListener('message', function(event) {
    console.log('Service Worker: Message received', event.data);

    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({
            version: CACHE_NAME,
            timestamp: new Date().toISOString()
        });
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.delete(CACHE_NAME).then(function() {
                event.ports[0].postMessage({ success: true });
            })
        );
    }
});

// Error handling
self.addEventListener('error', function(event) {
    console.error('Service Worker: Error occurred', event.error);
});

// Unhandled promise rejections
self.addEventListener('unhandledrejection', function(event) {
    console.error('Service Worker: Unhandled promise rejection', event.reason);
    event.preventDefault();
});

// Utility function to check if request should be cached
function shouldCache(request) {
    const url = new URL(request.url);

    // Don't cache external resources
    if (url.origin !== self.location.origin) {
        return false;
    }

    // Don't cache API calls (none in this app, but for future)
    if (url.pathname.startsWith('/api/')) {
        return false;
    }

    // Cache static resources
    const staticExtensions = ['.html', '.css', '.js', '.json', '.jpg', '.png', '.svg', '.ico'];
    return staticExtensions.some(ext => url.pathname.endsWith(ext)) || url.pathname === '/';
}

// Update available notification
self.addEventListener('updatefound', function(event) {
    console.log('Service Worker: Update found');

    // Could notify the main app about available updates
    self.clients.matchAll().then(function(clients) {
        clients.forEach(function(client) {
            client.postMessage({
                type: 'UPDATE_AVAILABLE',
                version: CACHE_NAME
            });
        });
    });
});

console.log('Service Worker: Loaded and ready');
console.log('Service Worker: Cache name', CACHE_NAME);
console.log('Service Worker: URLs to cache', urlsToCache);