import { authManager } from '../services/auth.js';
import { api } from '../services/api.js';
import { notificationManager } from '../services/notifications.js';
import { refreshIcons } from '../modules/renderers.js';

// ─── Active tab state ───────────────────────────────────────────────
let activeTab = 'scholarships';

// ─── Render helpers ─────────────────────────────────────────────────
const statusColor = {
    verified:     'text-green-400 bg-green-400/10 border-green-400/30',
    in_progress:  'text-orange-400 bg-orange-400/10 border-orange-400/30',
    unverified:   'text-red-400 bg-red-400/10 border-red-400/30',
    pending:      'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    approved:     'text-green-400 bg-green-400/10 border-green-400/30',
    rejected:     'text-red-400 bg-red-400/10 border-red-400/30',
};

const badge = (label, status) => `
    <span class="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border
        ${statusColor[status] || 'text-white/40 bg-white/5 border-white/10'}">
        ${label}
    </span>`;

const adminCard = (content) => `
    <div class="bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-5 hover:border-orange-500/20 transition-all">
        ${content}
    </div>`;

// ─── Tab content renderers ───────────────────────────────────────────

async function renderScholarships() {
    const data = await api.getCollection('scholarships').catch(() => []);
    if (!data.length) return `<p class="text-white/20 italic text-sm">No scholarships yet.</p>`;

    return data.map(s => adminCard(`
        <div class="flex items-start justify-between gap-4 mb-3">
            <div>
                <h4 class="font-bold text-white/90 text-sm">${s.name}</h4>
                <p class="text-[11px] text-white/30 mt-0.5">${s.provider || '—'}</p>
            </div>
            ${badge(s.status || 'unverified', s.status)}
        </div>
        <p class="text-xs text-white/40 mb-4 line-clamp-2">${s.description || '—'}</p>
        <div class="flex items-center gap-2 flex-wrap">
            <button data-action="verify-scholarship" data-id="${s.id}" data-status="verified"
                class="admin-action-btn px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg
                bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-all">
                ✓ Verify
            </button>
            <button data-action="verify-scholarship" data-id="${s.id}" data-status="in_progress"
                class="admin-action-btn px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg
                bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 transition-all">
                ⏳ In Progress
            </button>
            <button data-action="verify-scholarship" data-id="${s.id}" data-status="unverified"
                class="admin-action-btn px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg
                bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all">
                ✕ Unverify
            </button>
            <button data-action="delete-scholarship" data-id="${s.id}"
                class="admin-action-btn ml-auto px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg
                bg-white/5 text-white/30 border border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all">
                Delete
            </button>
        </div>
    `)).join('');
}

async function renderAddScholarshipForm() {
    return `
        <div class="bg-[#0d0d0d] border border-orange-500/20 rounded-2xl p-6">
            <h4 class="font-bold text-orange-400 text-sm uppercase tracking-widest mb-5">+ Add New Scholarship</h4>
            <div class="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="admin-label">Scholarship Name *</label>
                    <input id="s-name" type="text" placeholder="e.g. Science & Tech Grant" class="admin-input">
                </div>
                <div>
                    <label class="admin-label">Provider / Organisation *</label>
                    <input id="s-provider" type="text" placeholder="e.g. ISRO" class="admin-input">
                </div>
                <div>
                    <label class="admin-label">Start Date</label>
                    <input id="s-start" type="date" class="admin-input">
                </div>
                <div>
                    <label class="admin-label">End Date</label>
                    <input id="s-end" type="date" class="admin-input">
                </div>
                <div>
                    <label class="admin-label">Apply Link</label>
                    <input id="s-link" type="url" placeholder="https://..." class="admin-input">
                </div>
                <div>
                    <label class="admin-label">Status</label>
                    <select id="s-status" class="admin-input">
                        <option value="unverified">Unverified</option>
                        <option value="in_progress">In Progress</option>
                        <option value="verified">Verified</option>
                    </select>
                </div>
            </div>
            <div class="mb-4">
                <label class="admin-label">Description *</label>
                <textarea id="s-desc" rows="3" placeholder="Brief description of the scholarship..." class="admin-input resize-none"></textarea>
            </div>
            <button id="submit-scholarship-btn" class="admin-submit-btn">
                <i data-lucide="plus-circle" class="w-4 h-4"></i> Add Scholarship
            </button>
        </div>
    `;
}

