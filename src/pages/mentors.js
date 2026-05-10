import { MentorView } from '../views/MentorView.js';
import { initApp } from '../main.js';
import { boot } from '../modules/boot.js';

boot(async () => {
    // 1. Initial Render (MentorView is synchronous)
    const appView = document.getElementById('app-view');
    if (appView) appView.innerHTML = MentorView.render();
    
    // 2. Initialize App Services
    await initApp();
    
    // 3. Post-service initialization
    if (MentorView.init) await MentorView.init();
});
