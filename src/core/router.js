/**
 * Ekalavya Router
 * Optimized for Lucide icon synchronization.
 */
export class Router {
    constructor(viewElementId) {
        this.viewElement = document.getElementById(viewElementId);
        
        // FIX: Don't call handleRoute() immediately. 
        // Wait until window.lucide exists (every 50ms), timeout after 3s.
        this._initLucideSync();
    }

    _initLucideSync() {
        const startTime = Date.now();
        const check = setInterval(() => {
            if (window.lucide || Date.now() - startTime > 3000) {
                clearInterval(check);
                this.handleRoute();
            }
        }, 50);
    }

    handleRoute() {
        // Basic routing logic - ensures icons are rendered on initial load
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }
}
