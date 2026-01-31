<?php

/**
 * Adjust standard Wordpress Media Image Sizes
 */

/**
 *  Add Image Sizes
 */
add_image_size('placeholder', 80, 80);
add_image_size('very_tiny', 200, 200);
add_image_size('tiny', 480, 480);
add_image_size('small', 768, 768);
add_image_size('x_large', 1680, 1680);

/**
 * Register new Image Sizes
 * To work properly Sizes need to be registered...
 */
add_filter( 'image_size_names_choose', function($sizes) {
    return array_merge($sizes, [
        'placeholder' => __('Placeholder'),
        'very_tiny' => __('Tiny'),
        'tiny' => __('Tiny'),
        'small' => __('Small'),
        'x_large' => __('Extra Large'),
    ]);
});

/**
 * Update Image Sizes
 */
update_option('medium_size_w', 1024);
update_option('medium_size_h', 1024);
update_option('large_size_w', 1360);
update_option('large_size_h', 1360);
