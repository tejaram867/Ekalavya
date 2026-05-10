import { PortfolioView } from '../views/PortfolioView.js';
import { initApp } from '../main.js';
import { boot } from '../modules/boot.js';

boot(async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    // 1. Initialize App Services & Portfolio Data concurrently
    const [_, html] = await Promise.all([
        initApp(),
        PortfolioView.render({ id })
    ]);
    
    // 2. Inject HTML
    const appView = document.getElementById('app-view');
    if (appView) appView.innerHTML = html;
    
    // 3. Initialize View Logic
    if (PortfolioView.init) await PortfolioView.init();
});
