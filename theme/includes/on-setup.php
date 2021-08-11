<?php

/**
 * Setup functions
 */

$GLOBALS['standard_plugins'] = [
    'advanced-custom-fields-pro/acf.php', // TODO: Remove ACF generally
    '/disable-blog/disable-blog.php',
    '/favicon-by-realfavicongenerator/favicon-by-realfavicongenerator.php',
    '/imsanity/imsanity.php',
    '/kirki/kirki.php', // TODO: Include within theme automatically
    '/modern-images-wp/modern-images-wp.php',
    '/one-click-demo-import/one-click-demo-import.php',
    '/regenerate-thumbnails/regenerate-thumbnails.php',
    '/svg-support/svg-support.php',
    '/user-switching/user-switching.php',
    '/duplicate-post/duplicate-post.php',
    '/wordpress-seo/wp-seo.php',
];

$GLOBALS['default_theme_options'] = [
    'show_on_front' => 'page',
    'page_on_front' => 2,
];

// check if plugins and options not already set
if (!get_option('theme_was_installed')) {

    // Activate default plugins
    activate_plugins($GLOBALS['standard_plugins']);

    // Remove the first comment
    wp_delete_comment(1, true);

    // Remove the first post
    wp_delete_post(1, true);

    // Default Options
    foreach ($GLOBALS['default_theme_options'] as $key => $value) {
        update_option($key, $value);
    }

    add_option('theme_was_installed', true);
};


if (!get_option('admin_was_called')) {

    // Adjust permalink structure on setup
    add_action('admin_init', function() {

        global $wp_rewrite;
        $wp_rewrite->set_permalink_structure('/%postname%/');
        $wp_rewrite->flush_rules(true);

        add_option('admin_was_called', true);
    });
}
