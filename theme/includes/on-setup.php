<?php

/**
 * Setup functions
 */

// check if plugins and options not already set
if (!get_option('theme_settings_activated')) {

    // Activate default plugins
    activate_plugins([
        'advanced-custom-fields-pro/acf.php', // TODO: Remove ACF generally
        '/disable-blog/disable-blog.php',
        '/favicon-by-realfavicongenerator/favicon-by-realfavicongenerator.php',
        '/imsanity/imsanity.php',
        '/kirki/kirki.php', // TODO: Include within theme automatically
        '/modern-images-wp/modern-images-wp.php',
        '/regenerate-thumbnails/regenerate-thumbnails.php',
        '/svg-support/svg-support.php',
        '/user-switching/user-switching.php',
        '/duplicate-post/duplicate-post.php',
        '/wordpress-seo/index.php',
    ]);

    // Remove the first comment
    wp_delete_comment(1, true);

    // Remove the first post
    wp_delete_post(1, true);

    // Default Options
    $default_theme_options = [
        'show_on_front' => 'page',
        'page_on_front' => 2,
        'permalink_structure' => '/%postname%/',
    ];

    foreach ($default_theme_options as $key => $value) {
        update_option($key, $value);
    }

    add_option('theme_settings_activated', true);
};
