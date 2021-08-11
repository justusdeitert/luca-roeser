/**
 * Currently not used!!
 */

import PhotoSwipeLightbox from 'photoswipe/dist/photoswipe-lightbox.esm.js';
import PhotoSwipe from 'photoswipe/dist/photoswipe.esm.js';

// don't forget to include CSS in some way
// import 'photoswipe/dist/photoswipe.css';

const lightbox = new PhotoSwipeLightbox({
    gallery: '#my-gallery',
    children: 'a',
    pswpModule: PhotoSwipe
});

lightbox.init();
