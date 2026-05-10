import { renderers, refreshIcons } from '../modules/renderers.js';
import { api } from '../services/api.js';
import { FluidDropdown } from '../components/FluidDropdown.js';

export const LibraryView = {
    render: () => `
        <div class="container py-24">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
                <div>
                    <h2 class="text-4xl font-bold mb-4" data-i18n="nav.library">Academic Library</h2>
                    <p class="secondary-header-text">Explore a curated collection of research papers, study guides, and academic resources.</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div id="academic-level-dropdown" class="w-full sm:w-64"></div>
                    <div class="relative group w-full md:w-auto">
                        <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-blue-400 transition-colors"></i>
                        <input type="text" id="library-search" placeholder="Search resources..." 
                            class="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-400/50 focus:bg-white/10 w-full sm:w-64 transition-all">
                    </div>
                </div>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6" id="library-categories">
                <div class="glass-card cursor-pointer group relative overflow-hidden">
                    <div class="absolute top-0 left-0 right-0 h-[2px] bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="library-icon-box group-hover:bg-ekalavya-gold/20 transition-colors">
                        <i data-lucide="file-text" class="w-6 h-6 text-ekalavya-gold"></i>
                    </div>
                    <h4 class="font-bold mb-1 group-hover:text-ekalavya-gold transition-colors">Research Papers</h4>
                    <p class="text-[10px] text-ekalavya-slate uppercase font-black tracking-widest">120+ Documents</p>
                </div>
                <div class="glass-card cursor-pointer group relative overflow-hidden">
                    <div class="absolute top-0 left-0 right-0 h-[2px] bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="library-icon-box group-hover:bg-ekalavya-gold/20 transition-colors">
                        <i data-lucide="book-open" class="w-6 h-6 text-ekalavya-gold"></i>
                    </div>
                    <h4 class="font-bold mb-1 group-hover:text-ekalavya-gold transition-colors">Study Guides</h4>
                    <p class="text-[10px] text-ekalavya-slate uppercase font-black tracking-widest">85+ Documents</p>
                </div>
                <div class="glass-card cursor-pointer group relative overflow-hidden">
                    <div class="absolute top-0 left-0 right-0 h-[2px] bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="library-icon-box group-hover:bg-ekalavya-gold/20 transition-colors">
                        <i data-lucide="video" class="w-6 h-6 text-ekalavya-gold"></i>
                    </div>
                    <h4 class="font-bold mb-1 group-hover:text-ekalavya-gold transition-colors">Video Lectures</h4>
                    <p class="text-[10px] text-ekalavya-slate uppercase font-black tracking-widest">40+ Hours</p>
                </div>
                <div class="glass-card cursor-pointer group relative overflow-hidden">
                    <div class="absolute top-0 left-0 right-0 h-[2px] bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="library-icon-box group-hover:bg-ekalavya-gold/20 transition-colors">
                        <i data-lucide="archive" class="w-6 h-6 text-ekalavya-gold"></i>
                    </div>
                    <h4 class="font-bold mb-1 group-hover:text-ekalavya-gold transition-colors">Exam Archives</h4>
                    <p class="text-[10px] text-ekalavya-slate uppercase font-black tracking-widest">10+ Years</p>
                </div>
            </div>

            <div class="glass-card mt-12 p-8 bg-white/[0.02]">
                <div class="flex items-center justify-between mb-8">
                    <h3 class="font-bold text-xl">Recent Contributions</h3>
                    <button class="text-sm font-bold text-blue-400 hover:border-b hover:border-blue-400 transition-all">View All</button>
                </div>
                <div class="flex flex-col gap-6" id="library-grid">
                    <div class="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 text-white/50 italic text-sm">
                        <p>Loading curated materials for you...</p>
                    </div>
                </div>
            </div>
        </div>
    `,
    init: async () => {
        // Define dropdown categories
        const categories = [
            { id: 'all', label: 'All Levels', icon: 'layers', color: '#A06CD5' },
            { id: 'Class 6-12', label: 'Class 6-12', icon: 'book-open', color: '#FF6B6B' },
            { id: 'Undergraduate', label: 'Undergraduate', icon: 'graduation-cap', color: '#4ECDC4' },
            { id: 'Postgraduate', label: 'Postgraduate', icon: 'award', color: '#45B7D1' },
            { id: 'B.Tech', label: 'B.Tech', icon: 'cpu', color: '#F9C74F' },
            { id: 'B.Sc', label: 'B.Sc', icon: 'flask-conical', color: '#EC4899' }
        ];

        // Wait for DOM to be ready
        await new Promise(resolve => setTimeout(resolve, 100));

        // Initialize FluidDropdown
        const dropdownContainer = document.getElementById('academic-level-dropdown');
        if (!dropdownContainer) {
            console.error('Dropdown container not found!');
            return;
        }

        const dropdown = new FluidDropdown('academic-level-dropdown', {
            items: categories,
            onChange: async (selectedItem) => {
                const query = document.getElementById('library-search')?.value || '';
                await renderers.libraryItems(query, selectedItem.id);
            }
        });

        // Refresh icons after dropdown is rendered
        setTimeout(() => refreshIcons(), 100);

        // Fetch User Education Prefs
        const user = await api.getCollection('users').then(users => {
            const currentId = JSON.parse(localStorage.getItem('supabase.auth.token'))?.currentSession?.user?.id;
            return users.find(u => u.id === currentId);
        }).catch(() => null);

        if (user?.academic_level) {
            // Map DB levels to dropdown values
            const levelMap = {
                'high_school': 'Class 6-12',
                'undergraduate': 'Undergraduate',
                'graduate': 'Postgraduate'
            };
            const mappedLevel = levelMap[user.academic_level] || user.academic_level;
            dropdown.setValue(mappedLevel);
        }

        // Trigger initial render with potential filters
        await renderers.libraryItems(
            document.getElementById('library-search')?.value || '', 
            dropdown.getValue()?.id || 'all'
        );

        const searchInput = document.getElementById('library-search');

        const updateLibrary = async () => {
            const query = searchInput?.value || '';
            const category = dropdown.getValue()?.id || 'all';
            await renderers.libraryItems(query, category);
        };

        if (searchInput) searchInput.addEventListener('input', updateLibrary);
    }
};