async function renderNotes() {
    const data = await api.getCollection('library_assets').catch(() => []);
    return `
        <div class="bg-[#0d0d0d] border border-orange-500/20 rounded-2xl p-6 mb-6">
            <h4 class="font-bold text-orange-400 text-sm uppercase tracking-widest mb-5">+ Upload Notes</h4>
            <div class="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="admin-label">Topic Name *</label>
                    <input id="n-topic" type="text" placeholder="e.g. Calculus I" class="admin-input">
                </div>
                <div>
                    <label class="admin-label">Subject</label>
                    <input id="n-subject" type="text" placeholder="e.g. Maths" class="admin-input">
                </div>
                <div>
                    <label class="admin-label">Class / Level *</label>
                    <input id="n-class" type="text" placeholder="e.g. Class 10 / B.Tech" class="admin-input">
                </div>
                <div>
                    <label class="admin-label">Writer Name</label>
                    <input id="n-writer" type="text" placeholder="e.g. Dr. Sharma" class="admin-input">
                </div>
            </div>
            <div class="mb-4">
                <label class="admin-label">Description</label>
                <input id="n-desc" type="text" placeholder="Brief description of the notes..." class="admin-input">
            </div>
            <div class="mb-5">
                <label class="admin-label">PDF File *</label>
                <input id="n-file" type="file" accept=".pdf"
                    class="block w-full text-xs text-white/50 file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0 file:text-xs file:font-bold file:uppercase
                    file:bg-orange-500/10 file:text-orange-400 hover:file:bg-orange-500/20
                    file:cursor-pointer cursor-pointer">
            </div>
            <button id="submit-notes-btn" class="admin-submit-btn">
                <i data-lucide="upload-cloud" class="w-4 h-4"></i> Upload Notes
            </button>
        </div>

        <div>
            <h4 class="font-bold text-white/50 text-xs uppercase tracking-widest mb-4">Existing Notes (${data.length})</h4>
            ${!data.length ? `<p class="text-white/20 italic text-sm">No notes uploaded yet.</p>` :
                data.map(n => adminCard(`
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                                <i data-lucide="file-text" class="w-4 h-4 text-orange-400"></i>
                            </div>
                            <div>
                                <p class="font-bold text-white/90 text-sm">${n.topic}</p>
                                <p class="text-[10px] text-white/30">${n.category || n.class_level || '—'} · by ${n.writer_name || 'Admin'}</p>
                            </div>
                        </div>
                        <button data-action="delete-note" data-id="${n.id}"
                            class="admin-action-btn text-[10px] px-3 py-1.5 rounded-lg bg-white/5 text-white/30
                            border border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all">
                            Delete
                        </button>
                    </div>
                `)).join('')
            }
        </div>
    `;
}

async function renderTeachRequests() {
    // Fetch users who have requested teach access (role = 'pending_teach')
    const { data, error } = await authManager.supabase
        .from('users')
        .select('id, full_name, email, streak, score, created_at')
        .eq('role', 'pending_teach')
        .order('created_at', { ascending: false });

    const requests = data || [];

    if (!requests.length) return `
        <div class="text-center py-16 border border-dashed border-white/10 rounded-2xl">
            <i data-lucide="check-circle" class="w-10 h-10 text-green-400/30 mx-auto mb-3"></i>
            <p class="text-white/20 italic text-sm">No pending teach requests.</p>
        </div>`;

    return requests.map(u => adminCard(`
        <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${u.id}"
                    class="w-10 h-10 rounded-full border border-white/10" alt="${u.full_name}">
                <div>
                    <p class="font-bold text-white/90 text-sm">${u.full_name}</p>
                    <p class="text-[10px] text-white/30">${u.email}</p>
                    <div class="flex gap-3 mt-1">
                        <span class="text-[10px] text-orange-400">⚡ ${u.score || 0} pts</span>
                        <span class="text-[10px] text-orange-400">🔥 ${u.streak || 0} streak</span>
                    </div>
                </div>
            </div>
            <div class="flex gap-2">
                <button data-action="approve-teach" data-id="${u.id}"
                    class="admin-action-btn px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg
                    bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-all">
                    ✓ Approve
                </button>
                <button data-action="reject-teach" data-id="${u.id}"
                    class="admin-action-btn px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg
                    bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all">
                    ✕ Reject
                </button>
            </div>
        </div>
    `)).join('');
}

