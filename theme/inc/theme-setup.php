<?php

/**
 * Theme Setup
 *
 * @package LucaRoeser
 */

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function theme_setup() {
    // Add default posts and comments RSS feed links to head.
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title.
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails on posts and pages.
    add_theme_support('post-thumbnails');

    // Switch default core markup to output valid HTML5.
    add_theme_support('html5', [
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ]);

    // Add support for Block Styles.
    add_theme_support('wp-block-styles');

    // Add support for full and wide align images.
    add_theme_support('align-wide');

    // Add support for responsive embeds.
    add_theme_support('responsive-embeds');

    // Register navigation menus.
    register_nav_menus([
        'primary_navigation' => __('Primary Navigation', 'luca-roeser'),
        'footer_navigation' => __('Footer Navigation', 'luca-roeser'),
    ]);
}
add_action('after_setup_theme', 'theme_setup');
