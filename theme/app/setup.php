<?php

/**
 * Theme setup.
 */

namespace App;

use function Roots\asset;

/**
 * Register the theme assets.
 *
 * @return void
 */
add_action('wp_enqueue_scripts', function () {

    wp_enqueue_script('sage/manifest', asset('scripts/manifest.js')->uri(), null, null, true);
    // wp_enqueue_script('sage/vendor', asset('scripts/vendor.js')->uri(), ['sage/manifest'], null, true);
    wp_enqueue_script('sage/app', asset('scripts/app.js')->uri(), ['sage/manifest'], null, true);

    // No Need for Inline Script anymore as we defer all resources
    // wp_add_inline_script('sage/vendor', asset('scripts/manifest.js')->contents(), 'before');

    if (is_single() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }

    /**
     * Check for Enviroment & Set CSS either inline or as file..
     * TODO: Check if it works better as preloaded external styles?....
     */
    if (!isMode('production')) {
        wp_enqueue_style('sage/app', asset('styles/app.css')->uri(), false, null);
    } else {
        wp_register_style( 'sage/app', false );
        wp_enqueue_style( 'sage/app', false );
        wp_add_inline_style( 'sage/app', asset('styles/app.css')->contents());
    }
}, 100);

/**
 * Register the theme assets with the block editor.
 *
 * @return void
 */
add_action('enqueue_block_editor_assets', function () {
    if ($manifest = asset('scripts/manifest.asset.php')->load()) { // Important for Editor

        wp_enqueue_script('sage/manifest', asset('scripts/manifest.js')->uri(), ...array_values($manifest));
        // wp_enqueue_script('sage/vendor', asset('scripts/vendor.js')->uri(), ['sage/manifest'], null, true);
        wp_enqueue_script('sage/editor', asset('scripts/editor.js')->uri(), ['sage/manifest'], null, true);

        // No Need for Inline Script anymore as we defer all resources
        // wp_add_inline_script('sage/vendor', asset('scripts/manifest.js')->contents(), 'before');
    }

    wp_enqueue_style('sage/editor', asset('styles/editor.css')->uri(), false, null);
}, 100);

/**
 * Register the theme assets within the wordpress admin area.
 *
 * @return void
 */
add_action('admin_enqueue_scripts', function() {

    wp_enqueue_script('sage/manifest', asset('scripts/manifest.js')->uri(), null, null, true);
    // wp_enqueue_script('sage/vendor', asset('scripts/vendor.js')->uri(), ['sage/manifest'], null, true);
    // wp_enqueue_script('sage/vendor-admin', asset('scripts/vendor-admin.js')->uri(), ['sage/vendor'], null, true);
    wp_enqueue_script('sage/admin', asset('scripts/admin.js')->uri(), ['sage/manifest'], null, true);

    // No Need for Inline Script anymore as we defer all resources
    // wp_add_inline_script('sage/vendor', asset('scripts/manifest.js')->contents(), 'before');

    wp_enqueue_style('sage/admin', asset('styles/admin.css')->uri(), false, null);
}, 100);

/**
 * Register the initial theme setup.
 *
 * @return void
 */
