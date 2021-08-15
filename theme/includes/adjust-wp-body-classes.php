<?php

/**
 * Adjust wordpress body class
 */
add_action('init', function () {

    $GLOBALS['has_any_menu'] = has_nav_menu('primary_mobile_menu') || has_nav_menu('primary_desktop_menu') || has_nav_menu('secondary_desktop_menu');

    add_filter('body_class', function ($classes) {

        if ($GLOBALS['has_any_menu']) {

            $navbar_top_position = get_theme_mod('custom_navbar_top_position', 0);
            $navbar_positioning = get_theme_mod('custom_navbar_positioning', 'static');
            $is_navbar_top = ($navbar_top_position === 0 || ($navbar_positioning === 'static' || $navbar_positioning === 'sticky'));

            // Add navbar settings
            if ($is_navbar_top) {
                $classes[] = 'navbar-is-top';
            }
            $classes[] = 'navbar-' . get_theme_mod('custom_navbar_positioning', 'static');
        }

        return $classes;
    });
});
