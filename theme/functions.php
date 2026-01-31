<?php

/**
 * Luca Roeser Theme Functions
 *
 * @package LucaRoeser
 */

/**
 * Check if we're in development mode
 */
function theme_is_dev_mode() {
    $manifest_path = get_template_directory() . '/assets/.vite/manifest.json';
    return !file_exists($manifest_path);
}

/**
 * Output Vite dev server scripts in head
 */
function theme_vite_dev_scripts() {
    if (theme_is_dev_mode()) {
        echo '<script type="module" src="http://localhost:5173/@vite/client"></script>' . "\n";
        echo '<script type="module" src="http://localhost:5173/js/main.js"></script>' . "\n";
    }
}
add_action('wp_head', 'theme_vite_dev_scripts', 1);

/**
 * Add favicon and site icons
 */
function theme_add_favicon() {
    $favicon_path = '/wp-content/uploads/fbrfg';
    echo '<link rel="icon" type="image/x-icon" href="' . $favicon_path . '/favicon.ico">' . "\n";
    echo '<link rel="icon" type="image/png" sizes="32x32" href="' . $favicon_path . '/favicon-32x32.png">' . "\n";
    echo '<link rel="icon" type="image/png" sizes="16x16" href="' . $favicon_path . '/favicon-16x16.png">' . "\n";
    echo '<link rel="apple-touch-icon" sizes="180x180" href="' . $favicon_path . '/apple-touch-icon.png">' . "\n";
    echo '<link rel="manifest" href="' . $favicon_path . '/site.webmanifest">' . "\n";
}
add_action('wp_head', 'theme_add_favicon', 1);

/**
 * Enqueue styles and scripts for production
 */
function theme_enqueue_styles_scripts() {
    if (theme_is_dev_mode()) {
        return; // Dev scripts are handled by theme_vite_dev_scripts
    }

    $manifest_path = get_template_directory() . '/assets/.vite/manifest.json';
    $theme_version = wp_get_theme()->get('Version');

    // Production: Load compiled assets from manifest
    $manifest = json_decode(file_get_contents($manifest_path), true);

    // Get the main entry
    if (isset($manifest['js/main.js'])) {
        $entry = $manifest['js/main.js'];

        // Enqueue CSS files
        if (isset($entry['css'])) {
            foreach ($entry['css'] as $index => $css_file) {
                wp_enqueue_style(
                    'main-style-' . $index,
                    get_template_directory_uri() . '/assets/' . $css_file,
                    [],
                    $theme_version
                );
            }
        }

        // Enqueue JS file
        wp_enqueue_script(
            'main-script',
            get_template_directory_uri() . '/assets/' . $entry['file'],
            [],
            $theme_version,
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'theme_enqueue_styles_scripts');

/**
 * Enqueue editor styles and scripts
 */
function theme_enqueue_editor_assets() {
    $assets_path = get_template_directory() . '/assets';
    $theme_version = wp_get_theme()->get('Version');
    $manifest_path = get_template_directory() . '/assets/.vite/manifest.json';

    // WordPress script dependencies for Gutenberg blocks
    $editor_dependencies = [
        'wp-blocks',
        'wp-i18n',
        'wp-element',
        'wp-editor',
        'wp-components',
        'wp-block-editor',
        'wp-dom-ready',
        'wp-edit-post',
    ];

    if (theme_is_dev_mode()) {
        // Development mode: Load from Vite dev server
        wp_enqueue_script(
            'theme-editor-script',
            'http://localhost:5173/js/editor-entry.js',
            $editor_dependencies,
            $theme_version,
            true
        );

        // Add module type for Vite
        add_filter('script_loader_tag', function($tag, $handle) {
            if ($handle === 'theme-editor-script') {
                return str_replace('<script ', '<script type="module" ', $tag);
            }
            return $tag;
        }, 10, 2);
    } else {
        // Production mode: Load from manifest
        if (file_exists($manifest_path)) {
            $manifest = json_decode(file_get_contents($manifest_path), true);

            if (isset($manifest['js/editor-entry.js'])) {
                $entry = $manifest['js/editor-entry.js'];

                // Enqueue editor CSS
                if (isset($entry['css'])) {
                    foreach ($entry['css'] as $index => $css_file) {
                        wp_enqueue_style(
                            'editor-style-' . $index,
                            get_template_directory_uri() . '/assets/' . $css_file,
                            [],
                            $theme_version
                        );
                    }
                }

                // Enqueue editor JS
                wp_enqueue_script(
                    'theme-editor-script',
                    get_template_directory_uri() . '/assets/' . $entry['file'],
                    $editor_dependencies,
                    $theme_version,
                    true
                );
            }
        }
    }
}
add_action('enqueue_block_editor_assets', 'theme_enqueue_editor_assets');

/**
 * Load all include files from inc/ directory
 */
foreach (glob(get_template_directory() . '/inc/*.php') as $file) {
    $filename = basename($file);
    // Skip files starting with underscore
    if (substr($filename, 0, 1) !== '_') {
        require_once $file;
    }
}
