<?php

$core_blocks = [
    // Text
    'core/paragraph',
    'core/heading',
    'core/list',
    'core/quote',
    'core/code',
    // 'core/freeform',
    'core/preformatted',
    // 'core/pullquote',
    'core/table',
    // 'core/verse',

    // Media
    // 'core/image',
    // 'core/gallery',
    // 'core/audio',
    // 'core/cover',
    // 'core/file',
    // 'core/media-text',
    // 'core/video',

    // Design
    // 'core/buttons',
    'core/columns',
    // 'core/group',
    // 'core/more',
    // 'core/nextpage',
    // 'core/separator',
    // 'core/spacer',
    // 'core/site-logo',
    // 'core/site-tagline',
    // 'core/site-title',
    // 'core/query-title',
    // 'core/post-terms',

    // Widgets
    'core/shortcode',
    // 'core/archives',
    // 'core/calendar',
    // 'core/categories',
    'core/html',
    // 'core/latest-comments',
    // 'core/latest-posts',
    // 'core/page-list',
    // 'core/rss',
    // 'core/social-links',
    // 'core/tag-cloud',
    'core/search',

    // Theme
    // 'core/query',
    // 'core/post-title',
    // 'core/post-content',
    // 'core/post-date',
    // 'core/post-excerpt',
    // 'core/post-featured-image',
    // 'core/loginout',
];

$custom_blocks_normal_editor = [
    'custom/divider',
    'custom/accordion',
    'custom/accordion-inner',
    get_theme_mod('custom_google_maps_api_key', false) ? 'custom/map' : '', // Check if google Maps Key is Set
    'custom/image-header',
    'custom/text-image',
    'custom/slider',
    'custom/slider-inner',
    'custom/image',
    'custom/button',
    'custom/section',
    'custom/fluid-text',
    'custom/icon-text',
    'custom/grid-list',
    'custom/grid-list-inner', // grid-list as parent
    'custom/spacer',
];

$custom_blocks_widget_editor = [
    'custom/divider',
    'custom/text-image',
    'custom/slider',
    'custom/image',
    'custom/button',
];

add_filter('allowed_block_types_all', function ($allowed_block_types, $editor_context) {

    global $core_blocks, $custom_blocks_normal_editor, $custom_blocks_widget_editor, $pagenow;

    /**
     * Widget Editor
     */
    if ($pagenow === 'widgets.php') {
        return array_merge($core_blocks, $custom_blocks_widget_editor);
    }

    /**
     * Normal Editor Pages
     */
    return array_merge($core_blocks, $custom_blocks_normal_editor);
}, 10, 2);
