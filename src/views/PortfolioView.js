import { authManager } from '../services/auth.js';
import { refreshIcons } from '../modules/renderers.js';

export const PortfolioView = {
    render: async (params) => {
        const id = params?.id;
        if (!id) return `<div class="text-white text-center py-20">Invalid Portfolio ID</div>`;

        try {
            const profile = await authManager.getPublicProfile(id);
            
            if (!profile) {
                return `
                    <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
                        <i data-lucide="user-x" class="w-16 h-16 text-white/20 mb-4"></i>
                        <h2 class="text-2xl font-bold text-white mb-2">Scholar Not Found</h2>
                        <p class="text-white/50 mb-8">The requested achievement portfolio does not exist or is private.</p>
                        <a href="index.html" class="nav-pill-primary">Back to Platform</a>
                    </div>
                `;
            }

            return `
                <div class="portfolio-view max-w-4xl mx-auto py-12 px-6">
                    <!-- Profile Header -->
                    <div class="glass-card p-10 rounded-3xl mb-12 flex flex-col items-center text-center relative overflow-hidden">
                        <div class="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
                        
                        <div class="relative mb-6">
                            <div class="w-28 h-28 rounded-full border-2 border-ekalavya-gold/30 p-1">
                                <img src="${profile.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + profile.displayName}" alt="${profile.displayName}" class="w-full h-full rounded-full object-cover">
                            </div>
                            <div class="absolute -bottom-2 -right-2 bg-ekalavya-gold text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                                ${profile.role || 'Scholar'}
                            </div>
                        </div>

                        <h1 class="text-4xl font-bold text-white mb-2">${profile.displayName}</h1>
                        <p class="text-white/40 uppercase text-[10px] font-bold tracking-[0.3em] mb-8">Ekalavya Certified Scholar</p>

                        <!-- Stats Grid -->
                        <div class="grid grid-cols-2 gap-6 w-full max-w-md">
                            <div class="glass-card bg-white/5 p-6 rounded-2xl border border-white/10">
                                <div class="flex items-center justify-center gap-2 mb-2">
                                    <i data-lucide="zap" class="w-5 h-5 text-ekalavya-gold fill-ekalavya-gold"></i>
                                    <span class="text-3xl font-bold text-white">${profile.score || 0}</span>
                                </div>
                                <p class="text-[10px] text-white/30 uppercase font-bold tracking-widest">Growth Score</p>
                            </div>
                            <div class="glass-card bg-white/5 p-6 rounded-2xl border border-white/10">
                                <div class="flex items-center justify-center gap-2 mb-2">
                                    <i data-lucide="flame" class="w-5 h-5 text-ekalavya-gold fill-ekalavya-gold"></i>
                                    <span class="text-3xl font-bold text-white">${profile.streak || 0}</span>
                                </div>
                                <p class="text-[10px] text-white/30 uppercase font-bold tracking-widest">Day Streak</p>
                            </div>
                        </div>
                    </div>

                    <!-- Achievements -->
                    <div class="mb-12">
                        <div class="flex items-center gap-4 mb-8">
                            <h2 class="text-xl font-bold text-white">Earned Badges</h2>
                            <div class="h-px flex-1 bg-white/10"></div>
                        </div>
                        
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                            ${profile.badges && profile.badges.length > 0 ? profile.badges.map(badge => `
                                <div class="glass-card p-6 rounded-2xl border border-white/10 flex flex-col items-center group hover:bg-white/10 transition-all cursor-pointer">
                                    <div class="w-12 h-12 bg-ekalavya-gold/10 rounded-xl flex-center mb-4 group-hover:scale-110 transition-transform">
                                        <i data-lucide="award" class="w-6 h-6 text-ekalavya-gold"></i>
                                    </div>
                                    <span class="text-xs font-bold text-white/80">${badge}</span>
                                </div>
                            `).join('') : `
                                <div class="col-span-full py-12 text-center glass-card rounded-2xl border border-dashed border-white/10">
                                    <p class="text-white/20 italic">No badges earned yet. The journey has just begun.</p>
                                </div>
                            `}
                        </div>
                    </div>

                    <!-- Call to Action -->
                    <div class="text-center pt-8 border-t border-white/5">
                        <p class="text-white/40 text-sm mb-6">Inspired by this scholar's journey?</p>
                        <a href="index.html" class="nav-pill-primary px-10">Start Your Journey</a>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Portfolio Loading Error:', error);
            return `<div class="text-white text-center py-20">Error loading portfolio</div>`;
        }
    },
    init: () => {
        refreshIcons();
    }
};
