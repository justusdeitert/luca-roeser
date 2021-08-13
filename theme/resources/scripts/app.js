/**
 * jQuery
 */
// import 'jquery';

/**
 * External Dependencies
 */
import './external';

/**
 * Editor & Frontend Scripts
 */
import './editor-scripts';

/**
 * App - Frontend Only
 */
import './app-scripts';
import {getCssVariable} from "./utility";

/**
 * jQuery Ready
 * TODO: jQuery is disabled for frontend
 */
// $(() => {
//     // console.log('Hello world');
// });

/**
 * DOM Ready
 */
document.addEventListener('DOMContentLoaded', () => {

    // Logger Welcome Message
    let lightColor = `rgb(${getCssVariable('--custom-light-color')})`;
    let darkColor = `rgb(${getCssVariable('--custom-dark-color')})`;
    let primaryColor = `rgb(${getCssVariable('--custom-primary-color')})`;
    console.log('%c Welcome Visitor!', `font-weight: bold; font-size: 30px; color: ${lightColor}; text-shadow: -3px -3px ${primaryColor}, 3px 3px 0 ${darkColor}`);
});

/**
 * Window Load
 */
window.addEventListener('load', () => {
    // console.log('Window loaded');
});

/**
 * Adjust xdebug var dump notices
 * @type {NodeListOf<Element>}
 */
let xdebugElements = document.querySelectorAll('.xdebug-var-dump');

if (xdebugElements.length) {

    let xdebugWrapper = document.createElement('div');
    xdebugWrapper.classList.add('xdebug-wrapper');

    xdebugElements.forEach(element => {
        xdebugWrapper.appendChild(element);
    });

    document.body.insertBefore(xdebugWrapper, document.getElementById('app'));
}
