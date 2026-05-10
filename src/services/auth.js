import { supabase } from '../core/supabase.js';
import { uiStore } from '../core/store.js';

/**
 * Authentication Manager for Ekalavya (Supabase Implementation)
 * Handles: Sign-in, Sign-up, Session Persistence, Profile Sync, Route Guards
 */
export const authManager = {
    supabase,
    _initialized: false,

    /**
     * Initialize auth listener and restore session on load
     */
    init() {
        if (this._initialized) return;
        this._initialized = true;

        // 1. Restore existing session immediately on load
        this.restoreSession();

        // 2. Listen for future auth changes (login, logout, token refresh)
        supabase.auth.onAuthStateChange(async (event, session) => {
            const user = session?.user;

            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                uiStore.setState({ isLoggedIn: true });
                // Don't await - let profile sync happen in background
                this.syncUserProfile(user);
            } else if (event === 'SIGNED_OUT') {
                uiStore.setState({ isLoggedIn: false, user: null, score: 0, streak: 0 });
                // Force navigation to home page on logout
                if (!window.location.pathname.endsWith('index.html') && window.location.pathname !== '/' && window.location.pathname !== '' && !window.location.pathname.endsWith('frontend/')) {
                    window.location.href = 'index.html';
                }
            }
        });
    },

    /**
     * Restore session from Supabase's stored JWT (survives page reload) - Optimized
     */
    async restoreSession() {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                uiStore.setState({ isLoggedIn: true });
                // Don't await - let profile sync happen in background for faster page load
                this.syncUserProfile(session.user);
            }
        } catch (error) {
            console.error('Session restore error:', error);
        }
    },

    /**
     * Google OAuth sign-in
     */
    async signInWithGoogle() {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin + '/frontend/dashboard.html'
                }
            });
            if (error) throw error;
        } catch (error) {
            console.error('Google Sign-in Error:', error);
            throw error;
        }
    },

    /**
     * Email/Password authentication - Optimized for speed
     */
    async signInWithEmail(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                // Don't auto-signup on failed login - just throw the error
                throw error;
            }
            return data;
        } catch (loginError) {
            console.error('Email Auth Error:', loginError);
            throw loginError;
        }
    },

    /**
     * Sign out and reset state
     */
    async logout() {
        localStorage.removeItem('ekalavya_demo_mode');
        localStorage.removeItem('ekalavya_demo_email');
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Logout Error:', error);
        uiStore.setState({ isLoggedIn: false, user: null, score: 0, streak: 0 });
    },

    /**
     * Sync user profile from the public.users table - Optimized for speed
     */
    async syncUserProfile(user) {
        if (!user) return;
        
        // Set basic user info immediately for fast UI update
        uiStore.setState({ 
            user: { 
                name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Scholar',
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`, 
                role: 'student',
                avatar_seed: user.id
            },
            score: 100, // Default values for immediate display
            streak: 1
        });
        
        // Then fetch and update with real data in background
        this.fetchUserProfileAsync(user);
    },

    /**
     * Fetch user profile data asynchronously (non-blocking)
     */
    async fetchUserProfileAsync(user) {
        try {
            const { data: profile, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', user.id)
                .single();
            
            if (error || !profile) {
                // Create profile if it doesn't exist
                const newProfile = {
                    id: user.id,
                    email: user.email,
                    full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Scholar',
                    role: 'student',
                    streak: 1,
                    score: 100,
                    badges: [],
                    last_login: new Date().toISOString()
                };
                
                const { data: insertedProfile, error: insertError } = await supabase
                    .from('users')
                    .upsert(newProfile)
                    .select()
                    .single();

                if (!insertError && insertedProfile) {
                    this.updateStore(insertedProfile);
                }
            } else {
                // Update streak in background and refresh store
                this.checkAndUpdateStreakAsync(user, profile);
            }
        } catch (err) {
            console.error('Profile sync failed:', err);
        }
    },

    /**
     * Check and update streak asynchronously
     */
    async checkAndUpdateStreakAsync(user, userData) {
        // Update store immediately with existing data
        this.updateStore(userData);
        
        // Then calculate streak in background
        const lastLogin = new Date(userData.last_login || 0);
        const now = new Date();
        const lastLoginDate = new Date(lastLogin.getFullYear(), lastLogin.getMonth(), lastLogin.getDate());
        const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const diffDays = Math.round((todayDate - lastLoginDate) / (1000 * 60 * 60 * 24));

        let newStreak = userData.streak || 0;
        let scoreBoost = 0;

        if (diffDays === 1) {
            newStreak += 1;
            scoreBoost = 10;
        } else if (diffDays > 1) {
            newStreak = 1;
        } else if (newStreak === 0) {
            newStreak = 1;
        }

        // Only update database if needed
        if (diffDays >= 1 || userData.streak === 0) {
            try {
                const { data: updatedProfile, error } = await supabase
                    .from('users')
                    .update({ 
                        streak: newStreak, 
                        score: (userData.score || 0) + scoreBoost,
                        last_login: now.toISOString() 
                    })
                    .eq('id', user.id)
                    .select()
                    .single();
                
                if (!error && updatedProfile) {
                    this.updateStore(updatedProfile);
                }
            } catch (error) {
                console.error('Streak update failed:', error);
            }
        }
    },

    /**
     * Push profile data to the global UI store
     */
    updateStore(userData) {
        uiStore.setState({ 
            user: { 
                name: userData.full_name, 
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.id}`, 
                role: userData.role,
                avatar_seed: userData.id
            },
            score: userData.score || 0,
            // FIX: streak was never included in updateStore — DashboardView and navbar never showed correct streak
            streak: userData.streak || 0
        });
    },

    /**
     * Fetch a public profile by user ID (for portfolio sharing)
     */
    async getPublicProfile(id) {
        if (!id) return null;
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) {
            console.error('Error fetching public profile:', error);
            return null;
        }
        
        return {
            displayName: data.full_name,
            photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.id}`,
            score: data.score || 0,
            streak: data.streak || 0,
            badges: data.badges || [],
            role: data.role || 'scholar'
        };
    },

    /**
     * Route guard utility — returns true if user is logged in
     */
    async isAuthenticated() {
        if (localStorage.getItem('ekalavya_demo_mode') === 'true') return true;
        const { data: { session } } = await supabase.auth.getSession();
        return !!session;
    },

    /**
     * Get current session (convenience method)
     */
    async getSession() {
        if (localStorage.getItem('ekalavya_demo_mode') === 'true') {
            return {
                user: {
                    id: 'demo-scholar-id',
                    email: localStorage.getItem('ekalavya_demo_email') || 'demo@ekalavya.edu',
                    user_metadata: { full_name: 'Demo Scholar' }
                }
            };
        }
        const { data: { session } } = await supabase.auth.getSession();
        return session;
    },

    /**
     * Get current user (convenience method)
     */
    async getCurrentUser() {
        if (localStorage.getItem('ekalavya_demo_mode') === 'true') {
            return {
                id: 'demo-scholar-id',
                email: localStorage.getItem('ekalavya_demo_email') || 'demo@ekalavya.edu',
                user_metadata: { full_name: 'Demo Scholar' }
            };
        }
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    }
};
