import * as CookieConsent from "vanilla-cookieconsent";

/**
 * Initialize vanilla cookie consent v3
 * @link https://cookieconsent.orestbida.com/
 */
if (typeof cookieConsentConfig !== 'undefined') {
    CookieConsent.run(cookieConsentConfig);
}
