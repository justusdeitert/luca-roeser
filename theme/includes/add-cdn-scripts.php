<?php

/**
 * Add Various CDN Scripts to Footer of Frontend & Editor
 */

$google_maps_api_key = get_theme_mod('custom_google_maps_api_key', false);

/**
 * Add CDN Scripts
 */
function add_cdn_scripts() {

    /**
     * Adds Google Maps API Script
     */
    $google_maps_api_key = get_theme_mod('custom_google_maps_api_key', false);
    if ($google_maps_api_key && has_block('custom/map', get_the_ID())) {
        wp_enqueue_script('google-maps-api', 'https://maps.googleapis.com/maps/api/js?key=' . $google_maps_api_key . '&callback=initMaps', [], null, true);
    }

    /**
     * Adds light-gallery Script
     */
    // if (has_block('custom/text-image', get_the_ID())) {
        // wp_enqueue_script('light-gallery', 'https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.2.1/lightgallery.es5.min.js', [], null, true);
        // wp_enqueue_script('light-gallery-thumbnails', 'https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.2.1/plugins/thumbnail/lg-thumbnail.es5.min.js', [], null, true);
        // wp_enqueue_script('light-gallery-hash', 'https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.2.1/plugins/hash/lg-hash.es5.min.js', [], null, true);
    // }
}

add_action('wp_enqueue_scripts', 'add_cdn_scripts', 100);
add_action('enqueue_block_editor_assets', 'add_cdn_scripts', 100);

/**
 * Defer Scripts
 */
add_filter('script_loader_tag', function ($tag, $handle, $src) {

    // The handles of the enqueued scripts we want to defer
    $defer_scripts = array(
        'google-maps-api'
    );

    if (in_array($handle, $defer_scripts)) {
        return '<script src="' . $src . '" defer type="text/javascript"></script>' . "\n";
    }

    return $tag;
}, 10, 3);
