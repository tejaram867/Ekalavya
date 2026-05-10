import { authManager } from '../services/auth.js';
import { refreshIcons } from '../modules/renderers.js';
import { notificationManager } from '../services/notifications.js';

export const ProfileView = {
    render: async () => {
        const { data: { session } } = await authManager.supabase.auth.getSession();
        if (!session) {
            return `
                <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <i data-lucide="lock" class="w-16 h-16 text-white/20 mb-4"></i>
                    <h2 class="text-2xl font-bold text-white mb-2">Private Access</h2>
                    <p class="text-white/50 mb-8">Please login to access your profile.</p>
                    <button class="nav-pill-primary px-8" onclick="showAuthModal()">Login / Join</button>
                </div>
            `;
        }

        const user = session.user;
        const { data: profileData } = await authManager.supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();
        
        const profile = profileData || {};

        return `
            <div class="container py-12 max-w-4xl mx-auto">
                <!-- Profile Header -->
                <div class="glass-card p-10 rounded-3xl mb-12 relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
                    
                    <div class="flex flex-col md:flex-row items-center gap-8">
                        <div class="relative">
                            <div class="w-32 h-32 rounded-full border-2 border-ekalavya-gold/30 p-1">
                                <img src="${user.user_metadata?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.id}" 
                                     alt="Profile" class="w-full h-full rounded-full object-cover" id="profile-avatar-preview">
                            </div>
                            <button class="absolute -bottom-2 -right-2 w-10 h-10 bg-ekalavya-gold text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform" id="change-avatar-btn">
                                <i data-lucide="camera" class="w-5 h-5"></i>
                            </button>
                        </div>
                        
                        <div class="flex-1 text-center md:text-left">
                            <h1 class="text-4xl font-bold text-white mb-2">${profile.full_name || 'Scholar'}</h1>
                            <p class="text-white/40 uppercase text-[10px] font-bold tracking-[0.3em] mb-4">${profile.role || 'Active Learner'}</p>
                            <p class="text-white/60 mb-6">${profile.bio || 'No bio added yet. Tell the world about yourself!'}</p>
                            
                            <div class="flex flex-wrap gap-4 justify-center md:justify-start">
                                <div class="bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                                    <div class="flex items-center gap-2">
                                        <i data-lucide="zap" class="w-4 h-4 text-ekalavya-gold fill-ekalavya-gold"></i>
                                        <span class="text-lg font-bold">${profile.score || 0}</span>
                                        <span class="text-xs text-white/40">Growth Score</span>
                                    </div>
                                </div>
                                <div class="bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                                    <div class="flex items-center gap-2">
                                        <i data-lucide="flame" class="w-4 h-4 text-orange-400 fill-orange-400"></i>
                                        <span class="text-lg font-bold">${profile.streak || 0}</span>
                                        <span class="text-xs text-white/40">Day Streak</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Profile Form -->
                <div class="grid md:grid-cols-2 gap-8">
                    <!-- Personal Information -->
                    <div class="glass-card p-8">
                        <h3 class="text-xl font-bold mb-6 flex items-center gap-3">
                            <i data-lucide="user" class="w-5 h-5 text-ekalavya-gold"></i>
                            Personal Information
                        </h3>
                        
                        <div class="space-y-6">
                            <div>
                                <label class="block text-xs text-white/40 uppercase font-bold tracking-widest mb-2">Full Name</label>
                                <input type="text" id="profile-full-name" 
                                       value="${profile.full_name || ''}" 
                                       class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-ekalavya-gold/50 focus:bg-white/10 transition-all"
                                       placeholder="Enter your full name">
                            </div>
                            
                            <div>
                                <label class="block text-xs text-white/40 uppercase font-bold tracking-widest mb-2">Email</label>
                                <input type="email" value="${user.email}" 
                                       class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white/50 cursor-not-allowed" 
                                       disabled>
                                <p class="text-xs text-white/30 mt-1">Email cannot be changed</p>
                            </div>
                            
                            <div>
                                <label class="block text-xs text-white/40 uppercase font-bold tracking-widest mb-2">Role</label>
                                <select id="profile-role" class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-ekalavya-gold/50 focus:bg-white/10 transition-all">
                                    <option value="student" ${profile.role === 'student' ? 'selected' : ''}>Student</option>
                                    <option value="mentor" ${profile.role === 'mentor' ? 'selected' : ''}>Mentor</option>
                                    <option value="researcher" ${profile.role === 'researcher' ? 'selected' : ''}>Researcher</option>
                                    <option value="professional" ${profile.role === 'professional' ? 'selected' : ''}>Professional</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-xs text-white/40 uppercase font-bold tracking-widest mb-2">Bio</label>
                                <textarea id="profile-bio" rows="4" 
                                          class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-ekalavya-gold/50 focus:bg-white/10 transition-all resize-none"
                                          placeholder="Tell us about yourself, your interests, and goals...">${profile.bio || ''}</textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Academic Information -->
                    <div class="glass-card p-8">
                        <h3 class="text-xl font-bold mb-6 flex items-center gap-3">
                            <i data-lucide="graduation-cap" class="w-5 h-5 text-blue-400"></i>
                            Academic Information
                        </h3>
                        
                        <div class="space-y-6">
                            <div>
                                <label class="block text-xs text-white/40 uppercase font-bold tracking-widest mb-2">Institution</label>
                                <input type="text" id="profile-institution" 
                                       value="${profile.institution || ''}" 
                                       class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all"
                                       placeholder="Your university or school">
                            </div>
                            
                            <div>
                                <label class="block text-xs text-white/40 uppercase font-bold tracking-widest mb-2">Field of Study</label>
                                <input type="text" id="profile-field" 
                                       value="${profile.field_of_study || ''}" 
                                       class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all"
                                       placeholder="e.g., Computer Science, Biology, etc.">
                            </div>
                            
                            <div>
                                <label class="block text-xs text-white/40 uppercase font-bold tracking-widest mb-2">Academic Level</label>
                                <select id="profile-level" class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all">
                                    <option value="">Select Level</option>
                                    <option value="high_school" ${profile.academic_level === 'high_school' ? 'selected' : ''}>High School</option>
                                    <option value="undergraduate" ${profile.academic_level === 'undergraduate' ? 'selected' : ''}>Undergraduate</option>
                                    <option value="graduate" ${profile.academic_level === 'graduate' ? 'selected' : ''}>Graduate</option>
                                    <option value="phd" ${profile.academic_level === 'phd' ? 'selected' : ''}>PhD</option>
                                    <option value="postdoc" ${profile.academic_level === 'postdoc' ? 'selected' : ''}>Post-Doc</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-xs text-white/40 uppercase font-bold tracking-widest mb-2">Graduation Year</label>
                                <input type="number" id="profile-graduation" 
                                       value="${profile.graduation_year || ''}" 
                                       min="2020" max="2035"
                                       class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all"
                                       placeholder="Expected graduation year">
                            </div>
                            
                            <div>
                                <label class="block text-xs text-white/40 uppercase font-bold tracking-widest mb-2">Interests/Skills</label>
                                <input type="text" id="profile-interests" 
                                       value="${(profile.interests || []).join(', ')}" 
                                       class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all"
                                       placeholder="e.g., Machine Learning, Research, Writing (comma-separated)">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 mt-8">
                    <button id="save-profile-changes" class="flex-1 bg-gold-gradient font-bold py-4 text-black rounded-2xl shadow-lg shadow-ekalavya-gold/20 hover:scale-[1.02] active:scale-95 transition-all">
                        <i data-lucide="save" class="w-5 h-5 inline mr-2"></i>
                        Save Changes
                    </button>
                    <button id="share-profile-link" class="flex-1 bg-white/5 border border-white/10 text-white font-bold py-4 rounded-2xl hover:bg-white/10 transition-all">
                        <i data-lucide="share-2" class="w-5 h-5 inline mr-2"></i>
                        Share Profile
                    </button>
                    <button id="delete-account-btn" class="bg-red-500/10 border border-red-500/20 text-red-400 font-bold py-4 px-8 rounded-2xl hover:bg-red-500/20 transition-all">
                        <i data-lucide="trash-2" class="w-5 h-5 inline mr-2"></i>
                        Delete Account
                    </button>
                </div>

                <!-- Avatar Selection Modal -->
                <div id="avatar-modal" class="modal-fixed hidden">
                    <div class="modal-overlay" id="avatar-modal-overlay"></div>
                    <div class="modal-content">
                        <div class="modal-gold-accent"></div>
                        <button id="close-avatar-modal" class="modal-close-btn hover:text-white transition-colors">
                            <i data-lucide="x"></i>
                        </button>
                        <div class="text-center mb-8">
                            <h2 class="text-2xl font-bold mb-3 text-white">Choose Avatar</h2>
                            <p class="secondary-header-text text-sm">Select or customize your profile avatar</p>
                        </div>
                        
                        <div class="space-y-6">
                            <div>
                                <label class="block text-xs text-white/40 uppercase font-bold tracking-widest mb-3">Avatar Seed</label>
                                <input type="text" id="avatar-seed-input" 
                                       value="${profile.avatar_seed || user.id}" 
                                       class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-ekalavya-gold/50 focus:bg-white/10 transition-all"
                                       placeholder="Enter any text to generate avatar">
                                <p class="text-xs text-white/30 mt-2">Change this text to get a different avatar style</p>
                            </div>
                            
                            <div class="text-center">
                                <div class="w-24 h-24 rounded-full border-2 border-ekalavya-gold/30 p-1 mx-auto mb-4">
                                    <img id="avatar-preview" src="" alt="Preview" class="w-full h-full rounded-full object-cover">
                                </div>
                                <button id="generate-random-avatar" class="text-sm text-ekalavya-gold hover:underline">
                                    Generate Random Avatar
                                </button>
                            </div>
                            
                            <button id="save-avatar-btn" class="w-full bg-gold-gradient font-bold py-4 text-black rounded-2xl shadow-lg shadow-ekalavya-gold/20 hover:scale-[1.02] active:scale-95 transition-all">
                                Save Avatar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init: async () => {
        refreshIcons();
        
        const { data: { session } } = await authManager.supabase.auth.getSession();
        if (!session) return;

        // Avatar preview update
        const updateAvatarPreview = () => {
            const seed = document.getElementById('avatar-seed-input')?.value || session.user.id;
            const previewImg = document.getElementById('avatar-preview');
            if (previewImg) {
                previewImg.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
            }
        };

        // Initialize avatar preview
        updateAvatarPreview();

        // Avatar seed input listener
        document.getElementById('avatar-seed-input')?.addEventListener('input', updateAvatarPreview);

        // Generate random avatar
        document.getElementById('generate-random-avatar')?.addEventListener('click', () => {
            const randomSeed = Math.random().toString(36).substring(7);
            const seedInput = document.getElementById('avatar-seed-input');
            if (seedInput) {
                seedInput.value = randomSeed;
                updateAvatarPreview();
            }
        });

        // Avatar modal controls
        document.getElementById('change-avatar-btn')?.addEventListener('click', () => {
            document.getElementById('avatar-modal')?.classList.remove('hidden');
            document.getElementById('avatar-modal')?.classList.add('flex');
        });

        document.getElementById('close-avatar-modal')?.addEventListener('click', () => {
            document.getElementById('avatar-modal')?.classList.add('hidden');
            document.getElementById('avatar-modal')?.classList.remove('flex');
        });

        document.getElementById('avatar-modal-overlay')?.addEventListener('click', () => {
            document.getElementById('avatar-modal')?.classList.add('hidden');
            document.getElementById('avatar-modal')?.classList.remove('flex');
        });

        // Save avatar
        document.getElementById('save-avatar-btn')?.addEventListener('click', async () => {
            const seed = document.getElementById('avatar-seed-input')?.value;
            if (!seed) return;

            try {
                const { error } = await authManager.supabase
                    .from('users')
                    .update({ avatar_seed: seed })
                    .eq('id', session.user.id);

                if (error) throw error;

                // Update preview in main profile
                const mainAvatar = document.getElementById('profile-avatar-preview');
                if (mainAvatar) {
                    mainAvatar.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
                }

                // Close modal
                document.getElementById('avatar-modal')?.classList.add('hidden');
                document.getElementById('avatar-modal')?.classList.remove('flex');

                notificationManager.sendPulse('Avatar Updated', { body: 'Your profile avatar has been changed!' });
            } catch (error) {
                console.error('Avatar update failed:', error);
                notificationManager.showInternalAlert('Error', 'Failed to update avatar. Please try again.');
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
            const graduationYear = document.getElementById('profile-graduation')?.value;
            const interestsText = document.getElementById('profile-interests')?.value?.trim();
            
            if (!fullName) {
                notificationManager.showInternalAlert('Validation Error', 'Please enter your full name.');
                return;
            }

            const interests = interestsText ? interestsText.split(',').map(i => i.trim()).filter(i => i) : [];

            try {
                const { error } = await authManager.supabase
                    .from('users')
                    .update({
                        full_name: fullName,
                        role: role,
                        bio: bio,
                        institution: institution,
                        field_of_study: fieldOfStudy,
                        academic_level: academicLevel,
                        graduation_year: graduationYear ? parseInt(graduationYear) : null,
                        interests: interests
                    })
                    .eq('id', session.user.id);

                if (error) throw error;

                notificationManager.sendPulse('Profile Updated', { body: 'Your profile has been successfully updated!' });
                
                // Refresh the view to show updated data
                setTimeout(() => {
                    window.appRouter?.handleRoute();
                }, 1000);

            } catch (error) {
                console.error('Profile update failed:', error);
                notificationManager.showInternalAlert('Error', 'Failed to update profile. Please try again.');
            }
        });

        // Share profile
        document.getElementById('share-profile-link')?.addEventListener('click', async () => {
            const url = `${window.location.origin}${window.location.pathname}#/portfolio/${session.user.id}`;
            try {
                await navigator.clipboard.writeText(url);
                notificationManager.showInternalAlert('Success', 'Profile link copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy:', err);
                notificationManager.showInternalAlert('Error', 'Failed to copy link. Please try again.');
            }
        });

        // Delete account (with confirmation)
        document.getElementById('delete-account-btn')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                if (confirm('This will permanently delete all your data. Are you absolutely sure?')) {
                    // TODO: Implement account deletion
                    notificationManager.showInternalAlert('Feature Coming Soon', 'Account deletion will be available in a future update.');
                }
            }
        });
    }
};