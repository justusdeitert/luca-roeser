/**
 * Import lightGallery
 */
import lightGallery from 'lightgallery';

/**
 * Plugins
 */
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import lgHash from 'lightgallery/plugins/hash'

window.lightGalleryInstances = {};

window.initTextImageLightGallery = () => {
    document.querySelectorAll('.text-image-block').forEach(textImageBlock => {
        let imageWrapper = textImageBlock.querySelector('.text-image-block__image-wrapper');
        let lightGalleryInstance = lightGallery(imageWrapper, {
            plugins: [lgZoom, lgThumbnail, lgHash],
            speed: 300,
            thumbnail: true,
            customSlideName: true,
            zoomFromOrigin: false,
        });

        /**
         * Push Lightgallery to Instances with lgId
         * @type {LightGallery}
         */
        window.lightGalleryInstances[lightGalleryInstance.lgId] = lightGalleryInstance;
    })
};

window.initTextImageLightGallery();

/**
 * Open Lightgallery on Link Click
 * TODO: Rewrite when we have scroll to Anchor links!
 * @type {NodeListOf<HTMLElementTagNameMap[string]>}
 */
const documentLinks = document.querySelectorAll('a');
documentLinks.forEach(link => {
    let linkHref = link.getAttribute('href');

    if(linkHref && linkHref.includes('#lg=')) {
        let galleryNumber = linkHref.replace('#lg=', '')
        galleryNumber = parseInt(galleryNumber);

        link.addEventListener('click', (event) => {
            event.preventDefault();
            window.lightGalleryInstances[galleryNumber].openGallery()
        });
    }
});
