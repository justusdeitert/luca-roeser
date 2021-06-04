<?php

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
    Kirki::add_field('custom_border_01_id', [
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
    Kirki::add_field('custom_border_02_id', [
        'type' => 'custom',
        'settings' => 'custom_border_02',
        'section' => 'theme_settings_id',
        'default' => '<hr style="border-top: 1px solid #B8B8B8; margin: 20px 0;"/>',
    ]);

    /**
     * Select Fonts
     */

    $standard_google_fonts = [
        'Montserrat',
        'Source Sans Pro',
        'Oswald',
        'Lato',
        'Open Sans',
        'Raleway',
        'Roboto',
        'Barlow',
        'Roboto Slap',
        'Quicksand',
        'Poppins',
    ];

    $standard_google_fonts_array = [];

    foreach ($standard_google_fonts as $standard_google_font) {
        $standard_google_fonts_array[$standard_google_font] = $standard_google_font;
    }

    // var_dump($standard_google_fonts_array);

    Kirki::add_field('custom_body_font_id', [
        'type' => 'select',
        'settings' => 'custom_body_font',
        'label' => __('Standard Font', 'sage'),
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
    Kirki::add_field('custom_spacing_01_id', [
        'type' => 'custom',
        'settings' => 'custom_spacing_01',
        'section' => 'theme_settings_id',
        'default' => '<div class="custom-spacing" style="height: 10px;" />',
    ]);

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


    // Kirki::add_field('theme_config_id', [
    //     'type' => 'code',
    //     'settings' => 'code_setting',
    //     'label' => esc_html__('Code Control', 'kirki'),
    //     'description' => esc_html__('Description', 'kirki'),
    //     'section' => 'theme_settings_id',
    //     'default' => '',
    //     'choices' => [
    //         'language' => 'css',
    //     ],
    // ]);

}
