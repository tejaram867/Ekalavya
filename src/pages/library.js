import { LibraryView } from '../views/LibraryView.js';
import { initApp } from '../main.js';
import { boot } from '../modules/boot.js';

boot(async () => {
    // 1. Initial Render (LibraryView is synchronous)
    const appView = document.getElementById('app-view');
    if (appView) appView.innerHTML = LibraryView.render();
    
    // 2. Initialize App Services
    await initApp();
    
    // 3. Post-service initialization
    if (LibraryView.init) await LibraryView.init();
});
