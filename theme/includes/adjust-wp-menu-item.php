<?php

/**
 * This functionality is provided via ACF - Advanced Custom Fields
 * @link https://www.advancedcustomfields.com/resources/adding-fields-menu-items/
 */

add_filter('wp_nav_menu_objects', 'adjust_wp_menu_items', 10, 2);

function adjust_wp_menu_items($items, $args) {

    // loop
    foreach ($items as &$item) {

        // vars
        $icon_class = get_field('icon_class', $item);
        $icon_position = get_field('icon_position', $item);

        // prepend icon
        if ($icon_class) {
            ob_start(); ?>

            <?php if (!$icon_position) { ?>
            <i class="icon-<?php echo $icon_class; ?> me-2"></i><?php echo $item->title; ?>
            <?php } else { ?>
                <?php echo $item->title; ?><i class="icon-<?php echo $icon_class; ?> ms-2"></i>
            <?php } ?>


            <?php $item->title = ob_get_clean();
        }
    }

    // return
    return $items;
}
