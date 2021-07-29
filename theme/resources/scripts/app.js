/**
 * jQuery
 */
// import 'jquery';

/**
 * External Dependencies
 */
import './external';

/**
 * Block Scripts & Plugins
 */
import './block-scripts';

/**
 * App - Frontend Scripts
 */
import './app-scripts';

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
    // console.log('Document loaded');
});

/**
 * Window Load
 */
window.addEventListener('load', () => {
    // console.log('Window loaded');
});

/**
 * Adjust xdebug error notices
 * @type {NodeListOf<Element>}
 */
let xdebugElements = document.querySelectorAll('.xdebug-var-dump');
let xdebugWrapper = document.createElement('div');
xdebugWrapper.classList.add('xdebug-wrapper')

if (xdebugElements) {
    xdebugElements.forEach(element => {
        xdebugWrapper.appendChild(element);
    })
    document.body.insertBefore(xdebugWrapper, document.getElementById('app'));
}
