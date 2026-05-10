import { AdminView } from '../views/AdminView.js';
import { initApp } from '../main.js';
import { boot } from '../modules/boot.js';

boot(async () => {
    // 1. Initialize App Services & Admin Data concurrently
    const [_, html] = await Promise.all([
        initApp(),
        AdminView.render()
    ]);
    
    // 2. Inject HTML
    const appView = document.getElementById('app-view');
    if (appView) appView.innerHTML = html;
    
    // 3. Initialize View Logic
    if (AdminView.init) await AdminView.init();
});
