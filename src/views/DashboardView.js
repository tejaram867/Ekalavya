import { authManager } from '../services/auth.js';
import { api } from '../services/api.js';
import { renderers, refreshIcons } from '../modules/renderers.js';
import { notificationManager } from '../services/notifications.js';

// ──────────────────────────────────────────────────────────
// Tab Content Renderers
// ──────────────────────────────────────────────────────────

const renderTopBar = (title) => `
    <header class="flex items-center justify-between px-8 py-4 border-b border-white/5 sticky top-0 z-30" 
            style="background: rgba(10,10,10,0.8); backdrop-filter: blur(20px);">
        <div class="flex items-center gap-4">
            <div id="breadcrumb" class="flex items-center gap-2 text-white/30 text-xs font-bold uppercase tracking-widest">
                <span id="breadcrumb-root">Ekalavya</span>
                <i data-lucide="chevron-right" class="w-3 h-3"></i>
                <span class="text-ekalavya-gold" id="current-tab-title">${title}</span>
            </div>
        </div>
        
        <div class="flex items-center gap-6">
            <!-- Search Placeholder -->
            <div class="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl w-64 group focus-within:border-ekalavya-gold/30 transition-all">
                <i data-lucide="search" class="w-4 h-4 text-white/20 group-focus-within:text-ekalavya-gold/50"></i>
                <input type="text" placeholder="Search anything..." class="bg-transparent border-none outline-none text-xs text-white placeholder:text-white/20 w-full">
            </div>
            
            <div class="flex items-center gap-3 relative">
                <div id="activity-dropdown-anchor" class="relative">
                    <button class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all relative" id="notification-bell-btn">
                        <i data-lucide="bell" class="w-5 h-5"></i>
                        <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-ekalavya-gold rounded-full border-2 border-[#0a0a0a]"></span>
                    </button>
                    <!-- Dropdown Content (Initially Hidden/Collapsed) -->
                    <div id="activity-dropdown-wrapper" class="absolute right-0 mt-4 w-[350px] md:w-[400px] z-50 pointer-events-none opacity-0 scale-95 origin-top-right transition-all duration-300">
                        ${renderers.renderActivityDropdown()}
                    </div>
                </div>
                <button class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
                    <i data-lucide="help-circle" class="w-5 h-5"></i>
                </button>
                <button class="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:text-white hover:bg-red-500/20 transition-all" id="topbar-logout-btn" title="Logout">
                    <i data-lucide="log-out" class="w-5 h-5"></i>
                </button>
            </div>
        </div>
    </header>
`;

