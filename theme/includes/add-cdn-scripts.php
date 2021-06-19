<?php

/**
 * Add Various CDN Scripts to Footer of Frontend & Editor
 */

$google_maps_api_key = get_theme_mod('custom_google_maps_api_key', false);

if ($google_maps_api_key) {

    function add_google_maps_api_script()
    {
        global $google_maps_api_key;
        wp_enqueue_script('google-maps-api', 'https://maps.googleapis.com/maps/api/js?key=' . $google_maps_api_key . '&callback=initMaps', [], false, true);
    }

    add_action('wp_enqueue_scripts', 'add_google_maps_api_script', 100);
    add_action('enqueue_block_editor_assets', 'add_google_maps_api_script', 100);
}

