<?php

$standard_google_fonts = [
    'Montserrat' => 'sans-serif',
    'Source Sans Pro' => 'sans-serif',
    'Oswald' => 'sans-serif',
    'Lato' => 'sans-serif',
    'Open Sans' => 'sans-serif',
    'Raleway' => 'sans-serif',
    'Roboto' => 'sans-serif',
    'Roboto Slab' => 'serif', // serif
    'Barlow' => 'sans-serif',
    'Quicksand' => 'sans-serif',
    'Poppins' => 'sans-serif',
];

/**
 * Check out the Kirki Doc
 * Execute Kirki Functions when plugin is installed
 * @link https://kirki.org/docs/
 */
if (class_exists('Kirki')) {

    Kirki::add_section('theme_settings_id', array(
        'title' => __('Theme Settings', 'sage'),
        // 'description' => __('Custom Theme Settings', 'sage'),
        // 'panel'          => 'panel_id',
        'priority' => 40,
    ));

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

    /**
     * Custom Border
     */
    Kirki::add_field('custom_border_id_01', [
        'type' => 'custom',
        'settings' => 'custom_border_01',
        'section' => 'theme_settings_id',
        'default' => '<hr style="border-top: 1px solid #B8B8B8; margin: 20px 0;"/>',
    ]);

    Kirki::add_field('mobile_container_padding_id', [
        'type' => 'slider',
        'settings' => 'mobile_container_padding',
        'label' => __('(Mobile) Content padding', 'sage'),
        'section' => 'theme_settings_id',
        'default' => 15,
        'choices' => [
            'min' => 5,
            'max' => 40,
            'step' => 5,
        ],
    ]);

    Kirki::add_field('tablet_container_padding_id', [
        'type' => 'slider',
        'settings' => 'tablet_container_padding',
        'label' => __('(Tablet) Content padding', 'sage'),
        'section' => 'theme_settings_id',
        'default' => 30,
        'choices' => [
            'min' => 10,
            'max' => 100,
            'step' => 10,
        ],
    ]);

    /**
     * Custom Border
     */
    Kirki::add_field('custom_border_id_02', [
        'type' => 'custom',
        'settings' => 'custom_border_02',
        'section' => 'theme_settings_id',
        'default' => '<hr style="border-top: 1px solid #B8B8B8; margin: 20px 0;"/>',
    ]);

    /**
     * Select Fonts
     */
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

    $standard_google_fonts_array = [];
    foreach ($standard_google_fonts as $key => $value) {
        $standard_google_fonts_array[$key] = $key;
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

    /**
     * Custom Break
     */
    Kirki::add_field('custom_spacing_id_01', [
        'type' => 'custom',
        'settings' => 'custom_spacing_01',
        'section' => 'theme_settings_id',
        'default' => '<div class="custom-spacing" style="height: 10px;" />',
    ]);

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

    /**
     * Custom Border
     */
    Kirki::add_field('custom_border_id_03', [
        'type' => 'custom',
        'settings' => 'custom_border_03',
        'section' => 'theme_settings_id',
        'default' => '<hr style="border-top: 1px solid #B8B8B8; margin: 20px 0;"/>',
    ]);

    /**
     * Color System
     */
    $theme_colors = [
        'primary' => '#0d6efd',
        // 'secondary' => '#6c757d',
        // 'success' => '#198754',
        // 'danger' => '#dc3545',
        // 'warning' => '#ffc107',
        // 'info' => '#0dcaf0',
        'light' => '#f8f9fa',
        'dark' => '#212529',
    ];

    $colors = array_values($theme_colors);
    // var_dump($colors);

    foreach ($theme_colors as $color => $default_value) {
        Kirki::add_field('custom_' . $color . '_color_id', [
            'type' => 'color',
            'settings' => 'custom_' . $color . '_color',
            'label' => __(ucfirst($color) . ' Color', 'sage'),
            'section' => 'theme_settings_id',
            'default' => $default_value,
        ]);
    }

    /**
     * Custom Border
     */
    Kirki::add_field('custom_border_id_04', [
        'type' => 'custom',
        'settings' => 'custom_border_04',
        'section' => 'theme_settings_id',
        'default' => '<hr style="border-top: 1px solid #B8B8B8; margin: 20px 0;"/>',
    ]);

    // Kirki::add_field('theme_config_id', [
    //     'type' => 'color-palette',
    //     'settings' => 'color_palette_setting_0',
    //     'label' => esc_html__('Color-Palette', 'kirki'),
    //     'description' => esc_html__('This is a color-palette control', 'kirki'),
    //     'section' => 'theme_settings_id',
    //     'default' => '#000000',
    //     'choices' => [
    //         'colors' => $colors,
    //         'style' => 'round',
    //     ],
    // ]);

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

