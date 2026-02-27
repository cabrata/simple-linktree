// Main entry point for Webpack

// Import styles
import './css/style.css';

// Import scripts
import './js/script.js';

console.log('Webpack static site successfully loaded.');

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