async function renderUsers() {
    const { data, error } = await authManager.supabase
        .from('users')
        .select('id, full_name, email, role, streak, score, created_at')
        .order('created_at', { ascending: false })
        .limit(50);

    const users = data || [];

    return `
        <div class="mb-4 flex items-center gap-3">
            <input id="user-search" type="text" placeholder="Search by name or email..."
                class="admin-input flex-1 max-w-xs">
            <span class="text-xs text-white/30 font-bold">${users.length} users shown (max 50)</span>
        </div>
        <div id="users-table" class="flex flex-col gap-2">
            ${renderUserRows(users)}
        </div>
    `;
}

function renderUserRows(users) {
    if (!users.length) return `<p class="text-white/20 italic text-sm">No users found.</p>`;
    return users.map(u => adminCard(`
        <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${u.id}"
                    class="w-9 h-9 rounded-full border border-white/10" alt="${u.full_name}">
                <div>
                    <p class="font-bold text-white/90 text-sm">${u.full_name || '—'}</p>
                    <p class="text-[10px] text-white/30">${u.email}</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div class="text-right hidden sm:block">
                    <p class="text-xs font-bold text-orange-400">⚡ ${u.score || 0}</p>
                    <p class="text-[10px] text-white/30">🔥 ${u.streak || 0} streak</p>
                </div>
                ${badge(u.role || 'student', u.role === 'admin' ? 'verified' : u.role === 'verified_teach' ? 'approved' : 'pending')}
                <select data-action="change-role" data-id="${u.id}"
                    class="admin-role-select text-[10px] bg-white/5 border border-white/10 rounded-lg px-2 py-1.5
                    text-white/60 cursor-pointer hover:border-orange-500/30 transition-all">
                    <option value="student"    ${u.role === 'student'        ? 'selected' : ''}>Student</option>
                    <option value="verified_teach" ${u.role === 'verified_teach' ? 'selected' : ''}>Verified Teach</option>
                    <option value="mentor"     ${u.role === 'mentor'         ? 'selected' : ''}>Mentor</option>
                    <option value="admin"      ${u.role === 'admin'          ? 'selected' : ''}>Admin</option>
                </select>
            </div>
        </div>
    `)).join('');
}

async function renderMentorSessions() {
    const data = await api.getCollection('mentoring_sessions').catch(() => []);
    return `
        <div class="bg-[#0d0d0d] border border-orange-500/20 rounded-2xl p-6 mb-6">
            <h4 class="font-bold text-orange-400 text-sm uppercase tracking-widest mb-5">+ Add Mentoring Session</h4>
            <div class="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="admin-label">Mentor Name *</label>
                    <input id="m-name" type="text" placeholder="e.g. Rohit Verma" class="admin-input">
                </div>
                <div>
                    <label class="admin-label">Topic *</label>
                    <input id="m-topic" type="text" placeholder="e.g. React Hooks Deep Dive" class="admin-input">
                </div>
                <div>
                    <label class="admin-label">Session Date & Time *</label>
                    <input id="m-date" type="datetime-local" class="admin-input">
                </div>
                <div>
                    <label class="admin-label">Duration (minutes)</label>
                    <input id="m-duration" type="number" placeholder="60" class="admin-input">
                </div>
                <div>
                    <label class="admin-label">Total Seats</label>
                    <input id="m-seats" type="number" placeholder="30" class="admin-input">
                </div>
                <div>
                    <label class="admin-label">Zoom / Meet Link</label>
                    <input id="m-link" type="url" placeholder="https://meet.google.com/..." class="admin-input">
                </div>
            </div>
            <button id="submit-session-btn" class="admin-submit-btn">
                <i data-lucide="plus-circle" class="w-4 h-4"></i> Add Session
            </button>
        </div>

        <div>
            <h4 class="font-bold text-white/50 text-xs uppercase tracking-widest mb-4">
                All Sessions (${data.length})
            </h4>
            ${!data.length ? `<p class="text-white/20 italic text-sm">No sessions yet.</p>` :
                data.map(m => adminCard(`
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <p class="font-bold text-white/90 text-sm">${m.mentor_name}</p>
                            <p class="text-xs text-orange-400 font-semibold mt-0.5">${m.topic}</p>
                            <p class="text-[10px] text-white/30 mt-1">
                                ${m.date ? new Date(m.date).toLocaleString() : 'Date TBD'} ·
                                ${m.total_capacity || 0} seats ·
                                ${m.enrolled_count || 0} enrolled
                            </p>
                        </div>
                        <button data-action="delete-session" data-id="${m.id}"
                            class="admin-action-btn shrink-0 text-[10px] px-3 py-1.5 rounded-lg bg-white/5 text-white/30
                            border border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all">
                            Delete
                        </button>
                    </div>
                `)).join('')
            }
        </div>
    `;
}

