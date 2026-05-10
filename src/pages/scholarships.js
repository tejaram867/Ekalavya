import { ScholarshipView } from '../views/ScholarshipView.js';
import { initApp } from '../main.js';
import { boot } from '../modules/boot.js';

boot(async () => {
    // 1. Initial Render (ScholarshipView is synchronous)
    const appView = document.getElementById('app-view');
    if (appView) appView.innerHTML = ScholarshipView.render();
    
    // 2. Initialize App Services
    await initApp();
    
    // 3. Post-service initialization
    if (ScholarshipView.init) await ScholarshipView.init();
});