const renderHomeTab = (user, stats) => {
    // Build streak calendar (last 7 days)
    const today = new Date();
    const streak = stats.streak || 0;
    const streakDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (6 - i));
        const isActive = i >= (7 - Math.min(streak, 7));
        const isToday = i === 6;
        const label = d.toLocaleDateString('en-IN', { weekday: 'short' }).slice(0, 2);
        return { label, isActive, isToday };
    });

    // Daily goals (static demo)
    const goals = [
        { label: 'Complete 1 session', done: true, icon: 'video' },
        { label: 'Browse scholarships', done: true, icon: 'graduation-cap' },
        { label: 'Read 1 library resource', done: false, icon: 'book-open' },
    ];
    const goalsDone = goals.filter(g => g.done).length;
    const goalsTotal = goals.length;
    const goalsPct = Math.round((goalsDone / goalsTotal) * 100);

    return `
    <div class="space-y-8">

        <!-- 1. Daily Goal Tracker -->
        <div class="relative overflow-hidden rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
             style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);">
            <div class="flex items-center gap-3 flex-shrink-0">
                <div class="w-9 h-9 bg-ekalavya-gold/10 rounded-xl flex items-center justify-center border border-ekalavya-gold/20">
                    <i data-lucide="target" class="w-4 h-4 text-ekalavya-gold"></i>
                </div>
                <div>
                    <p class="text-[10px] uppercase font-bold text-white/30 tracking-widest">Today's Goals</p>
                    <p class="text-sm font-black text-white">${goalsDone}/${goalsTotal} completed</p>
                </div>
            </div>
            <div class="flex-1 w-full">
                <div class="flex items-center justify-between mb-1.5">
                    <div class="flex gap-3">
                        ${goals.map(g => `
                            <span class="flex items-center gap-1.5 text-[10px] font-bold ${g.done ? 'text-emerald-400' : 'text-white/30'}">
                                <i data-lucide="${g.done ? 'check-circle' : 'circle'}" class="w-3 h-3"></i>
                                ${g.label}
                            </span>
                        `).join('')}
                    </div>
                    <span class="text-[10px] font-black text-ekalavya-gold">${goalsPct}%</span>
                </div>
                <div class="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-700"
                         style="width: ${goalsPct}%; background: linear-gradient(90deg, #f4c430, #d4a017);"></div>
                </div>
            </div>
        </div>

        <!-- 2. Welcome Banner + Streak Calendar -->
        <div class="relative overflow-hidden rounded-3xl p-8 md:p-10" 
             style="background: linear-gradient(135deg, rgba(244,196,48,0.12) 0%, rgba(244,196,48,0.03) 100%); border: 1px solid rgba(244,196,48,0.15);">
            <div class="absolute -top-10 -right-10 w-48 h-48 bg-ekalavya-gold/10 rounded-full blur-[60px] pointer-events-none"></div>
            <div class="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                    <p class="text-ekalavya-gold text-xs font-bold uppercase tracking-[0.2em] mb-2">Welcome back</p>
                    <h2 class="text-3xl md:text-4xl font-black text-white mb-2">${stats.full_name || user.user_metadata?.full_name || 'Scholar'} 👋</h2>
                    <p class="text-white/50 mb-6">Ready to build your streak today?</p>
                    <div class="flex flex-wrap gap-4">
                        <div class="flex items-center gap-2 px-4 py-2 bg-ekalavya-gold/10 border border-ekalavya-gold/20 rounded-full">
                            <i data-lucide="zap" class="w-4 h-4 text-ekalavya-gold fill-ekalavya-gold"></i>
                            <span class="text-sm font-bold text-ekalavya-gold">${stats.score || 0} pts</span>
                        </div>
                        <div class="flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full">
                            <i data-lucide="flame" class="w-4 h-4 text-orange-400 fill-orange-400"></i>
                            <span class="text-sm font-bold text-orange-400">${stats.streak || 0} day streak</span>
                        </div>
                        <div class="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                            <i data-lucide="shield" class="w-4 h-4 text-white/50"></i>
                            <span class="text-sm font-bold text-white/50 capitalize">${stats.role || 'Student'}</span>
                        </div>
                    </div>
                </div>

                <!-- Streak Calendar Strip -->
                <div class="flex-shrink-0">
                    <p class="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-3 text-center">This Week</p>
                    <div class="flex items-end gap-2">
                        ${streakDays.map(d => `
                            <div class="flex flex-col items-center gap-1.5">
                                <div class="w-8 h-8 rounded-xl flex items-center justify-center transition-all
                                    ${d.isActive
                                        ? 'bg-ekalavya-gold shadow-lg shadow-ekalavya-gold/30'
                                        : 'bg-white/5 border border-white/10'}"
                                     style="${d.isToday ? 'ring: 2px solid rgba(244,196,48,0.5);' : ''}">
                                    ${d.isActive
                                        ? `<i data-lucide="flame" class="w-4 h-4 text-black"></i>`
                                        : `<span class="w-1.5 h-1.5 rounded-full bg-white/20"></span>`}
                                </div>
                                <span class="text-[9px] font-bold uppercase ${d.isToday ? 'text-ekalavya-gold' : 'text-white/30'}">${d.label}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>

        <!-- 3. Quick Action Buttons -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button class="dash-nav-btn group flex items-center gap-3 p-4 rounded-2xl border border-white/5 hover:border-ekalavya-gold/30 transition-all duration-300 hover:bg-ekalavya-gold/5"
                    style="background: rgba(255,255,255,0.02);" data-tab="scholarships">
                <div class="w-10 h-10 bg-ekalavya-gold/10 rounded-xl flex items-center justify-center border border-ekalavya-gold/20 group-hover:bg-ekalavya-gold/20 transition-colors flex-shrink-0">
                    <i data-lucide="graduation-cap" class="w-5 h-5 text-ekalavya-gold"></i>
                </div>
                <div class="text-left">
                    <p class="text-sm font-bold text-white group-hover:text-ekalavya-gold transition-colors">Find Scholarship</p>
                    <p class="text-[10px] text-white/30">Browse opportunities</p>
                </div>
            </button>
            <button class="dash-nav-btn group flex items-center gap-3 p-4 rounded-2xl border border-white/5 hover:border-blue-400/30 transition-all duration-300 hover:bg-blue-500/5"
                    style="background: rgba(255,255,255,0.02);" data-tab="mentoring">
                <div class="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors flex-shrink-0">
                    <i data-lucide="video" class="w-5 h-5 text-blue-400"></i>
                </div>
                <div class="text-left">
                    <p class="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Book Session</p>
                    <p class="text-[10px] text-white/30">Find a mentor</p>
                </div>
            </button>
            <button class="dash-nav-btn group flex items-center gap-3 p-4 rounded-2xl border border-white/5 hover:border-purple-400/30 transition-all duration-300 hover:bg-purple-500/5"
                    style="background: rgba(255,255,255,0.02);" data-tab="peerconnect">
                <div class="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors flex-shrink-0">
                    <i data-lucide="users" class="w-5 h-5 text-purple-400"></i>
                </div>
                <div class="text-left">
                    <p class="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">Join Community</p>
                    <p class="text-[10px] text-white/30">Connect with peers</p>
                </div>
            </button>
            <button class="dash-nav-btn group flex items-center gap-3 p-4 rounded-2xl border border-white/5 hover:border-emerald-400/30 transition-all duration-300 hover:bg-emerald-500/5"
                    style="background: rgba(255,255,255,0.02);" data-tab="library">
                <div class="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors flex-shrink-0">
                    <i data-lucide="book-open" class="w-5 h-5 text-emerald-400"></i>
                </div>
                <div class="text-left">
                    <p class="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Browse Library</p>
                    <p class="text-[10px] text-white/30">Academic resources</p>
                </div>
            </button>
        </div>

        <!-- Quick Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">            <div class="glass-card p-5 text-center rounded-2xl">
                <div class="w-10 h-10 bg-ekalavya-gold/10 rounded-xl flex items-center justify-center mx-auto mb-3 border border-ekalavya-gold/20">
                    <i data-lucide="graduation-cap" class="w-5 h-5 text-ekalavya-gold"></i>
                </div>
                <div class="text-2xl font-black text-white mb-1" id="stat-applications">—</div>
                <p class="text-[10px] uppercase font-bold text-white/30">Applications</p>
            </div>
            <div class="glass-card p-5 text-center rounded-2xl">
                <div class="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 border border-blue-500/20">
                    <i data-lucide="video" class="w-5 h-5 text-blue-400"></i>
                </div>
                <div class="text-2xl font-black text-white mb-1" id="stat-sessions">—</div>
                <p class="text-[10px] uppercase font-bold text-white/30">Sessions</p>
            </div>
            <div class="glass-card p-5 text-center rounded-2xl">
                <div class="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 border border-purple-500/20">
                    <i data-lucide="users" class="w-5 h-5 text-purple-400"></i>
                </div>
                <div class="text-2xl font-black text-white mb-1" id="stat-communities">—</div>
                <p class="text-[10px] uppercase font-bold text-white/30">Communities</p>
            </div>
            <div class="glass-card p-5 text-center rounded-2xl">
                <div class="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 border border-emerald-500/20">
                    <i data-lucide="trending-up" class="w-5 h-5 text-emerald-400"></i>
                </div>
                <div class="text-2xl font-black text-white mb-1">${stats.score || 0}</div>
                <p class="text-[10px] uppercase font-bold text-white/30">Growth Score</p>
            </div>
        </div>

        <!-- Mastery Calibration Section -->
        <div class="glass-card p-8 rounded-3xl relative overflow-hidden">
            <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
            <div class="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div class="relative z-10">
                <div class="flex items-center justify-between mb-8">
                    <div>
                        <h3 class="text-2xl font-black text-white mb-2">MASTERY CALIBRATION</h3>
                        <p class="text-white/40 text-sm">Mapping proficiency metrics across core disciplines</p>
                    </div>
                    <div class="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                        <i data-lucide="activity" class="w-6 h-6 text-blue-400"></i>
                    </div>
                </div>

                <!-- Two Column Layout -->
                <div class="grid md:grid-cols-2 gap-8">
                    <!-- Left: Radar Chart -->
                    <div class="bg-white/[0.02] border border-white/5 rounded-2xl p-8">
                        <h4 class="text-sm font-bold text-white/60 uppercase tracking-widest mb-6 text-center">Skill Distribution Analysis</h4>
                        <div class="flex justify-center">
                            <canvas id="mastery-radar-chart" width="400" height="400"></canvas>
                        </div>
                        <div class="flex items-center justify-center gap-6 mt-6">
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span class="text-xs text-white/60 font-bold">Your Profile</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full border-2 border-amber-400"></div>
                                <span class="text-xs text-white/60 font-bold">Mentor Benchmark</span>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Single Circle with Dropdown -->
                    <div class="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center">
                        <!-- Dropdown -->
                        <div class="w-full mb-8">
                            <label class="block text-[10px] text-white/40 uppercase font-bold tracking-widest mb-3 text-center">Select Skill</label>
                            <select id="mastery-skill-select" class="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-blue-400/50 focus:bg-white/10 appearance-none cursor-pointer transition-all text-center font-bold">
                                <option value="0">Reading</option>
                                <option value="1">Solving</option>
                                <option value="2">Revision</option>
                                <option value="3" selected>Coding</option>
                                <option value="4">Teaching</option>
                            </select>
                        </div>

                        <!-- Large Circular Progress -->
                        <div class="relative w-64 h-64 mb-6">
                            <svg class="w-full h-full transform -rotate-90">
                                <circle cx="128" cy="128" r="110" stroke="rgba(255,255,255,0.05)" stroke-width="12" fill="none"/>
                                <circle id="mastery-progress-circle" cx="128" cy="128" r="110" stroke="#10b981" stroke-width="12" fill="none"
                                    stroke-dasharray="691" stroke-dashoffset="193.88" 
                                    stroke-linecap="round" class="transition-all duration-1000"/>
                            </svg>
                            <div class="absolute inset-0 flex flex-col items-center justify-center">
                                <div id="mastery-skill-icon" class="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 border border-emerald-500/20">
                                    <i data-lucide="code" class="w-8 h-8 text-emerald-400"></i>
                                </div>
                                <p id="mastery-percentage" class="text-5xl font-black text-white">72<span class="text-2xl text-white/40">%</span></p>
                            </div>
                        </div>

                        <!-- Skill Name -->
                        <p id="mastery-skill-name" class="text-sm uppercase font-bold text-white/60 tracking-widest mb-2">Coding</p>
                        <div class="flex items-center gap-2 text-xs text-white/40">
                            <span id="mastery-score-text">72/100</span>
                            <span>•</span>
                            <span id="mastery-status" class="text-emerald-400 font-bold">Strong</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 4. Recommended For You -->
        <div>
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-bold text-white flex items-center gap-2">
                    <i data-lucide="sparkles" class="w-4 h-4 text-ekalavya-gold"></i>
                    Recommended For You
                </h3>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
                <!-- Recommended Scholarship -->
                <div class="group flex items-center gap-4 p-4 rounded-2xl border border-white/5 hover:border-ekalavya-gold/30 transition-all duration-300 relative overflow-hidden"
                     style="background: rgba(244,196,48,0.03);">
                    <div class="absolute top-0 left-0 right-0 h-[2px] bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="w-12 h-12 bg-ekalavya-gold/10 rounded-2xl flex items-center justify-center border border-ekalavya-gold/20 flex-shrink-0">
                        <i data-lucide="graduation-cap" class="w-6 h-6 text-ekalavya-gold"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[9px] uppercase font-bold text-ekalavya-gold/60 tracking-widest mb-0.5">Scholarship Match</p>
                        <p class="text-sm font-bold text-white truncate">National Merit Scholarship</p>
                        <p class="text-[10px] text-white/40">Deadline: 30 Apr 2026 • ₹50,000</p>
                    </div>
                    <button class="dash-nav-btn flex-shrink-0 px-3 py-1.5 bg-ekalavya-gold/10 border border-ekalavya-gold/20 text-ekalavya-gold text-[10px] font-bold rounded-xl hover:bg-gold-gradient hover:text-black transition-all" data-tab="scholarships">
                        Apply →
                    </button>
                </div>
                <!-- Recommended Session -->
                <div class="group flex items-center gap-4 p-4 rounded-2xl border border-white/5 hover:border-blue-400/30 transition-all duration-300 relative overflow-hidden"
                     style="background: rgba(59,130,246,0.03);">
                    <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 flex-shrink-0">
                        <i data-lucide="video" class="w-6 h-6 text-blue-400"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[9px] uppercase font-bold text-blue-400/60 tracking-widest mb-0.5">Mentor Match</p>
                        <p class="text-sm font-bold text-white truncate">ML Fundamentals — Aakash Mehta</p>
                        <p class="text-[10px] text-white/40">Jan 10 • 60 mins • 5 seats left</p>
                    </div>
                    <button class="dash-nav-btn flex-shrink-0 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all" data-tab="mentoring">
                        Book →
                    </button>
                </div>
            </div>
        </div>

        <!-- 6. Recent Activity Feed -->
        <div>
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-bold text-white flex items-center gap-2">
                    <i data-lucide="activity" class="w-4 h-4 text-purple-400"></i>
                    Recent Activity
                </h3>
            </div>
            <div class="relative pl-5 space-y-0" id="activity-feed">
                <!-- Vertical line -->
                <div class="absolute left-[7px] top-2 bottom-2 w-[2px] bg-white/5 rounded-full"></div>
                ${[
                    { icon: 'graduation-cap', color: 'text-ekalavya-gold', bg: 'bg-ekalavya-gold/10', border: 'border-ekalavya-gold/20', text: 'Applied to National Merit Scholarship', sub: 'Scholarship Hub', time: '2h ago', xp: '+25' },
                    { icon: 'users', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'Joined AI & Machine Learning Club', sub: 'Community', time: '5h ago', xp: '+15' },
                    { icon: 'download', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'Downloaded Data Structures Notes', sub: 'Digital Library', time: 'Yesterday', xp: '+10' },
                    { icon: 'video', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'Booked session with Aakash Mehta', sub: 'Mentoring Hub', time: '2 days ago', xp: '+20' },
                    { icon: 'zap', color: 'text-ekalavya-gold', bg: 'bg-ekalavya-gold/10', border: 'border-ekalavya-gold/20', text: 'Earned 50 points for daily streak', sub: 'Growth Score', time: '3 days ago', xp: '+50' },
                ].map((a, i) => `
                    <div class="relative flex items-start gap-4 pb-5 last:pb-0">
                        <!-- Dot on timeline -->
                        <div class="absolute -left-5 top-3 w-3.5 h-3.5 rounded-full border-2 border-[#0a0a0a] ${a.bg} flex items-center justify-center z-10">
                            <div class="w-1.5 h-1.5 rounded-full ${a.color.replace('text-', 'bg-')}"></div>
                        </div>
                        <!-- Card -->
                        <div class="flex-1 flex items-center gap-3 p-3.5 rounded-2xl border border-white/5 hover:border-white/10 transition-all"
                             style="background: rgba(255,255,255,0.02);">
                            <div class="w-8 h-8 ${a.bg} rounded-xl flex items-center justify-center border ${a.border} flex-shrink-0">
                                <i data-lucide="${a.icon}" class="w-4 h-4 ${a.color}"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-bold text-white/80 truncate">${a.text}</p>
                                <p class="text-[10px] text-white/30 font-bold uppercase tracking-wider">${a.sub}</p>
                            </div>
                            <div class="flex items-center gap-3 flex-shrink-0">
                                <span class="text-[10px] text-white/20 font-bold">${a.time}</span>
                                <span class="text-[11px] font-black text-ekalavya-gold">${a.xp} XP</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

    </div>
`;};

const renderScholarshipsTab = () => `
    <div class="space-y-8">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-2">
            <div>
                <h2 class="text-3xl font-black text-white mb-1">Scholarship Hub</h2>
                <p class="text-white/40 text-sm">Hand-picked opportunities tailored for your growth</p>
            </div>
            <div class="relative group">
                <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-ekalavya-gold transition-colors"></i>
                <input type="text" id="scholarship-search" placeholder="Search opportunities..." 
                    class="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-ekalavya-gold/50 focus:bg-white/10 w-full sm:w-64 transition-all">
            </div>
        </div>
        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6" id="scholarship-grid">
            <div class="col-span-full py-20 text-center text-white/20">
                <i data-lucide="loader" class="w-10 h-10 mx-auto mb-3 animate-spin text-blue-500/50"></i>
                <p>Syncing with Scholarship Registry...</p>
            </div>
        </div>
    </div>
`;

const renderMentoringTab = () => `
    <div class="space-y-8">
        <div>
            <h2 class="text-3xl font-black text-white mb-1">Mentoring Hub</h2>
            <p class="text-white/40 text-sm">Learn from the best in the field</p>
        </div>
        <div class="grid md:grid-cols-2 gap-5" id="mentor-grid">
            <div class="col-span-full py-16 text-center text-white/20">
                <i data-lucide="loader" class="w-10 h-10 mx-auto mb-3 animate-spin text-blue-500/50"></i>
                <p>Finding available mentors...</p>
            </div>
        </div>
    </div>
`;

const renderPeerConnectTab = () => `
    <div class="space-y-8">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
                <h2 class="text-3xl font-black text-white mb-1">Peer Connect</h2>
                <p class="text-white/40 text-sm">Collaborate with peers globally</p>
            </div>
            
            <!-- Teach/Learn Toggle -->
            <div class="flex p-1 bg-white/5 border border-white/10 rounded-2xl">
                <button class="peer-toggle-btn px-6 py-2 rounded-xl text-xs font-bold transition-all bg-[#0ea5e9] text-white shadow-lg shadow-blue-500/20" data-type="teach">
                    Teach (Register)
                </button>
                <button class="peer-toggle-btn px-6 py-2 rounded-xl text-xs font-bold transition-all text-white/40 hover:text-white" data-type="learn">
                    Learn
                </button>
            </div>
        </div>

        <div class="grid md:grid-cols-1 lg:grid-cols-2 gap-6" id="peer-sessions-grid">
            <div class="col-span-full py-20 text-center text-white/20">
                <i data-lucide="loader" class="w-10 h-10 mx-auto mb-3 animate-spin text-blue-500/50"></i>
                <p>Syncing with Peer Registry...</p>
            </div>
        </div>

        <!-- Start Your Own Section -->
        <div class="glass-card p-8 rounded-[32px] overflow-hidden relative">
            <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div class="max-w-xl">
                    <h3 class="text-2xl font-black text-white mb-2">Can't find a topic?</h3>
                    <p class="text-white/40">Start your own study group, host a research jam, or mentor your peers in topics you excel at. Build your reputation and earn Ekalavya points.</p>
                </div>
                <button class="bg-gold-gradient text-black font-black py-4 px-10 rounded-2xl hover:scale-[1.05] active:scale-95 transition-all shadow-xl shadow-ekalavya-gold/10 whitespace-nowrap">
                    Start Your Session
                </button>
            </div>
        </div>
    </div>
`;

const renderLibraryTab = () => `
    <div class="space-y-8">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
                <h2 class="text-3xl font-black text-white mb-1">Academic Library</h2>
                <p class="text-white/40 text-sm">Resource hub for scholars</p>
            </div>
            <button id="contribute-notes-btn" class="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all">
                <i data-lucide="plus" class="w-4 h-4 text-ekalavya-gold"></i>
                Contribute Notes
            </button>
        </div>

        <!-- Search & Filter Bar -->
        <div class="flex flex-row gap-4 items-center">
            <div class="relative flex-1 group">
                <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-ekalavya-gold transition-colors"></i>
                <input type="text" id="library-search" placeholder="Search by topic, subject or writer..." 
                    class="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-ekalavya-gold/50 focus:bg-white/10 transition-all">
            </div>
            <div class="relative group">
                <select id="library-category-select" class="w-full lg:w-48 bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-4 pr-10 text-sm text-white/70 focus:outline-none focus:border-ekalavya-gold/50 focus:bg-white/10 appearance-none cursor-pointer transition-all">
                    <option value="all">All Categories</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="B.Sc">B.Sc</option>
                    <option value="Class 10">Class 10</option>
                </select>
                <i data-lucide="chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-ekalavya-gold pointer-events-none transition-colors"></i>
            </div>
        </div>

        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6" id="library-grid">
            <!-- Rendered cards -->
        </div>

        <!-- Contribute Modal (Simple Simulation) -->
        <div id="contribute-modal" class="modal-fixed hidden">
            <div class="modal-overlay" id="contribute-overlay"></div>
            <div class="modal-content max-w-lg">
                <div class="modal-gold-accent"></div>
                <h2 class="text-2xl font-black text-white mb-4">Share Your Wisdom</h2>
                <p class="text-white/40 text-sm mb-8">Contributing your notes helps thousands of peers. Thank you for building the Ekalavya community!</p>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-[10px] text-white/40 uppercase font-bold tracking-widest mb-2">Topic Name</label>
                        <input type="text" class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-ekalavya-gold/50">
                    </div>
                    <div>
                        <label class="block text-[10px] text-white/40 uppercase font-bold tracking-widest mb-2">Related Class</label>
                        <input type="text" placeholder="e.g. B.Tech CSE" class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-ekalavya-gold/50">
                    </div>
                    <button id="submit-contribution" class="w-full py-4 bg-gold-gradient text-black font-black rounded-xl mt-4 shadow-xl shadow-ekalavya-gold/10">
                        Upload Notes
                    </button>
                </div>
            </div>
        </div>
    </div>
`;

const renderProfileTab = (user, profile) => `
    <div class="space-y-8 max-w-3xl">
        <!-- Profile Header -->
        <div class="relative overflow-hidden glass-card p-8 rounded-3xl">
            <div class="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
            <div class="flex flex-col md:flex-row items-center gap-6">
                <div class="relative flex-shrink-0">
                    <div class="w-24 h-24 rounded-full border-2 border-ekalavya-gold/30 p-1">
                        <img src="${profile.avatar_seed ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.avatar_seed}` : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}" 
                             alt="Profile" class="w-full h-full rounded-full object-cover" id="profile-avatar-preview">
                    </div>
                    <button class="absolute -bottom-1 -right-1 w-8 h-8 bg-ekalavya-gold text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform" id="change-avatar-btn">
                        <i data-lucide="camera" class="w-4 h-4"></i>
                    </button>
                </div>
                <div class="text-center md:text-left">
                    <h2 class="text-2xl font-black text-white">${profile.full_name || 'Scholar'}</h2>
                    <p class="text-white/40 text-xs uppercase font-bold tracking-widest mt-1">${profile.role || 'Student'}</p>
                    <div class="flex gap-3 mt-3 justify-center md:justify-start">
                        <span class="flex items-center gap-1.5 text-sm font-bold text-ekalavya-gold">
                            <i data-lucide="zap" class="w-3.5 h-3.5 fill-ekalavya-gold"></i> ${profile.score || 0} pts
                        </span>
                        <span class="flex items-center gap-1.5 text-sm font-bold text-orange-400">
                            <i data-lucide="flame" class="w-3.5 h-3.5 fill-orange-400"></i> ${profile.streak || 0} streak
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Profile Form Row -->
        <div class="grid md:grid-cols-2 gap-6">
            <!-- Personal Info -->
            <div class="glass-card p-6 rounded-2xl space-y-5">
                <h3 class="font-bold text-white flex items-center gap-2">
                    <i data-lucide="user" class="w-4 h-4 text-ekalavya-gold"></i> Personal Information
                </h3>
                <div>
                    <label class="block text-[10px] text-white/40 uppercase font-bold tracking-widest mb-2">Full Name</label>
                    <input type="text" id="profile-full-name" value="${profile.full_name || ''}"
                        class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-ekalavya-gold/50 focus:bg-white/10 transition-all"
                        placeholder="Enter your full name">
                </div>
                <div>
                    <label class="block text-[10px] text-white/40 uppercase font-bold tracking-widest mb-2">Email</label>
                    <input type="email" value="${user.email}" disabled
                        class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white/40 cursor-not-allowed">
                </div>
                <div>
                    <label class="block text-[10px] text-white/40 uppercase font-bold tracking-widest mb-2">Role</label>
                    <select id="profile-role" class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-ekalavya-gold/50 focus:bg-white/10 transition-all">
                        <option value="student" ${profile.role === 'student' ? 'selected' : ''}>Student</option>
                        <option value="mentor" ${profile.role === 'mentor' ? 'selected' : ''}>Mentor</option>
                        <option value="researcher" ${profile.role === 'researcher' ? 'selected' : ''}>Researcher</option>
                        <option value="professional" ${profile.role === 'professional' ? 'selected' : ''}>Professional</option>
                    </select>
                </div>
                <div>
                    <label class="block text-[10px] text-white/40 uppercase font-bold tracking-widest mb-2">Bio</label>
                    <textarea id="profile-bio" rows="3"
                        class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-ekalavya-gold/50 focus:bg-white/10 transition-all resize-none"
                        placeholder="Tell us about yourself...">${profile.bio || ''}</textarea>
                </div>
            </div>

            <!-- Academic Info -->
            <div class="glass-card p-6 rounded-2xl space-y-5">
                <h3 class="font-bold text-white flex items-center gap-2">
                    <i data-lucide="graduation-cap" class="w-4 h-4 text-blue-400"></i> Academic Info
                </h3>
                <div>
                    <label class="block text-[10px] text-white/40 uppercase font-bold tracking-widest mb-2">Institution</label>
                    <input type="text" id="profile-institution" value="${profile.institution || ''}"
                        class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all"
                        placeholder="Your university or school">
                </div>
                <div>
                    <label class="block text-[10px] text-white/40 uppercase font-bold tracking-widest mb-2">Field of Study</label>
                    <input type="text" id="profile-field" value="${profile.field_of_study || ''}"
                        class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all"
                        placeholder="e.g., Computer Science">
                </div>
                <div>
                    <label class="block text-[10px] text-white/40 uppercase font-bold tracking-widest mb-2">Academic Level</label>
                    <select id="profile-level" class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all">
                        <option value="">Select Level</option>
                        <option value="high_school" ${profile.academic_level === 'high_school' ? 'selected' : ''}>High School</option>
                        <option value="undergraduate" ${profile.academic_level === 'undergraduate' ? 'selected' : ''}>Undergraduate</option>
                        <option value="graduate" ${profile.academic_level === 'graduate' ? 'selected' : ''}>Graduate</option>
                        <option value="phd" ${profile.academic_level === 'phd' ? 'selected' : ''}>PhD</option>
                    </select>
                </div>
                <div>
                    <label class="block text-[10px] text-white/40 uppercase font-bold tracking-widest mb-2">Interests</label>
                    <input type="text" id="profile-interests" value="${(profile.interests || []).join(', ')}"
                        class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all"
                        placeholder="e.g., ML, Research (comma-separated)">
                </div>
            </div>
        </div>

        <!-- Save Buttons -->
        <div class="flex gap-4">
            <button id="save-profile-changes" class="flex-1 bg-gold-gradient font-bold py-3.5 text-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all text-sm">
                <i data-lucide="save" class="w-4 h-4 inline mr-2"></i> Save Changes
            </button>
            <button id="share-profile-link" class="bg-white/5 border border-white/10 text-white font-bold py-3.5 px-6 rounded-2xl hover:bg-white/10 transition-all text-sm">
                <i data-lucide="share-2" class="w-4 h-4 inline mr-2"></i> Share
            </button>
        </div>

        <!-- Avatar Modal -->
        <div id="avatar-modal" class="modal-fixed hidden">
            <div class="modal-overlay" id="avatar-modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-gold-accent"></div>
                <button id="close-avatar-modal" class="modal-close-btn hover:text-white transition-colors">
                    <i data-lucide="x"></i>
                </button>
                <div class="text-center mb-8">
                    <h2 class="text-2xl font-bold mb-2 text-white">Choose Avatar</h2>
                    <p class="secondary-header-text text-sm">Customize your profile avatar</p>
                </div>
                <div class="space-y-5">
                    <div>
                        <label class="block text-xs text-white/40 uppercase font-bold tracking-widest mb-2">Avatar Seed</label>
                        <input type="text" id="avatar-seed-input" value="${profile.avatar_seed || user.id}"
                            class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-ekalavya-gold/50 focus:bg-white/10 transition-all"
                            placeholder="Enter any text to generate avatar">
                    </div>
                    <div class="text-center">
                        <div class="w-20 h-20 rounded-full border-2 border-ekalavya-gold/30 p-1 mx-auto mb-3">
                            <img id="avatar-preview" src="https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.avatar_seed || user.id}" alt="Preview" class="w-full h-full rounded-full object-cover">
                        </div>
                        <button id="generate-random-avatar" class="text-sm text-ekalavya-gold hover:underline">Generate Random</button>
                    </div>
                    <button id="save-avatar-btn" class="w-full bg-gold-gradient font-bold py-3.5 text-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all">Save Avatar</button>
                </div>
            </div>
        </div>
    </div>