// ─── Tab config ──────────────────────────────────────────────────────
const tabs = [
    { id: 'scholarships', label: 'Scholarships', icon: 'graduation-cap' },
    { id: 'notes',        label: 'Library Notes', icon: 'book-open' },
    { id: 'teach',        label: 'Teach Requests', icon: 'user-check' },
    { id: 'users',        label: 'Users', icon: 'users' },
    { id: 'sessions',     label: 'Mentor Sessions', icon: 'video' },
];

// ─── Main AdminView export ───────────────────────────────────────────
export const AdminView = {
    render: async () => {
        // ── Auth Guard ──────────────────────────────────────────────
        const session = await authManager.getSession();
        if (!session) {
            return `
                <div class="flex flex-col items-center justify-center min-h-screen bg-[#080808]">
                    <i data-lucide="shield-off" class="w-14 h-14 text-red-500/30 mb-4"></i>
                    <h2 class="text-xl font-bold text-white/60 mb-2">Access Denied</h2>
                    <p class="text-white/30 text-sm mb-6">You must be logged in to access this area.</p>
                    <a href="index.html" class="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white/60 hover:bg-white/10 transition-all">
                        ← Back to Site
                    </a>
                </div>`;
        }

        const { data: profile } = await authManager.supabase
            .from('users').select('role, full_name').eq('id', session.user.id).single();

        if (!profile || profile.role !== 'admin') {
            return `
                <div class="flex flex-col items-center justify-center min-h-screen bg-[#080808]">
                    <div class="text-6xl mb-4">🔒</div>
                    <h2 class="text-xl font-bold text-white/60 mb-2">Not Authorized</h2>
                    <p class="text-white/30 text-sm mb-6">Your account does not have admin privileges.</p>
                    <a href="index.html" class="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white/60 hover:bg-white/10 transition-all">
                        ← Back to Site
                    </a>
                </div>`;
        }

        // ── Admin Shell ─────────────────────────────────────────────
        return `
            <div class="min-h-screen bg-[#080808]" id="admin-shell">

                <!-- Top Bar -->
                <div class="sticky top-0 z-50 bg-[#080808]/95 backdrop-blur-xl border-b border-white/[0.06]">
                    <div class="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center">
                                <i data-lucide="shield" class="w-3.5 h-3.5 text-black"></i>
                            </div>
                            <span class="font-black text-sm tracking-tight text-white">EKALAVYA <span class="text-orange-500">ADMIN</span></span>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="text-[10px] text-white/30 uppercase tracking-widest hidden sm:block">
                                Logged in as <span class="text-orange-400 font-bold">${profile.full_name || session.user.email}</span>
                            </span>
                            <a href="index.html" class="text-[10px] font-bold uppercase tracking-wider text-white/30 hover:text-white transition-colors">
                                ← Exit Admin
                            </a>
                        </div>
                    </div>
                </div>

                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">

                    <!-- Stats Row -->
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8" id="admin-stats">
                        <div class="bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-4 text-center">
                            <p class="text-2xl font-black text-orange-400" id="stat-users">—</p>
                            <p class="text-[10px] text-white/30 uppercase tracking-widest mt-1">Total Users</p>
                        </div>
                        <div class="bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-4 text-center">
                            <p class="text-2xl font-black text-orange-400" id="stat-scholarships">—</p>
                            <p class="text-[10px] text-white/30 uppercase tracking-widest mt-1">Scholarships</p>
                        </div>
                        <div class="bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-4 text-center">
                            <p class="text-2xl font-black text-orange-400" id="stat-sessions">—</p>
                            <p class="text-[10px] text-white/30 uppercase tracking-widest mt-1">Sessions</p>
                        </div>
                        <div class="bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-4 text-center">
                            <p class="text-2xl font-black text-orange-400" id="stat-teach">—</p>
                            <p class="text-[10px] text-white/30 uppercase tracking-widest mt-1">Teach Pending</p>
                        </div>
                    </div>

                    <!-- Tab Nav -->
                    <div class="flex gap-1 bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-1.5 mb-6 overflow-x-auto">
                        ${tabs.map(t => `
                            <button data-tab="${t.id}"
                                class="admin-tab-btn flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase
                                tracking-wider whitespace-nowrap transition-all
                                ${activeTab === t.id
                                    ? 'bg-orange-500 text-black'
                                    : 'text-white/40 hover:text-white hover:bg-white/5'}">
                                <i data-lucide="${t.icon}" class="w-3.5 h-3.5"></i>
                                ${t.label}
                            </button>
                        `).join('')}
                    </div>

                    <!-- Tab Content -->
                    <div id="admin-tab-content" class="flex flex-col gap-4">
                        <div class="flex items-center justify-center py-16">
                            <div class="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
                        </div>
                    </div>

                </div>
            </div>
        `;
    },

    init: async () => {
        refreshIcons();
        await loadStats();
        await loadTab(activeTab);
        bindTabNav();
        bindActions();
    }
};

