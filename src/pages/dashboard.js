import { DashboardView } from '../views/DashboardView.js';
import { initApp } from '../main.js';
import { boot } from '../modules/boot.js';

boot(async () => {
    // 1. Initialize App Services & Dashboard Data concurrently
    const [_, html] = await Promise.all([
        initApp(),
        DashboardView.render()
    ]);
    
    // 2. Inject HTML
    const appView = document.getElementById('app-view');
    if (appView) appView.innerHTML = html;
    
    // 3. Initialize View Logic
    if (DashboardView.init) await DashboardView.init();
});