`;

// ──────────────────────────────────────────────────────────
// Main Dashboard Shell
// ──────────────────────────────────────────────────────────

export const DashboardView = {
    render: async () => {
        const session = await authManager.getSession();
        if (!session) {
            return `
                <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <i data-lucide="lock" class="w-16 h-16 text-white/20 mb-4"></i>
                    <h2 class="text-2xl font-bold text-white mb-2">Private Access</h2>
                    <p class="text-white/50 mb-8">Please login to access your personal dashboard.</p>
                    <button class="nav-pill-primary px-8" onclick="window.showAuthModal()">Login / Join</button>
                </div>
            `;
        }

        const user = session.user;
        let stats = {};
        
        if (localStorage.getItem('ekalavya_demo_mode') === 'true') {
            stats = {
                full_name: 'Demo Scholar',
                role: 'student',
                score: 150,
                streak: 1,
                avatar_seed: 'demo-seed'
            };
        } else {
            const { data: profileData } = await authManager.supabase
                .from('users').select('*').eq('id', user.id).single();
            stats = profileData || {};
        }

        return `
        <div class="flex h-screen overflow-hidden bg-ekalavya-black" id="dashboard-container">
            <!-- Sidebar Navigation -->
            <aside id="dashboard-sidebar" class="w-64 flex-shrink-0 flex flex-col h-full border-r border-white/5 transition-all duration-300 overflow-hidden"
                   style="background: rgba(8,8,10,0.95);">
                <div class="p-4 flex flex-col h-full">
                    <!-- Brand Logo & Toggle -->
                    <div class="mb-4 px-2 flex items-center justify-between">
                        <a href="index.html" class="flex items-center gap-3 group sidebar-hide-on-collapsed">
                            <div class="w-10 h-10 bg-ekalavya-gold/10 rounded-xl flex items-center justify-center border border-ekalavya-gold/20 group-hover:bg-ekalavya-gold/20 transition-all">
                                <img src="../public/Logo.jpeg" alt="Logo" class="w-7 h-7 object-contain">
                            </div>
                            <span class="text-xl font-black text-white tracking-tighter group-hover:text-ekalavya-gold transition-colors">EKALAVYA</span>
                        </a>
                        <button id="sidebar-toggle-btn" class="w-10 h-10 rounded-xl bg-ekalavya-gold/10 border border-ekalavya-gold/30 flex items-center justify-center text-ekalavya-gold hover:text-white hover:bg-ekalavya-gold transition-all flex-shrink-0 ml-4" title="Toggle Sidebar">
                            <i data-lucide="menu" class="w-6 h-6" stroke-width="3"></i>
                        </button>
                    </div>
                    
                    <!-- Profile Mini Card -->
                    <div class="flex items-center gap-3 mb-4 p-3 rounded-2xl sidebar-hide-on-collapsed" style="background: rgba(244,196,48,0.05); border: 1px solid rgba(244,196,48,0.1);">
                        <img src="${stats.avatar_seed ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${stats.avatar_seed}` : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}"
                             alt="avatar" class="w-10 h-10 rounded-full border border-ekalavya-gold/30">
                        <div class="min-w-0">
                            <p class="font-bold text-white text-sm truncate">${stats.full_name || user.user_metadata?.full_name || 'Scholar'}</p>
                            <p class="text-[10px] text-white/40 uppercase font-bold tracking-wider capitalize">${stats.role || 'student'}</p>
                        </div>
                    </div>

                    <!-- Nav Items -->
                    <nav class="space-y-0.5" id="dashboard-sidebar-nav">
                        <button class="dash-tab-btn w-full flex items-center gap-3 px-4 py-1.5 rounded-xl text-xs font-black transition-all active-tab group/btn" data-tab="home">
                            <div class="icon-3d icon-3d-animate w-9 h-9 rounded-xl bg-ekalavya-gold/10 border border-ekalavya-gold/20 flex items-center justify-center flex-shrink-0" style="--glow-color: rgba(244,196,48,0.3)">
                                <i data-lucide="layout-dashboard" class="w-4 h-4 text-ekalavya-gold" stroke-width="2.5"></i>
                            </div>
                            <span class="text-white tracking-wide">Dashboard</span>
                        </button>
                        <button class="dash-tab-btn w-full flex items-center gap-3 px-4 py-1.5 rounded-xl text-xs font-black transition-all group/btn" data-tab="scholarships">
                            <div class="icon-3d icon-3d-animate w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0" style="--glow-color: rgba(59,130,246,0.3); animation-delay: 0.2s">
                                <i data-lucide="graduation-cap" class="w-4 h-4 text-blue-400" stroke-width="2.5"></i>
                            </div>
                            <span class="text-white/80 group-hover/btn:text-white transition-colors tracking-wide">Scholarships</span>
                        </button>
                        <button class="dash-tab-btn w-full flex items-center gap-3 px-4 py-1.5 rounded-xl text-xs font-black transition-all group/btn" data-tab="mentoring">
                            <div class="icon-3d icon-3d-animate w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0" style="--glow-color: rgba(168,85,247,0.3); animation-delay: 0.4s">
                                <i data-lucide="users" class="w-4 h-4 text-purple-400" stroke-width="2.5"></i>
                            </div>
                            <span class="text-white/80 group-hover/btn:text-white transition-colors tracking-wide">Mentoring</span>
                        </button>
                        <button class="dash-tab-btn w-full flex items-center gap-3 px-4 py-1.5 rounded-xl text-xs font-black transition-all group/btn" data-tab="peerconnect">
                            <div class="icon-3d icon-3d-animate w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0" style="--glow-color: rgba(16,185,129,0.3); animation-delay: 0.6s">
                                <i data-lucide="message-circle" class="w-4 h-4 text-emerald-400" stroke-width="2.5"></i>
                            </div>
                            <span class="text-white/80 group-hover/btn:text-white transition-colors tracking-wide">Peer Connect</span>
                        </button>
                        <button class="dash-tab-btn w-full flex items-center gap-3 px-4 py-1.5 rounded-xl text-xs font-black transition-all group/btn" data-tab="library">
                            <div class="icon-3d icon-3d-animate w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0" style="--glow-color: rgba(245,158,11,0.3); animation-delay: 0.8s">
                                <i data-lucide="book-open" class="w-4 h-4 text-amber-400" stroke-width="2.5"></i>
                            </div>
                            <span class="text-white/80 group-hover/btn:text-white transition-colors tracking-wide">Digital Library</span>
                        </button>
                        <button class="dash-tab-btn w-full flex items-center gap-3 px-4 py-1.5 rounded-xl text-xs font-black transition-all group/btn" data-tab="profile">
                            <div class="icon-3d icon-3d-animate w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0" style="--glow-color: rgba(244,63,94,0.3); animation-delay: 1s">
                                <i data-lucide="user" class="w-4 h-4 text-rose-400" stroke-width="2.5"></i>
                            </div>
                            <span class="text-white/80 group-hover/btn:text-white transition-colors tracking-wide">Profile</span>
                        </button>
                    </nav>

                    <!-- Logout -->
                    <div class="mt-2 pt-2" style="border-top: 1px solid rgba(255,255,255,0.05);">
                        <button id="dashboard-logout-btn" class="w-full text-center text-[11px] font-black uppercase tracking-widest text-red-400/90 hover:text-red-300 transition-all py-2 flex items-center justify-center gap-2">
                             <div class="sidebar-show-on-collapsed hidden-default">
                                 <i data-lucide="log-out" class="w-6 h-6 text-red-400" stroke-width="3"></i>
                             </div>
                             <span class="sidebar-hide-on-collapsed flex items-center gap-2">Log out <span class="text-base">🚪</span></span>
                        </button>
                    </div>

                    <!-- Stats -->
                    <div class="mt-4 pt-6 stats-section" style="border-top: 1px solid rgba(255,255,255,0.05);">
                        <div class="flex justify-between mb-3">
                            <span class="text-xs text-white/30 font-bold uppercase tracking-wider">My Stats</span>
                        </div>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="text-xs text-white/50 flex items-center gap-2"><i data-lucide="zap" class="w-3 h-3 text-ekalavya-gold fill-ekalavya-gold"></i>Score</span>
                                <span class="text-xs font-black text-ekalavya-gold">${stats.score || 0}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-xs text-white/50 flex items-center gap-2"><i data-lucide="flame" class="w-3 h-3 text-orange-400 fill-orange-400"></i>Streak</span>
                                <span class="text-xs font-black text-orange-400">${stats.streak || 0} days</span>
                            </div>
                        </div>
                    </div>

                    <!-- Logout Confirmation Modal -->
                    <div id="logout-confirm-modal" class="modal-fixed hidden">
                        <div class="modal-overlay" id="logout-confirm-overlay"></div>
                        <div class="modal-content max-w-xs text-center">
                            <i data-lucide="log-out" class="w-12 h-12 text-red-400 mx-auto mb-4"></i>
                            <h3 class="text-xl font-bold text-white mb-2">Sign Out?</h3>
                            <p class="text-white/40 text-sm mb-8">Are you sure you want to leave your learning session?</p>
                            <div class="flex flex-col gap-3">
                                <button id="confirm-logout-btn" class="w-full py-3.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors">Yes, Log out</button>
                                <button id="cancel-logout-btn" class="w-full py-3.5 bg-white/5 text-white/60 font-bold rounded-xl hover:bg-white/10 transition-colors">Stay here</button>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <!-- Main Content Area Wrapper -->
            <div class="flex-1 flex flex-col h-screen overflow-hidden">
                ${renderTopBar('Dashboard')}
                
                <main class="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 scroll-smooth" id="dashboard-tab-content">
                    ${renderHomeTab(user, stats)}
                </main>
            </div>
        </div>

        <!-- Inline styles for dashboard tabs -->
        <style>
            .dash-tab-btn { color: rgba(255,255,255,0.4); text-align: left; background: transparent; border: 1px solid transparent; }
            .dash-tab-btn:hover { background: rgba(255,255,255,0.03); }
            .dash-tab-btn.active-tab { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); }
            .dash-tab-btn.active-tab .icon-3d { 
                background: rgba(244,196,48,0.2) !important; 
                border-color: rgba(244,196,48,0.4) !important;
                box-shadow: 
                    inset 0 1px 1px rgba(255,255,255,0.3),
                    0 15px 30px rgba(244,196,48,0.3) !important;
                transform: translateZ(10px) translateY(-2px);
                animation: float 3s ease-in-out infinite;
            }
            .dash-tab-btn.active-tab span { color: #ffffff; text-shadow: 0 0 10px rgba(255,255,255,0.2); }

            /* realistic 3d-icon style */
            .icon-3d {
                perspective: 1000px;
                transform-style: preserve-3d;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 
                    inset 0 1px 1px rgba(255,255,255,0.2),
                    inset 0 -1px 1px rgba(0,0,0,0.4),
                    0 4px 8px rgba(0,0,0,0.3);
                position: relative;
                overflow: hidden;
            }

            .icon-3d::after {
                content: '';
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%);
                pointer-events: none;
            }

            .icon-3d:hover {
                transform: translateY(-4px) rotateX(10deg) rotateY(10deg);
                box-shadow: 
                    inset 0 1px 1px rgba(255,255,255,0.3),
                    0 12px 24px rgba(0,0,0,0.5),
                    0 0 15px var(--glow-color, rgba(244,196,48,0.2));
            }

            .icon-3d i {
                filter: drop-shadow(0 4px 4px rgba(0,0,0,0.3));
                transform: translateZ(20px);
            }

            /* Floating animation */
            @keyframes float {
                0%, 100% { transform: translateY(0) rotateX(0); }
                50% { transform: translateY(-3px) rotateX(5deg); }
            }

            .icon-3d-animate {
                animation: float 4s ease-in-out infinite;
            }

            /* Fix for invisible select options in dark mode */
            select option {
                background-color: #0a0a0c;
                color: #ffffff;
            }

            /* Collapsible Sidebar Styles */
            #dashboard-sidebar.collapsed {
                width: 88px;
            }
            
            #dashboard-sidebar.collapsed .sidebar-hide-on-collapsed,
            #dashboard-sidebar.collapsed nav button span,
            #dashboard-sidebar.collapsed .profile-mini-card-text,
            #dashboard-sidebar.collapsed .stats-section {
                display: none;
            }

            .hidden-default {
                display: none;
            }

            #dashboard-sidebar.collapsed .sidebar-show-on-collapsed.hidden-default {
                display: block !important;
            }

            #dashboard-sidebar.collapsed .p-6 {
                padding-left: 1.25rem;
                padding-right: 1.25rem;
            }

            #dashboard-sidebar.collapsed .flex-col {
                align-items: center;
            }

            #dashboard-sidebar.collapsed .dash-tab-btn {
                justify-content: center;
                padding-left: 0;
                padding-right: 0;
                width: 56px;
                height: 56px;
                border-radius: 16px;
            }
            
            #dashboard-sidebar.collapsed .icon-3d {
                margin: 0;
                width: 44px;
                height: 44px;
            }
        </style>
        `;
    },

    init: async () => {
        refreshIcons();
        const session = await authManager.getSession();
        refreshIcons();

        if (!session) return;

        const user = session.user;
        const userId = user.id;

        // ── Sidebar Toggle Logic ──
        const sidebarToggle = document.getElementById('sidebar-toggle-btn');
        const sidebar = document.getElementById('dashboard-sidebar');
        
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
                // Also toggle icon if needed, though 'menu' is fine for both
            });
        }

        // ── Activity Dropdown Toggle Logic ──
        const bellBtn = document.getElementById('notification-bell-btn');
        const dropdownWrapper = document.getElementById('activity-dropdown-wrapper');
        const dropdownList = document.getElementById('activity-dropdown-list');
        const chevron = document.getElementById('activity-dropdown-chevron');
        const subtitle = document.getElementById('activity-dropdown-subtitle');

        if (bellBtn && dropdownWrapper) {
            bellBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = !dropdownWrapper.classList.contains('opacity-0');
                
                if (!isOpen) {
                    // Open
                    dropdownWrapper.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
                    dropdownWrapper.classList.add('opacity-100', 'scale-100');
                    
                    // Auto-expand the list within the component
                    if (dropdownList) dropdownList.classList.replace('grid-rows-[0fr]', 'grid-rows-[1fr]');
                    if (dropdownList) dropdownList.classList.replace('opacity-0', 'opacity-100');
                    if (chevron) chevron.classList.remove('rotate-180');
                    if (subtitle) subtitle.classList.add('mt-0', 'max-h-0', 'opacity-0');
                } else {
                    // Close
                    dropdownWrapper.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
                    dropdownWrapper.classList.remove('opacity-100', 'scale-100');
                    
                    if (dropdownList) dropdownList.classList.replace('grid-rows-[1fr]', 'grid-rows-[0fr]');
                    if (dropdownList) dropdownList.classList.replace('opacity-100', 'opacity-0');
                    if (chevron) chevron.classList.add('rotate-180');
                    if (subtitle) subtitle.classList.remove('mt-0', 'max-h-0', 'opacity-0');
                }
            });

            // Close when clicking outside
            document.addEventListener('click', (e) => {
                if (!dropdownWrapper.contains(e.target) && e.target !== bellBtn) {
                    dropdownWrapper.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
                    dropdownWrapper.classList.remove('opacity-100', 'scale-100');
                    if (dropdownList) dropdownList.classList.replace('grid-rows-[1fr]', 'grid-rows-[0fr]');
                    if (dropdownList) dropdownList.classList.replace('opacity-100', 'opacity-0');
                    if (chevron) chevron.classList.add('rotate-180');
                    if (subtitle) subtitle.classList.remove('mt-0', 'max-h-0', 'opacity-0');
                }
            });
        }

        // ── Pre-fetch profile for tab switching ──
        let profileCache = null;
        const getProfile = async () => {
            if (profileCache) return profileCache;
            const { data } = await authManager.supabase.from('users').select('*').eq('id', userId).single();
            profileCache = data || {};
            return profileCache;
        };

        // ── Tab Switching Logic ──
        let currentTab = 'home';
        let tabInitialized = { home: false };

        const switchTab = async (tab) => {
            if (tab === currentTab) return;
            currentTab = tab;

            // Update sidebar active state
            document.querySelectorAll('.dash-tab-btn').forEach(btn => {
                btn.classList.toggle('active-tab', btn.dataset.tab === tab);
            });

            const content = document.getElementById('dashboard-tab-content');
            if (!content) return;

            // Update top bar title
            const titleEl = document.getElementById('current-tab-title');
            if (titleEl) {
                titleEl.innerText = tab.charAt(0).toUpperCase() + tab.slice(1);
            }

            // Fade out
            content.style.opacity = '0';
            content.style.transition = 'opacity 0.15s ease';

            await new Promise(r => setTimeout(r, 150));

            const profile = await getProfile();

            // Render new tab content
            switch (tab) {
                case 'home':
                    content.innerHTML = renderHomeTab(user, profile);
                    await initHomeTab(userId);
                    break;
                case 'scholarships':
                    content.innerHTML = renderScholarshipsTab();
                    await initScholarshipsTab(userId);
                    break;
                case 'mentoring':
                    content.innerHTML = renderMentoringTab();
                    initMentoringTab(userId);
                    break;
                case 'peerconnect':
                    content.innerHTML = renderPeerConnectTab();
                    await initPeerConnectTab(userId);
                    break;
                case 'library':
                    content.innerHTML = renderLibraryTab();
                    await initLibraryTab(userId);
                    break;
                case 'profile':
                    content.innerHTML = renderProfileTab(user, profile);
                    await initProfileTab(user, userId);
                    break;
            }

            refreshIcons();

            // Re-bind inner nav buttons (dash-nav-btn in home)
            content.querySelectorAll('.dash-nav-btn').forEach(btn => {
                btn.addEventListener('click', () => switchTab(btn.dataset.tab));
            });

            // Fade in
            content.style.opacity = '1';
        };

        // Bind sidebar nav
        document.querySelectorAll('.dash-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => switchTab(btn.dataset.tab));
        });

        // Init home tab on load
        await initHomeTab(userId);

        // Logout Modal Logic
        const logoutModal = document.getElementById('logout-confirm-modal');
        const confirmLogoutBtn = document.getElementById('confirm-logout-btn');
        const cancelLogoutBtn = document.getElementById('cancel-logout-btn');
        const logoutOverlay = document.getElementById('logout-confirm-overlay');

        document.querySelectorAll('#dashboard-logout-btn, #topbar-logout-btn').forEach(btn => {
            btn?.addEventListener('click', () => {
                logoutModal?.classList.remove('hidden');
                logoutModal?.classList.add('flex');
                if (window.lucide) window.lucide.createIcons();
            });
        });

        [cancelLogoutBtn, logoutOverlay].forEach(el => {
            el?.addEventListener('click', () => {
                logoutModal?.classList.remove('flex');
                logoutModal?.classList.add('hidden');
            });
        });

        confirmLogoutBtn?.addEventListener('click', async () => {
            try {
                // Show loading state on button
                confirmLogoutBtn.disabled = true;
                confirmLogoutBtn.innerText = 'Signing out...';
                
                await authManager.logout();
                
                // Clear state immediately
                uiStore.setState({ isLoggedIn: false, user: null, score: 0, streak: 0 });
                
                // Navigate to home page
                window.location.href = 'index.html';
            } catch (e) {
                console.error('Logout failed:', e);
                window.location.href = 'index.html'; // Fallback
            }
        });

        // ── Tab Init Functions ──
        async function initHomeTab(userId) {
            // Load stats counts
            const loadStats = async () => {
                try {
                    const [apps, sessions, communities] = await Promise.allSettled([
                        authManager.supabase.from('scholarship_applications').select('id').eq('user_id', userId),
                        authManager.supabase.from('session_enrollments').select('id').eq('user_id', userId),
                        authManager.supabase.from('community_members').select('id').eq('user_id', userId),
                    ]);
                    const el = (id) => document.getElementById(id);
                    if (el('stat-applications')) el('stat-applications').textContent = apps.value?.data?.length ?? '0';
                    if (el('stat-sessions')) el('stat-sessions').textContent = sessions.value?.data?.length ?? '0';
                    if (el('stat-communities')) el('stat-communities').textContent = communities.value?.data?.length ?? '0';
                } catch (e) {}
            };

            const loadHomeScholarships = async () => {
                const container = document.getElementById('home-scholarships-list');
                if (!container) return;
                try {
                    const { data, error } = await authManager.supabase
                        .from('scholarship_applications')
                        .select('*, scholarships(name)')
                        .eq('user_id', userId)
                        .limit(3);
                    if (error || !data || data.length === 0) {
                        container.innerHTML = `<div class="p-5 text-center border border-dashed border-white/10 rounded-2xl text-white/20 italic text-sm">No applications yet. <button class="text-ekalavya-gold underline dash-nav-btn ml-1" data-tab="scholarships">Explore Scholarships →</button></div>`;
                        container.querySelector('.dash-nav-btn')?.addEventListener('click', () => switchTab('scholarships'));
                        return;
                    }
                    container.innerHTML = data.map(app => `
                        <div class="glass-card p-4 flex items-center justify-between rounded-2xl">
                            <div class="flex items-center gap-3">
                                <div class="w-9 h-9 bg-ekalavya-gold/10 rounded-xl flex items-center justify-center border border-ekalavya-gold/20">
                                    <i data-lucide="graduation-cap" class="w-4 h-4 text-ekalavya-gold"></i>
                                </div>
                                <div>
                                    <p class="text-sm font-bold text-white/90">${app.scholarships?.name || 'Scholarship'}</p>
                                    <p class="text-[10px] uppercase font-bold text-white/30">Status: <span class="text-ekalavya-gold">${app.status}</span></p>
                                </div>
                            </div>
                        </div>
                    `).join('');
                    refreshIcons();
                } catch (e) {
                    container.innerHTML = `<p class="text-red-400/50 text-sm">Failed to load.</p>`;
                }
            };

            const loadHomeSessions = async () => {
                const container = document.getElementById('home-sessions-list');
                if (!container) return;
                try {
                    const { data, error } = await authManager.supabase
                        .from('session_enrollments')
                        .select('*, mentoring_sessions(mentor_name, topic)')
                        .eq('user_id', userId)
                        .limit(3);
                    if (error || !data || data.length === 0) {
                        container.innerHTML = `<div class="p-5 text-center border border-dashed border-white/10 rounded-2xl text-white/20 italic text-sm">No sessions booked. <button class="text-blue-400 underline dash-nav-btn ml-1" data-tab="mentoring">Browse Mentors →</button></div>`;
                        container.querySelector('.dash-nav-btn')?.addEventListener('click', () => switchTab('mentoring'));
                        return;
                    }
                    container.innerHTML = data.map(e => `
                        <div class="glass-card p-4 flex items-center gap-3 rounded-2xl">
                            <div class="w-9 h-9 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                                <i data-lucide="video" class="w-4 h-4 text-blue-400"></i>
                            </div>
                            <div>
                                <p class="text-sm font-bold text-white/90">${e.mentoring_sessions?.mentor_name || 'Mentor'}</p>
                                <p class="text-[10px] text-white/30 font-bold uppercase">${e.mentoring_sessions?.topic || ''}</p>
                            </div>
                        </div>
                    `).join('');
                    refreshIcons();
                } catch (e) {
                    container.innerHTML = `<p class="text-red-400/50 text-sm">Failed to load.</p>`;
                }
            };

            // Bind inner nav btns
            document.querySelectorAll('.dash-nav-btn').forEach(btn => {
                btn.addEventListener('click', () => switchTab(btn.dataset.tab));
            });

            // Initialize Mastery Radar Chart
            initMasteryRadarChart();

            // Initialize Mastery Circle Dropdown
            initMasteryCircle();

            loadStats();
        }

        function initMasteryCircle() {
            const dropdown = document.getElementById('mastery-skill-select');
            const circle = document.getElementById('mastery-progress-circle');
            const percentage = document.getElementById('mastery-percentage');
            const skillName = document.getElementById('mastery-skill-name');
            const scoreText = document.getElementById('mastery-score-text');
            const statusText = document.getElementById('mastery-status');
            const iconContainer = document.getElementById('mastery-skill-icon');

            if (!dropdown || !circle) return;

            const skills = [
                { name: 'Reading', score: 45, icon: 'book-open', color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.2)' },
                { name: 'Solving', score: 47, icon: 'puzzle', color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.1)', borderColor: 'rgba(139, 92, 246, 0.2)' },
                { name: 'Revision', score: 31, icon: 'refresh-cw', color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.1)', borderColor: 'rgba(6, 182, 212, 0.2)' },
                { name: 'Coding', score: 72, icon: 'code', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)' },
                { name: 'Teaching', score: 18, icon: 'presentation', color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.2)' }
            ];

            const updateCircle = (index) => {
                const skill = skills[index];
                const circumference = 2 * Math.PI * 110; // radius = 110
                const offset = circumference - (skill.score / 100) * circumference;

                // Update circle
                circle.style.strokeDashoffset = offset;
                circle.style.stroke = skill.color;

                // Update percentage
                percentage.innerHTML = `${skill.score}<span class="text-2xl text-white/40">%</span>`;

                // Update skill name
                skillName.textContent = skill.name;

                // Update score text
                scoreText.textContent = `${skill.score}/100`;

                // Update status
                let status = 'Needs Work';
                let statusColor = 'text-red-400';
                if (skill.score >= 70) {
                    status = 'Strong';
                    statusColor = 'text-emerald-400';
                } else if (skill.score >= 50) {
                    status = 'Moderate';
                    statusColor = 'text-amber-400';
                }
                statusText.textContent = status;
                statusText.className = `${statusColor} font-bold`;

                // Update icon
                iconContainer.style.backgroundColor = skill.bgColor;
                iconContainer.style.borderColor = skill.borderColor;
                iconContainer.innerHTML = `<i data-lucide="${skill.icon}" class="w-8 h-8" style="color: ${skill.color}"></i>`;

                // Refresh lucide icons
                if (window.lucide) window.lucide.createIcons();
            };

            // Initial load
            updateCircle(3); // Coding is selected by default

            // Dropdown change handler
            dropdown.addEventListener('change', (e) => {
                updateCircle(parseInt(e.target.value));
            });
        }

        function initMasteryRadarChart() {
            const canvas = document.getElementById('mastery-radar-chart');
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 140;

            // Data
            const skills = ['Reading', 'Solving', 'Revision', 'Coding', 'Teaching'];
            const userScores = [45, 47, 31, 72, 18];
            const mentorBenchmark = [75, 80, 70, 85, 65];

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw grid circles
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;
            for (let i = 1; i <= 5; i++) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, (radius / 5) * i, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Draw axis lines
            const angleStep = (Math.PI * 2) / skills.length;
            skills.forEach((skill, index) => {
                const angle = angleStep * index - Math.PI / 2;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;

                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(x, y);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
                ctx.stroke();

                // Draw labels
                const labelX = centerX + Math.cos(angle) * (radius + 30);
                const labelY = centerY + Math.sin(angle) * (radius + 30);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.font = 'bold 11px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(skill, labelX, labelY);
            });

            // Draw mentor benchmark (dashed line with amber color)
            ctx.beginPath();
            mentorBenchmark.forEach((score, index) => {
                const angle = angleStep * index - Math.PI / 2;
                const distance = (score / 100) * radius;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.closePath();
            ctx.strokeStyle = 'rgba(251, 191, 36, 0.6)';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Draw user profile (solid line with fill)
            ctx.beginPath();
            userScores.forEach((score, index) => {
                const angle = angleStep * index - Math.PI / 2;
                const distance = (score / 100) * radius;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.closePath();
            ctx.fillStyle = 'rgba(59, 130, 246, 0.15)';
            ctx.fill();
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 3;
            ctx.stroke();

            // Draw data points
            userScores.forEach((score, index) => {
                const angle = angleStep * index - Math.PI / 2;
                const distance = (score / 100) * radius;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;

                ctx.beginPath();
                ctx.arc(x, y, 5, 0, Math.PI * 2);
                ctx.fillStyle = '#3b82f6';
                ctx.fill();
                ctx.strokeStyle = '#1e40af';
                ctx.lineWidth = 2;
                ctx.stroke();
            });
        }

        async function initScholarshipsTab(userId) {
            await renderers.scholarships();

            const searchInput = document.getElementById('scholarship-search');
            const grid = document.getElementById('scholarship-grid');

            if (searchInput && grid) {
                searchInput.addEventListener('input', async (e) => {
                    const query = e.target.value.toLowerCase();
                    const all = await api.getCollection('scholarships');
                    const filtered = all.filter(s =>
                        s.name?.toLowerCase().includes(query) ||
                        s.description?.toLowerCase().includes(query) ||
                        s.provider?.toLowerCase().includes(query)
                    );
                    if (filtered.length === 0) {
                        grid.innerHTML = `<div class="col-span-full py-16 text-center text-white/20 italic">No scholarships match "${e.target.value}"</div>`;
                    } else {
                        grid.innerHTML = filtered.map(s => renderers.renderScholarshipCard(s)).join('');
                        refreshIcons();
                    }
                });
            }

            if (grid) {
                grid.addEventListener('click', async (e) => {
                    const btn = e.target.classList.contains('apply-scholarship-btn') ? e.target : e.target.closest('.apply-scholarship-btn');
                    if (btn) {
                        const scholarshipId = btn.dataset.id;
                        const scholarshipName = btn.dataset.name;
                        const { data: { session } } = await authManager.supabase.auth.getSession();
                        if (!session) return notificationManager.showInternalAlert('Auth Required', 'Please login to apply.');
                        try {
                            btn.disabled = true;
                            btn.innerText = 'Applying...';
                            await api.createDocument('scholarship_applications', {
                                scholarship_id: scholarshipId,
                                user_id: session.user.id,
                                status: 'pending'
                            });
                            notificationManager.sendPulse('Application Sent', { body: `Applied to ${scholarshipName}!` });
                            btn.innerText = 'Applied ✓';
                            btn.classList.add('text-green-400', 'opacity-60');
                        } catch (err) {
                            notificationManager.showInternalAlert('Error', 'Already applied or failed.');
                            btn.disabled = false;
                            btn.innerText = 'Apply Now';
                        }
                    }
                });
            }
        }

        function initMentoringTab(userId) {
            renderers.mentors();

            const grid = document.getElementById('mentor-grid');
            if (grid) {
                grid.addEventListener('click', async (e) => {
                    const btn = e.target.classList.contains('book-session-btn') ? e.target : e.target.closest('.book-session-btn');
                    if (btn) {
                        const sessionId = btn.dataset.id;
                        const mentorName = btn.dataset.mentor;
                        const { data: { session } } = await authManager.supabase.auth.getSession();
                        if (!session) return notificationManager.showInternalAlert('Auth Required', 'Please login to book.');
                        try {
                            btn.disabled = true;
                            btn.innerText = 'Enrolling...';

                            // Demo session guard — IDs starting with 'd' are local mock data
                            const isDemo = String(sessionId).startsWith('d');
                            if (isDemo) {
                                await new Promise(r => setTimeout(r, 600)); // simulate network
                                notificationManager.sendPulse('Enrolled!', { body: `Session with ${mentorName} confirmed.` });
                                btn.innerText = 'Enrolled ✓';
                                btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
                                btn.style.boxShadow = '0 4px 14px rgba(34,197,94,0.3)';
                                return;
                            }

                            // Real Supabase session
                            const sessionData = await api.getDocument('mentoring_sessions', sessionId);
                            if (sessionData.enrolled_count >= sessionData.total_capacity) {
                                notificationManager.showInternalAlert('Full', 'This session is at capacity.');
                                btn.innerText = 'Full';
                                return;
                            }
                            await api.createDocument('session_enrollments', { session_id: sessionId, user_id: session.user.id });
                            await api.updateDocument('mentoring_sessions', sessionId, { enrolled_count: sessionData.enrolled_count + 1 });
                            notificationManager.sendPulse('Enrolled!', { body: `Session with ${mentorName} confirmed.` });
                            btn.innerText = 'Enrolled ✓';
                            btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
                            btn.style.boxShadow = '0 4px 14px rgba(34,197,94,0.3)';
                        } catch (e) {
                            notificationManager.showInternalAlert('Error', 'Failed to enroll. Please try again.');
                            btn.disabled = false;
                            btn.innerText = 'Enroll';
                        }
                    }
                });
            }
        }

        async function initLibraryTab(userId) {
            renderers.libraryItems();

            // Search Logic
            const searchInput = document.getElementById('library-search');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const category = document.getElementById('library-category-select')?.value || 'all';
                    renderers.libraryItems(e.target.value.toLowerCase(), category);
                });
            }

            // Filter Logic (Dropdown)
            const categorySelect = document.getElementById('library-category-select');
            if (categorySelect) {
                categorySelect.addEventListener('change', (e) => {
                    const query = document.getElementById('library-search')?.value.toLowerCase() || '';
                    renderers.libraryItems(query, e.target.value);
                });
            }

            // Contribute Modal
            document.getElementById('contribute-notes-btn')?.addEventListener('click', () => {
                document.getElementById('contribute-modal')?.classList.replace('hidden', 'flex');
            });
            document.getElementById('contribute-overlay')?.addEventListener('click', () => {
                document.getElementById('contribute-modal')?.classList.replace('flex', 'hidden');
            });
            document.getElementById('submit-contribution')?.addEventListener('click', () => {
                notificationManager.sendPulse('Submitted!', { body: 'Your notes are under review.' });
                document.getElementById('contribute-modal')?.classList.replace('flex', 'hidden');
            });
        }

        async function initPeerConnectTab(userId) {
            renderers.peerSessions('teach'); // Default to teach to match active button

            // Toggle Logic
            const buttons = document.querySelectorAll('.peer-toggle-btn');
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const type = btn.dataset.type;
                    
                    // Update UI
                    buttons.forEach(b => {
                        b.classList.remove('bg-[#0ea5e9]', 'text-white', 'shadow-lg', 'shadow-blue-500/20');
                        b.classList.add('text-white/40');
                    });
                    btn.classList.remove('text-white/40');
                    btn.classList.add('bg-[#0ea5e9]', 'text-white', 'shadow-lg', 'shadow-blue-500/20');
                    
                    // Re-render
                    renderers.peerSessions(type);
                });
            });

            // Action Button Logic
            const grid = document.getElementById('peer-sessions-grid');
            if (grid) {
                grid.addEventListener('click', async (e) => {
                    const btn = e.target.classList.contains('join-peer-btn') ? e.target : e.target.closest('.join-peer-btn');
                    if (btn) {
                        const topic = btn.dataset.topic;
                        
                        btn.disabled = true;
                        const originalText = btn.innerText;
                        btn.innerText = 'Processing...';
                        
                        await new Promise(r => setTimeout(r, 800));
                        
                        notificationManager.sendPulse('Confirmed!', { body: `You are now registered for ${topic}` });
                        btn.innerText = 'Registered ✓';
                        btn.style.background = '#10b981';
                        btn.style.boxShadow = 'none';
                    }
                });
            }
        }

        async function initProfileTab(user, userId) {
            refreshIcons();

            // Avatar preview
            const updatePreview = () => {
                const seed = document.getElementById('avatar-seed-input')?.value || userId;
                const img = document.getElementById('avatar-preview');
                if (img) img.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
            };
            updatePreview();
            document.getElementById('avatar-seed-input')?.addEventListener('input', updatePreview);
            document.getElementById('generate-random-avatar')?.addEventListener('click', () => {
                const input = document.getElementById('avatar-seed-input');
                if (input) { input.value = Math.random().toString(36).substring(7); updatePreview(); }
            });

            // Avatar modal
            document.getElementById('change-avatar-btn')?.addEventListener('click', () => {
                document.getElementById('avatar-modal')?.classList.replace('hidden', 'flex');
            });
            ['close-avatar-modal', 'avatar-modal-overlay'].forEach(id => {
                document.getElementById(id)?.addEventListener('click', () => {
                    document.getElementById('avatar-modal')?.classList.replace('flex', 'hidden');
                });
            });

            // Save avatar
            document.getElementById('save-avatar-btn')?.addEventListener('click', async () => {
                const seed = document.getElementById('avatar-seed-input')?.value;
                if (!seed) return;
                try {
                    const { error } = await authManager.supabase.from('users').update({ avatar_seed: seed }).eq('id', userId);
                    if (error) throw error;
                    const mainAvatar = document.getElementById('profile-avatar-preview');
                    if (mainAvatar) mainAvatar.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
                    document.getElementById('avatar-modal')?.classList.replace('flex', 'hidden');
                    profileCache = null; // Invalidate cache
                    notificationManager.sendPulse('Avatar Updated!', { body: 'Your avatar has been changed.' });
                } catch (e) {
                    notificationManager.showInternalAlert('Error', 'Failed to update avatar.');
                }
            });

            // Save profile changes
            document.getElementById('save-profile-changes')?.addEventListener('click', async () => {
                const fullName = document.getElementById('profile-full-name')?.value?.trim();
                const role = document.getElementById('profile-role')?.value;
                const bio = document.getElementById('profile-bio')?.value?.trim();
                const institution = document.getElementById('profile-institution')?.value?.trim();
                const fieldOfStudy = document.getElementById('profile-field')?.value?.trim();
                const academicLevel = document.getElementById('profile-level')?.value;
                const interestsText = document.getElementById('profile-interests')?.value?.trim();

                if (!fullName) return notificationManager.showInternalAlert('Validation', 'Enter your full name.');
                const interests = interestsText ? interestsText.split(',').map(i => i.trim()).filter(i => i) : [];
                try {
                    const { error } = await authManager.supabase.from('users').update({
                        full_name: fullName, role, bio, institution,
                        field_of_study: fieldOfStudy, academic_level: academicLevel, interests
                    }).eq('id', userId);
                    if (error) throw error;
                    profileCache = null; // Invalidate cache
                    notificationManager.sendPulse('Profile Saved!', { body: 'Your profile has been updated.' });
                } catch (e) {
                    notificationManager.showInternalAlert('Error', 'Failed to save. Please try again.');
                }
            });

            // Share profile
            document.getElementById('share-profile-link')?.addEventListener('click', async () => {
                const url = `${window.location.origin}${window.location.pathname.replace('dashboard.html', 'portfolio.html')}?id=${userId}`;
                try {
                    await navigator.clipboard.writeText(url);
                    notificationManager.showInternalAlert('Copied!', 'Profile link copied to clipboard.');
                } catch (e) {}
            });
        }
    }
};