// ─── Load stats ──────────────────────────────────────────────────────
async function loadStats() {
    try {
        const [users, scholarships, sessions, teachReqs] = await Promise.all([
            authManager.supabase.from('users').select('id', { count: 'exact', head: true }),
            authManager.supabase.from('scholarships').select('id', { count: 'exact', head: true }),
            authManager.supabase.from('mentoring_sessions').select('id', { count: 'exact', head: true }),
            authManager.supabase.from('users').select('id', { count: 'exact', head: true }).eq('role', 'pending_teach'),
        ]);
        document.getElementById('stat-users')?.textContent && (document.getElementById('stat-users').textContent = users.count ?? '—');
        document.getElementById('stat-scholarships')?.textContent && (document.getElementById('stat-scholarships').textContent = scholarships.count ?? '—');
        document.getElementById('stat-sessions')?.textContent && (document.getElementById('stat-sessions').textContent = sessions.count ?? '—');
        document.getElementById('stat-teach')?.textContent && (document.getElementById('stat-teach').textContent = teachReqs.count ?? '—');

        // Simpler safe assignment
        const s = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val ?? '—'; };
        s('stat-users',        users.count);
        s('stat-scholarships', scholarships.count);
        s('stat-sessions',     sessions.count);
        s('stat-teach',        teachReqs.count);
    } catch (e) {
        console.error('Stats load error', e);
    }
}

// ─── Load tab content ────────────────────────────────────────────────
async function loadTab(tabId) {
    activeTab = tabId;
    const container = document.getElementById('admin-tab-content');
    if (!container) return;

    container.innerHTML = `
        <div class="flex items-center justify-center py-16">
            <div class="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
        </div>`;

    let html = '';
    try {
        if (tabId === 'scholarships') {
            const form = await renderAddScholarshipForm();
            const list = await renderScholarships();
            html = form + `<div class="mt-6"><h4 class="font-bold text-white/50 text-xs uppercase tracking-widest mb-4">All Scholarships</h4>${list}</div>`;
        } else if (tabId === 'notes')    html = await renderNotes();
        else if (tabId === 'teach')      html = await renderTeachRequests();
        else if (tabId === 'users')      html = await renderUsers();
        else if (tabId === 'sessions')   html = await renderMentorSessions();
    } catch (e) {
        html = `<p class="text-red-400/60 text-sm">Failed to load content: ${e.message}</p>`;
    }

    container.innerHTML = html;
    refreshIcons();
    bindActions();
    bindUserSearch();
}

