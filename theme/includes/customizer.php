<?php

$standard_google_fonts = [
    'Montserrat' => 'sans-serif',
    'Montserrat Alternates' => 'sans-serif',
    'Source Sans Pro' => 'sans-serif',
    'Oswald' => 'sans-serif',
    'Lato' => 'sans-serif',
    'Lora' => 'serif',
    'Open Sans' => 'sans-serif',
    'Raleway' => 'sans-serif',
    'Roboto' => 'sans-serif',
    'Roboto Slab' => 'serif', // serif
    'Barlow' => 'sans-serif',
    'Quicksand' => 'sans-serif',
    'Poppins' => 'sans-serif',
    'Inter' => 'sans-serif',
];

/**
 * Check out the Kirki Doc
 * Execute Kirki Functions when plugin is installed
 * @link https://kirki.org/docs/
 */
if (class_exists('Kirki')) {

    Kirki::add_section('theme_settings_id', array(
        'title' => __('Theme Settings', 'sage'),
        'priority' => 40,
    ));

    /**
     * Content & Container Sizes
     */

    Kirki::add_field('custom_headline_id_01', [
        'type' => 'custom',
        'settings' => 'custom_headline_01',
        'section' => 'theme_settings_id',
        'default' => '<h2>' . __('Content & Container Sizes', 'sage') . '</h2>',
    ]);

    Kirki::add_field('max_container_width_id', [
        'type' => 'slider',
        'settings' => 'max_container_width',
        'label' => __('Maximum content width', 'sage'),
        'section' => 'theme_settings_id',
        // 'priority' => 10,
        'default' => 1280,
        'choices' => [
            'min' => 560,
            'max' => 1920,
            'step' => 10,
        ],
    ]);

    Kirki::add_field('container_padding_mobile_id', [
        'type' => 'slider',
        'settings' => 'container_padding_mobile',
        'label' => __('Content padding (Mobile)', 'sage'),
        'section' => 'theme_settings_id',
        'default' => 15,
        'choices' => [
            'min' => 5,
            'max' => 40,
            'step' => 5,
        ],
    ]);

    Kirki::add_field('container_padding_desktop_id', [
        'type' => 'slider',
        'settings' => 'container_padding_desktop',
        'label' => __('Content padding (Desktop)', 'sage'),
        'section' => 'theme_settings_id',
        'default' => 30,
        'choices' => [
            'min' => 10,
            'max' => 100,
            'step' => 10,
        ],
    ]);

    Kirki::add_field('custom_gutter_size_mobile_id', [
        'type' => 'slider',
        'settings' => 'custom_gutter_size_mobile',
        'label' => __('Gutter Size (Mobile)', 'sage'),
        'section' => 'theme_settings_id',
        'default' => 20,
        'choices' => [
            'min' => 10,
            'max' => 40,
            'step' => 1,
        ],
    ]);

    Kirki::add_field('custom_gutter_size_desktop_id', [
        'type' => 'slider',
        'settings' => 'custom_gutter_size_desktop',
        'label' => __('Gutter Size (Desktop)', 'sage'),
        'section' => 'theme_settings_id',
        'default' => 30,
        'choices' => [
            'min' => 20,
            'max' => 60,
            'step' => 1,
        ],
    ]);

    Kirki::add_field('custom_block_spacing_id', [
        'type' => 'slider',
        'settings' => 'custom_block_spacing',
        'label' => __('Block Spacing', 'sage'),
        'section' => 'theme_settings_id',
        'default' => 32,
        'choices' => [
            'min' => 16,
            'max' => 80,
            'step' => 1,
        ],
    ]);

    Kirki::add_field('custom_border_id_02', [
        'type' => 'custom',
        'settings' => 'custom_border_02',
        'section' => 'theme_settings_id',
        'default' => '<hr style="border-top: 1px solid #B8B8B8; margin: 20px 0;"/>',
    ]);

    /**
     * Font Settings
     */

    Kirki::add_field('custom_headline_id_02', [
        'type' => 'custom',
        'settings' => 'custom_headline_02',
        'section' => 'theme_settings_id',
        'default' => '<h2>' . __('Font Settings', 'sage') . '</h2>',
    ]);

    Kirki::add_field('custom_font_size_id', [
        'type' => 'slider',
        'settings' => 'custom_font_size',
        'label' => __('Font Size', 'sage'),
        'section' => 'theme_settings_id',
        'default' => 16,
        'choices' => [
            'min' => 12,
            'max' => 28,
            'step' => 1,
        ],
    ]);

    Kirki::add_field('custom_font_weight_id', [
        'type' => 'slider',
        'settings' => 'custom_font_weight',
        'label' => __('Standard Font Weight', 'sage'),
        'section' => 'theme_settings_id',
        'default' => 400,
        'choices' => [
            'min' => 300,
            'max' => 500,
            'step' => 100,
        ],
    ]);

    $standard_google_fonts_array = [];
    foreach ($standard_google_fonts as $key => $value) {
        $standard_google_fonts_array[$key] = $key . ' (' . ucfirst($value) . ')';
    }

    Kirki::add_field('custom_headline_font_id', [
        'type' => 'select',
        'settings' => 'custom_headline_font',
        'label' => __('Headline Font', 'sage'),
        'section' => 'theme_settings_id',
        'default' => 'Roboto',
        'placeholder' => __('Select an option...', 'sage'),
        'priority' => 10,
        'multiple' => 1,
        'choices' => $standard_google_fonts_array,
    ]);

    // Kirki::add_field('custom_spacing_id_01', [
    //     'type' => 'custom',
    //     'settings' => 'custom_spacing_01',
    //     'section' => 'theme_settings_id',
    //     'default' => '<div class="custom-spacing" style="height: 10px;" />',
    // ]);

    Kirki::add_field('custom_text_font_id', [
        'type' => 'select',
        'settings' => 'custom_text_font',
        'label' => __('Text Font', 'sage'),
        'section' => 'theme_settings_id',
        'default' => 'Roboto',
        'placeholder' => __('Select an option...', 'sage'),
        'priority' => 10,
        'multiple' => 1,
        'choices' => $standard_google_fonts_array,
    ]);

    Kirki::add_field('custom_border_id_03', [
        'type' => 'custom',
        'settings' => 'custom_border_03',
        'section' => 'theme_settings_id',
        'default' => '<hr style="border-top: 1px solid #B8B8B8; margin: 20px 0;"/>',
    ]);

    /**
     * Color Settings
     */

    Kirki::add_field('custom_headline_id_03', [
        'type' => 'custom',
        'settings' => 'custom_headline_03',
        'section' => 'theme_settings_id',
        'default' => '<h2>' . __('Color Settings', 'sage') . '</h2>',
    ]);

    $theme_colors = [
        'primary' => '#0d6efd',
        'secondary' => '#6c757d',
        'light' => '#f8f9fa',
        'dark' => '#212529',
    ];

    foreach ($theme_colors as $color => $value) {
        Kirki::add_field('custom_' . $color . '_color_id', [
            'type' => 'color',
            'settings' => 'custom_' . $color . '_color',
            'label' => __(ucfirst($color) . ' Color', 'sage'),
            'section' => 'theme_settings_id',
            'default' => $value,
        ]);
    }

    Kirki::add_field('custom_border_id_04', [
        'type' => 'custom',
        'settings' => 'custom_border_04',
        'section' => 'theme_settings_id',
        'default' => '<hr style="border-top: 1px solid #B8B8B8; margin: 20px 0;"/>',
    ]);

    $standard_colors = [
        'font' => '#212529',
        'link' => '#0d6efd',
        'background' => '#f8f9fa',
    ];

    foreach ($standard_colors as $color => $value) {
        Kirki::add_field('custom_' . $color . '_color_id', [
            'type' => 'color',
            'settings' => 'custom_' . $color . '_color',
            'label' => __(ucfirst($color) . ' Color', 'sage'),
            'section' => 'theme_settings_id',
            'default' => $value,
        ]);
    }

    Kirki::add_field('custom_border_id_05', [
        'type' => 'custom',
        'settings' => 'custom_border_05',
        'section' => 'theme_settings_id',
        'default' => '<hr style="border-top: 1px solid #B8B8B8; margin: 20px 0;"/>',
    ]);

    $alert_colors = [
        'success' => '#198754',
        'danger' => '#dc3545',
        'warning' => '#ffc107',
        'info' => '#0dcaf0',
    ];

    foreach ($alert_colors as $color => $value) {
        Kirki::add_field('custom_' . $color . '_color_id', [
            'type' => 'color',
            'settings' => 'custom_' . $color . '_color',
            'label' => __(ucfirst($color) . ' Color', 'sage'),
            'section' => 'theme_settings_id',
            'default' => $value,
        ]);
    }

    Kirki::add_field('custom_border_id_06', [
        'type' => 'custom',
        'settings' => 'custom_border_06',
        'section' => 'theme_settings_id',
        'default' => '<hr style="border-top: 1px solid #B8B8B8; margin: 20px 0;"/>',
    ]);

    /**
     * Box Settings
     */

    Kirki::add_field('custom_headline_id_04', [
        'type' => 'custom',
        'settings' => 'custom_headline_04',
        'section' => 'theme_settings_id',
        'default' => '<h2>' . __('Box Settings', 'sage') . '</h2>',
    ]);

    Kirki::add_field('custom_border_width_id', [
        'type' => 'slider',
        'settings' => 'custom_border_width',
        'label' => __('Custom Border Width', 'sage'),
        'section' => 'theme_settings_id',
        // 'priority' => 10,
        'default' => 0,
        'choices' => [
            'min' => 0,
            'max' => 20,
            'step' => 1,
        ],
    ]);

    Kirki::add_field('custom_border_radius_id', [
        'type' => 'slider',
        'settings' => 'custom_border_radius',
        'label' => __('Custom Border Radius', 'sage'),
        'section' => 'theme_settings_id',
        // 'priority' => 10,
        'default' => 0,
        'choices' => [
            'min' => 0,
            'max' => 16,
            'step' => 1,
        ],
    ]);

    /**
     * Icon Settings
     */
    $box_shadow = [
        'no-shadow' => 'No Shadow',
        'shadow-sm' => 'Small Shadow',
        'shadow' => 'Shadow',
        'shadow-md' => 'Medium Shadow',
        'shadow-lg' => 'Large Shadow',
    ];

    Kirki::add_field('custom_shadow_id', [
        'type' => 'select',
        'settings' => 'custom_shadow',
        'label' => __('Shadow', 'sage'),
        'section' => 'theme_settings_id',
        'default' => 'no-shadow',
        'placeholder' => __('Select an option...', 'sage'),
        'priority' => 10,
        'multiple' => 1,
        'choices' => $box_shadow,
    ]);

    Kirki::add_field('custom_border_id_07', [
        'type' => 'custom',
        'settings' => 'custom_border_07',
        'section' => 'theme_settings_id',
        'default' => '<hr style="border-top: 1px solid #B8B8B8; margin: 20px 0;"/>',
    ]);

    /**
     * Icon Settings
     */
    $standard_icon_sets = [
        'bootstrap-icons' => 'Bootstrap Icons',
        'feather-icons' => 'Feather Icons',
        'ionicons' => 'Ionicons',
    ];

    Kirki::add_field('custom_icons_id', [
        'type' => 'select',
        'settings' => 'custom_icons',
        'label' => __('Icons', 'sage'),
        'section' => 'theme_settings_id',
        'default' => 'bootstrap-icons',
        'placeholder' => __('Select an option...', 'sage'),
        'priority' => 10,
        'multiple' => 1,
        'choices' => $standard_icon_sets,
    ]);
}

