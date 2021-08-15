<?php

$GLOBALS['has_any_menu'] = has_nav_menu('primary_mobile_menu') || has_nav_menu('primary_desktop_menu') || has_nav_menu('secondary_desktop_menu');

// var_dump(has_nav_menu('primary_desktop_menu'));

// Add Body Classes when menu is in a different configuration
add_filter('body_class', function ($classes) {

    if ($GLOBALS['has_any_menu']) {
        $classes[] = 'lol';
    }

    return $classes;
});
