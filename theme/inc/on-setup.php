<?php

/**
 * Setup functions
 * These run once when the theme is first activated
 */

add_action('after_switch_theme', function() {
    $standard_plugins = [
        'advanced-custom-fields-pro/acf.php',
        'disable-blog/disable-blog.php',
        'imsanity/imsanity.php',
        'svg-support/svg-support.php',
        'user-switching/user-switching.php',
        'duplicate-post/duplicate-post.php',
    ];

    // Activate default plugins if available
    if (function_exists('activate_plugins')) {
        activate_plugins($standard_plugins);
    }

    // Set default options
    update_option('show_on_front', 'page');
    
    // Remove default content
    wp_delete_comment(1, true);
    wp_delete_post(1, true);
});

add_action('admin_init', function() {
    if (!get_option('theme_permalinks_set')) {
        global $wp_rewrite;
        $wp_rewrite->set_permalink_structure('/%postname%/');
        $wp_rewrite->flush_rules(true);
        add_option('theme_permalinks_set', true);
    }
});
