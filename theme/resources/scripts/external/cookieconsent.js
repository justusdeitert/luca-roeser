import "vanilla-cookieconsent";
import {getCssVariable} from "../utility"

/**
 * Initialize vanilla cookie consent
 * @link https://orestbida.com/demo-projects/cookieconsent/
 */
let cookieconsent = initCookieConsent();

if (typeof cookieConsentConfig !== 'undefined') {
    cookieconsent.run(cookieConsentConfig);
}

/**
 * Get css variable and add classes to cookie consent buttons
 */
let consentModalPrimaryButtonColor = getCssVariable('--custom-consent-modal-primary-button-color');
let consentModalSecondaryButtonColor = getCssVariable('--custom-consent-modal-secondary-button-color');
let consentSettingsPrimaryButtonColor = getCssVariable('--custom-consent-settings-primary-button-color');
let consentSettingsSecondaryButtonColor = getCssVariable('--custom-consent-settings-secondary-button-color');

let consentModalPrimaryButtons = document.querySelectorAll('#c-p-bn');
if (consentModalPrimaryButtons.length) {
    consentModalPrimaryButtons.forEach(button => {
        button.classList.add(consentModalPrimaryButtonColor);
    });
}

let consentModalSecondaryButtons = document.querySelectorAll('#c-s-bn');
if (consentModalSecondaryButtons.length) {
    consentModalSecondaryButtons.forEach(button => {
        button.classList.add(consentModalSecondaryButtonColor);
    });
}

let consentSettingsPrimaryButtons = document.querySelectorAll('#s-all-bn');
if (consentSettingsPrimaryButtons.length) {
    consentSettingsPrimaryButtons.forEach(button => {
        button.classList.add(consentSettingsPrimaryButtonColor);
    });
}

let consentSettingsSecondaryButtons = document.querySelectorAll('#s-rall-bn, #s-sv-bn');
if (consentSettingsSecondaryButtons.length) {
    consentSettingsSecondaryButtons.forEach(button => {
        button.classList.add(consentSettingsSecondaryButtonColor);
    });
}
