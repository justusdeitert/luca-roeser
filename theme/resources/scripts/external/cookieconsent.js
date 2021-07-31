import "vanilla-cookieconsent";
import {getCssVariable} from "../utility"

/**
 * Initialize vanilla cookie consent
 * @link https://orestbida.com/demo-projects/cookieconsent/
 */
let cookieconsent = initCookieConsent();

if(typeof cookieConsentConfig !== 'undefined') {
    cookieconsent.run(cookieConsentConfig);
}

/**
 * Get css variable and add classes to cookie consent buttons
 */
let primaryButtonColor = getCssVariable('--custom-consent-modal-primary-button-color');
let secondaryButtonColor = getCssVariable('--custom-consent-modal-secondary-button-color');

let primaryButtons = document.querySelectorAll('#s-all-bn, #c-p-bn');
primaryButtons.forEach(primaryButton => {
    primaryButton.classList.add(primaryButtonColor);
});

let secondaryButtons = document.querySelectorAll('#c-s-bn, #s-rall-bn, #s-sv-bn');
secondaryButtons.forEach(secondaryButton => {
    secondaryButton.classList.add(secondaryButtonColor);
});
