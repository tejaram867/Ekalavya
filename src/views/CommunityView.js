import { renderers, refreshIcons } from '../modules/renderers.js';
import { authManager } from '../services/auth.js';
import { api } from '../services/api.js';
import { notificationManager } from '../services/notifications.js';

export const CommunityView = {
    render: () => `
        <div class="container py-24">
            <div class="flex flex-col lg:flex-row gap-12">
                <div class="flex-1">
                    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h2 class="text-4xl font-bold mb-4" data-i18n="nav.peer_connect">Peer Connect</h2>
                            <p class="secondary-header-text">Collaborate with peers globally</p>
                        </div>
                        <div class="relative group w-full md:w-auto">
                            <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-blue-400 transition-colors"></i>
                            <input type="text" id="community-search" placeholder="Find communities..." 
                                class="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-400/50 focus:bg-white/10 w-full sm:w-64 transition-all">
                        </div>
                    </div>
                    
                    <div class="flex flex-col gap-4" id="community-list">
                        <div class="glass-card animate-pulse-slow h-24 w-full"></div>
                    </div>
                </div>
                
                <div class="w-full lg:max-w-xs flex flex-col gap-6">
                    <div class="glass-card group-creation-card p-6 relative overflow-hidden group">
                        <div class="absolute top-0 left-0 right-0 h-[3px] bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h3 class="font-bold text-lg mb-2 text-white group-hover:text-ekalavya-gold transition-colors">Create a Group</h3>
                        <p class="text-xs text-ekalavya-slate mb-6 leading-relaxed">Start your own study group or research circle with global peers.</p>
                        <button class="w-full py-3 bg-gold-gradient text-black rounded-xl font-black text-xs shadow-lg shadow-ekalavya-gold/20 hover:scale-105 active:scale-95 transition-all">Start Now</button>
                    </div>
                    <div class="glass-card p-6 relative overflow-hidden group">
                        <div class="absolute top-0 left-0 right-0 h-[2px] bg-white/5 opacity-50"></div>
                        <h3 class="font-black text-[10px] uppercase tracking-[0.2em] mb-4 text-ekalavya-gold/60">Active Meets</h3>
                        <div class="flex flex-col gap-3">
                            <div class="p-4 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-ekalavya-gold/20 transition-all cursor-pointer">
                                <p class="font-bold text-white text-sm mb-1">AI Study Circle</p>
                                <div class="flex items-center gap-2">
                                    <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    <p class="text-[10px] text-ekalavya-slate font-medium uppercase tracking-wider">Today, 5:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    init: async () => {
        await renderers.communities();

        const grid = document.getElementById('community-list');
        const searchInput = document.getElementById('community-search');

        if (searchInput && grid) {
            searchInput.addEventListener('input', async (e) => {
                const query = e.target.value.toLowerCase();
                const all = await api.getCollection('communities');
                const filtered = all.filter(c => c.name.toLowerCase().includes(query));
                
                if (filtered.length === 0) {
                    grid.innerHTML = `<div class="p-8 text-center text-white/20 italic text-sm">No communities found.</div>`;
                } else {
                    grid.innerHTML = filtered.map(c => `
                        <div class="p-5 glass-card border-white/5 flex items-center justify-between group hover:border-ekalavya-gold/30 transition-all relative overflow-hidden">
                            <div class="absolute top-0 left-0 bottom-0 w-[3px] bg-ekalavya-gold opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div class="flex items-center gap-5">
                                <div class="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-ekalavya-gold/10 transition-colors">
                                     <i data-lucide="${c.icon || 'users'}" class="w-6 h-6 text-ekalavya-gold"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-white group-hover:text-ekalavya-gold transition-colors">${c.name}</h4>
                                    <span class="text-[10px] text-ekalavya-slate font-black uppercase tracking-widest mt-1">${c.members || 0} Members</span>
                                </div>
                            </div>
                            <button class="px-6 py-2.5 bg-gold-gradient text-black text-xs font-black rounded-xl shadow-lg shadow-ekalavya-gold/10 hover:scale-105 active:scale-95 transition-all join-community-btn" 
                                data-id="${c.id}" data-name="${c.name}">Join Group</button>
                        </div>
                    `).join('');
                    refreshIcons();
                }
            });
        }

        if (grid) {
            grid.addEventListener('click', async (e) => {
                const btn = e.target.classList.contains('join-community-btn') ? e.target : e.target.closest('.join-community-btn');
                if (btn) {
                    const communityId = btn.dataset.id;
                    const communityName = btn.dataset.name;

                    const { data: { session } } = await authManager.supabase.auth.getSession();
                    if (!session) {
                        return notificationManager.showInternalAlert('Auth Required', 'Please login to join communities.');
                    }

                    try {
                        btn.disabled = true;
                        btn.innerText = 'Joining...';

                        await api.createDocument('community_members', {
                            community_id: communityId,
                            user_id: session.user.id
                        });

                        notificationManager.sendPulse('Welcome!', { body: `You are now a member of ${communityName}` });
                        btn.innerText = 'Member';
                        btn.classList.replace('bg-white/5', 'bg-blue-600/20');
                        btn.classList.add('text-blue-400');
                    } catch (error) {
                        notificationManager.showInternalAlert('Error', 'Failed to join group. You might already be a member.');
                        btn.disabled = false;
                        btn.innerText = 'Join';
                    }
                }
            });
        }
    }
};
