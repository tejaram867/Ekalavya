/**
 * Ekalavya Robust Bootstrapper
 * Ensures initialization runs regardless of DOMContentLoaded event timing.
 */
export const boot = (initFunction) => {
    const run = async () => {
        try {
            await initFunction();
        } catch (error) {
            console.error('Critical Boot Error:', error);
            // Optional: Show a "reload" UI if critical boot fails
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
};
