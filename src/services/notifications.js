/**
 * Ekalavya Notification Engine
 * Handles both browser push notifications and internal UI alerts
 */
export const notificationManager = {
    async requestPermission() {
        if (!('Notification' in window)) {
            console.log('This browser does not support notifications');
            return false;
        }

        const permission = await Notification.requestPermission();
        return permission === 'granted';
    },

    /**
     * Sends a notification (Browser if possible, otherwise internal UI toast)
     */
    async sendPulse(title, options = {}) {
        // FIX: Must check if Notification API exists before accessing .permission property
        if (!('Notification' in window)) {
            this.showInternalAlert(title, options.body || '');
            return;
        }

        const canNotify = Notification.permission === 'granted' || await this.requestPermission();
        
        if (canNotify) {
            new Notification(title, {
                icon: '../public/Logo.jpeg',
                body: options.body || 'A new update is available in Ekalavya.',
                ...options
            });
        } else {
            this.showInternalAlert(title, options.body || '');
        }
    },

    /**
     * Shows a glassmorphic toast notification in the UI
     */
    showInternalAlert(title, message) {
        const toastContainer = document.getElementById('toast-container') || this.createToastContainer();
        
        const toast = document.createElement('div');
        toast.className = 'glass-card p-4 mb-3 border-l-4 border-l-ekalavya-gold animate-slide-in';
        toast.innerHTML = `
            <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-full bg-ekalavya-gold/10 flex items-center justify-center">
                    <i data-lucide="bell" class="w-4 h-4 text-ekalavya-gold"></i>
                </div>
                <div>
                    <h4 class="text-xs font-bold text-white mb-0.5">${title}</h4>
                    <p class="text-[10px] text-white/50">${message}</p>
                </div>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        if (window.lucide) window.lucide.createIcons();
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            toast.classList.add('animate-slide-out');
            setTimeout(() => toast.remove(), 500);
        }, 5000);
    },

    createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none max-w-xs';
        document.body.appendChild(container);
        return container;
    }
};
