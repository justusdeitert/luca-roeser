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
    })
};

window.initTextImageLightGallery();
