<?php

/**
 * Remove Scripts
 */
add_action('init', function () {
    if (!is_admin() && !is_login_page()) {
        wp_deregister_script('jquery');
    }
});

/**
 * Remove Styles
 */
add_action( 'wp_enqueue_scripts', function() {
    if (!is_admin() && !is_login_page()) {

        // TODO: Make Contact Form 7 Only Load When Module is Present!
        wp_dequeue_script('contact-form-7');
        wp_dequeue_style('contact-form-7');
    }
});
