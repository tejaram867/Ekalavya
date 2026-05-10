import { authManager } from './services/auth.js';
import { renderers, refreshIcons } from './modules/renderers.js';
import { uiStore } from './core/store.js';
import i18n, { initI18n } from './core/i18n.js';
import { supabase } from './core/supabase.js';
import { notificationManager } from './services/notifications.js';
import { Router } from './core/router.js';
// Router is handled via MPA HTML files now

/**
 * Ekalavya - Knowledge Empowers
 * Main Entry Point (Multi-View Integrated)
 */

// Update page text based on translation
const updateTranslations = () => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerText = i18n.t(key);
    });
};

// PWA Service Worker Registration
const registerServiceWorker = async () => {
    // FIX: import.meta.env.PROD is Vite-specific and throws in plain HTML/JS projects
    // Replaced with a universal check: only register SW when not on localhost
    if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('SW registered:', registration);
        } catch (error) {
            console.log('SW registration failed:', error);
        }
    }
};

// ──────────────────────────────────
// Auth Modal Logic
// ──────────────────────────────────
const authModal = document.getElementById('auth-modal');
const profileModal = document.getElementById('profile-modal');

let authMode = 'login'; // 'login' or 'register'

const showAuthModal = () => {
    if (authModal) {
        authModal.classList.remove('hidden');
        authModal.classList.add('flex');
        document.getElementById('header')?.classList.add('hidden');
        updateAuthModalUI();
    }
};

const hideAuthModal = () => {
    if (authModal) {
        authModal.classList.add('hidden');
        authModal.classList.remove('flex');
        document.getElementById('header')?.classList.remove('hidden');
        clearAuthErrors();
        // Reset mode and clear fields
        authMode = 'login';
        const emailInput = document.getElementById('auth-email');
        const passwordInput = document.getElementById('auth-password');
        const confirmInput = document.getElementById('auth-password-confirm');
        if (emailInput) emailInput.value = '';
        if (passwordInput) passwordInput.value = '';
        if (confirmInput) confirmInput.value = '';
    }
};

const toggleAuthMode = () => {
    authMode = authMode === 'login' ? 'register' : 'login';
    updateAuthModalUI();
};

const updateAuthModalUI = () => {
    const title = document.getElementById('auth-modal-title');
    const subtitle = document.getElementById('auth-modal-subtitle');
    const submitBtn = document.getElementById('email-auth-btn');
    const toggleLink = document.getElementById('auth-mode-toggle');
    const passwordConfirmGroup = document.getElementById('password-confirm-group');

    if (authMode === 'register') {
        if (title) title.textContent = 'Create Account';
        if (subtitle) subtitle.textContent = 'Begin your journey as a scholar';
        if (submitBtn) submitBtn.textContent = 'Create Account';
        if (toggleLink) toggleLink.innerHTML = 'Already have an account? <span class="text-ekalavya-gold cursor-pointer hover:underline" id="toggle-auth-link">Sign In</span>';
        if (passwordConfirmGroup) passwordConfirmGroup.classList.remove('hidden');
    } else {
        if (title) title.textContent = 'Scholar Access';
        if (subtitle) subtitle.textContent = 'Welcome back, scholar';
        if (submitBtn) submitBtn.textContent = 'Enter Platform';
        if (toggleLink) toggleLink.innerHTML = 'Don\'t have an account? <span class="text-ekalavya-gold cursor-pointer hover:underline" id="toggle-auth-link">Create One</span>';
        if (passwordConfirmGroup) passwordConfirmGroup.classList.add('hidden');
    }

    // Rebind toggle link
    document.getElementById('toggle-auth-link')?.addEventListener('click', toggleAuthMode);
};

const showAuthError = (message) => {
    const errorEl = document.getElementById('auth-error');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
    }
};

const clearAuthErrors = () => {
    const errorEl = document.getElementById('auth-error');
    if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.add('hidden');
    }
};

const setAuthLoading = (loading) => {
    const submitBtn = document.getElementById('email-auth-btn');
    const googleBtn = document.getElementById('google-auth-btn');
    if (submitBtn) {
        submitBtn.disabled = loading;
        if (loading) {
            submitBtn.dataset.originalText = submitBtn.textContent;
            submitBtn.textContent = 'Authenticating...';
            submitBtn.style.opacity = '0.7';
        } else {
            submitBtn.textContent = submitBtn.dataset.originalText || 'Enter Platform';
            submitBtn.style.opacity = '1';
        }
    }
    if (googleBtn) googleBtn.disabled = loading;
};

