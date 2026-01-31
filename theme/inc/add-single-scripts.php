<?php

/**
 * Add Various CDN Scripts to Footer of Frontend & Editor
 */

/**
 * Add CDN Scripts
 */
function add_single_scripts() {

    /**
     * Adds Google Maps API Script
     */
    $google_maps_api_key = get_theme_mod('custom_google_maps_api_key', false);
    if ($google_maps_api_key && function_exists('has_block') && has_block('custom/map', get_the_ID())) {
        wp_enqueue_script('google-maps-api', 'https://maps.googleapis.com/maps/api/js?key=' . $google_maps_api_key . '&callback=initMaps', ['theme-scripts'], null, true);
    }

    /**
     * Include GSAP - loaded from CDN
     * @link https://greensock.com/docs/
     */
    wp_enqueue_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', [], '3.12.5', true);
}

add_action('wp_enqueue_scripts', 'add_single_scripts', 99);
add_action('enqueue_block_editor_assets', 'add_single_scripts', 99);

/**
 * Defer Scripts
 */
add_filter('script_loader_tag', function ($tag, $handle, $src) {

    $defer_scripts = [
        'contact-form-7',
        'theme-scripts',
        'google-maps-api',
        'gsap',
    ];

    if (in_array($handle, $defer_scripts)) {
        return '<script src="' . esc_url($src) . '" id="' . esc_attr($handle) . '-js" defer></script>' . "\n";
    }

    return $tag;
}, 10, 3);
