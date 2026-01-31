/**
 * Initialize vanilla cookie consent v3
 * @link https://cookieconsent.orestbida.com/
 * 
 * Only runs on frontend, not in editor/admin context
 */
if (typeof cookieConsentConfig !== 'undefined' && !document.body.classList.contains('block-editor-page')) {
    import("vanilla-cookieconsent").then((CookieConsent) => {
        try {
            // Check if config has required v3 properties, or if it's v2 format
            if (cookieConsentConfig.languages && !cookieConsentConfig.language) {
                console.warn('Cookie Consent: Config appears to be v2 format. Please update to v3 format.');
                console.warn('See: https://cookieconsent.orestbida.com/essential/getting-started.html');
                return;
            }
            CookieConsent.run(cookieConsentConfig);
        } catch (e) {
            console.error('Cookie Consent initialization failed:', e);
        }
    });
}