const showProfileModal = () => {
    const state = uiStore.getState();
    const nameInput = document.getElementById('profile-name');
    const avatarInput = document.getElementById('profile-avatar-seed');
    if (nameInput) nameInput.value = state.user?.name || '';
    if (avatarInput) avatarInput.value = state.user?.avatar_seed || '';
    if (profileModal) {
        profileModal.classList.remove('hidden');
        profileModal.classList.add('flex');
    }
};

const hideProfileModal = () => {
    if (profileModal) {
        profileModal.classList.add('hidden');
        profileModal.classList.remove('flex');
    }
};

window.showAuthModal = showAuthModal;
window.hideAuthModal = hideAuthModal;
window.showProfileModal = showProfileModal;
window.hideProfileModal = hideProfileModal;

/**
 * Ekalavya - Knowledge Empowers
 * Main Entry Point (Multi-View Integrated)
 */

// ──────────────────────────────────
// Initialize App
// ──────────────────────────────────
export const initApp = async () => {
    // 1. Critical UI Initialization (Synchronous or fast)
    try {
        await initI18n();
        updateTranslations();
    } catch (e) {
        console.warn('I18n failed, continuing with default text', e);
    }

    // 2. Background Services (Don't block the main flow if possible)
    // NUCLEAR OPTION: Unregister all service workers to fix "Hard Refresh" issues caused by legacy caches
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            for (let registration of registrations) {
                registration.unregister();
                console.log('Legacy Service Worker Unregistered');
            }
        });
    }

    authManager.init();
    // registerServiceWorker(); // Disabled for now to ensure clean loads

    // Check for Legacy Redirects (e.g. ?profile=ID -> #/portfolio/ID)
    const params = new URLSearchParams(window.location.search);
    const profileId = params.get('profile');
    if (profileId) {
        window.location.href = `${window.location.origin}/frontend/portfolio.html?id=${profileId}`;
        return;
    }

    // Re-enable Router to handle Lucide sync as requested
    window.appRouter = new Router('app-view');
    
    // Attach Event Listeners
    setupGlobalListeners();
    
    // Welcome Notification (only for returning users)
    // Run asynchronously to prevent blocking the initial page render
    authManager.getSession().then(session => {
        if (session) {
            // AUTO-REDIRECT: If user is on index.html but logged in, send to dashboard
            const isLandingPage = window.location.pathname.endsWith('index.html') || 
                                 window.location.pathname === '/' || 
                                 window.location.pathname.endsWith('/');
            
            if (isLandingPage) {
                window.location.href = 'dashboard.html';
                return;
            }

            setTimeout(() => {
                notificationManager.sendPulse('Welcome Back!', { body: 'Ready to build your consistency today?' });
            }, 2000);
        }
    }).catch(console.error);

    return true; // Simple signal that init started
};

