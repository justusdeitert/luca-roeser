<?php

/**
 * Adjust WP Customizer via Kirki Framwork
 * @link https://kirki.org/docs/
 */

/**
 * Custom Theme Font Array
 */
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
 * Custom Colors Array
 */
$theme_colors = [
    // Theme Colors
    'primary' => '#0d6efd',
    'secondary' => '#6c757d',
    'light' => '#f8f9fa',
    'dark' => '#212529',
    'border',
    // Standard Colors
    'font' => '#212529',
    'link' => '#0d6efd',
    'background' => '#f8f9fa',
    'border',
    // Alert Colors
    'success' => '#198754',
    'danger' => '#dc3545',
    'warning' => '#ffc107',
    'info' => '#0dcaf0',
];

/**
 * Check out the Kirki Doc
 * Execute Kirki Functions when plugin is installed
 * @link https://kirki.org/docs/
 */
if (class_exists('Kirki')) {


    /**
     * Custom Theme Settings
     */
    Kirki::add_panel('panel_theme_settings_id', array(
        'priority' => 10,
        'title' => __('Theme Settings', 'sage'),
        'description' => __('Custom Theme Settings', 'sage'),
    ));

    /**
     * Content & Container Sizes
     */
    function content_sizes() {
        Kirki::add_section('section_content_sizes_id', array(
            'title' => __('Content Sizes', 'sage'),
            'panel' => 'panel_theme_settings_id',
        ));

        Kirki::add_field('max_container_width_id', [
            'type' => 'slider',
            'settings' => 'max_container_width',
            'label' => __('Maximum Container width', 'sage'),
            'section' => 'section_content_sizes_id',
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
            'label' => __('Container padding (Mobile)', 'sage'),
            'section' => 'section_content_sizes_id',
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
            'label' => __('Container padding (Desktop)', 'sage'),
            'section' => 'section_content_sizes_id',
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
            'label' => __('Gutter size (Mobile)', 'sage'),
            'section' => 'section_content_sizes_id',
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
            'label' => __('Gutter size (Desktop)', 'sage'),
            'section' => 'section_content_sizes_id',
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
            'label' => __('Block spacing', 'sage'),
            'section' => 'section_content_sizes_id',
            'default' => 32,
            'choices' => [
                'min' => 16,
                'max' => 80,
                'step' => 1,
            ],
        ]);
    }

    /**
     * Font Settings
     */
    function font_settings($standard_google_fonts) {

        $standard_google_fonts_array = [];
        foreach ($standard_google_fonts as $key => $value) {
            $standard_google_fonts_array[$key] = $key . ' (' . ucfirst($value) . ')';
        }

        Kirki::add_section('section_font_settings_id', array(
            'title' => __('Font Settings', 'sage'),
            'panel' => 'panel_theme_settings_id',
        ));

        Kirki::add_field('custom_font_size_id', [
            'type' => 'slider',
            'settings' => 'custom_font_size',
            'label' => __('Custom Font Size', 'sage'),
            'section' => 'section_font_settings_id',
            'description' => __('The font size influences all sizes within the theme', 'sage'),
            'default' => 16,
            'choices' => [
                'min' => 14,
                'max' => 22,
                'step' => 1,
            ],
        ]);

        Kirki::add_field('custom_font_weight_id', [
            'type' => 'slider',
            'settings' => 'custom_font_weight',
            'label' => __('Custom Font Weight', 'sage'),
            'section' => 'section_font_settings_id',
            'default' => 400,
            'choices' => [
                'min' => 300,
                'max' => 500,
                'step' => 100,
            ],
        ]);

        Kirki::add_field('custom_headline_font_id', [
            'type' => 'select',
            'settings' => 'custom_headline_font',
            'label' => __('Headline Font', 'sage'),
            'section' => 'section_font_settings_id',
            'default' => 'Roboto',
            'placeholder' => __('Select an option...', 'sage'),
            'priority' => 10,
            'multiple' => 1,
            'choices' => $standard_google_fonts_array,
        ]);

        Kirki::add_field('custom_spacing_id_01', [
            'type' => 'custom',
            'settings' => 'custom_spacing_01',
            'section' => 'section_font_settings_id',
            'default' => '<div class="custom-spacing" style="height: 5px;" />',
        ]);

        Kirki::add_field('custom_text_font_id', [
            'type' => 'select',
            'settings' => 'custom_text_font',
            'label' => __('Text Font', 'sage'),
            'section' => 'section_font_settings_id',
            'default' => 'Roboto',
            'placeholder' => __('Select an option...', 'sage'),
            'priority' => 10,
            'multiple' => 1,
            'choices' => $standard_google_fonts_array,
        ]);
    }

    /**
     * Color Settings
     */
    function color_settings($theme_colors) {
        Kirki::add_section('section_color_settings_id', array(
            'title' => __('Color Settings', 'sage'),
            'panel' => 'panel_theme_settings_id',
        ));

        foreach ($theme_colors as $color => $value) {
            if ($value === 'border') {
                Kirki::add_field('custom_border_id_' . $color, [
                    'type' => 'custom',
                    'settings' => 'custom_border_' . $color,
                    'section' => 'section_color_settings_id',
                    'default' => '<hr style="border-top: 1px solid #B8B8B8; margin: 20px 0;"/>',
                ]);
            } else {
                Kirki::add_field('custom_' . $color . '_color_id', [
                    'type' => 'color',
                    'settings' => 'custom_' . $color . '_color',
                    'label' => __(ucfirst($color) . ' Color', 'sage'),
                    'section' => 'section_color_settings_id',
                    'default' => $value,
                ]);
            }
        }
    }

    /**
     * Box Settings
     */
    function box_settings() {
        Kirki::add_section('section_box_settings_id', array(
            'title' => __('Box Settings', 'sage'),
            'panel' => 'panel_theme_settings_id',
        ));

        Kirki::add_field('custom_border_width_id', [
            'type' => 'slider',
            'settings' => 'custom_border_width',
            'label' => __('Custom Border Width', 'sage'),
            'section' => 'section_box_settings_id',
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
            'section' => 'section_box_settings_id',
            // 'priority' => 10,
            'default' => 0,
            'choices' => [
                'min' => 0,
                'max' => 16,
                'step' => 1,
            ],
        ]);

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
            'section' => 'section_box_settings_id',
            'default' => 'no-shadow',
            'placeholder' => __('Select an option...', 'sage'),
            'priority' => 10,
            'multiple' => 1,
            'choices' => $box_shadow,
        ]);
    }

    /**
     * Icon Settings
     */
    function icon_settings() {
        Kirki::add_section('section_icon_settings_id', array(
            'title' => __('Icon Settings', 'sage'),
            'panel' => 'panel_theme_settings_id',
        ));

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
            'section' => 'section_icon_settings_id',
            'default' => 'bootstrap-icons',
            'placeholder' => __('Select an option...', 'sage'),
            'priority' => 10,
            'multiple' => 1,
            'choices' => $standard_icon_sets,
        ]);
    }

    /**
     * Menu Settings
     */
    function menu_settings() {
        Kirki::add_section('section_menu_settings_id', array(
            'title' => __('Menu Settings', 'sage'),
            'panel' => 'panel_theme_settings_id',
        ));

        Kirki::add_field('custom_menu_mobile_on_desktop_id', [
            'type' => 'toggle',
            'settings' => 'custom_menu_mobile_on_desktop',
            'label' => __('Mobile Menu on Desktop', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => '0',
        ]);

        Kirki::add_field('custom_menu_top_position_id', [
            'type' => 'slider',
            'settings' => 'custom_menu_top_position',
            'label' => __('Menu Height', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => 30,
            'choices' => [
                'min' => 10,
                'max' => 170,
                'step' => 1,
            ],
        ]);

        Kirki::add_field('custom_menu_height_id', [
            'type' => 'slider',
            'settings' => 'custom_menu_height',
            'label' => __('Menu Height', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => 60,
            'choices' => [
                'min' => 35,
                'max' => 170,
                'step' => 1,
            ],
        ]);

        Kirki::add_field('custom_menu_item_spacing_id', [
            'type' => 'slider',
            'settings' => 'custom_menu_item_spacing',
            'label' => __('Menu Item Spacing', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => 5,
            'choices' => [
                'min' => 5,
                'max' => 15,
                'step' => 1,
            ],
        ]);

        Kirki::add_field('custom_menu_center_primary_nav_id', [
            'type' => 'toggle',
            'settings' => 'custom_menu_center_primary_nav',
            'label' => __('Center Primary Nav', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => '0',
        ]);

        Kirki::add_field('custom_menu_icon_id', [
            'type' => 'image',
            'settings' => 'custom_menu_icon',
            'label' => __('Menu Icon', 'sage'),
            // 'description' => __('Description Here.', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => '',
            'choices' => [
                /**
                 * Save data as array.
                 */
                'save_as' => 'array',
            ],
        ]);

        Kirki::add_field('custom_menu_icon_size_id', [
            'type' => 'slider',
            'settings' => 'custom_menu_icon_size',
            'label' => __('Menu Icon Size in %', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => 80,
            'choices' => [
                'min' => 50,
                'max' => 100,
                'step' => 1,
            ],
        ]);

        Kirki::add_field('custom_menu_icon_wrapper_width_id', [
            'type' => 'slider',
            'settings' => 'custom_menu_icon_wrapper_width',
            'label' => __('Menu Icon Wrapper Width', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => 60,
            'choices' => [
                'min' => 30,
                'max' => 120,
                'step' => 1,
            ],
        ]);

        Kirki::add_field('custom_menu_font_size_id', [
            'type' => 'slider',
            'settings' => 'custom_menu_font_size',
            'label' => __('Menu Font Size', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => 16,
            'choices' => [
                'min' => 14,
                'max' => 24,
                'step' => 1,
            ],
        ]);

        Kirki::add_field('custom_menu_font_weight_id', [
            'type' => 'slider',
            'settings' => 'custom_menu_font_weight',
            'label' => __('Menu Font Weight', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => 400,
            'choices' => [
                'min' => 300,
                'max' => 500,
                'step' => 100,
            ],
        ]);

        Kirki::add_field('custom_menu_item_separator_id', [
            'type' => 'select',
            'settings' => 'custom_menu_item_separator',
            'label' => __('Custom Menu Item Separator', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => 'none',
            'placeholder' => __('Select an option...', 'sage'),
            // 'priority'    => 10,
            'multiple' => 1,
            'choices' => [
                'none' => __('No Separator', 'sage'),
                '-' => '-',
                '/' => '/',
                '|' => '|',
            ],
        ]);

        Kirki::add_field('custom_menu_is_transparent_id', [
            'type' => 'toggle',
            'settings' => 'custom_menu_is_transparent',
            'label' => __('Transparent Menu', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => '0',
        ]);

        Kirki::add_field('custom_menu_link_color_id', [
            'type' => 'color',
            'settings' => 'custom_menu_link_color',
            'label' => __('Menu Link Color', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => '#212529',
        ]);

        Kirki::add_field('custom_menu_link_active_color_id', [
            'type' => 'color',
            'settings' => 'custom_menu_link_active_color',
            'label' => __('Menu Link Active Color', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => '#212529',
        ]);

        Kirki::add_field('custom_menu_link_active_background_color_id', [
            'type' => 'color',
            'settings' => 'custom_menu_link_active_background_color',
            'label' => __('Menu Link Active Background Color', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => '#f8f9fa',
        ]);

        Kirki::add_field('custom_menu_background_color_id', [
            'type' => 'color',
            'settings' => 'custom_menu_background_color',
            'label' => __('Menu Background Color', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => '#f8f9fa',
        ]);

        /**
         * Submenu Colors
         */
        Kirki::add_field('custom_submenu_link_color_id', [
            'type' => 'color',
            'settings' => 'custom_submenu_link_color',
            'label' => __('Submenu Link Color', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => '#212529',
        ]);

        Kirki::add_field('custom_submenu_link_active_color_id', [
            'type' => 'color',
            'settings' => 'custom_submenu_link_active_color',
            'label' => __('Submenu Link Active Color', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => '#212529',
        ]);

        /**
         * Custom Opening Hours via ACF Pro
         */
        $opening_hours = get_field('opening_hours', 'option');
        if ($opening_hours && array_filter($opening_hours)) {
            Kirki::add_field('custom_menu_has_opening_hours_id', [
                'type' => 'toggle',
                'settings' => 'custom_menu_has_opening_hours',
                'label' => __('Add Opening Hours', 'sage'),
                'section' => 'section_menu_settings_id',
                'default' => '0',
            ]);
        }
    }

    /**
     * Footer Settings
     */
    function footer_settings() {
        Kirki::add_section('section_footer_settings_id', array(
            'title' => __('Footer Settings', 'sage'),
            'panel' => 'panel_theme_settings_id',
        ));

        Kirki::add_field('custom_footer_background_color_id', [
            'type' => 'color',
            'settings' => 'custom_footer_background_color',
            'label' => __('Footer Background color', 'sage'),
            'section' => 'section_footer_settings_id',
            'default' => '#f8f9fa',
        ]);

        Kirki::add_field('custom_footer_text_color_id', [
            'type' => 'color',
            'settings' => 'custom_footer_text_color',
            'label' => __('Footer Background color', 'sage'),
            'section' => 'section_footer_settings_id',
            'default' => '#f8f9fa',
        ]);

        Kirki::add_field('custom_footer_link_color_id', [
            'type' => 'color',
            'settings' => 'custom_footer_link_color',
            'label' => __('Footer Background color', 'sage'),
            'section' => 'section_footer_settings_id',
            'default' => '#f8f9fa',
        ]);
    }

    /**
     * Init Settings
     */
    content_sizes();
    font_settings($standard_google_fonts);
    color_settings($theme_colors);
    box_settings();
    icon_settings();
    menu_settings();
    footer_settings();
}
