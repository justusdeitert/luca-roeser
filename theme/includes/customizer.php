<?php

/**
 * Adjust WP Customizer via Kirki Framwork
 * @link https://kirki.org/docs/
 */

/**
 * Custom Theme Font Array
 */
$GLOBALS['standard_google_fonts'] = [
    'Montserrat' => 'sans-serif',
    'Montserrat Alternates' => 'sans-serif',
    'Source Sans Pro' => 'sans-serif',
    'Oswald' => 'sans-serif',
    'Lato' => 'sans-serif',
    'Lora' => 'serif',
    'Open Sans' => 'sans-serif',
    'Raleway' => 'sans-serif',
    'Roboto' => 'sans-serif',
    'Roboto Slab' => 'serif',
    'Barlow' => 'sans-serif',
    'Quicksand' => 'sans-serif',
    'Poppins' => 'sans-serif',
    'Inter' => 'sans-serif',
];

/**
 * General Colors
 */
$GLOBALS['general_colors'] = [

    // Standard Colors
    'primary' => '#0d6efd',
    'secondary' => '#6c757d',
    'tertiary' => '#6c757d',
    'quaternary' => '#6c757d',
    'light' => '#f8f9fa',
    'dark' => '#212529',

    // Alert Colors
    'success' => '#198754',
    'danger' => '#dc3545',
    'warning' => '#ffc107',
    'info' => '#0dcaf0',
];

/**
 * Theme Box Shadow Variants
 * Further implementation & corresponding css box shadows in
 * @file theme/includes/add-customizer-theme-styles.php
 */
$GLOBALS['box_shadows'] = [
    'no-shadow' => 'No Shadow',
    'shadow-sm' => 'Small Shadow',
    'shadow' => 'Shadow',
    'shadow-md' => 'Medium Shadow',
    'shadow-lg' => 'Large Shadow',
];

/**
 * Default Messages for Cookie Consent Notice
 */
$default_cookie_message = 'This website uses essential cookies to ensure its proper operation and tracking cookies to understand how the user interacts with it. The latter will be set only upon approval. <button type="button" data-cc="c-settings" aria-haspopup="dialog">Cookie Settings</button>';

/**
 * Check out the Kirki Doc
 * Execute Kirki Functions when plugin is installed
 * @link https://kirki.org/docs/
 */