const setupGlobalListeners = () => {
    // Auth Modal Close Triggers
    document.getElementById('close-modal')?.addEventListener('click', hideAuthModal);
    document.getElementById('modal-overlay')?.addEventListener('click', hideAuthModal);
    document.getElementById('close-profile-modal')?.addEventListener('click', hideProfileModal);
    document.getElementById('profile-modal-overlay')?.addEventListener('click', hideProfileModal);

    // Toggle Auth Mode link
    document.getElementById('toggle-auth-link')?.addEventListener('click', toggleAuthMode);

    // Google OAuth
    document.getElementById('google-auth-btn')?.addEventListener('click', async () => {
        try {
            setAuthLoading(true);
            await authManager.signInWithGoogle();
            // Google OAuth redirects, so we don't need to hide modal here
        } catch (e) {
            setAuthLoading(false);
            showAuthError('Google authentication failed. Please try again.');
        }
    });

    // Email Auth (Login or Register based on mode)
    document.getElementById('email-auth-btn')?.addEventListener('click', async () => {
        clearAuthErrors();
        const email = document.getElementById('auth-email')?.value?.trim();
        const password = document.getElementById('auth-password')?.value;
        
        if (!email || !password) {
            return showAuthError('Please enter both email and password.');
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return showAuthError('Please enter a valid email address.');
        }

        // Validate password length
        if (password.length < 6) {
            return showAuthError('Password must be at least 6 characters.');
        }

        // Confirm password match for registration
        if (authMode === 'register') {
            const confirmPassword = document.getElementById('auth-password-confirm')?.value;
            if (password !== confirmPassword) {
                return showAuthError('Passwords do not match.');
            }
        }

        try {
            setAuthLoading(true);
            
            // --- DEMO MODE BYPASS (As requested) ---
            // This allows any email/password to work for immediate platform access
            localStorage.setItem('ekalavya_demo_mode', 'true');
            localStorage.setItem('ekalavya_demo_email', email);
            
            // Update UI store for immediate visual feedback
            uiStore.setState({ 
                isLoggedIn: true,
                user: {
                    name: email.split('@')[0] || 'Scholar',
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
                    role: 'student'
                },
                score: 150,
                streak: 1
            });

            hideAuthModal();
            notificationManager.sendPulse('Access Granted', { body: 'Welcome to the platform, scholar!' });
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 600);
            
        } catch (e) {
            showAuthError('Demo access failed. Please try again.');
        } finally {
            // Loading state will be handled by page transition
        }
    });

    // Enter key submits auth form
    document.getElementById('auth-password')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('email-auth-btn')?.click();
        }
    });

    // Profile Save
    document.getElementById('save-profile-btn')?.addEventListener('click', async () => {
        const name = document.getElementById('profile-name')?.value?.trim();
        const seed = document.getElementById('profile-avatar-seed')?.value?.trim();
        
        const user = await authManager.getCurrentUser();
        if (!user) return;

        if (!name) {
            notificationManager.showInternalAlert('Validation', 'Please enter a display name.');
            return;
        }

        try {
            // FIX: Was calling syncUserProfile() with a reconstructed object — that method
            // expects a real Supabase user object and does upsert logic, not a profile update.
            // Replaced with a direct targeted update to the 'users' table instead.
            const avatarSeed = seed || user.id;
            const { error } = await authManager.supabase
                .from('users')
                .update({
                    full_name: name,
                    avatar_seed: avatarSeed,
                })
                .eq('id', user.id);

            if (error) throw error;

            // Update the local store to reflect the change immediately
            const currentState = uiStore.getState();
            uiStore.setState({
                user: {
                    ...currentState.user,
                    name,
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`,
                    avatar_seed: avatarSeed
                }
            });

            hideProfileModal();
            notificationManager.sendPulse('Profile Updated', { body: 'Your identity has been synchronized.' });
            
            if (window.location.pathname.includes('dashboard.html')) {
                window.location.reload();
            }
        } catch (e) {
            console.error(e);
            notificationManager.showInternalAlert('Error', 'Failed to save profile. Please try again.');
        }
    });

    // Share Portfolio
    document.addEventListener('click', async (e) => {
        const shareBtn = e.target.id === 'share-portfolio-btn' || e.target.closest('#share-portfolio-btn');
        if (shareBtn) {
            const session = await authManager.getSession();
            const user = session?.user;
            if (!user) return;

            const url = `${window.location.origin}${window.location.pathname.replace('index.html', 'portfolio.html').replace('dashboard.html', 'portfolio.html')}?id=${user.id}`;
            try {
                await navigator.clipboard.writeText(url);
                notificationManager.showInternalAlert('Success', 'Portfolio Link Copied!');
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        }
    });

    // Navigation triggers via State Subscription
    uiStore.subscribe(state => {
        updateAuthUI(state);
    });

    // Initial Trigger for UI consistency
    updateAuthUI(uiStore.getState());
};

function updateAuthUI(state) {
    const authSection = document.getElementById('auth-section');
    if (!authSection) return;

    if (state.isLoggedIn) {
        // Hide floating join button if exists
        const floatingBtn = document.getElementById('floating-join-btn');
        if (floatingBtn) floatingBtn.remove();

        authSection.innerHTML = `
            <div class="flex items-center gap-3">
                <a href="/frontend/dashboard.html" class="flex items-center gap-2 mr-2 px-3 py-1 bg-ekalavya-gold/10 border border-ekalavya-gold/20 rounded-full cursor-pointer hover:bg-ekalavya-gold/20 transition-all" title="Growth Score">
                    <i data-lucide="zap" class="w-3.5 h-3.5 text-ekalavya-gold fill-ekalavya-gold"></i>
                    <span class="text-xs font-bold text-ekalavya-gold">${state.score || 0}</span>
                </a>
                <!-- FIX: Added streak display to navbar — was in store but never shown in the UI -->
                <a href="/frontend/dashboard.html" class="flex items-center gap-1.5 mr-1 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full cursor-pointer hover:bg-orange-500/20 transition-all" title="Day Streak">
                    <i data-lucide="flame" class="w-3.5 h-3.5 text-orange-400 fill-orange-400"></i>
                    <span class="text-xs font-bold text-orange-400">${state.streak || 0}</span>
                </a>
                <a href="/frontend/dashboard.html" class="w-10 h-10 rounded-full border border-ekalavya-gold/30 p-0.5 cursor-pointer hover:border-ekalavya-gold transition-colors" id="profile-link">
                    <img src="${state.user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'}" alt="avatar" class="w-full h-full rounded-full object-cover" />
                </a>
                <button id="logout-btn" class="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all ml-2" title="Logout">
                    <i data-lucide="log-out" class="w-4 h-4"></i>
                </button>
            </div>
        `;
        
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) logoutBtn.onclick = async () => {
            try {
                // Perform the actual logout first
                await authManager.logout();
                
                // Clear state immediately for UI responsiveness
                uiStore.setState({ isLoggedIn: false, user: null, score: 0, streak: 0 });
                
                notificationManager.sendPulse('Logged Out', { body: 'See you again, scholar!' });

                // Small delay to let the notification show before redirect
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 500);
            } catch (error) {
                console.error('Logout failed:', error);
                // Fallback redirect even if logout fails
                window.location.href = 'index.html';
            }
        };
        
        refreshIcons();
    } else {
        // Show floating join button for non-authenticated users
        addFloatingJoinButton();

        authSection.innerHTML = `
            <button class="nav-pill-outline" id="login-nav-btn">Login</button>
            <button class="nav-pill-primary" id="register-nav-btn">Join Ekalavya Now</button>
        `;
        
        const loginBtn = document.getElementById('login-nav-btn');
        if (loginBtn) loginBtn.onclick = () => {
            authMode = 'login';
            showAuthModal();
        };
        
        const registerBtn = document.getElementById('register-nav-btn');
        if (registerBtn) registerBtn.onclick = () => {
            authMode = 'register';
            showAuthModal();
        };
    }
}

// Add floating join button for non-authenticated users
function addFloatingJoinButton() {
    // Remove existing button if it exists
    const existingBtn = document.getElementById('floating-join-btn');
    if (existingBtn) existingBtn.remove();

    // Don't show on home page (already has CTA buttons)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) return;

    const floatingBtn = document.createElement('div');
    floatingBtn.id = 'floating-join-btn';
    floatingBtn.className = 'fixed bottom-6 right-6 z-50 animate-bounce-slow';
    floatingBtn.innerHTML = `
        <button class="bg-gold-gradient text-black font-bold px-6 py-3 rounded-full shadow-lg shadow-ekalavya-gold/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <i data-lucide="sparkles" class="w-5 h-5"></i>
            Join Ekalavya Now
        </button>
    `;
    
    floatingBtn.onclick = () => {
        authMode = 'register';
        showAuthModal();
    };
    
    document.body.appendChild(floatingBtn);
    
    // Refresh icons for the new button
    if (window.lucide) window.lucide.createIcons();
}

// Start App
// App Initialization is now called from specific page entry points
// init();
console.log('Ekalavya Core Module Initialized with Supabase');

// ──────────────────────────────────
// Admin Setup (Development Only)
// ──────────────────────────────────
window.makeAdmin = async () => {
    const session = await authManager.getSession();
    if (!session) {
        console.log('Please login first');
        return;
    }
    
    try {
        const { error } = await authManager.supabase
            .from('users')
            .update({ role: 'admin' })
            .eq('id', session.user.id);
            
        if (error) throw error;
        
        console.log('✅ You are now an admin! Navigate to /admin.html');
        notificationManager.sendPulse('Admin Access Granted', { body: 'You can now access the admin panel at /admin.html' });
    } catch (error) {
        console.error('Failed to make admin:', error);
    }
};