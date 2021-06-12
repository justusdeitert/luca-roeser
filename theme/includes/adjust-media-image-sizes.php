<?php

/**
 * Adjust standard Wordpress Media Image Sizes
 */

/**
 *  Add Image Sizes
 */
add_image_size('placeholder', 80, 80);
add_image_size('tiny', 480, 480);
add_image_size('small', 768, 768);

/**
 * Register new Image Sizes
 * To work properly Sizes need to be registered...
 */
add_filter( 'image_size_names_choose', function($sizes) {
    return array_merge($sizes, array(
        'placeholder' => __('Placeholder'),
        'tiny' => __('Tiny'),
        'small' => __('Small'),
    ));
});

/**
 * Update Image Sizes
 */
update_option('medium_size_w', 1024);
update_option('medium_size_h', 1024);
update_option('large_size_w', 1680);
update_option('large_size_h', 1680);
