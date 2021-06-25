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
    'Roboto Slab' => 'serif',
    'Barlow' => 'sans-serif',
    'Quicksand' => 'sans-serif',
    'Poppins' => 'sans-serif',
    'Inter' => 'sans-serif',
];

/**
 * Custom Colors Arrays
 */

// General Colors
$general_colors = [
    'primary' => '#0d6efd',
    'secondary' => '#6c757d',
    'tertiary' => '#6c757d',
    'light' => '#f8f9fa',
    'dark' => '#212529',
];

// Font Colors
$font_colors = [
    'font' => '#212529',
    'link' => '#0d6efd',
    'link_hover' => '#0d6efd',
];

// Content Colors
$content_colors = [
    'body_background' => '#f8f9fa',
];

// Alert Colors
$alert_colors = [
    'success' => '#198754',
    'danger' => '#dc3545',
    'warning' => '#ffc107',
    'info' => '#0dcaf0',
];

// Menu Colors
$menu_colors = [
    'navbar_background' => '#f8f9fa',
    'navbar_font' => '#212529',
    'navbar_font_active' => '#f8f9fa',
    'navbar_background_active' => '#f8f9fa',
    'navbar_submenu_background' => '#f8f9fa',
    'navbar_submenu_font' => '#212529',
    'navbar_submenu_font_active' => '#212529',
    'navbar_submenu_background_active' => '#f8f9fa',
];

// Form colors
$form_colors = [
    'form_font' => '#212529',
    'form_focus' => '#0d6efd',
    'form_background' => '#f8f9fa',
    'form_border' => '#6c757d',
];

// Footer colors
$footer_colors = [
    'footer_background' => '#f8f9fa',
    'footer_text' => '#f8f9fa',
    'footer_link' => '#f8f9fa',
    'footer_link_hover' => '#f8f9fa',
];

/**
 * Theme Box Shadow Variants
 * Further implementation & corresponding css box shadows in
 * @file theme/includes/add-customizer-theme-styles.php
 */
$box_shadows = [
    'no-shadow' => 'No Shadow',
    'shadow-sm' => 'Small Shadow',
    'shadow' => 'Shadow',
    'shadow-md' => 'Medium Shadow',
    'shadow-lg' => 'Large Shadow',
];

/**
 * Check out the Kirki Doc
 * Execute Kirki Functions when plugin is installed
 * @link https://kirki.org/docs/
 */
