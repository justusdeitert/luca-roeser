<?php

/**
 * Adjust Admin Menu
 */

/**
 * Removes various Menu Pages
 */
/*add_action('admin_menu', function() {
    remove_menu_page('index.php'); // Dashboard
    remove_menu_page('jetpack'); // Jetpack*
    remove_menu_page('edit.php'); // Posts
    remove_menu_page('upload.php'); // Media
    remove_menu_page('edit.php?post_type=page'); // Pages
    remove_menu_page('edit-comments.php'); //C omments
    remove_menu_page('themes.php'); // Appearance
    remove_menu_page('plugins.php'); // Plugins
    remove_menu_page('users.php'); // Users
    remove_menu_page('tools.php'); // Tools
    remove_menu_page('options-general.php'); // Settings
}, 999);*/

/**
 * Adjust WP Admin Menu for Contact Form 7 Database Plugin
 */

add_action('admin_menu', function () {

    if (is_plugin_active('contact-form-cfdb7/contact-form-cfdb-7.php')) {
        /**
         * Remove Plugin Menu Item
         */
        remove_menu_page('cfdb7-list.php');

        /**
         * Add Custom Link to Contact Form 7 Submenu
         */
        global $submenu;
        $permalink = get_admin_url() . 'admin.php?page=cfdb7-list.php';
        $submenu['wpcf7'][] = ['Database', 'manage_options', $permalink];
    }
}, 99);