/**
 * Increases or decreases the brightness of a color by a percentage of the current brightness.
 *
 * @param string $hexCode Supported formats: `#FFF`, `#FFFFFF`, `FFF`, `FFFFFF`
 * @param float $adjustPercent A number between -1 and 1. E.g. 0.3 = 30% lighter; -0.4 = 40% darker.
 * @return string
 * @link https://stackoverflow.com/questions/3512311/how-to-generate-lighter-darker-color-with-php
 */
function adjustBrightness($hexCode, $adjustPercent) {
    $hexCode = ltrim($hexCode, '#');

    if (strlen($hexCode) == 3) {
        $hexCode = $hexCode[0] . $hexCode[0] . $hexCode[1] . $hexCode[1] . $hexCode[2] . $hexCode[2];
    }

    $hexCode = array_map('hexdec', str_split($hexCode, 2));

    foreach ($hexCode as & $color) {
        $adjustableLimit = $adjustPercent < 0 ? $color : 255 - $color;
        $adjustAmount = ceil($adjustableLimit * $adjustPercent);
        $color = str_pad(dechex($color + $adjustAmount), 2, '0', STR_PAD_LEFT);
    }

    return '#' . implode($hexCode);
}

/**
 * Minify HTML Output
 * @link https://stackoverflow.com/questions/6225351/how-to-minify-php-page-html-output
 *
 * @param $buffer
 * @return string|string[]|null
 */
function sanitize_output($buffer) {

    $search = array(
        '/\>[^\S ]+/s',     // strip whitespaces after tags, except space
        '/[^\S ]+\</s',     // strip whitespaces before tags, except space
        '/(\s)+/s',         // shorten multiple whitespace sequences
        '/<!--(.|\s)*?-->/' // Remove HTML comments
    );

    $replace = array(
        '>',
        '<',
        '\\1',
        ''
    );

    $buffer = preg_replace($search, $replace, $buffer);

    return $buffer;
}