add_action('after_setup_theme', function () {
    /**
     * Enable features from the Soil plugin if activated.
     * @link https://roots.io/plugins/soil/
     */
    add_theme_support('soil', [
        'clean-up',
        'nav-walker',
        'nice-search',
        'relative-urls'
    ]);

    /**
     * Disable full-site editing support.
     *
     * @link https://wptavern.com/gutenberg-10-5-embeds-pdfs-adds-verse-block-color-options-and-introduces-new-patterns
     */
    remove_theme_support('block-templates');

    /**
     * Register the navigation menus.
     * @link https://developer.wordpress.org/reference/functions/register_nav_menus/
     */
    register_nav_menus([
        'primary_desktop_menu' => __('Primary Desktop Menu', 'sage'),
        'secondary_desktop_menu' => __('Secondary Desktop Menu', 'sage'),
        'primary_mobile_menu' => __('Primary Mobile Menu', 'sage')
    ]);

    /**
     * Register the editor color palette.
     * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#block-color-palettes
     */
    add_theme_support('editor-color-palette', []);

    /**
     * Register the editor color gradient presets.
     * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#block-gradient-presets
     */
    add_theme_support('editor-gradient-presets', []);

    /**
     * Register the editor font sizes.
     * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#block-font-sizes
     */
    add_theme_support('editor-font-sizes', []);

    /**
     * Register relative length units in the editor.
     * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#support-custom-units
     */
    add_theme_support('custom-units');

    /**
     * Enable support for custom line heights in the editor.
     * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#supporting-custom-line-heights
     */
    // add_theme_support('custom-line-height');

    /**
     * Enable support for custom block spacing control in the editor.
     * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#spacing-control
     */
    add_theme_support('custom-spacing');

    /**
     * Disable custom colors in the editor.
     * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#disabling-custom-colors-in-block-color-palettes
     */
    add_theme_support('disable-custom-colors');

    /**
     * Disable custom color gradients in the editor.
     * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#disabling-custom-gradients
     */
    add_theme_support('disable-custom-gradients');

    /**
     * Disable custom font sizes in the editor.
     * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#disabling-custom-font-sizes
     */
    add_theme_support('disable-custom-font-sizes');

    /**
     * Disable the default block patterns.
     * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#disabling-the-default-block-patterns
     */
    remove_theme_support('core-block-patterns');

    /**
     * Enable plugins to manage the document title.
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#title-tag
     */
    add_theme_support('title-tag');

    /**
     * Enable post thumbnail support.
     * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
     */
    add_theme_support('post-thumbnails');

    /**
     * Enable wide alignment support.
     * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/themes/theme-support/#wide-alignment
     */
    add_theme_support('align-wide');

    /**
     * Enable responsive embed support.
     * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/themes/theme-support/#responsive-embedded-content
     */
    add_theme_support('responsive-embeds');

    /**
     * Enable HTML5 markup support.
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#html5
     */
    add_theme_support('html5', [
        'caption',
        'comment-form',
        'comment-list',
        'gallery',
        'search-form',
        'script',
        'style'
    ]);

    /**
     * Enable selective refresh for widgets in customizer.
     * @link https://developer.wordpress.org/themes/advanced-topics/customizer-api/#theme-support-in-sidebars
     */
    add_theme_support('customize-selective-refresh-widgets');

    /**
     * Adds gray color array
     */
    $gray_colors = [];
    $dark_color = get_theme_mod('custom_dark_color', '#212529');
    foreach (range(1, 9) as $number) {
        array_push($gray_colors, [
            'name'  => __('Gray ' . $number * 100, 'sage'),
            'slug'  => 'gray-' . $number * 100,
            'color' => adjustBrightness($dark_color, (1 - $number * 0.03)),
        ]);
    }

    /**
     * Enable theme color palette support
     * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#block-color-palettes
     */
    add_theme_support('editor-color-palette', [
        [
            'name'  => __('Primary', 'sage'),
            'slug'  => 'primary',
            'color' => get_theme_mod('custom_primary_color', '#0d6efd'),
        ],
        [
            'name'  => __('Secondary', 'sage'),
            'slug'  => 'secondary',
            'color' => get_theme_mod('custom_secondary_color', '#6c757d'),
        ],
        [
            'name'  => __('Tertiary', 'sage'),
            'slug'  => 'tertiary',
            'color' => get_theme_mod('custom_tertiary_color', '#6c757d'),
        ],
        [
            'name'  => __('Light', 'sage'),
            'slug'  => 'light',
            'color' => get_theme_mod('custom_light_color', '#f8f9fa'),
        ],
        [
            'name'  => __('Dark', 'sage'),
            'slug'  => 'dark',
            'color' => get_theme_mod('custom_dark_color', '#212529'),
        ],
        ...$gray_colors
    ]);

    /*
     * Remove Theme Support for Core Block Pattern
     * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#disabling-the-default-block-patterns
     */
    remove_theme_support('core-block-patterns');

}, 20);

/**
 * Register the theme sidebars.
 *
 * @return void
 */
add_action('widgets_init', function () {
    $config = [
        'before_widget' => '<div class="footer__widget container %1$s %2$s">',
        'after_widget' => '</div>'
    ];

    // register_sidebar([
    //     'name' => __('Primary', 'sage'),
    //     'id' => 'sidebar-primary'
    // ] + $config);

    register_sidebar([
        'name' => __('Footer', 'sage'),
        'id' => 'sidebar-footer',
        'description' => __('The Footer widget area is displayed on the bottom of each page.', 'sage'),
    ] + $config);
});

/**
 * TODO: Loading text domain does not work!
 * @link https://discourse.roots.io/t/language-po-and-mo-totally-ignored/12295/5
 * @link https://developer.wordpress.org/reference/functions/load_theme_textdomain/
 * @link https://roots.io/docs/sage/9.x/localization/#generating-language-files
 */
add_action('after_setup_theme', function () {
    load_theme_textdomain('sage', get_template_directory() . '/lang');
});

/**
 * https://developer.wordpress.org/block-editor/how-to-guides/internationalization/
 */
add_action('init', function () {
    wp_set_script_translations('sage/editor', 'sage');
    load_theme_textdomain('sage', get_template_directory() . '/lang');
});
