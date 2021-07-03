import "vanilla-cookieconsent";
import {getCssVariable} from "../utility"

/**
 * Initialize vanilla cookie consent
 * @link https://orestbida.com/demo-projects/cookieconsent/
 */
let cookieconsent = initCookieConsent();
cookieconsent.run(cookieConsentConfig);

/**
 * Get css variable and add classes to cookie consent buttons
 */
let primaryButtonColor = getCssVariable('--custom-cookie-primary-button-style')
let secondaryButtonColor = getCssVariable('--custom-cookie-secondary-button-style')

let primaryButtons = document.querySelectorAll('#s-all-bn, #c-p-bn');
primaryButtons.forEach(primaryButton => {
    primaryButton.classList.add(primaryButtonColor);
});

let secondaryButtons = document.querySelectorAll('#c-s-bn, #s-rall-bn, #s-sv-bn');
secondaryButtons.forEach(secondaryButton => {
    secondaryButton.classList.add(secondaryButtonColor);
});
