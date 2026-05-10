import { HomeView } from '../views/HomeView.js';
import { initApp } from '../main.js';
import { boot } from '../modules/boot.js';

boot(async () => {
    // 1. Initial Render (HomeView is synchronous)
    const appView = document.getElementById('app-view');
    if (appView) appView.innerHTML = HomeView.render();
    
    // 2. Initialize App Services (i18n, icons, etc.)
    await initApp();
    
    // 3. Post-service initialization
    if (HomeView.init) await HomeView.init();
});
