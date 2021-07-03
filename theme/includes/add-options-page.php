<?php

/**
 * Add ACF Options Page
 * This functionality is provided via ACF - Advanced Custom Fields
 * @link https://www.advancedcustomfields.com/resources/options-page/
 */

if (function_exists('acf_add_options_page')) {

    /**
     * Add Options Sub Page To Settings
     */
    acf_add_options_sub_page([
        'page_title'  => __('Business Hours', 'sage'),
        'menu_title'  => __('Business Hours', 'sage'),
        'parent_slug' => 'options-general.php',
    ]);

    /**
     * Add Options Sub Page To Settings
     */
    acf_add_options_sub_page([
        'page_title'  => __('Cookie Notice', 'sage'),
        'menu_title'  => __('Cookie Notice', 'sage'),
        'parent_slug' => 'options-general.php',
    ]);
}



