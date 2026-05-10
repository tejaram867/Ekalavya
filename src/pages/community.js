import { CommunityView } from '../views/CommunityView.js';
import { initApp } from '../main.js';
import { boot } from '../modules/boot.js';

boot(async () => {
    // 1. Initial Render (CommunityView is synchronous)
    const appView = document.getElementById('app-view');
    if (appView) appView.innerHTML = CommunityView.render();
    
    // 2. Initialize App Services
    await initApp();
    
    // 3. Post-service initialization
    if (CommunityView.init) await CommunityView.init();
});