if (class_exists('Kirki')) {

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

    function custom_kirki_text($section, $text_string) {
        $unique_id = uniqid();
        Kirki::add_field('custom_text_id_' . $unique_id, [
            'type' => 'custom',
            'settings' => 'custom_text_' . $unique_id,
            'section' => $section,
            'default' => '<p class="custom-text">' . __($text_string, 'sage') . '</p>',
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

        global $box_shadows;

        Kirki::add_section('section_content_settings_id', array(
            'title' => __('Content Settings', 'sage'),
            'panel' => 'panel_theme_settings_id',
        ));

        custom_kirki_spacing('section_content_settings_id', 10);

        Kirki::add_field('max_container_width_id', [
            'type' => 'slider',
            'settings' => 'max_container_width',
            'label' => __('Maximum Container width', 'sage'),
            'description' => __('Define the maximum content width', 'sage'),
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
        custom_kirki_text('section_content_settings_id', 'Define the custom side spacing for Mobile and Desktop');

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
        custom_kirki_text('section_content_settings_id', 'Define the custom grid gutter size for Mobile and Desktop');

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
            'description' => __('Define the general (mostly vertical) spacing between blocks', 'sage'),
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
            'label' => __('Custom Border Width', 'sage'),
            'section' => 'section_content_settings_id',
            'description' => __('Define the custom border width of content elements', 'sage'),
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
            'section' => 'section_content_settings_id',
            'description' => __('Define the custom border radius of content elements', 'sage'),
            'default' => 0,
            'choices' => [
                'min' => 0,
                'max' => 16,
                'step' => 1,
            ],
        ]);

        Kirki::add_field('custom_shadow_id', [
            'type' => 'select',
            'settings' => 'custom_shadow',
            'label' => __('Shadow', 'sage'),
            'section' => 'section_content_settings_id',
            'description' => __('Define the custom box shadow of content elements', 'sage'),
            'default' => 'no-shadow',
            'placeholder' => __('Select an option...', 'sage'),
            'priority' => 10,
            'multiple' => 1,
            'choices' => $box_shadows,
        ]);
    }

    /**
     * Font Settings
     */
    function font_settings() {

        global $standard_google_fonts;

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
            'description' => __('The font size influences all other font sizes & spacings within the theme', 'sage'),
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
            'description' => __('300 (Light)<br>400 (Medium)<br>500 (Bold)', 'sage'),
            'default' => 400,
            'choices' => [
                'min' => 300,
                'max' => 500,
                'step' => 100,
            ],
        ]);

        Kirki::add_field('custom_headline_weight_id', [
            'type' => 'slider',
            'settings' => 'custom_headline_weight',
            'label' => __('Custom Headline Weight', 'sage'),
            'section' => 'section_font_settings_id',
            'description' => __('300 (Light)<br>400 (Medium)<br>500 (Bold)', 'sage'),
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
            'description' => __('Font used for all Headline Types.<br>H1, H2, H3, H4, H5, H6', 'sage'),
            'default' => 'Roboto',
            'placeholder' => __('Select an option...', 'sage'),
            'priority' => 10,
            'multiple' => 1,
            'choices' => $standard_google_fonts_array,
        ]);

        custom_kirki_spacing('section_font_settings_id', 16);

        Kirki::add_field('custom_text_font_id', [
            'type' => 'select',
            'settings' => 'custom_text_font',
            'label' => __('Text Font', 'sage'),
            'section' => 'section_font_settings_id',
            'description' => __('Font used for all Texts.', 'sage'),
            'default' => 'Roboto',
            'placeholder' => __('Select an option...', 'sage'),
            'priority' => 10,
            'multiple' => 1,
            'choices' => $standard_google_fonts_array,
        ]);

        custom_kirki_spacing('section_font_settings_id', 16);

        $standard_icon_sets = [
            'bootstrap-icons' => 'Bootstrap Icons',
            'feather-icons' => 'Feather Icons',
            'ionicons' => 'Ionicons',
        ];

        Kirki::add_field('custom_icons_id', [
            'type' => 'select',
            'settings' => 'custom_icons',
            'label' => __('Icon Font', 'sage'),
            'section' => 'section_font_settings_id',
            'description' => __('Select the custom Icon font.', 'sage'),
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

        global $general_colors, $font_colors, $content_colors, $alert_colors, $menu_colors, $form_colors, $footer_colors;

        Kirki::add_section('section_color_settings_id', array(
            'title' => __('Color Settings', 'sage'),
            'panel' => 'panel_theme_settings_id',
        ));

        function cleanColorName($color_name) {
            $new_color_name = str_replace('_', ' ', $color_name);
            $new_color_name = ucwords($new_color_name);
            return $new_color_name;
        }

        custom_kirki_headline('section_color_settings_id', 'General Colors', 'h2');
        // custom_kirki_text('section_color_settings_id', 'Define the general theme Colors that can be selected within the Gutenberg Editor');

        foreach ($general_colors as $color => $value) {
            Kirki::add_field('custom_' . $color . '_color_id', [
                'type' => 'color',
                'settings' => 'custom_' . $color . '_color',
                'label' => __(cleanColorName($color) . ' Color', 'sage'),
                'section' => 'section_color_settings_id',
                'default' => $value,
            ]);
        }

        custom_kirki_border('section_color_settings_id');
        custom_kirki_headline('section_color_settings_id', 'Font Colors', 'h2');
        // custom_kirki_text('section_color_settings_id', 'Define the general theme Colors that can be selected within the Gutenberg Editor');

        foreach ($font_colors as $color => $value) {
            Kirki::add_field('custom_' . $color . '_color_id', [
                'type' => 'color',
                'settings' => 'custom_' . $color . '_color',
                'label' => __(cleanColorName($color) . ' Color', 'sage'),
                'section' => 'section_color_settings_id',
                'default' => $value,
            ]);
        }

        custom_kirki_border('section_color_settings_id');
        custom_kirki_headline('section_color_settings_id', 'Content Colors', 'h2');

        foreach ($content_colors as $color => $value) {
            Kirki::add_field('custom_' . $color . '_color_id', [
                'type' => 'color',
                'settings' => 'custom_' . $color . '_color',
                'label' => __(cleanColorName($color) . ' Color', 'sage'),
                'section' => 'section_color_settings_id',
                'default' => $value,
            ]);
        }

        custom_kirki_border('section_color_settings_id');
        custom_kirki_headline('section_color_settings_id', 'Alert Colors', 'h2');

        foreach ($alert_colors as $color => $value) {
            Kirki::add_field('custom_' . $color . '_color_id', [
                'type' => 'color',
                'settings' => 'custom_' . $color . '_color',
                'label' => __(cleanColorName($color) . ' Color', 'sage'),
                'section' => 'section_color_settings_id',
                'default' => $value,
            ]);
        }

        custom_kirki_border('section_color_settings_id');
        custom_kirki_headline('section_color_settings_id', 'Menu Colors', 'h2');

        foreach ($menu_colors as $color => $value) {
            Kirki::add_field('custom_' . $color . '_color_id', [
                'type' => 'color',
                'settings' => 'custom_' . $color . '_color',
                'label' => __(cleanColorName($color) . ' Color', 'sage'),
                'section' => 'section_color_settings_id',
                'choices'     => [
                    'alpha' => true,
                ],
                'default' => $value,
            ]);
        }

        custom_kirki_border('section_color_settings_id');
        custom_kirki_headline('section_color_settings_id', 'Form Colors', 'h2');

        foreach ($form_colors as $color => $value) {
            Kirki::add_field('custom_' . $color . '_color_id', [
                'type' => 'color',
                'settings' => 'custom_' . $color . '_color',
                'label' => __(cleanColorName($color) . ' Color', 'sage'),
                'section' => 'section_color_settings_id',
                'default' => $value,
            ]);
        }

        custom_kirki_border('section_color_settings_id');
        custom_kirki_headline('section_color_settings_id', 'Footer Colors', 'h2');

        foreach ($footer_colors as $color => $value) {
            Kirki::add_field('custom_' . $color . '_color_id', [
                'type' => 'color',
                'settings' => 'custom_' . $color . '_color',
                'label' => __(cleanColorName($color) . ' Color', 'sage'),
                'section' => 'section_color_settings_id',
                'default' => $value,
            ]);
        }

        custom_kirki_border('section_color_settings_id');

        /**
         * Sorted theme color selection / Remove Dark Color
         * TODO: Make A bigger Color Palette Available
         */
        $selected_theme_colors = [];
        foreach (array_merge($general_colors) as $key => $value) {
            if (gettype($key) === 'integer') {
                return;
            }
            if ($key === 'dark') {
                return;
            }
            $selected_theme_colors[$key] = cleanColorName($key);
        }

        Kirki::add_field('brightness_color_id', [
            'type' => 'select',
            'settings' => 'brightness_color',
            'label' => __('Select Brightness Color', 'sage'),
            'section' => 'section_color_settings_id',
            'description' => __('Define which of the above colors should be splittet into multiple lighter colors and shown within the editor', 'sage'),
            'default' => 'primary',
            'placeholder' => __('Select an option...', 'sage'),
            'priority' => 10,
            'multiple' => 1,
            'choices' => $selected_theme_colors,
        ]);
    }

    /**
     * Menu Settings
     */
    function menu_settings() {

        global $box_shadows;

        Kirki::add_section('section_menu_settings_id', array(
            'title' => __('Menu Settings', 'sage'),
            'panel' => 'panel_theme_settings_id',
        ));

        /**
         * General Settings / Navbar Settings
         */

        custom_kirki_headline('section_menu_settings_id', 'General Navbar Settings', 'h2');

        Kirki::add_field('custom_mobile_menu_only_id', [
            'type' => 'toggle',
            'settings' => 'custom_mobile_menu_only',
            'label' => __('Mobile Menu Only', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => '0',
        ]);

        /**
         * Custom Opening Hours via ACF Pro
         */
        if (class_exists('ACF')) {
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

        Kirki::add_field('custom_navbar_height_id', [
            'type' => 'slider',
            'settings' => 'custom_navbar_height',
            'label' => __('Navbar Height', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => 60,
            'choices' => [
                'min' => 35,
                'max' => 170,
                'step' => 1,
            ],
        ]);

        Kirki::add_field('custom_navbar_behavior_id', [
            'type' => 'radio',
            'settings' => 'custom_navbar_behavior',
            'label' => __('Custom Navbar Behavior', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => 'moving',
            'choices' => [
                'moving' => __('Moving', 'sage'),
                'fixed' => __('Fixed', 'sage'),
            ],
        ]);

        Kirki::add_field('custom_navbar_top_position_id', [
            'type' => 'slider',
            'settings' => 'custom_navbar_top_position',
            'label' => __('Navbar Top Position', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => 0,
            'choices' => [
                'min' => 0,
                'max' => 200,
                'step' => 5,
            ],
        ]);

        Kirki::add_field('custom_full_width_navbar_id', [
            'type' => 'toggle',
            'settings' => 'custom_full_width_navbar',
            'label' => __('Full Width Navbar', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => '0',
        ]);

        Kirki::add_field('custom_navbar_shadow_id', [
            'type' => 'select',
            'settings' => 'custom_navbar_shadow',
            'label' => __('Navbar Shadow', 'sage'),
            'section' => 'section_menu_settings_id',
            'description' => __('Define the custom box shadow of the navbar', 'sage'),
            'default' => 'no-shadow',
            'placeholder' => __('Select an option...', 'sage'),
            // 'priority' => 10,
            'multiple' => 1,
            'choices' => $box_shadows,
        ]);

        custom_kirki_border('section_menu_settings_id');
        custom_kirki_headline('section_menu_settings_id', 'Navbar Logo Settings', 'h2');


        Kirki::add_field('custom_navbar_logo_image_id', [
            'type' => 'image',
            'settings' => 'custom_navbar_logo_image',
            'label' => __('Navbar Logo', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => '',
            'choices' => [
                /**
                 * Save data as array.
                 */
                'save_as' => 'array',
            ],
        ]);

        custom_kirki_spacing('section_menu_settings_id', 10);

        Kirki::add_field('custom_navbar_logo_height_id', [
            'type' => 'slider',
            'settings' => 'custom_navbar_logo_height',
            'label' => __('Navbar Logo Height (in %)', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => 80,
            'choices' => [
                'min' => 50,
                'max' => 100,
                'step' => 1,
            ],
            'active_callback' => function () {
                if (get_theme_mod('custom_navbar_logo_image') && get_theme_mod('custom_navbar_logo_image')['url']) {
                    return true;
                }
                return false;
            },
        ]);

        Kirki::add_field('custom_navbar_logo_wrapper_width_id', [
            'type' => 'slider',
            'settings' => 'custom_navbar_logo_wrapper_width',
            'label' => __('Navbar Logo Wrapper Width', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => 60,
            'choices' => [
                'min' => 30,
                'max' => 120,
                'step' => 1,
            ],
            'active_callback' => function () {
                if (get_theme_mod('custom_navbar_logo_image') && get_theme_mod('custom_navbar_logo_image')['url']) {
                    return true;
                }
                return false;
            },
        ]);

        custom_kirki_border('section_menu_settings_id');
        custom_kirki_headline('section_menu_settings_id', 'Navbar Font Settings', 'h2');

        Kirki::add_field('custom_navbar_font_size_id', [
            'type' => 'slider',
            'settings' => 'custom_navbar_font_size',
            'label' => __('Navbar Font Size', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => 16,
            'choices' => [
                'min' => 14,
                'max' => 24,
                'step' => 1,
            ],
        ]);

        Kirki::add_field('custom_navbar_font_weight_id', [
            'type' => 'slider',
            'settings' => 'custom_navbar_font_weight',
            'label' => __('Navbar Font Weight', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => 400,
            'choices' => [
                'min' => 300,
                'max' => 500,
                'step' => 100,
            ],
        ]);

        Kirki::add_field('custom_navbar_item_spacing_id', [
            'type' => 'slider',
            'settings' => 'custom_navbar_item_spacing',
            'label' => __('Navbar Item Spacing', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => 5,
            'choices' => [
                'min' => 5,
                'max' => 30,
                'step' => 1,
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

        custom_kirki_border('section_menu_settings_id');
        custom_kirki_headline('section_menu_settings_id', 'Navbar Order & Spacing', 'h2');

        Kirki::add_field('custom_navbar_order_id', [
            'type' => 'sortable',
            'settings' => 'custom_navbar_order',
            'label' => __('Navbar Item Order', 'sage'),
            'section' => 'section_menu_settings_id',
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

        Kirki::add_field('custom_navbar_logo_spacing_id', [
            'type' => 'multicheck',
            'settings' => 'custom_navbar_logo_spacing',
            'label' => __('Logo Spacing', 'sage'),
            'section' => 'section_menu_settings_id',
            // 'default' => ['option-1', 'option-3', 'option-4'],
            // 'priority' => 10,
            'choices' => [
                'left' => __('Left', 'sage'),
                'right' => __('Right', 'sage'),
            ],
        ]);

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
                'section' => 'section_menu_settings_id',
                'default' => [$one, $two],
                'choices' => [
                    'left' => __('Left', 'sage'),
                    'right' => __('Right', 'sage'),
                ],
            ]);
        }

        Kirki::add_field('custom_navbar_submenu_item_height_id', [
            'type' => 'slider',
            'settings' => 'custom_navbar_submenu_item_height',
            'label' => __('Navbar Submenu Item Height', 'sage'),
            'section' => 'section_menu_settings_id',
            'default' => 40,
            'choices' => [
                'min' => 30,
                'max' => 80,
                'step' => 5,
            ],
        ]);
    }

    /**
     * Form Settings
     */
    function form_settings() {
        Kirki::add_section('section_form_settings_id', array(
            'title' => __('Form Settings', 'sage'),
            'panel' => 'panel_theme_settings_id',
        ));

        Kirki::add_field('custom_form_height_id', [
            'type' => 'slider',
            'settings' => 'custom_form_height',
            'label' => __('Custom Form Height', 'sage'),
            'section' => 'section_form_settings_id',
            'description' => __('Define Form Height', 'sage'),
            'default' => 40,
            'choices' => [
                'min' => 40,
                'max' => 60,
                'step' => 1,
            ],
        ]);

        Kirki::add_field('custom_google_maps_api_key_id', [
            'type' => 'text',
            'settings' => 'custom_google_maps_api_key',
            'label' => __('Google Maps Api Key', 'sage'),
            'section' => 'section_api_settings_id',
            'description' => __('Set the API Key to enable the Maps Block', 'sage'),
        ]);
    }

    /**
     * Api Settings
     */
    function api_settings() {
        Kirki::add_section('section_api_settings_id', array(
            'title' => __('API Settings', 'sage'),
            'panel' => 'panel_theme_settings_id',
        ));

        Kirki::add_field('custom_google_maps_api_key_id', [
            'type' => 'text',
            'settings' => 'custom_google_maps_api_key',
            'label' => __('Google Maps Api Key', 'sage'),
            'section' => 'section_api_settings_id',
            'description' => __('Set the API Key to enable the Maps Block', 'sage'),
        ]);
    }

    /**
     * Footer Settings
     */
    // function footer_settings() {
    //     Kirki::add_section('section_footer_settings_id', array(
    //         'title' => __('Footer Settings', 'sage'),
    //         'panel' => 'panel_theme_settings_id',
    //     ));
    //
    //     Kirki::add_field('custom_footer_background_color_id', [
    //         'type' => 'color',
    //         'settings' => 'custom_footer_background_color',
    //         'label' => __('Footer Background Color', 'sage'),
    //         'section' => 'section_footer_settings_id',
    //         'default' => '#f8f9fa',
    //     ]);
    //
    //     Kirki::add_field('custom_footer_text_color_id', [
    //         'type' => 'color',
    //         'settings' => 'custom_footer_text_color',
    //         'label' => __('Footer Text Color', 'sage'),
    //         'section' => 'section_footer_settings_id',
    //         'default' => '#f8f9fa',
    //     ]);
    //
    //     Kirki::add_field('custom_footer_link_color_id', [
    //         'type' => 'color',
    //         'settings' => 'custom_footer_link_color',
    //         'label' => __('Footer Link Color', 'sage'),
    //         'section' => 'section_footer_settings_id',
    //         'default' => '#f8f9fa',
    //     ]);
    // }

    /**
     * Init Settings
     */
    content_settings();
    font_settings();
    color_settings();
    menu_settings();
    form_settings();
    // footer_settings();
    api_settings();
}
