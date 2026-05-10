import { renderers, refreshIcons } from '../modules/renderers.js';
import { authManager } from '../services/auth.js';
import { api } from '../services/api.js';
import { notificationManager } from '../services/notifications.js';

export const ScholarshipView = {
    render: () => `
        <div class="container py-24">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
                <div>
                    <h2 class="text-4xl font-bold mb-4" data-i18n="nav.scholarships">Scholarship Hub</h2>
                    <p class="secondary-header-text">Hand-picked opportunities tailored for your growth</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <button id="need-assistance-btn" class="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-bold rounded-xl transition-all">
                        <i data-lucide="help-circle" class="w-4 h-4"></i>
                        Need Assistance?
                    </button>
                    <div class="relative group">
                        <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-ekalavya-gold transition-colors"></i>
                        <input type="text" id="scholarship-search" placeholder="Search opportunities..." 
                            class="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-ekalavya-gold/50 focus:bg-white/10 w-full sm:w-64 transition-all">
                    </div>
                </div>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" id="scholarship-grid">
                <div class="animate-pulse-slow col-span-full py-20 text-center text-white/20">
                    <i data-lucide="loader" class="w-12 h-12 mx-auto mb-4 animate-spin text-blue-500/50"></i>
                    <p>Syncing with Scholarship Registry...</p>
                </div>
            </div>
        </div>
    `,
    init: async () => {
        // Fetch initially
        await renderers.scholarships();
        
        const searchInput = document.getElementById('scholarship-search');
        const grid = document.getElementById('scholarship-grid');
        
        if (searchInput && grid) {
            searchInput.addEventListener('input', async (e) => {
                const query = e.target.value.toLowerCase();
                const allScholarships = await api.getCollection('scholarships');
                const filtered = allScholarships.filter(s => 
                    s.name.toLowerCase().includes(query) || 
                    (s.description && s.description.toLowerCase().includes(query)) ||
                    (s.provider && s.provider.toLowerCase().includes(query))
                );
                
                if (filtered.length === 0) {
                    grid.innerHTML = `<div class="col-span-full py-20 text-center text-white/20 italic">No scholarships found matching "${e.target.value}"</div>`;
                } else {
                    grid.innerHTML = filtered.map(s => renderers.renderScholarshipCard(s)).join('');
                    refreshIcons();
                }
            });
        }

        // Assistance Button Handler
        const assistanceBtn = document.getElementById('need-assistance-btn');
        if (assistanceBtn) {
            assistanceBtn.addEventListener('click', () => {
                notificationManager.showInternalAlert(
                    'Scholarship Assistance', 
                    'Need help with your application? Our mentors are ready to guide you. We\'ll contact you on your registered email shortly.'
                );
            });
        }

        // Event Delegation for Applications
        if (grid) {
            grid.addEventListener('click', async (e) => {
                const btn = e.target.classList.contains('apply-scholarship-btn') ? e.target : e.target.closest('.apply-scholarship-btn');
                if (btn) {
                    const scholarshipId = btn.dataset.id;
                    const scholarshipName = btn.dataset.name;
                    
                    const { data: { session } } = await authManager.supabase.auth.getSession();
                    if (!session) {
                        return notificationManager.showInternalAlert('Authentication Required', 'Please join or login to apply for scholarships.');
                    }

                    try {
                        btn.disabled = true;
                        btn.innerText = 'Applying...';
                        
                        await api.createDocument('scholarship_applications', {
                            scholarship_id: scholarshipId,
                            user_id: session.user.id,
                            status: 'pending'
                        });

                        notificationManager.sendPulse('Application Sent', { 
                            body: `Your application for ${scholarshipName} is under review.` 
                        });
                        btn.innerText = 'Applied';
                        btn.classList.replace('bg-ekalavya-gold/10', 'bg-green-500/20');
                        btn.classList.add('text-green-400');
                    } catch (error) {
                        console.error(error);
                        notificationManager.showInternalAlert('Error', 'Failed to submit application. You might have already applied.');
                        btn.disabled = false;
                        btn.innerText = 'Apply Now';
                    }
                }
            });
        }
    }
};
