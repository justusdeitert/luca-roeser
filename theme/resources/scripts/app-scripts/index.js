/**
 * Scripts here are only executed on the frontend
 */

import './menu';

// document.getElementById('cs').style.height = window.innerHeight + 'px';

window.onresize = function() {
    // document.body.height = window.innerHeight;

    // document.getElementById('cs').style.minHeight = window.innerHeight + 'px';
    // console.log('on resize', window.innerHeight + 'px');
}

window.onresize(); // called to initially set the height.
