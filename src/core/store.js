/**
 * Simple Observable Store for Vanilla JS
 */
class Store {
    constructor(initialState = {}) {
        this.state = initialState;
        this.listeners = [];
    }

    getState() {
        return this.state;
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }
}

// Global UI State
// FIX: Added missing 'streak' field — used in updateAuthUI and DashboardView but was never initialized
export const uiStore = new Store({
    isLoggedIn: false,
    user: null,
    theme: 'dark',
    score: 0,
    streak: 0
});
