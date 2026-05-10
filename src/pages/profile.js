import { ProfileView } from '../views/ProfileView.js';
import { initApp } from '../main.js';
import { boot } from '../modules/boot.js';

boot(async () => {
    // 1. Initialize App Services & Profile Data concurrently
    const [_, html] = await Promise.all([
        initApp(),
        ProfileView.render()
    ]);
    
    // 2. Inject HTML
    const appView = document.getElementById('app-view');
    if (appView) appView.innerHTML = html;
    
    // 3. Initialize View Logic
    if (ProfileView.init) await ProfileView.init();
});
