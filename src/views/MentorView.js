import { renderers } from '../modules/renderers.js';
import { authManager } from '../services/auth.js';
import { api } from '../services/api.js';
import { notificationManager } from '../services/notifications.js';

export const MentorView = {
    render: () => `
        <div class="container py-24">
            <div class="flex items-center justify-between mb-12">
                <div>
                    <h2 class="text-4xl font-bold mb-4" data-i18n="nav.mentoring">Mentoring Hub</h2>
                    <p class="secondary-header-text">Learn from the best in the field</p>
                </div>
                <div class="mentor-only hidden">
                        <button class="status-badge mentor">Open Dashboard</button>
                </div>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6" id="mentor-grid">
                <div class="col-span-full py-12 text-center text-white/10 italic">
                    <p>Finding available mentors...</p>
                </div>
            </div>
        </div>
    `,
    init: () => {
        renderers.mentors();

        // Event Delegation for Booking
        const grid = document.getElementById('mentor-grid');
        if (grid) {
            grid.addEventListener('click', async (e) => {
                const btn = e.target.classList.contains('book-session-btn') ? e.target : e.target.closest('.book-session-btn');
                if (btn) {
                    const sessionId = btn.dataset.id;
                    const mentorName = btn.dataset.mentor;

                    const { data: { session } } = await authManager.supabase.auth.getSession();
                    if (!session) {
                        return notificationManager.showInternalAlert('Authentication Required', 'Please join or login to book a mentoring session.');
                    }

                    try {
                        btn.disabled = true;
                        btn.innerText = 'Syncing...';

                        // Fetch latest session data to check capacity
                        const sessionData = await api.getDocument('mentoring_sessions', sessionId);
                        if (sessionData.enrolled_count >= sessionData.total_capacity) {
                            notificationManager.showInternalAlert('Session Full', 'This session has reached maximum capacity.');
                            btn.innerText = 'Full';
                            return;
                        }

                        // Enroll
                        await api.createDocument('session_enrollments', {
                            session_id: sessionId,
                            user_id: session.user.id
                        });

                        // Update count
                        await api.updateDocument('mentoring_sessions', sessionId, {
                            enrolled_count: sessionData.enrolled_count + 1
                        });

                        notificationManager.sendPulse('Booking Confirmed', { 
                            body: `Success! You are enrolled in the session with ${mentorName}.` 
                        });
                        
                        btn.innerText = 'Booked';
                        btn.classList.replace('hover:bg-blue-600', 'bg-green-600');
                        btn.classList.add('border-green-500');

                        // Re-render to update counts
                        setTimeout(() => renderers.mentors(), 1000);

                    } catch (error) {
                        console.error(error);
                        notificationManager.showInternalAlert('Booking Error', 'Failed to book session. You may already be registered.');
                        btn.disabled = false;
                        btn.innerText = 'Book Session';
                    }
                }
            });
        }
    }
};
