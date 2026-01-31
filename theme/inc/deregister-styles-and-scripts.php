<?php

/**
 * Deregister jQuery
 */
add_action('init', function () {
    if (!is_admin() && !is_login_page()) {
        wp_deregister_script('jquery');
    }
});

/**
 * Contact form 7
 */
add_action( 'wp_enqueue_scripts', function() {
    if (!is_admin() && !is_login_page()) {

        wp_dequeue_style('contact-form-7');

        if (get_post()) {
            if (!has_shortcode(get_post()->post_content, 'contact-form-7')) {
                wp_dequeue_script('contact-form-7');
            }
        }
    }
});
