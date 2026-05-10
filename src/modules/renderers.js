import { api } from '../services/api.js';

/**
 * Global UI Helper to refresh Lucide icons
 */
export const refreshIcons = () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }
};

/**
 * UI Renderers for main modules (Supabase Backend)
 */
export const renderers = {
    renderScholarshipCard(s) {
        // Determine badge based on verification status
        const verificationStatus = s.verification_status || 'not_verified';
        let badgeHTML = '';
        
        if (verificationStatus === 'verified') {
            badgeHTML = `
                <span class="text-[10px] uppercase font-bold tracking-[0.2em] px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                    <i data-lucide="check-circle" class="w-3 h-3"></i>
                    Verified
                </span>`;
        } else if (verificationStatus === 'in_progress') {
            badgeHTML = `
                <span class="text-[10px] uppercase font-bold tracking-[0.2em] px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center gap-1.5">
                    <i data-lucide="clock" class="w-3 h-3"></i>
                    In Progress
                </span>`;
        } else {
            badgeHTML = `
                <span class="text-[10px] uppercase font-bold tracking-[0.2em] px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1.5">
                    <i data-lucide="alert-circle" class="w-3 h-3"></i>
                    Not Verified
                </span>`;
        }
        
        return `
            <div class="bg-ekalavya-black-dark/60 border border-white/5 p-7 rounded-[24px] flex flex-col h-full hover:border-ekalavya-gold/30 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                <div class="absolute top-0 left-0 right-0 h-[3px] bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="flex justify-between items-start mb-6">
                    <div class="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-ekalavya-gold/10 transition-colors">
                        <i data-lucide="graduation-cap" class="w-7 h-7 text-ekalavya-gold"></i>
                    </div>
                    <div class="flex flex-col items-end gap-2">
                        ${badgeHTML}
                        <span class="text-[9px] uppercase font-bold text-white/30 tracking-widest">${s.status || 'Open'}</span>
                    </div>
                </div>
                <h3 class="text-xl font-bold mb-3 text-white group-hover:text-ekalavya-gold transition-colors">${s.name}</h3>
                <p class="text-ekalavya-slate text-sm mb-6 flex-grow leading-relaxed">${s.description || 'Access financial aid and support for your education programs.'}</p>
                <div class="flex items-center justify-between pt-5 border-t border-white/5 mt-auto">
                    <div class="flex flex-col">
                        <span class="text-[10px] text-white/30 uppercase font-bold tracking-wider">Deadline</span>
                        <span class="text-sm font-semibold text-white/70">${s.end_date || 'Ongoing'}</span>
                    </div>
                    <button class="apply-scholarship-btn px-5 py-2.5 bg-ekalavya-gold/10 hover:bg-gold-gradient border border-ekalavya-gold/20 hover:border-transparent text-ekalavya-gold hover:text-black text-xs font-bold rounded-xl transition-all" data-id="${s.id}" data-name="${s.name}">
                        Apply Now
                    </button>
                </div>
            </div>
        `;
    },

    async scholarships() {
        const grid = document.getElementById('scholarship-grid');
        if (!grid) return;

        try {
            const scholarships = await api.getCollection('scholarships');
            const DEMO_SCHOLARSHIPS = [
                { id: 'ds1', name: 'National Merit Scholarship', description: 'Awarded to students who demonstrate exceptional academic achievement and leadership potential across India.', status: 'Open', end_date: '30 Apr 2026', amount: '₹50,000', verification_status: 'verified' },
                { id: 'ds2', name: 'STEM Excellence Award', description: 'For students pursuing Science, Technology, Engineering, or Mathematics programs at undergraduate level.', status: 'Open', end_date: '15 May 2026', amount: '₹40,000', verification_status: 'verified' },
                { id: 'ds3', name: 'Girls in Tech Scholarship', description: 'Empowering female students in technology fields with financial support and mentorship access.', status: 'Verified', end_date: '1 Jun 2026', amount: '₹35,000', verification_status: 'in_progress' },
                { id: 'ds4', name: 'Rural Innovators Grant', description: 'Supporting bright minds from rural backgrounds with full tuition coverage and hostel allowance.', status: 'Open', end_date: '20 Apr 2026', amount: '₹60,000', verification_status: 'not_verified' },
                { id: 'ds5', name: 'Research Fellowship Fund', description: 'For postgraduate students conducting original research in applied sciences, social sciences, or humanities.', status: 'Verified', end_date: '10 May 2026', amount: '₹75,000', verification_status: 'verified' },
                { id: 'ds6', name: 'First Generation Scholars', description: 'Designed for first-generation college students to help bridge the education gap and unlock their potential.', status: 'Open', end_date: '25 Apr 2026', amount: '₹45,000', verification_status: 'in_progress' },
            ];
            const data = (scholarships && scholarships.length > 0) ? scholarships : DEMO_SCHOLARSHIPS;
            grid.innerHTML = data.map(s => this.renderScholarshipCard(s)).join('');
            refreshIcons();
        } catch (error) {
            console.error('Error rendering scholarships:', error);
            grid.innerHTML = `<p class="text-red-400">Failed to load scholarships.</p>`;
        }
    },

    async mentors() {
        const grid = document.getElementById('mentor-grid');
        if (!grid) return;

        try {
            const sessions = await api.getCollection('mentoring_sessions');
            const DEMO_SESSIONS = [
                { id: 'd1', mentor_name: 'Rohit Verma', specialty: 'Frontend Engineering', experience: '5', topic: 'React Hooks Deep Dive', description: 'Frontend architect • Learn modern React patterns, hooks, and performance optimizations.', date: '2026-01-07', duration: 75, total_capacity: 30, enrolled_count: 2, rating: 5 },
                { id: 'd2', mentor_name: 'Sara Iqbal', specialty: 'Data Analysis', experience: '4', topic: 'Intro to Python', description: 'Data analyst and Python expert • From basics to data wrangling with pandas and numpy.', date: '2026-01-08', duration: 90, total_capacity: 20, enrolled_count: 0, rating: 4 },
                { id: 'd3', mentor_name: 'Aakash Mehta', specialty: 'Machine Learning', experience: '6', topic: 'ML Fundamentals', description: 'AI researcher • Supervised learning, model evaluation, and scikit-learn hands-on.', date: '2026-01-10', duration: 60, total_capacity: 25, enrolled_count: 5, rating: 5 },
                { id: 'd4', mentor_name: 'Priya Sharma', specialty: 'UI/UX Design', experience: '3', topic: 'Figma for Beginners', description: 'Product designer • Build real-world interfaces with Figma from scratch.', date: '2026-01-12', duration: 45, total_capacity: 15, enrolled_count: 8, rating: 4 },
                { id: 'd5', mentor_name: 'Dev Patel', specialty: 'Backend Dev', experience: '7', topic: 'Node.js & REST APIs', description: 'Full-stack engineer • Build and deploy production-grade REST APIs with Express and PostgreSQL.', date: '2026-01-15', duration: 90, total_capacity: 20, enrolled_count: 18, rating: 5 },
                { id: 'd6', mentor_name: 'Meena Krishnan', specialty: 'Scholarships', experience: '4', topic: 'Scholarship Essay Writing', description: 'Academic counselor • Craft compelling scholarship essays that stand out to committees.', date: '2026-01-18', duration: 60, total_capacity: 30, enrolled_count: 10, rating: 4 },
            ];
            const data = (sessions && sessions.length > 0) ? sessions : DEMO_SESSIONS;

            // Helpers
            const initials = (name = '') => name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '??';
            const hue = (name = '') => [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
            const stars = (rating = 4) => Array.from({ length: 5 }, (_, i) => {
                const filled = i < Math.round(rating);
                return `<svg class="w-3 h-3 inline ${filled ? 'text-yellow-400' : 'text-white/20'}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
            }).join('');

            grid.innerHTML = data.map(m => {
                const h = hue(m.mentor_name || '');
                const seatsLeft = (m.total_capacity || 30) - (m.enrolled_count || 0);
                const startDate = m.date
                    ? new Date(m.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric' })
                    : 'TBD';
                const rating = m.rating || 4;
 
                return `
                <div class="flex rounded-3xl overflow-hidden border border-white/5 hover:border-ekalavya-gold/30 hover:shadow-2xl hover:shadow-ekalavya-gold/5 transition-all duration-500 group relative" style="background:rgba(255,255,255,0.03);">
                    <div class="absolute top-0 left-0 right-0 h-[3px] bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
 
                    <!-- Left: Mentor Identity -->
                    <div class="flex flex-col items-center justify-between p-6 w-[130px] flex-shrink-0 border-r border-white/5 bg-white/[0.02]">
                        <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-black text-white shadow-lg group-hover:scale-110 transition-transform duration-500" style="background:linear-gradient(135deg,hsl(${h},60%,45%),hsl(${(h+40)%360},60%,35%));">
                            ${initials(m.mentor_name)}
                        </div>
                        <div class="text-center mt-4">
                            <p class="text-white text-xs font-bold leading-tight group-hover:text-ekalavya-gold transition-colors">${m.mentor_name || 'Mentor'}</p>
                            <p class="text-ekalavya-slate text-[9px] mt-1.5 leading-tight uppercase tracking-wider font-semibold">${m.specialty || 'Expert'}</p>
                        </div>
                        <div class="mt-3 flex flex-wrap justify-center gap-0.5">${stars(rating)}</div>
                        
                        <!-- Badge Icons -->
                        <div class="flex items-center gap-2 mt-5">
                            <div class="w-6 h-6 rounded-lg bg-ekalavya-gold/10 flex items-center justify-center border border-ekalavya-gold/20" title="Top Rated">
                                <i data-lucide="award" class="w-3 h-3 text-ekalavya-gold"></i>
                            </div>
                            <div class="w-6 h-6 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20" title="Verified">
                                <i data-lucide="check-check" class="w-3 h-3 text-green-400"></i>
                            </div>
                        </div>
                    </div>
 
                    <!-- Right: Session Details -->
                    <div class="flex-1 p-6 flex flex-col justify-between min-w-0">
                        <div>
                            <div class="flex items-center justify-between mb-3">
                                <span class="text-[9px] font-black uppercase tracking-[0.2em] text-ekalavya-gold/60">Professional Mentorship</span>
                                <span class="text-[9px] font-bold px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">Upcoming</span>
                            </div>
                            <h4 class="text-white font-bold text-lg leading-snug mb-2 group-hover:text-ekalavya-gold transition-colors">${m.topic || 'Expert Session'}</h4>
                            <p class="text-ekalavya-slate text-[11px] leading-relaxed line-clamp-2 mb-6">${m.description || (m.mentor_name + ' • ' + (m.specialty || 'Expert mentor') + '...')}</p>
                            
                            <div class="grid grid-cols-2 gap-4 mb-6">
                                <div class="bg-white/5 p-2.5 rounded-xl border border-white/5">
                                    <p class="text-[8px] text-white/30 uppercase font-black tracking-widest mb-1">Schedule</p>
                                    <p class="text-white/80 text-[11px] font-bold flex items-center gap-1.5">
                                        <i data-lucide="calendar" class="w-3 h-3 text-ekalavya-gold"></i> ${startDate}
                                    </p>
                                </div>
                                <div class="bg-white/5 p-2.5 rounded-xl border border-white/5">
                                    <p class="text-[8px] text-white/30 uppercase font-black tracking-widest mb-1">Duration</p>
                                    <p class="text-white/80 text-[11px] font-bold flex items-center gap-1.5">
                                        <i data-lucide="clock" class="w-3 h-3 text-ekalavya-gold"></i> ${m.duration || 60}m
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between gap-4 mt-auto">
                            <div class="flex flex-col">
                                <p class="text-[8px] text-white/30 uppercase font-black tracking-widest">Availability</p>
                                <p class="text-xs font-bold ${seatsLeft <= 5 ? 'text-red-400' : 'text-green-400'}">${seatsLeft} Seats Left</p>
                            </div>
                            <button class="book-session-btn flex-1 py-3 bg-gold-gradient text-black rounded-xl text-xs font-black transition-all hover:scale-[1.05] active:scale-95 shadow-lg shadow-ekalavya-gold/20"
                                    data-id="${m.id}" data-mentor="${m.mentor_name}"
                                    ${seatsLeft <= 0 ? 'disabled' : ''}>
                                ${seatsLeft <= 0 ? 'Full' : 'Book Session'}
                            </button>
                        </div>
                    </div>
                </div>`;
            }).join('');

            refreshIcons();
        } catch (error) {
            console.error('Error rendering mentors:', error);
            grid.innerHTML = `<p class="text-red-400 col-span-full text-center py-8">Error loading sessions.</p>`;
        }
    },

    async communities() {
        const list = document.getElementById('community-list');
        if (!list) return;

        try {
            const communities = await api.getCollection('communities').catch(() => []);

            const DEMO_COMMUNITIES = [
                { id: 'dc1', name: 'AI & Machine Learning Club', icon: 'cpu', members: 1420, category: 'Technology', tag: 'ai', description: 'Discuss the latest in AI research, ML papers, and hands-on projects.', active: true },
                { id: 'dc2', name: 'Scholarship Hunters', icon: 'graduation-cap', members: 3850, category: 'Finance', tag: 'funding', description: 'Find, share and discuss scholarship opportunities across India and abroad.', active: true },
                { id: 'dc3', name: 'Competitive Programming', icon: 'code', members: 2210, category: 'Coding', tag: 'dsa', description: 'Daily DSA practice, LeetCode contests, and interview prep discussions.', active: false },
                { id: 'dc4', name: 'Research & Innovation Hub', icon: 'flask-conical', members: 980, category: 'Research', tag: 'research', description: 'Collaborate on research papers, find co-authors, and share findings.', active: true },
                { id: 'dc5', name: 'Design Thinking Circle', icon: 'pen-tool', members: 1105, category: 'Design', tag: 'ux', description: 'UI/UX design critiques, Figma tips, and product design challenges.', active: false },
                { id: 'dc6', name: 'Career & Internships Network', icon: 'briefcase', members: 5230, category: 'Career', tag: 'jobs', description: 'Internship leads, resume reviews, referrals and placement support.', active: true },
                { id: 'dc7', name: 'STEM Women of India', icon: 'users', members: 1760, category: 'Community', tag: 'women', description: 'Empowering women in STEM through mentorship, events and solidarity.', active: true },
                { id: 'dc8', name: 'Study Together Rooms', icon: 'book-open', members: 4400, category: 'Study', tag: 'focus', description: 'Virtual co-working sessions, Pomodoro groups, and accountability pods.', active: true },
            ];

            const colorMap = {
                Technology: { bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.25)', text: '#818cf8', dot: '#6366f1' },
                Finance:    { bg: 'rgba(244,196,48,0.10)', border: 'rgba(244,196,48,0.25)', text: '#f4c430', dot: '#f4c430' },
                Coding:     { bg: 'rgba(16,185,129,0.10)', border: 'rgba(16,185,129,0.25)', text: '#34d399', dot: '#10b981' },
                Research:   { bg: 'rgba(236,72,153,0.10)', border: 'rgba(236,72,153,0.25)', text: '#f472b6', dot: '#ec4899' },
                Design:     { bg: 'rgba(249,115,22,0.10)', border: 'rgba(249,115,22,0.25)', text: '#fb923c', dot: '#f97316' },
                Career:     { bg: 'rgba(59,130,246,0.10)', border: 'rgba(59,130,246,0.25)', text: '#60a5fa', dot: '#3b82f6' },
                Community:  { bg: 'rgba(168,85,247,0.10)', border: 'rgba(168,85,247,0.25)', text: '#c084fc', dot: '#a855f7' },
                Study:      { bg: 'rgba(20,184,166,0.10)', border: 'rgba(20,184,166,0.25)', text: '#2dd4bf', dot: '#14b8a6' },
            };

            const data = (communities && communities.length > 0) ? communities : DEMO_COMMUNITIES;
            list.innerHTML = data.map(c => {
                const col = colorMap[c.category] || colorMap['Technology'];
                return `
                <div class="group flex items-center gap-5 p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02] cursor-pointer relative overflow-hidden"
                     style="background:rgba(255,255,255,0.03);border-color:rgba(255,255,255,0.06);">
                    <div class="absolute top-0 left-0 right-0 h-[3px] bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
 
                    <!-- Icon -->
                    <div class="w-14 h-14 flex-shrink-0 rounded-2xl flex items-center justify-center border shadow-inner group-hover:scale-110 transition-transform duration-500"
                         style="background:${col.bg};border-color:${col.border};">
                        <i data-lucide="${c.icon || 'users'}" class="w-6 h-6" style="color:${col.text};"></i>
                    </div>
 
                    <!-- Info -->
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                            <h4 class="text-base font-bold text-white truncate group-hover:text-ekalavya-gold transition-colors">${c.name}</h4>
                            ${c.active ? `<span class="flex-shrink-0 w-2 h-2 rounded-full animate-pulse" style="background:${col.dot};box-shadow: 0 0 8px ${col.dot};"></span>` : ''}
                        </div>
                        <p class="text-[11px] text-ekalavya-slate leading-relaxed line-clamp-1 mb-3">${c.description || ''}</p>
                        <div class="flex items-center gap-4">
                            <span class="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg"
                                  style="background:${col.bg};color:${col.text};border:1px solid ${col.border};">${c.category}</span>
                            <div class="flex items-center gap-1.5 opacity-60">
                                <i data-lucide="users" class="w-3 h-3 text-ekalavya-slate"></i>
                                <span class="text-[10px] text-ekalavya-slate font-bold uppercase tracking-tighter">${(c.members || 0).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
 
                    <!-- Join Button -->
                    <button class="join-community-btn flex-shrink-0 px-6 py-2.5 rounded-xl text-xs font-black transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-blue-500/20"
                            style="background:rgba(59,130,246,0.1);color:#60a5fa;border:1px solid rgba(59,130,246,0.2);"
                            data-id="${c.id}" data-name="${c.name}">Join</button>
                </div>`;
            }).join('');

            refreshIcons();
        } catch (error) {
            list.innerHTML = `<p class="text-red-400 text-sm">Error loading communities.</p>`;
        }
    },

    async peerSessions(type = 'learn') {
        const grid = document.getElementById('peer-sessions-grid');
        if (!grid) return;

        try {
            // Placeholder for real data fetch
            const sessions = []; // await api.getCollection('peer_sessions');

            const DEMO_PEER_SESSIONS = [
                {
                    id: 'ps1',
                    mentor_name: 'Neha Gupta',
                    institution: 'IIT Bombay',
                    topic: 'DSA Study Jam',
                    description: 'Arrays, stacks, and queues intensive review for upcoming placements.',
                    starts_at: '2026-03-21T18:00:00Z',
                    duration: '60 mins',
                    seats_left: 8,
                    status: 'live',
                    type: 'learn'
                },
                {
                    id: 'ps2',
                    mentor_name: 'Karthik Rao',
                    institution: 'NIT Trichy',
                    topic: 'Intro to Git & GitHub',
                    description: 'Branches, PRs, and collaborative workflows. Bring your laptop!',
                    starts_at: '2026-03-22T14:00:00Z',
                    duration: '75 mins',
                    seats_left: 40,
                    status: 'upcoming',
                    type: 'learn'
                },
                {
                    id: 'ps3',
                    mentor_name: 'Ananya Iyer',
                    institution: 'BITS Pilani',
                    topic: 'Machine Learning Basics',
                    description: 'Linear regression and classification overview with Python.',
                    starts_at: '2026-03-23T16:00:00Z',
                    duration: '90 mins',
                    seats_left: 12,
                    status: 'upcoming',
                    type: 'learn'
                }
            ];

            const data = (sessions && sessions.length > 0) ? sessions : DEMO_PEER_SESSIONS;
            
            // Filter by type if needed (for now showing all in Learn, and empty in Teach for demo)
            const filteredData = type === 'learn' ? data : [];

            if (filteredData.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full py-20 text-center">
                        <div class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                            <i data-lucide="calendar" class="w-8 h-8 text-white/20"></i>
                        </div>
                        <h3 class="text-white font-bold mb-1">No sessions found</h3>
                        <p class="text-white/40 text-sm italic">${type === 'teach' ? 'You haven\'t created any sessions yet.' : 'Check back later for new study jams!'}</p>
                    </div>
                `;
                refreshIcons();
                return;
            }

            grid.innerHTML = filteredData.map(s => {
                const initials = s.mentor_name.split(' ').map(n => n[0]).join('');
                const isLive = s.status === 'live';
                
                return `
                <div class="group flex flex-col md:flex-row bg-ekalavya-black-dark/60 rounded-[28px] overflow-hidden border border-white/5 transition-all hover:border-ekalavya-gold/30 hover:scale-[1.01] relative">
                    <div class="absolute top-0 left-0 right-0 h-[3px] bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <!-- Content Panel -->
                    <div class="flex-1 flex flex-col md:flex-row p-7 items-center gap-6">
                        
                        <!-- Profile/Identity (Left) -->
                        <div class="flex flex-col items-center md:items-start text-center md:text-left min-w-[140px]">
                            <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-3 border border-white/10 group-hover:bg-ekalavya-gold/10 transition-colors">
                                <span class="text-ekalavya-gold font-bold text-xl tracking-tight">${initials}</span>
                            </div>
                            <h4 class="font-bold text-white text-base leading-tight">${s.mentor_name}</h4>
                            <p class="text-[11px] text-ekalavya-slate font-medium">${s.institution}</p>
                            
                            <!-- Small Icons -->
                            <div class="flex items-center gap-3 mt-4">
                                <div class="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                    <i data-lucide="heart" class="w-4 h-4 text-ekalavya-gold fill-ekalavya-gold"></i>
                                </div>
                                <div class="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                    <i data-lucide="message-square" class="w-4 h-4 text-ekalavya-gold"></i>
                                </div>
                                <div class="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                    <i data-lucide="book-open" class="w-4 h-4 text-green-400"></i>
                                </div>
                            </div>
                        </div>
 
                        <!-- Divider (Desktop) -->
                        <div class="hidden md:block w-[1px] h-32 bg-white/5"></div>
 
                        <!-- Session Info (Middle) -->
                        <div class="flex-1 min-w-0 flex flex-col">
                            <div class="flex items-center justify-between mb-3">
                                <span class="text-[10px] font-bold text-ekalavya-slate uppercase tracking-widest">Peer Connect</span>
                                <span class="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider ${isLive ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}">
                                    ${isLive ? '● LIVE' : 'UPCOMING'}
                                </span>
                            </div>
                            <h3 class="text-xl font-extrabold text-white mb-2 truncate group-hover:text-ekalavya-gold transition-colors">${s.topic}</h3>
                            <p class="text-sm text-ekalavya-slate leading-relaxed line-clamp-2 mb-5">${s.description}</p>
                            
                            <!-- Details Grid -->
                            <div class="grid grid-cols-3 gap-3 mt-auto">
                                <div class="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                                    <p class="text-[9px] text-ekalavya-slate uppercase font-bold mb-1">Starts</p>
                                    <p class="text-[11px] font-bold text-white/80">${new Date(s.starts_at).toLocaleDateString()}</p>
                                </div>
                                <div class="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                                    <p class="text-[9px] text-ekalavya-slate uppercase font-bold mb-1">Duration</p>
                                    <p class="text-[11px] font-bold text-white/80">${s.duration}</p>
                                </div>
                                <div class="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                                    <p class="text-[9px] text-ekalavya-slate uppercase font-bold mb-1">Seats left</p>
                                    <p class="text-[11px] font-bold text-white/80">${s.seats_left}</p>
                                </div>
                            </div>
                        </div>
 
                        <!-- Action (Right) -->
                        <div class="flex items-end">
                            <button class="join-peer-btn px-8 py-3 bg-gold-gradient text-black rounded-xl font-bold text-sm shadow-lg shadow-ekalavya-gold/20 hover:scale-[1.05] active:scale-95 transition-all"
                                    data-id="${s.id}" data-topic="${s.topic}">
                                ${isLive ? 'Join Live' : 'Enroll'}
                            </button>
                        </div>
                    </div>
                </div>`;
            }).join('');

            refreshIcons();
        } catch (error) {
            grid.innerHTML = `<p class="text-red-400">Error loading sessions.</p>`;
        }
    },

    async libraryItems(query = '', category = 'all') {
        const grid = document.getElementById('library-grid');
        if (!grid) return;

        try {
            const DEMO_LIBRARY = [
                {
                    id: 'lib1',
                    title: 'Calculus I',
                    category: 'Maths • B.Tech',
                    description: 'Limits, derivatives, integrals quick notes for semester exams.',
                    writer: 'Dr. Sharma',
                    type: 'Notes',
                    class: 'B.Tech'
                },
                {
                    id: 'lib2',
                    title: 'C Programming',
                    category: 'CS • B.Tech',
                    description: 'Pointers, arrays, strings cheat sheet and common interview questions.',
                    writer: 'Prof. Verma',
                    type: 'Notes',
                    class: 'B.Tech'
                },
                {
                    id: 'lib3',
                    title: 'Quantum Mechanics',
                    category: 'Physics • B.Sc',
                    description: 'Wave-particle duality and Schrödinger equation fundamentals.',
                    writer: 'S. K. Iyer',
                    type: 'Notes',
                    class: 'B.Sc'
                },
                {
                    id: 'lib4',
                    title: 'Data Structures',
                    category: 'CS • B.Tech',
                    description: 'Trees, Graphs, and Hashing techniques with complexity analysis.',
                    writer: 'Tech Lead Rahul',
                    type: 'Notes',
                    class: 'B.Tech'
                },
                {
                    id: 'lib5',
                    title: 'Civics & Ethics',
                    category: 'Arts • Class 10',
                    description: 'Constitution, democracy, and fundamental rights summary.',
                    writer: 'Anjali Ma\'am',
                    type: 'Notes',
                    class: 'Class 10'
                }
            ];

            let filtered = DEMO_LIBRARY;
            if (query) {
                const q = query.toLowerCase();
                filtered = filtered.filter(item => 
                    item.title.toLowerCase().includes(q) || 
                    item.writer.toLowerCase().includes(q)
                );
            }
            if (category !== 'all') {
                filtered = filtered.filter(item => {
                    const itemClass = item.class || '';
                    if (category === 'Class 6-12') {
                        return itemClass.toLowerCase().includes('class') || /^[6-9]$|^1[0-2]$/.test(itemClass.match(/\d+/)?.[0]);
                    }
                    if (category === 'Undergraduate') {
                        return itemClass.includes('B.Tech') || itemClass.includes('B.Sc') || itemClass.includes('B.A') || itemClass.includes('Undergraduate');
                    }
                    if (category === 'Postgraduate') {
                        return itemClass.includes('M.Tech') || itemClass.includes('M.Sc') || itemClass.includes('MBA') || itemClass.includes('Postgraduate');
                    }
                    return itemClass === category;
                });
            }

            if (filtered.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full py-16 text-center text-white/20">
                        <i data-lucide="book-x" class="w-12 h-12 mx-auto mb-4 opacity-20"></i>
                        <p>No resources found matching your search.</p>
                    </div>
                `;
                refreshIcons();
                return;
            }

            grid.innerHTML = filtered.map(item => `
                <div class="bg-ekalavya-black-dark/60 rounded-[28px] p-7 border border-white/5 flex flex-col justify-between hover:border-ekalavya-gold/30 hover:scale-[1.01] transition-all group relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-ekalavya-gold/5 rounded-full -mr-16 -mt-16 group-hover:bg-ekalavya-gold/10 transition-colors"></div>
                    <div class="absolute top-0 left-0 right-0 h-[3px] bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div>
                        <div class="flex justify-between items-start mb-4">
                            <h3 class="text-white font-bold text-xl leading-tight group-hover:text-ekalavya-gold transition-colors">${item.title}</h3>
                            <span class="px-3 py-1.5 bg-white/5 text-ekalavya-gold text-[10px] font-black uppercase tracking-wider rounded-full border border-ekalavya-gold/20">${item.type}</span>
                        </div>
                        <p class="text-ekalavya-gold text-[11px] font-bold mb-4 uppercase tracking-[0.2em] flex items-center gap-1.5 opacity-80">
                            ${item.category}
                        </p>
                        <p class="text-ekalavya-slate text-sm leading-relaxed mb-6 line-clamp-3">${item.description}</p>
                        <p class="text-[10px] text-white/30 italic font-medium">Contributed by ${item.writer}</p>
                    </div>
 
                    <div class="flex items-center justify-end gap-3 mt-8">
                        <button class="px-6 py-2.5 bg-white/5 border border-white/10 text-white/70 font-bold text-xs rounded-xl hover:bg-white/10 hover:text-white transition-all">
                            View
                        </button>
                        <button class="px-6 py-2.5 bg-gold-gradient text-black font-bold text-xs rounded-xl shadow-lg shadow-ekalavya-gold/20 hover:scale-[1.05] active:scale-95 transition-all flex items-center gap-2">
                            <i data-lucide="download" class="w-3.5 h-3.5"></i> Download
                        </button>
                    </div>
                </div>
            `).join('');

            refreshIcons();
        } catch (error) {
            console.error('Library Error:', error);
        }
    },

    renderResourceCard(r) {
        return `
            <div class="bg-ekalavya-black-dark/40 border border-white/5 p-6 rounded-[24px] hover:border-ekalavya-gold/30 transition-all group cursor-pointer relative overflow-hidden">
                <div class="absolute top-0 left-0 right-0 h-[3px] bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="w-12 h-12 bg-ekalavya-gold/10 rounded-xl flex items-center justify-center border border-ekalavya-gold/20 mb-4">
                    <i data-lucide="file-text" class="w-6 h-6 text-ekalavya-gold"></i>
                </div>
                <h3 class="font-bold text-white group-hover:text-ekalavya-gold mb-2">${r.topic}</h3>
                <div class="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <span class="text-[10px] uppercase font-bold tracking-widest text-ekalavya-slate">${r.category || 'General'}</span>
                    <div class="flex gap-2">
                         <span class="text-[10px] text-white/20 italic">by ${r.writer_name || 'Expert'}</span>
                         <button class="p-2 bg-white/5 hover:bg-ekalavya-gold/10 rounded-lg text-white/50 hover:text-ekalavya-gold">
                            <i data-lucide="download" class="w-4 h-4"></i>
                         </button>
                    </div>
                </div>
            </div>
        `;
    },

    async library() {
        const list = document.getElementById('recent-resources');
        if (!list) return;

        try {
            const resources = await api.getCollection('library_assets');
            if (!resources || resources.length === 0) {
                 list.innerHTML = `<p class="text-white/20 text-sm italic">Library is being updated...</p>`;
                 return;
            }
            list.innerHTML = resources.map(r => this.renderResourceCard(r)).join('');
            refreshIcons();
        } catch (error) {
            console.error('Error rendering library:', error);
        }
    },

    // Activity Dropdown Renderer (Converted from React)
    renderActivityDropdown() {
        const activities = [
            {
                id: 1,
                icon: 'message-square',
                title: 'New Message!',
                description: 'Sarah sent you a message.',
                time: 'Just Now'
            },
            {
                id: 2,
                icon: 'award',
                title: 'Level Up!',
                description: 'You\'ve unlocked a new achievement.',
                time: '2 min ago'
            },
            {
                id: 3,
                icon: 'calendar',
                title: 'Reminder: Meeting Today',
                description: 'Your team meeting starts in 30 minutes.',
                time: '3 hour ago'
            },
            {
                id: 4,
                icon: 'tag',
                title: 'Special Offer!',
                description: 'Save 20% off on subscription upgrade.',
                time: '12 hours ago'
            },
            {
                id: 5,
                icon: 'check-square',
                title: 'Task Assigned!',
                description: 'A new task is awaiting your action.',
                time: 'Yesterday'
            }
        ];

        return `
            <div id="activity-dropdown-container" class="w-full max-w-md cursor-pointer overflow-hidden rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/50 bg-white dark:bg-neutral-900 transition-all duration-500 ease-in-out">
                <!-- Header -->
                <div class="flex items-center gap-4 p-4" id="activity-dropdown-header">
                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 transition-colors duration-300 dark:bg-neutral-800">
                        <i data-lucide="bell" class="h-5 w-5 text-neutral-600 dark:text-neutral-300"></i>
                    </div>
                    <div class="flex-1 overflow-hidden text-left">
                        <h3 class="text-base font-semibold text-neutral-900 dark:text-white">5 New Activities</h3>
                        <p id="activity-dropdown-subtitle" class="text-xs text-neutral-500 dark:text-neutral-400 transition-all duration-500 ease-in-out truncate">What's happening around you</p>
                    </div>
                    <div class="flex h-8 w-8 items-center justify-center">
                        <i data-lucide="chevron-up" id="activity-dropdown-chevron" class="h-5 w-5 text-neutral-400 transition-transform duration-500 rotate-180"></i>
                    </div>
                </div>

                <!-- Activity List -->
                <div id="activity-dropdown-list" class="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-in-out">
                    <div class="overflow-hidden">
                        <div class="px-2 pb-4 space-y-1">
                            ${activities.map((activity, index) => `
                                <div class="flex items-start gap-3 rounded-xl p-3 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all duration-500">
                                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-700 transition-colors duration-300">
                                        <i data-lucide="${activity.icon}" class="h-4 w-4 text-neutral-600 dark:text-neutral-300"></i>
                                    </div>
                                    <div class="min-w-0 flex-1 text-left">
                                        <h4 class="text-sm font-semibold text-neutral-900 dark:text-white">${activity.title}</h4>
                                        <p class="truncate text-sm text-neutral-500 dark:text-neutral-400">
                                            ${activity.description}
                                        </p>
                                    </div>
                                    <span class="shrink-0 pt-0.5 text-xs text-neutral-400 dark:text-neutral-500">${activity.time}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};
