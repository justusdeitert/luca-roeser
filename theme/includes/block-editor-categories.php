<?php

/**
 * Adjust block categories
 * @link https://loomo.ca/gutenberg-creating-custom-block-categories/
 */

add_filter('block_categories_all', function ($categories) {
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'custom',
                'title' => __('Custom Blocks', 'sage'),
                'icon' => 'carrot'
            ),
            // array(
            //     'slug' => 'core',
            //     'title' => __('Core Blocks', 'sage'),
            //     'icon' => 'wordpress'
            // ),
        )
    );
}, 10, 2);
