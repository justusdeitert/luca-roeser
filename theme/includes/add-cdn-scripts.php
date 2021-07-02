<?php

/**
 * Add Various CDN Scripts to Footer of Frontend & Editor
 */

use function Roots\asset;

$google_maps_api_key = get_theme_mod('custom_google_maps_api_key', false);

/**
 * Add CDN Scripts
 */
function add_block_scripts() {

    /**
     * Adds Google Maps API Script
     */
    $google_maps_api_key = get_theme_mod('custom_google_maps_api_key', false);
    if ($google_maps_api_key && has_block('custom/map', get_the_ID())) {
        wp_enqueue_script('google-maps-api', 'https://maps.googleapis.com/maps/api/js?key=' . $google_maps_api_key . '&callback=initMaps', ['sage/app'], null, true);
    }

    /**
     * Lightgallery.js
     * @link https://www.lightgalleryjs.com
     *
     */
    if (has_block('custom/text-image', get_the_ID())) {
        // wp_enqueue_script('light-gallery', asset('scripts/light-gallery.js')->uri(), ['sage/vendor'], null, true);
        // wp_enqueue_script('light-gallery', 'https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.2.1/lightgallery.min.js', ['sage/vendor'], null, true);
        // wp_enqueue_script('light-gallery-thumbnails', 'https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.2.1/plugins/thumbnail/lg-thumbnail.min.js', ['sage/vendor'], null, true);
        // wp_enqueue_script('light-gallery-hash', 'https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.2.1/plugins/hash/lg-hash.min.js', ['sage/vendor'], null, true);
    }

    /**
     * Swiper.js
     * @link https://swiperjs.com/get-started
     */
    if (has_block('custom/slider', get_the_ID())) {
        // wp_enqueue_script('swiper', asset('scripts/swiper.js')->uri(), ['sage/vendor'], null, true);
        // wp_enqueue_script('swiper', 'https://unpkg.com/swiper@7/swiper-bundle.min.js', ['sage/vendor'], null, true);
    }
}

add_action('wp_enqueue_scripts', 'add_block_scripts', 99);
add_action('enqueue_block_editor_assets', 'add_block_scripts', 99);

/**
 * Defer Scripts
 */
add_filter('script_loader_tag', function ($tag, $handle, $src) {

    /**
     * Handles of the enqueued scripts we want to defer
     */
    $defer_scripts = [
        'contact-form-7',
        'sage/manifest',
        'sage/vendor',
        'light-gallery',
        'light-gallery-thumbnails',
        'light-gallery-hash',
        'swiper',
        'sage/app',
        'google-maps-api',
    ];

    if (in_array($handle, $defer_scripts)) {
        return '<script src="' . $src . '" id="' . $handle . '-js" defer></script>' . "\n";
    }

    return $tag;
}, 10, 3);