if (class_exists('Kirki')) {

    add_action( 'init', function() {

        function custom_kirki_border($section) {
            $unique_id = uniqid();
            Kirki::add_field('custom_border_id_' . $unique_id, [
                'type' => 'custom',
                'settings' => 'custom_border_' . $unique_id,
                'section' => $section,
                'default' => '<hr class="custom-border" style="border-top: 1px solid #B8B8B8; margin: 20px 0 25px 0;"/>',
            ]);
        }

        function custom_kirki_spacing($section, $height) {
            $unique_id = uniqid();
            Kirki::add_field('custom_spacing_id_' . $unique_id, [
                'type' => 'custom',
                'settings' => 'custom_spacing_' . $unique_id,
                'section' => $section,
                'default' => '<div class="custom-spacing" style="height: ' . $height . 'px;" />',
            ]);
        }

        function custom_kirki_headline($section, $headline_string, $headline_type) {
            $unique_id = uniqid();
            Kirki::add_field('custom_headline_id_' . $unique_id, [
                'type' => 'custom',
                'settings' => 'custom_headline_' . $unique_id,
                'section' => $section,
                'default' => '<' . $headline_type . ' class="custom-headline">' . $headline_string . '</' . $headline_type . '>',
            ]);
        }

        function custom_button_color_select($color_name, $default_color, $section) {
            $color_name_adjusted = str_replace('_', ' ', $color_name);
            Kirki::add_field('custom_color_select_' . $color_name . '_id', [
                'type' => 'radio',
                'settings' => 'custom_color_select_' . $color_name,
                'label' => __(ucwords($color_name_adjusted) . ' Color', 'sage'),
                'section' => $section,
                'default' => $default_color,
                'choices' => [
                    // Standard Colors
                    'primary' => __('Primary', 'sage'),
                    'secondary' => __('Secondary', 'sage'),
                    'tertiary' => __('Tertiary', 'sage'),
                    'quaternary' => __('Quaternary', 'sage'),
                    'light' => __('Light', 'sage'),
                    'dark' => __('Dark', 'sage'),

                    // Alert Colors
                    'success' => __('Success', 'sage'),
                    'danger' => __('Danger', 'sage'),
                    'warning' => __('Warning', 'sage'),
                    'info' => __('Info', 'sage')
                ],
            ]);
        }

        function custom_color_select($color_name, $default_color, $section) {
            $color_name_adjusted = str_replace('_', ' ', $color_name);
            Kirki::add_field('custom_color_select_' . $color_name . '_id', [
                'type' => 'radio',
                'settings' => 'custom_color_select_' . $color_name,
                'label' => __(ucwords($color_name_adjusted) . ' Color', 'sage'),
                'section' => $section,
                'default' => $default_color,
                'choices' => [
                    // Standard Colors
                    'primary' => __('Primary', 'sage'),
                    'secondary' => __('Secondary', 'sage'),
                    'tertiary' => __('Tertiary', 'sage'),
                    'quaternary' => __('Quaternary', 'sage'),

                    // Light Variations
                    'light' => __('Light', 'sage'),
                    'light-100' => __('Light 100', 'sage'),
                    'light-200' => __('Light 200', 'sage'),
                    'light-300' => __('Light 300', 'sage'),
                    // 'light-400' => __('Light 400', 'sage'),
                    // 'light-500' => __('Light 500', 'sage'),
                    // 'light-600' => __('Light 600', 'sage'),

                    // Dark Variations
                    'dark' => __('Dark', 'sage'),
                    'dark-100' => __('Dark 100', 'sage'),
                    'dark-200' => __('Dark 200', 'sage'),
                    'dark-300' => __('Dark 300', 'sage'),

                    // Dark/Light Variation
                    'dark-light-100' => __('Dark/Light 100', 'sage'),
                    'dark-light-200' => __('Dark/Light 200', 'sage'),
                    'dark-light-300' => __('Dark/Light 300', 'sage'),

                    // 'dark-400' => __('Dark 400', 'sage'),
                    // 'dark-500' => __('Dark 500', 'sage'),
                    // 'dark-600' => __('Dark 600', 'sage'),

                    // Alert Colors
                    'success' => __('Success', 'sage'),
                    'danger' => __('Danger', 'sage'),
                    'warning' => __('Warning', 'sage'),
                    'info' => __('Info', 'sage')
                ],
            ]);
        }

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
        function content_settings() {

            Kirki::add_section('section_content_settings_id', array(
                'title' => __('Content', 'sage'),
                'panel' => 'panel_theme_settings_id',
            ));

            custom_kirki_spacing('section_content_settings_id', 16);

            Kirki::add_field('max_container_width_id', [
                'type' => 'slider',
                'settings' => 'max_container_width',
                'label' => __('Maximum Container width', 'sage'),
                // 'description' => __('Define the maximum content width', 'sage'),
                'section' => 'section_content_settings_id',
                // 'priority' => 10,
                'default' => 1280,
                'choices' => [
                    'min' => 560,
                    'max' => 1920,
                    'step' => 10,
                ],
            ]);

            custom_kirki_border('section_content_settings_id');

            custom_color_select('body_background', 'light', 'section_content_settings_id');

            custom_kirki_border('section_content_settings_id');

            custom_color_select('controls', 'dark', 'section_content_settings_id');

            custom_kirki_border('section_content_settings_id');

            Kirki::add_field('container_padding_mobile_id', [
                'type' => 'slider',
                'settings' => 'container_padding_mobile',
                'label' => __('Container padding (Mobile)', 'sage'),
                'section' => 'section_content_settings_id',
                'default' => 15,
                'choices' => [
                    'min' => 5,
                    'max' => 40,
                    'step' => 5,
                ],
            ]);

            custom_kirki_border('section_content_settings_id');

            Kirki::add_field('container_padding_desktop_id', [
                'type' => 'slider',
                'settings' => 'container_padding_desktop',
                'label' => __('Container padding (Desktop)', 'sage'),
                'section' => 'section_content_settings_id',
                'default' => 30,
                'choices' => [
                    'min' => 10,
                    'max' => 100,
                    'step' => 10,
                ],
            ]);

            custom_kirki_border('section_content_settings_id');

            Kirki::add_field('custom_gutter_size_mobile_id', [
                'type' => 'slider',
                'settings' => 'custom_gutter_size_mobile',
                'label' => __('Gutter size (Mobile)', 'sage'),
                'section' => 'section_content_settings_id',
                'default' => 20,
                'choices' => [
                    'min' => 10,
                    'max' => 40,
                    'step' => 1,
                ],
            ]);

            custom_kirki_border('section_content_settings_id');

            Kirki::add_field('custom_gutter_size_desktop_id', [
                'type' => 'slider',
                'settings' => 'custom_gutter_size_desktop',
                'label' => __('Gutter size (Desktop)', 'sage'),
                'section' => 'section_content_settings_id',
                'default' => 30,
                'choices' => [
                    'min' => 20,
                    'max' => 60,
                    'step' => 1,
                ],
            ]);

            custom_kirki_border('section_content_settings_id');

            Kirki::add_field('custom_block_spacing_id', [
                'type' => 'slider',
                'settings' => 'custom_block_spacing',
                'label' => __('Block spacing', 'sage'),
                'section' => 'section_content_settings_id',
                'default' => 48,
                'choices' => [
                    'min' => 16,
                    'max' => 80,
                    'step' => 1,
                ],
            ]);

            custom_kirki_border('section_content_settings_id');

            Kirki::add_section('section_box_settings_id', array(
                'title' => __('Box Settings', 'sage'),
                'panel' => 'panel_theme_settings_id',
            ));

            Kirki::add_field('custom_border_width_id', [
                'type' => 'slider',
                'settings' => 'custom_border_width',
                'label' => __('Border Width', 'sage'),
                'section' => 'section_content_settings_id',
                'default' => 0,
                'choices' => [
                    'min' => 0,
                    'max' => 20,
                    'step' => 1,
                ],
            ]);

            custom_kirki_border('section_content_settings_id');

            Kirki::add_field('custom_border_radius_id', [
                'type' => 'slider',
                'settings' => 'custom_border_radius',
                'label' => __('Border Radius', 'sage'),
                'section' => 'section_content_settings_id',
                'default' => 0,
                'choices' => [
                    'min' => 0,
                    'max' => 16,
                    'step' => 1,
                ],
            ]);

            custom_kirki_border('section_content_settings_id');

            Kirki::add_field('custom_shadow_id', [
                'type' => 'select',
                'settings' => 'custom_shadow',
                'label' => __('Shadow', 'sage'),
                'section' => 'section_content_settings_id',
                'default' => 'no-shadow',
                'placeholder' => __('Select an option...', 'sage'),
                'priority' => 10,
                'multiple' => 1,
                'choices' => $GLOBALS['box_shadows'],
            ]);
        }

        /**
         * Font Settings
         */
        function font_settings() {

            $standard_google_fonts_array = [];
            foreach ($GLOBALS['standard_google_fonts'] as $key => $value) {
                $standard_google_fonts_array[$key] = $key . ' (' . ucfirst($value) . ')';
            }

            Kirki::add_section('section_font_settings_id', array(
                'title' => __('Font', 'sage'),
                'panel' => 'panel_theme_settings_id',
            ));

            Kirki::add_field('custom_font_size_id', [
                'type' => 'slider',
                'settings' => 'custom_font_size',
                'label' => __('Font Size', 'sage'),
                'section' => 'section_font_settings_id',
                // 'description' => __('The font size influences all other font sizes & spacings within the theme', 'sage'),
                'default' => 16,
                'choices' => [
                    'min' => 14,
                    'max' => 22,
                    'step' => 1,
                ],
            ]);

            custom_kirki_border('section_font_settings_id');

            Kirki::add_field('custom_font_weight_id', [
                'type' => 'radio',
                'settings' => 'custom_font_weight',
                'label' => __('Font Weight', 'sage'),
                'section' => 'section_font_settings_id',
                'default' => '400',
                'choices' => [
                    '300' => __('Thin', 'sage'),
                    '400' => __('Medium', 'sage'),
                    '500' => __('Bold', 'sage'),
                ],
            ]);

            custom_kirki_border('section_font_settings_id');

            Kirki::add_field('custom_headline_weight_id', [
                'type' => 'radio',
                'settings' => 'custom_headline_weight',
                'label' => __('Headline Weight', 'sage'),
                'section' => 'section_font_settings_id',
                'default' => '400',
                'choices' => [
                    '300' => __('Thin', 'sage'),
                    '400' => __('Medium', 'sage'),
                    '500' => __('Bold', 'sage'),
                ],
            ]);

            custom_kirki_border('section_font_settings_id');

            custom_color_select('font', 'dark', 'section_font_settings_id');

            custom_kirki_border('section_font_settings_id');

            custom_color_select('link', 'primary', 'section_font_settings_id');

            custom_kirki_border('section_font_settings_id');

            custom_color_select('link_hover', 'primary', 'section_font_settings_id');

            custom_kirki_border('section_font_settings_id');

            Kirki::add_field('custom_headline_font_id', [
                'type' => 'select',
                'settings' => 'custom_headline_font',
                'label' => __('Headline Font', 'sage'),
                'section' => 'section_font_settings_id',
                // 'description' => __('Font used for all Headline Types.<br>H1, H2, H3, H4, H5, H6', 'sage'),
                'default' => 'Roboto',
                'placeholder' => __('Select an option...', 'sage'),
                'priority' => 10,
                'multiple' => 1,
                'choices' => $standard_google_fonts_array,
            ]);

            custom_kirki_border('section_font_settings_id');

            Kirki::add_field('custom_text_font_id', [
                'type' => 'select',
                'settings' => 'custom_text_font',
                'label' => __('Text Font', 'sage'),
                'section' => 'section_font_settings_id',
                // 'description' => __('Font used for all Texts.', 'sage'),
                'default' => 'Roboto',
                'placeholder' => __('Select an option...', 'sage'),
                'priority' => 10,
                'multiple' => 1,
                'choices' => $standard_google_fonts_array,
            ]);

            custom_kirki_border('section_font_settings_id');

            $standard_icon_sets = [
                'bootstrap-icons' => 'Bootstrap Icons',
                'feather-icons' => 'Feather Icons',
                'ionicons' => 'Ionicons',
            ];

            Kirki::add_field('custom_icons_id', [
                'type' => 'select',
                'settings' => 'custom_icons',
                'label' => __('Icon Set', 'sage'),
                'section' => 'section_font_settings_id',
                // 'description' => __('Select the custom Icon font.', 'sage'),
                'default' => 'bootstrap-icons',
                'placeholder' => __('Select an option...', 'sage'),
                'priority' => 10,
                'multiple' => 1,
                'choices' => $standard_icon_sets,
            ]);
        }

        /**
         * Color Settings
         */
        function color_settings() {

            Kirki::add_section('section_color_settings_id', array(
                'title' => __('Colors', 'sage'),
                'panel' => 'panel_theme_settings_id',
            ));

            function cleanColorName($color_name) {
                $new_color_name = str_replace('_', ' ', $color_name);
                $new_color_name = ucwords($new_color_name);
                return $new_color_name;
            }

            foreach ($GLOBALS['general_colors'] as $color => $value) {
                Kirki::add_field('custom_' . $color . '_color_id', [
                    'type' => 'color',
                    'settings' => 'custom_' . $color . '_color',
                    'label' => __(cleanColorName($color) . ' Color', 'sage'),
                    'section' => 'section_color_settings_id',
                    'default' => $value,
                ]);

                custom_kirki_border('section_color_settings_id');
            }
        }

        /**
         * Menu Settings
         */
        function navbar_settings() {

            Kirki::add_section('section_navbar_settings_id', array(
                'title' => __('Navbar', 'sage'),
                'panel' => 'panel_theme_settings_id',
            ));

            custom_kirki_spacing('section_navbar_settings_id', 24);

            Kirki::add_field('custom_mobile_menu_only_id', [
                'type' => 'toggle',
                'settings' => 'custom_mobile_menu_only',
                'label' => __('Mobile Menu Only', 'sage'),
                'section' => 'section_navbar_settings_id',
                'default' => '0',
            ]);

            custom_kirki_border('section_navbar_settings_id');

            /**
             * Custom Opening Hours via ACF Pro
             */
            if (class_exists('ACF')) {
                Kirki::add_field('custom_menu_has_opening_hours_id', [
                    'type' => 'toggle',
                    'settings' => 'custom_menu_has_opening_hours',
                    'label' => __('Add Opening Hours', 'sage'),
                    'section' => 'section_navbar_settings_id',
                    'default' => '0',
                ]);
            }

            custom_kirki_border('section_navbar_settings_id');

            Kirki::add_field('custom_navbar_height_id', [
                'type' => 'slider',
                'settings' => 'custom_navbar_height',
                'label' => __('Navbar Height', 'sage'),
                'section' => 'section_navbar_settings_id',
                'default' => 60,
                'choices' => [
                    'min' => 35,
                    'max' => 170,
                    'step' => 1,
                ],
            ]);

            custom_kirki_border('section_navbar_settings_id');

            Kirki::add_field('custom_navbar_behavior_id', [
                'type' => 'radio',
                'settings' => 'custom_navbar_behavior',
                'label' => __('Navbar Behavior', 'sage'),
                'section' => 'section_navbar_settings_id',
                'default' => 'moving',
                'choices' => [
                    'moving' => __('Moving', 'sage'),
                    'fixed' => __('Fixed', 'sage'),
                ],
            ]);

            custom_kirki_border('section_navbar_settings_id');

            Kirki::add_field('custom_navbar_top_position_id', [
                'type' => 'slider',
                'settings' => 'custom_navbar_top_position',
                'label' => __('Navbar Top Position', 'sage'),
                'section' => 'section_navbar_settings_id',
                'default' => 0,
                'choices' => [
                    'min' => 0,
                    'max' => 200,
                    'step' => 5,
                ],
            ]);

            custom_kirki_border('section_navbar_settings_id');

            Kirki::add_field('custom_full_width_navbar_id', [
                'type' => 'toggle',
                'settings' => 'custom_full_width_navbar',
                'label' => __('Full Width Navbar', 'sage'),
                'section' => 'section_navbar_settings_id',
                'default' => '0',
            ]);

            custom_kirki_border('section_navbar_settings_id');

            Kirki::add_field('custom_navbar_shadow_id', [
                'type' => 'select',
                'settings' => 'custom_navbar_shadow',
                'label' => __('Navbar Shadow', 'sage'),
                'section' => 'section_navbar_settings_id',
                // 'description' => __('Define the custom box shadow of the navbar', 'sage'),
                'default' => 'no-shadow',
                'placeholder' => __('Select an option...', 'sage'),
                // 'priority' => 10,
                'multiple' => 1,
                'choices' => $GLOBALS['box_shadows'],
            ]);

            custom_kirki_border('section_navbar_settings_id');

            Kirki::add_field('custom_navbar_logo_image_id', [
                'type' => 'image',
                'settings' => 'custom_navbar_logo_image',
                'label' => __('Navbar Logo', 'sage'),
                'section' => 'section_navbar_settings_id',
                'default' => '',
                'choices' => [
                    /**
                     * Save data as array.
                     */
                    'save_as' => 'array',
                ],
            ]);

            custom_kirki_border('section_navbar_settings_id');

            Kirki::add_field('custom_navbar_logo_height_id', [
                'type' => 'slider',
                'settings' => 'custom_navbar_logo_height',
                'label' => __('Navbar Logo Height (in %)', 'sage'),
                'section' => 'section_navbar_settings_id',
                'default' => 80,
                'choices' => [
                    'min' => 50,
                    'max' => 100,
                    'step' => 1,
                ],
                // 'active_callback' => function () {
                //     if (get_theme_mod('custom_navbar_logo_image') && get_theme_mod('custom_navbar_logo_image')['url']) {
                //         return true;
                //     }
                //     return false;
                // },
            ]);

            custom_kirki_border('section_navbar_settings_id');

            Kirki::add_field('custom_navbar_logo_wrapper_width_id', [
                'type' => 'slider',
                'settings' => 'custom_navbar_logo_wrapper_width',
                'label' => __('Navbar Logo Wrapper Width', 'sage'),
                'section' => 'section_navbar_settings_id',
                'default' => 60,
                'choices' => [
                    'min' => 30,
                    'max' => 120,
                    'step' => 1,
                ],
                // 'active_callback' => function () {
                //     if (get_theme_mod('custom_navbar_logo_image') && get_theme_mod('custom_navbar_logo_image')['url']) {
                //         return true;
                //     }
                //     return false;
                // },
            ]);

            custom_kirki_border('section_navbar_settings_id');
            // custom_kirki_headline('section_navbar_settings_id', 'Navbar Font Settings', 'h2');

            Kirki::add_field('custom_navbar_font_size_id', [
                'type' => 'slider',
                'settings' => 'custom_navbar_font_size',
                'label' => __('Navbar Font Size', 'sage'),
                'section' => 'section_navbar_settings_id',
                'default' => 16,
                'choices' => [
                    'min' => 14,
                    'max' => 24,
                    'step' => 1,
                ],
            ]);

            custom_kirki_border('section_navbar_settings_id');

            Kirki::add_field('custom_navbar_font_weight_id', [
                'type' => 'slider',
                'settings' => 'custom_navbar_font_weight',
                'label' => __('Navbar Font Weight', 'sage'),
                'section' => 'section_navbar_settings_id',
                'default' => 400,
                'choices' => [
                    'min' => 300,
                    'max' => 500,
                    'step' => 100,
                ],
            ]);

            custom_kirki_border('section_navbar_settings_id');

            Kirki::add_field('custom_navbar_item_spacing_id', [
                'type' => 'slider',
                'settings' => 'custom_navbar_item_spacing',
                'label' => __('Navbar Item Spacing', 'sage'),
                'section' => 'section_navbar_settings_id',
                'default' => 5,
                'choices' => [
                    'min' => 5,
                    'max' => 30,
                    'step' => 1,
                ],
            ]);

            custom_kirki_border('section_navbar_settings_id');

            Kirki::add_field('custom_menu_item_separator_id', [
                'type' => 'select',
                'settings' => 'custom_menu_item_separator',
                'label' => __('Navbar Item Separator', 'sage'),
                'section' => 'section_navbar_settings_id',
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

            custom_kirki_border('section_navbar_settings_id');
            // custom_kirki_headline('section_navbar_settings_id', 'Navbar Order & Spacing', 'h2');

            Kirki::add_field('custom_navbar_order_id', [
                'type' => 'sortable',
                'settings' => 'custom_navbar_order',
                'label' => __('Navbar Item Order', 'sage'),
                'section' => 'section_navbar_settings_id',
                'default' => [
                    'logo',
                    'business_hours',
                    'primary_menu',
                    'secondary_menu',
                    'burger_menu_icon',
                ],
                'choices' => [
                    'logo' => __('Logo', 'sage'),
                    'business_hours' => __('Business Hours', 'sage'),
                    'primary_menu' => __('Primary Menu', 'sage'),
                    'secondary_menu' => __('Secondary Menu', 'sage'),
                    'burger_menu_icon' => __('Burger Menu Icon', 'sage'),
                ],
            ]);

            custom_kirki_border('section_navbar_settings_id');

            // Navbar items
            $navbar_items = [
                'logo' => __('Logo', 'sage'),
                'business_hours' => __('Business Hours', 'sage'),
                'primary_menu' => __('Primary Menu', 'sage'),
                'secondary_menu' => __('Secondary Menu', 'sage'),
                'burger_menu_icon' => __('Burger Menu Icon', 'sage'),
            ];

            foreach ($navbar_items as $item => $value) {

                $one = '';
                $two = '';

                if ($item === 'primary_menu' || $item === 'secondary_menu' || $item === 'burger_menu_icon') {
                    $one = 'left';
                    $two = '';
                }

                Kirki::add_field('custom_navbar_' . $item . '_spacing_id', [
                    'type' => 'multicheck',
                    'settings' => 'custom_navbar_' . $item . '_spacing',
                    'label' => __($value . ' Spacing', 'sage'),
                    'section' => 'section_navbar_settings_id',
                    'default' => [$one, $two],
                    'choices' => [
                        'left' => __('Left', 'sage'),
                        'right' => __('Right', 'sage'),
                    ],
                ]);

                custom_kirki_border('section_navbar_settings_id');
            }

            Kirki::add_field('custom_navbar_submenu_item_height_id', [
                'type' => 'slider',
                'settings' => 'custom_navbar_submenu_item_height',
                'label' => __('Navbar Submenu Item Height', 'sage'),
                'section' => 'section_navbar_settings_id',
                'default' => 40,
                'choices' => [
                    'min' => 30,
                    'max' => 80,
                    'step' => 5,
                ],
            ]);

            custom_kirki_border('section_navbar_settings_id');

            custom_color_select('navbar_background', 'light', 'section_navbar_settings_id');

            custom_kirki_border('section_navbar_settings_id');

            custom_color_select('navbar_font', 'dark', 'section_navbar_settings_id');

            custom_kirki_border('section_navbar_settings_id');

            custom_color_select('navbar_font_active', 'dark', 'section_navbar_settings_id');

            custom_kirki_border('section_navbar_settings_id');

            custom_color_select('navbar_background_active', 'light', 'section_navbar_settings_id');

            custom_kirki_border('section_navbar_settings_id');

            custom_color_select('navbar_submenu_background', 'light', 'section_navbar_settings_id');

            custom_kirki_border('section_navbar_settings_id');

            custom_color_select('navbar_submenu_font', 'dark', 'section_navbar_settings_id');

            custom_kirki_border('section_navbar_settings_id');

            custom_color_select('navbar_submenu_font_active', 'dark', 'section_navbar_settings_id');

            custom_kirki_border('section_navbar_settings_id');

            custom_color_select('navbar_submenu_background_active', 'light', 'section_navbar_settings_id');
        }

        /**
         * Footer Settings
         */
        function footer_settings() {
            Kirki::add_section('section_footer_settings_id', array(
                'title' => __('Footer', 'sage'),
                'panel' => 'panel_theme_settings_id',
            ));

            custom_kirki_spacing('section_footer_settings_id', 24);

            custom_color_select('footer_background', 'light', 'section_footer_settings_id');

            custom_kirki_border('section_footer_settings_id');

            custom_color_select('footer_font', 'dark', 'section_footer_settings_id');

            custom_kirki_border('section_footer_settings_id');

            custom_color_select('footer_link', 'primary', 'section_footer_settings_id');

            custom_kirki_border('section_footer_settings_id');

            custom_color_select('footer_link_hover', 'primary', 'section_footer_settings_id');
        }

        /**
         * Form Settings
         */
        function form_settings() {
            Kirki::add_section('section_form_settings_id', array(
                'title' => __('Forms', 'sage'),
                'panel' => 'panel_theme_settings_id',
            ));

            custom_kirki_spacing('section_form_settings_id', 24);

            Kirki::add_field('custom_form_height_id', [
                'type' => 'slider',
                'settings' => 'custom_form_height',
                'label' => __('Form Height', 'sage'),
                'section' => 'section_form_settings_id',
                // 'description' => __('Define Form Height', 'sage'),
                'default' => 40,
                'choices' => [
                    'min' => 40,
                    'max' => 60,
                    'step' => 1,
                ],
            ]);

            custom_kirki_border('section_form_settings_id');

            custom_color_select('form_background', 'light', 'section_form_settings_id');

            custom_kirki_border('section_form_settings_id');

            custom_color_select('form_font', 'dark', 'section_form_settings_id');

            custom_kirki_border('section_form_settings_id');

            custom_color_select('form_focus', 'info', 'section_form_settings_id');

            custom_kirki_border('section_form_settings_id');

            custom_color_select('form_border', 'secondary', 'section_form_settings_id');
        }

        /**
         * Api Settings
         */
        function api_settings() {
            Kirki::add_section('section_api_settings_id', array(
                'title' => __('API', 'sage'),
                'panel' => 'panel_theme_settings_id',
            ));

            custom_kirki_spacing('section_cookie_settings_id', 24);

            Kirki::add_field('custom_google_maps_api_key_id', [
                'type' => 'text',
                'settings' => 'custom_google_maps_api_key',
                'label' => __('Google Maps Api Key', 'sage'),
                'section' => 'section_api_settings_id',
                // 'description' => __('Set the API Key to enable the Maps Block', 'sage'),
            ]);
        }

        /**
         * Api Settings
         */
        function cookie_settings() {

            global $default_cookie_message;

            Kirki::add_section('section_cookie_settings_id', array(
                'title' => __('Cookie Notice', 'sage'),
                'panel' => 'panel_theme_settings_id',
            ));

            custom_kirki_spacing('section_cookie_settings_id', 24);

            Kirki::add_field('custom_cookie_force_consent_id', [
                'type' => 'toggle',
                'settings' => 'custom_cookie_force_consent',
                'label' => __('Force Cookie Consent', 'sage'),
                'section' => 'section_cookie_settings_id',
                'default' => '0',
            ]);

            custom_kirki_border('section_cookie_settings_id');

            Kirki::add_field('custom_cookie_consent_padding_id', [
                'type' => 'slider',
                'settings' => 'custom_cookie_consent_padding',
                'label' => 'Custom Cookie Padding',
                'section' => 'section_cookie_settings_id',
                'default' => 25,
                'choices' => [
                    'min' => 10,
                    'max' => 40,
                    'step' => 1,
                ],
            ]);

            // custom_kirki_border('section_cookie_settings_id');

            // $button_style_choices = [
            //     'primary' => __('Primary', 'sage'),
            //     'secondary' => __('Secondary', 'sage'),
            //     'tertiary' => __('Tertiary', 'sage'),
            //     'success' => __('Success', 'sage'),
            //     'danger' => __('Danger', 'sage'),
            //     'warning' => __('Warning', 'sage'),
            //     'info' => __('Info', 'sage'),
            //     'light' => __('Light', 'sage'),
            //     'dark' => __('Dark', 'sage'),
            // ];

            // Kirki::add_field('custom_cookie_primary_button_style_id', [
            //     'type' => 'select',
            //     'settings' => 'custom_cookie_primary_button_style',
            //     'label' => __('Primary Button Style', 'sage'),
            //     'section' => 'section_cookie_settings_id',
            //     'default' => 'primary',
            //     'placeholder' => __('Select an option...', 'sage'),
            //     'multiple' => 1,
            //     'choices' => $button_style_choices,
            // ]);



            // Kirki::add_field('custom_cookie_secondary_button_style_id', [
            //     'type' => 'select',
            //     'settings' => 'custom_cookie_secondary_button_style',
            //     'label' => __('Secondary Button Style', 'sage'),
            //     'section' => 'section_cookie_settings_id',
            //     'default' => 'secondary',
            //     'placeholder' => __('Select an option...', 'sage'),
            //     'multiple' => 1,
            //     'choices' => $button_style_choices,
            // ]);

            custom_kirki_border('section_cookie_settings_id');

            custom_kirki_headline('section_cookie_settings_id', 'Consent Modal', 'h2');

            Kirki::add_field('custom_cookie_consent_title_id', [
                'type' => 'text',
                'settings' => 'custom_cookie_consent_title',
                'label' => __('Cookie consent title', 'sage'),
                'section' => 'section_cookie_settings_id',
                'default' => __('I use cookies', 'sage'),
            ]);

            custom_kirki_border('section_cookie_settings_id');

            Kirki::add_field('custom_cookie_consent_description_id', [
                'type' => 'code',
                'settings' => 'custom_cookie_consent_description',
                'label' => __('Your cookie consent message here', 'sage'),
                'description' => __('Simply create a button or link with data-cc="c-settings" attribute', 'sage'),
                'section' => 'section_cookie_settings_id',
                'default' => __($default_cookie_message, 'sage'),
                'choices'     => [
                    'language' => 'html',
                ],
            ]);

            custom_kirki_border('section_cookie_settings_id');

            Kirki::add_field('custom_cookie_primary_button_text_id', [
                'type' => 'text',
                'settings' => 'custom_cookie_consent_primary_button_text',
                'label' => __('Primary Button', 'sage'),
                'section' => 'section_cookie_settings_id',
                'default' => __('Accept', 'sage'),
            ]);

            custom_kirki_border('section_cookie_settings_id');

            Kirki::add_field('custom_cookie_consent_secondary_button_text_id', [
                'type' => 'text',
                'settings' => 'custom_cookie_consent_secondary_button_text',
                'label' => 'Secondary Button',
                'section' => 'section_cookie_settings_id',
                'default' => 'Reject',
            ]);

            custom_kirki_border('section_cookie_settings_id');

            Kirki::add_field('custom_cookie_consent_layout_id', [
                'type' => 'radio',
                'settings' => 'custom_cookie_consent_layout',
                'label' => __('Consent Layout', 'sage'),
                'section' => 'section_cookie_settings_id',
                'default' => 'box',
                'choices' => [
                    'box' => __('Box', 'sage'),
                    'cloud' => __('Cloud', 'sage'),
                    'bar' => __('Bar', 'sage')
                ],
            ]);

            custom_kirki_border('section_cookie_settings_id');

            Kirki::add_field('custom_cookie_consent_position_y_id', [
                'type' => 'radio',
                'settings' => 'custom_cookie_consent_position_y',
                'label' => __('Consent Position Y', 'sage'),
                'section' => 'section_cookie_settings_id',
                'default' => 'bottom',
                'choices' => [
                    'top' => __('Top', 'sage'),
                    'bottom' => __('Bottom', 'sage'),
                ],
            ]);

            custom_kirki_border('section_cookie_settings_id');

            Kirki::add_field('custom_cookie_consent_position_x_id', [
                'type' => 'radio',
                'settings' => 'custom_cookie_consent_position_x',
                'label' => __('Consent Position X', 'sage'),
                'section' => 'section_cookie_settings_id',
                'default' => 'right',
                'choices' => [
                    'center' => __('Center', 'sage'),
                    'left' => __('Left', 'sage'),
                    'right' => __('Right', 'sage'),
                ],
                'active_callback' => [
                    [
                        'setting'  => 'custom_cookie_consent_layout',
                        'operator' => '!==',
                        'value'    => 'bar',
                    ]
                ]
            ]);

            custom_kirki_border('section_cookie_settings_id');

            Kirki::add_field('custom_cookie_consent_transition_id', [
                'type' => 'radio',
                'settings' => 'custom_cookie_consent_transition',
                'label' => __('Consent Animation', 'sage'),
                'section' => 'section_cookie_settings_id',
                'default' => 'slide',
                'choices' => [
                    'slide' => __('Slide', 'sage'),
                    'zoom' => __('Zoom', 'sage'),
                ],
            ]);

            custom_kirki_border('section_cookie_settings_id');

            custom_button_color_select('consent_modal_primary_button', 'primary', 'section_cookie_settings_id');

            custom_kirki_border('section_cookie_settings_id');

            custom_button_color_select('consent_modal_secondary_button', 'secondary', 'section_cookie_settings_id');

            custom_kirki_border('section_cookie_settings_id');

            custom_color_select('consent_modal_background', 'light', 'section_cookie_settings_id');

            custom_kirki_border('section_cookie_settings_id');

            custom_color_select('consent_modal_font', 'dark', 'section_cookie_settings_id');

            custom_kirki_border('section_cookie_settings_id');

            custom_color_select('consent_modal_link', 'dark', 'section_cookie_settings_id');

            custom_kirki_border('section_cookie_settings_id');

            custom_color_select('consent_modal_link_hover', 'dark', 'section_cookie_settings_id');

            custom_kirki_border('section_cookie_settings_id');

            custom_kirki_headline('section_cookie_settings_id', 'Consent Settings', 'h2');

            Kirki::add_field('custom_cookie_settings_title_id', [
                'type' => 'text',
                'settings' => 'custom_cookie_settings_title',
                'label' => __('Cookie Settings Title', 'sage'),
                'section' => 'section_cookie_settings_id',
                'default' => __('Cookie Settings', 'sage'),
            ]);

            custom_kirki_border('section_cookie_settings_id');

            Kirki::add_field('custom_cookie_settings_save_settings_button_text_id', [
                'type' => 'text',
                'settings' => 'custom_cookie_settings_save_settings_button_text',
                'label' => __('Save Button Text', 'sage'),
                'section' => 'section_cookie_settings_id',
                'default' => __('Save settings', 'sage'),
            ]);

            custom_kirki_border('section_cookie_settings_id');

            Kirki::add_field('custom_cookie_settings_accept_all_button_text_id', [
                'type' => 'text',
                'settings' => 'custom_cookie_settings_accept_all_button_text',
                'label' => __('Accept All Button Text', 'sage'),
                'section' => 'section_cookie_settings_id',
                'default' => __('Accept all', 'sage'),
            ]);

            custom_kirki_border('section_cookie_settings_id');

            Kirki::add_field('custom_cookie_settings_reject_all_button_text_id', [
                'type' => 'text',
                'settings' => 'custom_cookie_settings_reject_all_button_text',
                'label' => __('Reject All Button Text', 'sage'),
                'section' => 'section_cookie_settings_id',
                'default' => __('Reject all', 'sage'),
            ]);

            custom_kirki_border('section_cookie_settings_id');

            Kirki::add_field('custom_cookie_settings_close_button_text_id', [
                'type' => 'text',
                'settings' => 'custom_cookie_settings_close_button_text',
                'label' => __('Close Button Text', 'sage'),
                'section' => 'section_cookie_settings_id',
                'default' => __('Close', 'sage'),
            ]);

            custom_kirki_border('section_cookie_settings_id');

            Kirki::add_field('custom_cookie_settings_layout_id', [
                'type' => 'radio',
                'settings' => 'custom_cookie_settings_layout',
                'label' => __('Cookie Setting Layout', 'sage'),
                'section' => 'section_cookie_settings_id',
                'default' => 'box',
                'choices' => [
                    'box' => __('Box', 'sage'),
                    'bar' => __('Bar', 'sage'),
                ],
            ]);

            custom_kirki_border('section_cookie_settings_id');

            Kirki::add_field('custom_cookie_settings_position_id', [
                'type' => 'radio',
                'settings' => 'custom_cookie_settings_position',
                'label' => __('Cookie Setting Position', 'sage'),
                'section' => 'section_cookie_settings_id',
                'default' => 'right',
                'choices' => [
                    'left' => __('Left', 'sage'),
                    'right' => __('Right', 'sage'),
                ],
                // 'active_callback' => [
                //     [
                //         'setting'  => 'custom_cookie_settings_layout',
                //         'operator' => '===',
                //         'value'    => 'bar',
                //     ]
                // ]
            ]);

            custom_kirki_border('section_cookie_settings_id');

            Kirki::add_field('custom_cookie_settings_transition_id', [
                'type' => 'radio',
                'settings' => 'custom_cookie_settings_transition',
                'label' => __('Cookie Settings Animation', 'sage'),
                'section' => 'section_cookie_settings_id',
                'default' => 'slide',
                'choices' => [
                    'slide' => __('Slide', 'sage'),
                    'zoom' => __('Zoom', 'sage'),
                ],
            ]);

            custom_kirki_border('section_cookie_settings_id');

            custom_button_color_select('consent_settings_primary_button', 'primary', 'section_cookie_settings_id');

            custom_kirki_border('section_cookie_settings_id');

            custom_button_color_select('consent_settings_secondary_button', 'secondary', 'section_cookie_settings_id');

            custom_kirki_border('section_cookie_settings_id');

            custom_color_select('consent_settings_background', 'light', 'section_cookie_settings_id');

            custom_kirki_border('section_cookie_settings_id');

            custom_color_select('consent_settings_background_highlight', 'light-200', 'section_cookie_settings_id');

            custom_kirki_border('section_cookie_settings_id');

            custom_color_select('consent_settings_font', 'dark', 'section_cookie_settings_id');

            custom_kirki_border('section_cookie_settings_id');

            custom_color_select('consent_settings_link', 'dark', 'section_cookie_settings_id');

            custom_kirki_border('section_cookie_settings_id');

            custom_color_select('consent_settings_link_hover', 'dark', 'section_cookie_settings_id');

            custom_kirki_border('section_cookie_settings_id');
        }

        /**
         * Init Settings
         */
        content_settings();
        font_settings();
        color_settings();
        navbar_settings();
        footer_settings();
        form_settings();
        api_settings();
        cookie_settings();
    });
}
