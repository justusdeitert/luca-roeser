<?php

/**
 * Add Various CDN Scripts to Footer of Frontend & Editor
 */

use function Roots\asset;

/**
 * Add CDN Scripts
 */
function add_single_scripts() {

    /**
     * Adds Google Maps API Script
     */
    $google_maps_api_key = get_theme_mod('custom_google_maps_api_key', false);
    if ($google_maps_api_key && is_gutenberg_editor()) {
        wp_enqueue_script('google-maps-api', 'https://maps.googleapis.com/maps/api/js?key=' . $google_maps_api_key . '&callback=initMaps', ['sage/editor'], null, true);
    } elseif($google_maps_api_key && has_block('custom/map', get_the_ID())) {
        wp_enqueue_script('google-maps-api', 'https://maps.googleapis.com/maps/api/js?key=' . $google_maps_api_key . '&callback=initMaps', ['sage/app'], null, true);
    }

    /**
     * Lightgallery.js
     * @link https://www.lightgalleryjs.com
     *
     */
    if (is_gutenberg_editor() || has_block('custom/text-image', get_the_ID())) {
        wp_enqueue_script('lightgallery', asset('scripts/lightgallery.js')->uri(), [], null, true);
    }

    /**
     * Swiper.js
     * @link https://swiperjs.com/get-started
     */
    if (is_gutenberg_editor() || has_block('custom/slider', get_the_ID())) {
        wp_enqueue_script('swiper', asset('scripts/swiper.js')->uri(), [], null, true);
    }

    /**
     * Bootstrap 5 Scripts for Accordion
     * @link https://getbootstrap.com/docs/5.0/getting-started/introduction/
     */
    if (is_gutenberg_editor() || has_block('custom/accordion', get_the_ID())) {
        wp_enqueue_script('bootstrap', asset('scripts/bootstrap.js')->uri(), [], null, true);
    }

    /**
     * Include GSAP
     * @link https://greensock.com/docs/
     */
    wp_enqueue_script('gsap', asset('scripts/gsap.js')->uri(), [], null, true);
}

add_action('wp_enqueue_scripts', 'add_single_scripts', 99);
add_action('enqueue_block_editor_assets', 'add_single_scripts', 99);

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
        // 'sage/vendor',
        'lightgallery',
        'swiper',
        'sage/app',
        'google-maps-api',
        'gsap',
    ];

    if (in_array($handle, $defer_scripts)) {
        return '<script src="' . $src . '" id="' . $handle . '-js" defer></script>' . "\n";
    }

    return $tag;
}, 10, 3);