// ─── Tab nav binding ─────────────────────────────────────────────────
function bindTabNav() {
    document.getElementById('admin-shell')?.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-tab]');
        if (!btn) return;
        const tabId = btn.dataset.tab;

        // Update active styles
        document.querySelectorAll('.admin-tab-btn').forEach(b => {
            b.classList.remove('bg-orange-500', 'text-black');
            b.classList.add('text-white/40');
        });
        btn.classList.add('bg-orange-500', 'text-black');
        btn.classList.remove('text-white/40');

        loadTab(tabId);
    });
}

// ─── Action delegation ───────────────────────────────────────────────
function bindActions() {
    const container = document.getElementById('admin-tab-content');
    if (!container) return;

    // Remove old listener to avoid duplicates
    container.replaceWith(container.cloneNode(true));
    const fresh = document.getElementById('admin-tab-content');
    if (!fresh) return;

    fresh.addEventListener('click', async (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;

        const action = btn.dataset.action;
        const id     = btn.dataset.id;
        const status = btn.dataset.status;

        btn.disabled = true;
        const original = btn.innerHTML;
        btn.innerHTML = '...';

        try {
            if (action === 'verify-scholarship') {
                await api.updateDocument('scholarships', id, { status });
                notificationManager.showInternalAlert('Updated', `Scholarship marked as ${status}`);
                await loadTab('scholarships');

            } else if (action === 'delete-scholarship') {
                if (!confirm('Delete this scholarship permanently?')) { btn.innerHTML = original; btn.disabled = false; return; }
                await api.deleteDocument('scholarships', id);
                notificationManager.showInternalAlert('Deleted', 'Scholarship removed');
                await loadTab('scholarships');

            } else if (action === 'delete-note') {
                if (!confirm('Delete this note permanently?')) { btn.innerHTML = original; btn.disabled = false; return; }
                await api.deleteDocument('library_assets', id);
                notificationManager.showInternalAlert('Deleted', 'Note removed');
                await loadTab('notes');

            } else if (action === 'approve-teach') {
                await authManager.supabase.from('users').update({ role: 'verified_teach' }).eq('id', id);
                notificationManager.showInternalAlert('Approved', 'Student can now teach on Peer Connect');
                await loadTab('teach');
                await loadStats();

            } else if (action === 'reject-teach') {
                await authManager.supabase.from('users').update({ role: 'student' }).eq('id', id);
                notificationManager.showInternalAlert('Rejected', 'Student role set back to student');
                await loadTab('teach');
                await loadStats();

            } else if (action === 'delete-session') {
                if (!confirm('Delete this mentoring session?')) { btn.innerHTML = original; btn.disabled = false; return; }
                await api.deleteDocument('mentoring_sessions', id);
                notificationManager.showInternalAlert('Deleted', 'Session removed');
                await loadTab('sessions');
                await loadStats();
            }
        } catch (err) {
            console.error(err);
            notificationManager.showInternalAlert('Error', err.message || 'Action failed');
            btn.innerHTML = original;
            btn.disabled = false;
        }
    });

    // Role change dropdown
    fresh.addEventListener('change', async (e) => {
        const sel = e.target.closest('[data-action="change-role"]');
        if (!sel) return;
        const userId = sel.dataset.id;
        const newRole = sel.value;
        try {
            await authManager.supabase.from('users').update({ role: newRole }).eq('id', userId);
            notificationManager.showInternalAlert('Role Updated', `User role set to ${newRole}`);
        } catch (err) {
            notificationManager.showInternalAlert('Error', 'Failed to update role');
        }
    });

    // Form submissions
    document.getElementById('submit-scholarship-btn')?.addEventListener('click', submitScholarship);
    document.getElementById('submit-notes-btn')?.addEventListener('click', submitNotes);
    document.getElementById('submit-session-btn')?.addEventListener('click', submitSession);
}

// ─── Form submit handlers ────────────────────────────────────────────
async function submitScholarship() {
    const name     = document.getElementById('s-name')?.value?.trim();
    const provider = document.getElementById('s-provider')?.value?.trim();
    const desc     = document.getElementById('s-desc')?.value?.trim();
    const start    = document.getElementById('s-start')?.value;
    const end      = document.getElementById('s-end')?.value;
    const link     = document.getElementById('s-link')?.value?.trim();
    const status   = document.getElementById('s-status')?.value;

    if (!name || !provider || !desc) {
        notificationManager.showInternalAlert('Validation', 'Name, Provider and Description are required.');
        return;
    }

    const btn = document.getElementById('submit-scholarship-btn');
    btn.disabled = true;
    btn.textContent = 'Saving...';

    try {
        await api.createDocument('scholarships', { name, provider, description: desc, start_date: start || null, end_date: end || null, apply_link: link || null, status });
        notificationManager.showInternalAlert('Added!', `"${name}" added to Scholarship Hub`);
        await loadTab('scholarships');
        await loadStats();
    } catch (err) {
        notificationManager.showInternalAlert('Error', err.message);
        btn.disabled = false;
        btn.textContent = 'Add Scholarship';
    }
}

async function submitNotes() {
    const topic   = document.getElementById('n-topic')?.value?.trim();
    const subject = document.getElementById('n-subject')?.value?.trim();
    const level   = document.getElementById('n-class')?.value?.trim();
    const writer  = document.getElementById('n-writer')?.value?.trim();
    const desc    = document.getElementById('n-desc')?.value?.trim();
    const file    = document.getElementById('n-file')?.files?.[0];

    if (!topic || !level || !file) {
        notificationManager.showInternalAlert('Validation', 'Topic, Class/Level and PDF file are required.');
        return;
    }

    const btn = document.getElementById('submit-notes-btn');
    btn.disabled = true;
    btn.textContent = 'Uploading...';

    try {
        // Upload PDF to Supabase Storage
        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
        const { data: uploadData, error: uploadError } = await authManager.supabase
            .storage.from('notes').upload(fileName, file, { contentType: 'application/pdf' });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = authManager.supabase
            .storage.from('notes').getPublicUrl(fileName);

        await api.createDocument('library_assets', {
            topic, category: subject || 'General', class_level: level,
            writer_name: writer || 'Admin', description: desc || '',
            file_url: publicUrl, author: writer || 'Admin'
        });

        notificationManager.showInternalAlert('Uploaded!', `"${topic}" added to the Library`);
        await loadTab('notes');
    } catch (err) {
        notificationManager.showInternalAlert('Error', err.message);
        btn.disabled = false;
        btn.innerHTML = '<i data-lucide="upload-cloud" class="w-4 h-4"></i> Upload Notes';
        refreshIcons();
    }
}

async function submitSession() {
    const mentor   = document.getElementById('m-name')?.value?.trim();
    const topic    = document.getElementById('m-topic')?.value?.trim();
    const date     = document.getElementById('m-date')?.value;
    const duration = parseInt(document.getElementById('m-duration')?.value) || 60;
    const seats    = parseInt(document.getElementById('m-seats')?.value) || 30;
    const link     = document.getElementById('m-link')?.value?.trim();

    if (!mentor || !topic || !date) {
        notificationManager.showInternalAlert('Validation', 'Mentor name, topic and date are required.');
        return;
    }

    const btn = document.getElementById('submit-session-btn');
    btn.disabled = true;
    btn.textContent = 'Saving...';

    try {
        await api.createDocument('mentoring_sessions', {
            mentor_name: mentor, topic, date,
            duration_minutes: duration, total_capacity: seats,
            enrolled_count: 0, meet_link: link || null, status: 'upcoming'
        });
        notificationManager.showInternalAlert('Added!', `Session with ${mentor} scheduled`);
        await loadTab('sessions');
        await loadStats();
    } catch (err) {
        notificationManager.showInternalAlert('Error', err.message);
        btn.disabled = false;
        btn.innerHTML = '<i data-lucide="plus-circle" class="w-4 h-4"></i> Add Session';
        refreshIcons();
    }
}

// ─── User search ─────────────────────────────────────────────────────
function bindUserSearch() {
    const searchInput = document.getElementById('user-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', async (e) => {
        const q = e.target.value.toLowerCase();
        const { data } = await authManager.supabase
            .from('users')
            .select('id, full_name, email, role, streak, score, created_at')
            .or(`full_name.ilike.%${q}%,email.ilike.%${q}%`)
            .limit(50);

        const table = document.getElementById('users-table');
        if (table) {
            table.innerHTML = renderUserRows(data || []);
            refreshIcons();
            bindActions();
        }
    });
}
