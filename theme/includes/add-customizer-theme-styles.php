<?php

/**
 * Get and adjust theme mod variables
 */

function customizer_theme_styles() {

    /**
     * Custom google font implementation
     */
    $custom_text_font = get_theme_mod('custom_text_font', 'roboto');
    $custom_headline_font = get_theme_mod('custom_headline_font', 'roboto');
    $fonts_array = [
        $custom_text_font,
        $custom_headline_font
    ];

    function create_google_font_string($fonts_array) {
        $new_font_array = [];
        foreach($fonts_array as $key => $value) {
            $new_font_array[$key] = 'family=' . ucwords($value, '+') . ':wght@300;400;500;600&';
        }
        return 'https://fonts.googleapis.com/css2?' . implode($new_font_array) . 'display=swap';
    }

    function font_family_string($custom_font) {
        $font_type = $GLOBALS['standard_google_fonts'][$custom_font];
        $font_name = str_replace('+', ' ', ucwords($custom_font, '+'));
        return  '\'' .$font_name . '\', ' . $font_type;
    }

    /**
     * Standard colors to add dark color variations
     */
    $standard_colors = [
        'primary' => get_theme_mod('custom_primary_color', '#0d6efd'),
        'secondary' => get_theme_mod('custom_secondary_color', '#6c757d'),
        'tertiary' => get_theme_mod('custom_tertiary_color', '#6c757d'),
        'quaternary' => get_theme_mod('custom_quaternary_color', '#6c757d'),
        'light' => get_theme_mod('custom_light_color', '#f8f9fa'),
        'dark' => get_theme_mod('custom_dark_color', '#212529'),
        'success' => get_theme_mod('custom_success_color', '#8ac837'),
        'danger' => get_theme_mod('custom_danger_color', '#dc3545'),
        'warning' => get_theme_mod('custom_warning_color', '#ffc107'),
        'info' => get_theme_mod('custom_info_color', '#0dcaf0'),
    ];

    foreach ($standard_colors as $color => $value) {
        $standard_color_versions[$color] = convert_hex($value);
        $standard_color_versions[$color . '-dark'] = convert_hex(adjustBrightness($value, -0.1));
        $standard_color_versions[$color . '-darker'] = convert_hex(adjustBrightness($value, -0.4));
    }

    $custom_theme_colors = [

        /**
         * Font Colors
         */
        'font' => get_theme_mod('custom_color_select_font', 'dark'),
        'link' => get_theme_mod('custom_color_select_link', 'primary'),
        'link-hover' => get_theme_mod('custom_color_select_link_hover', 'primary'),

        /**
         * Content Colors
         */
        'body-background' => get_theme_mod('custom_color_select_body_background', 'light'),
        'controls' => get_theme_mod('custom_color_select_controls', 'dark'),
        // 'elements-background' => get_theme_mod('custom_color_select_elements_background', 'light'),

        /**
         *  Menu Colors
         */
        'navbar-background' => get_theme_mod('custom_color_select_navbar_background', 'light'),
        'navbar-font' => get_theme_mod('custom_color_select_navbar_font', 'dark'),
        'navbar-font-active' => get_theme_mod('custom_color_select_navbar_font_active', 'dark'),
        'navbar-background-active' => get_theme_mod('custom_color_select_navbar_background_active', 'light'),
        'navbar-submenu-background' => get_theme_mod('custom_color_select_navbar_submenu_background', 'light'),
        'navbar-submenu-font' => get_theme_mod('custom_color_select_submenu_font', 'dark'),
        'navbar-submenu-font-active' => get_theme_mod('custom_color_select_navbar_submenu_font_active', 'dark'),
        'navbar-submenu-background-active' => get_theme_mod('custom_color_select_navbar_submenu_background_active', 'light'),

        /**
         *  Form Colors
         */
        'form-font' => get_theme_mod('custom_color_select_form_font', 'dark'),
        'form-focus' => get_theme_mod('custom_color_select_form_focus', 'info'),
        'form-background' => get_theme_mod('custom_color_select_form_background', 'light'),
        'form-border' => get_theme_mod('custom_color_select_form_border', 'secondary'),

        /**
         * Footer Colors
         */
        'footer-background' => get_theme_mod('custom_color_select_footer_background', 'light'),
        'footer-font' => get_theme_mod('custom_color_select_footer_font', 'dark'),
        'footer-link' => get_theme_mod('custom_color_select_footer_link', 'primary'),
        'footer-link-hover' => get_theme_mod('custom_color_select_footer_link_hover', 'primary'),

        /**
         * Cookie Colors
         */
        'consent-modal-background' => get_theme_mod('custom_color_select_consent_modal_background', 'light'),
        'consent-modal-border' => get_theme_mod('custom_color_select_consent_modal_border', 'light'),
        'consent-modal-font' => get_theme_mod('custom_color_select_consent_modal_font', 'dark'),
        'consent-modal-link' => get_theme_mod('custom_color_select_consent_modal_link', 'primary'),
        'consent-modal-link-hover' => get_theme_mod('custom_color_select_consent_modal_link_hover', 'primary'),
        'consent-settings-background' => get_theme_mod('custom_color_select_consent_settings_background', 'light'),
        'consent-settings-background-highlight' => get_theme_mod('custom_color_select_consent_settings_background_highlight', 'light-200'),
        'consent-settings-font' => get_theme_mod('custom_color_select_consent_settings_font', 'dark'),
        'consent-settings-link' => get_theme_mod('custom_color_select_consent_settings_link', 'primary'),
        'consent-settings-link-hover' => get_theme_mod('custom_color_select_consent_settings_link_hover', 'primary'),
    ];

    /**
     * Gray/Shade Colors
     */
    $light_colors = [];
    $light_color = get_theme_mod('custom_light_color', '#f8f9fa');
    foreach (range(1, 3) as $number) {
        $light_colors[$number * 100] = convert_hex(adjustBrightness($light_color, -($number * 0.05)));
    }

    $dark_colors = [];
    $dark_color = get_theme_mod('custom_dark_color', '#212529');
    foreach (range(1, 3) as $number) {
        $dark_colors[$number * 100] = convert_hex(adjustBrightness($dark_color, ($number * 0.05)));
    }

    $dark_light_colors = [];
    foreach (range(1, 4) as $number) {
        $dark_light_colors[$number * 100] = convert_hex(adjustBrightness($dark_color, (1 - $number * 0.05)));
    }

    /**
     * Custom Shadows
     */
    $custom_shadows = [
        'no-shadow' => 'none',
        'shadow-sm' => '0 0 transparent, 0 0 transparent, 0 1px 3px 0 rgba(0, 0, 0, 0.15)',
        'shadow' => '0 0 transparent, 0 0 transparent, 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.15)',
        'shadow-md' => '0 0 transparent, 0 0 transparent, 0 0 2px 0 rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 5px -1px rgba(0, 0, 0, 0.17)',
        'shadow-lg' => '0 0 transparent, 0 0 transparent, 0 0 2px 0 rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.17)',
    ];

    ob_start(); ?>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="<?php echo create_google_font_string($fonts_array) ?>" rel="preload" as="style" onload="this.rel='stylesheet'">

    <?php
        /**
         * Custom Preload Google Font
         * Preloading CSS with rel="preload"
         * @link https://metabox.io/load-google-fonts-faster-wordpress/
         */
    ?>
    <style>
        :root {
            /* Content Settings */
            --max-container-width: <?php echo get_theme_mod('max_container_width', 1280); ?>px;
            --container-padding-mobile: <?php echo get_theme_mod('container_padding_mobile', 15) / 16; ?>rem;
            --container-padding-desktop: <?php echo get_theme_mod('container_padding_desktop', 30) / 16; ?>rem;
            --custom-gutter-mobile-x: <?php echo get_theme_mod('custom_gutter_size_mobile', 20) / 16; ?>rem;
            --custom-gutter-mobile-y: <?php echo get_theme_mod('custom_gutter_size_mobile', 20) / 16; ?>rem;
            --custom-gutter-desktop-x: <?php echo get_theme_mod('custom_gutter_size_desktop', 30) / 16; ?>rem;
            --custom-gutter-desktop-y: <?php echo get_theme_mod('custom_gutter_size_desktop', 30) / 16; ?>rem;
            --custom-block-spacing: <?php echo get_theme_mod('custom_block_spacing', 48) / 16; ?>rem;
            --custom-border-width: <?php echo get_theme_mod('custom_border_width', 0) / 16; ?>rem;
            --custom-border-radius: <?php echo get_theme_mod('custom_border_radius', 0); ?>px;
            --custom-box-shadow: <?php echo $custom_shadows[get_theme_mod('custom_shadow', 'no-shadow')]; ?>;

            /* Font Settings */
            --custom-font-size: <?php echo get_theme_mod('custom_font_size'); ?>px;
            --custom-font-weight: <?php echo get_theme_mod('custom_font_weight', '400'); ?>;
            --custom-text-font-family: <?php echo font_family_string($custom_text_font); ?>;
            --custom-headline-font-family: <?php echo font_family_string($custom_headline_font); ?>;

            /* Font Settings */
            --custom-form-height: <?php echo get_theme_mod('custom_form_height'); ?>px;

            /* General Colors */
            <?php foreach ($standard_color_versions as $name => $value) { ?>
                --custom-<?php echo $name; ?>-color: <?php echo $value; ?>;
            <?php } ?>

            /* Light Color Shades */
            <?php foreach ($light_colors as $name => $value) { ?>
                --custom-light-<?php echo $name; ?>-color: <?php echo $value; ?>;
            <?php } ?>

            /* Dark Color Shades */
            <?php foreach ($dark_colors as $name => $value) { ?>
                --custom-dark-<?php echo $name; ?>-color: <?php echo $value; ?>;
            <?php } ?>

            /* Dark/Light Color Shades */
            <?php foreach ($dark_light_colors as $name => $value) { ?>
                --custom-dark-light-<?php echo $name; ?>-color: <?php echo $value; ?>;
            <?php } ?>

            /* Theme Colors */
            <?php foreach ($custom_theme_colors as $name => $value) { ?>
                --custom-<?php echo $name; ?>-color: var(--custom-<?php echo $value; ?>-color);
            <?php } ?>

            /* Navbar Settings */
            --custom-navbar-height: <?php echo get_theme_mod('custom_navbar_height', 60); ?>px;
            --custom-navbar-position:  <?php echo get_theme_mod('custom_navbar_positioning', 'static'); ?>;
            --custom-navbar-top-position:  <?php echo get_theme_mod('custom_navbar_top_position', 0); ?>;
            --custom-navbar-box-shadow: <?php echo $custom_shadows[get_theme_mod('custom_navbar_shadow', 'no-shadow')]; ?>;
            --custom-navbar-logo-height:  <?php echo get_theme_mod('custom_navbar_logo_height', 100); ?>%;
            --custom-navbar-logo-wrapper-width:  <?php echo get_theme_mod('custom_navbar_logo_wrapper_width', 100); ?>px;
            --custom-navbar-font-size:  <?php echo get_theme_mod('custom_navbar_font_size', 16) / 16; ?>rem;
            --custom-navbar-font-weight:  <?php echo get_theme_mod('custom_navbar_font_weight', 400); ?>;
            --custom-navbar-item-spacing:  <?php echo get_theme_mod('custom_navbar_item_spacing', 5); ?>px;
            --custom-navbar-submenu-item-height:  <?php echo get_theme_mod('custom_navbar_submenu_item_height', 40); ?>px;

            /*
             * Custom Cookie Consent Modal/Setting Variables
             */
            --custom-cookie-consent-padding:  <?php echo get_theme_mod('custom_cookie_consent_padding', 25); ?>px;
            --custom-consent-modal-primary-button-color:  <?php echo get_theme_mod('custom_color_select_consent_modal_primary_button', 'primary'); ?>;
            --custom-consent-modal-secondary-button-color:  <?php echo get_theme_mod('custom_color_select_consent_modal_secondary_button', 'secondary'); ?>;
            --custom-consent-settings-primary-button-color:  <?php echo get_theme_mod('custom_color_select_consent_settings_primary_button', 'primary'); ?>;
            --custom-consent-settings-secondary-button-color:  <?php echo get_theme_mod('custom_color_select_consent_settings_secondary_button', 'secondary'); ?>;
        }

        /* Icon Settings */
        @font-face {
            font-family: 'custom-icon-font';
            src: url('<?php echo get_stylesheet_directory_uri(); ?>/resources/fonts/icons/<?php echo get_theme_mod('custom_icons', 'bootstrap-icons')  ?>.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
            font-display: block;
        }

        <?php foreach ($standard_color_versions as $name => $value) { ?>
        .has-<?php echo $name; ?>-color,
        .has-<?php echo $name; ?>-color *,
        .has-<?php echo $name; ?>-color *:hover {
            color: rgb(<?php echo $value; ?>) !important;
        }

        .has-<?php echo $name; ?>-background-color {
            background-color: rgb(<?php echo $value; ?>);
        }

        .has-<?php echo $name; ?>-fill-color {
            fill: rgb(<?php echo $value; ?>);
        }
        <?php } ?>

        <?php foreach ($light_colors as $name => $value) { ?>
        .has-light-<?php echo $name; ?>-color,
        .has-<?php echo $name; ?>-color *,
        .has-<?php echo $name; ?>-color *:hover {
            color: rgb(<?php echo $value; ?>) !important;
        }

        .has-light-<?php echo $name; ?>-background-color {
            background-color: rgb(<?php echo $value; ?>);
        }

        .has-light-<?php echo $name; ?>-fill-color {
            fill: rgb(<?php echo $value; ?>);
        }
        <?php } ?>

        <?php foreach ($dark_colors as $name => $value) { ?>
        .has-dark-<?php echo $name; ?>-color,
        .has-<?php echo $name; ?>-color *,
        .has-<?php echo $name; ?>-color *:hover {
            color: rgb(<?php echo $value; ?>) !important;
        }

        .has-dark-<?php echo $name; ?>-background-color {
            background-color: rgb(<?php echo $value; ?>);
        }

        .has-dark-<?php echo $name; ?>-fill-color {
            fill: rgb(<?php echo $value; ?>);
        }
        <?php } ?>

        <?php foreach ($dark_light_colors as $name => $value) { ?>
        .has-dark-light-<?php echo $name; ?>-color,
        .has-<?php echo $name; ?>-color *,
        .has-<?php echo $name; ?>-color *:hover {
            color: rgb(<?php echo $value; ?>) !important;
        }

        .has-dark-light-<?php echo $name; ?>-background-color {
            background-color: rgb(<?php echo $value; ?>);
        }

        .has-dark-light-<?php echo $name; ?>-fill-color {
            fill: rgb(<?php echo $value; ?>);
        }
        <?php } ?>

    </style>

    <?php if (class_exists('ACF') && get_field('cookie_code', 'options')) {  ?>
        <?php echo get_field('cookie_code', 'options'); ?>
    <?php } ?>

    <?php
        $force_consent = 'false';
        if (get_theme_mod('custom_cookie_force_consent', '0')) {
            $force_consent = 'true';
        }
    ?>

    <script>
        /* Cookie Consent by -> https://github.com/orestbida/cookieconsent */
        var cookieConsentConfig = {
            delay: 0,
            force_consent: <?php echo $force_consent; ?>,
            current_lang: 'de',
            page_scripts: true,
            onAccept: function () {
                /* do something ... */
            },
            gui_options: {
                consent_modal: {
                    layout: '<?php echo get_theme_mod('custom_cookie_consent_layout', 'box'); ?>', /* box / cloud / bar */
                    position: '<?php echo get_theme_mod('custom_cookie_consent_position_y', 'bottom'); ?> <?php echo get_theme_mod('custom_cookie_consent_position_x', 'right'); ?>', /* bottom / middle / top + left / right / center */
                    transition: '<?php echo get_theme_mod('custom_cookie_consent_transition', 'slide'); ?>' /* zoom / slide */
                },
                settings_modal: {
                    layout: '<?php echo get_theme_mod('custom_cookie_settings_layout', 'box'); ?>', /* box / bar */
                    position: '<?php echo get_theme_mod('custom_cookie_settings_position', 'right'); ?>', /* left / right */
                    transition: '<?php echo get_theme_mod('custom_cookie_settings_transition', 'slide'); ?>' /* zoom / slide */
                }
            },
            languages: {
                en: {
                    consent_modal: {
                        title: '<?php echo get_theme_mod('custom_cookie_consent_title', 'I use cookies'); ?>',
                        description: '<?php echo get_theme_mod('custom_cookie_consent_description', $GLOBALS['default_cookie_message']); ?>',
                        primary_btn: {
                            text: '<?php echo get_theme_mod('custom_cookie_consent_primary_button_text', 'Accept'); ?>',
                            role: 'accept_all'  /* 'accept_selected' or 'accept_all' */
                        },
                        secondary_btn: {
                            text: '<?php echo get_theme_mod('custom_cookie_consent_secondary_button_text', 'Reject'); ?>',
                            role: 'accept_necessary'   /* 'settings' or 'accept_necessary' */
                        }
                    },
                    settings_modal: {
                        title: '<?php echo get_theme_mod('custom_cookie_settings_title', 'Cookie Settings'); ?>',
                        save_settings_btn: '<?php echo get_theme_mod('custom_cookie_settings_save_settings_button_text', 'Save settings'); ?>',
                        accept_all_btn: '<?php echo get_theme_mod('custom_cookie_settings_accept_all_button_text', 'Accept all'); ?>',
                        reject_all_btn: '<?php echo get_theme_mod('custom_cookie_settings_reject_all_button_text', 'Reject all'); ?>', /* optional, [v.2.5.0 +] */
                        close_btn_label: '<?php echo get_theme_mod('custom_cookie_settings_close_button_text', 'Close'); ?>',
                        cookie_table_headers : [
                            {col1: '<?php _e('Cookie Name', 'sage'); ?>'},
                            {col2: '<?php _e('Provider', 'sage'); ?>'},
                            {col3: '<?php _e('Expiration', 'sage'); ?>'},
                            {col4: '<?php _e('Type', 'sage'); ?>'}
                        ],
                        blocks: [
                            <?php if (class_exists('ACF') && get_field('cookie_blocks', 'options')) {  ?>
                                <?php $cookie_blocks = get_field('cookie_blocks', 'options'); ?>
                                <?php foreach ($cookie_blocks as $cookie_block) { ?>
                                    {
                                        title: '<?php echo $cookie_block['cookie_title']; ?>',
                                        description: '<?php echo $cookie_block['cookie_description']; ?>',
                                        <?php if ($cookie_block['cookie_has_toggle'] && $cookie_block['cookie_toggle']['toggle_value']) { ?>
                                            toggle: {
                                                value: '<?php echo $cookie_block['cookie_toggle']['toggle_value']; ?>',
                                                enabled: <?php echo $cookie_block['cookie_toggle']['enabled'] ? 'true' : 'false' ?>,
                                                readonly: <?php echo $cookie_block['cookie_toggle']['readonly'] ? 'true' : 'false' ?>
                                            },
                                        <?php } ?>
                                        <?php if ($cookie_block['cookie_has_table']) { ?>
                                            cookie_table: [
                                                <?php foreach ($cookie_block['cookie_table'] as $cookie_table) { ?>
                                                    {
                                                        col1: '<?php echo $cookie_table['cookie_name']; ?>',
                                                        col2: '<?php echo $cookie_table['cookie_provider']; ?>',
                                                        col3: '<?php echo $cookie_table['cookie_expiration']; ?>',
                                                        col4: '<?php echo $cookie_table['cookie_type']; ?>',
                                                    },
                                                <?php } ?>
                                            ]
                                        <?php } ?>
                                    },
                                <?php } ?>
                            <?php } else { ?>
                                {
                                    title: '<?php _e('Cookie usage', 'sage'); ?>',
                                    description: '<?php _e('We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want.', 'sage'); ?>'
                                },
                                {
                                    title: '<?php _e('Essential cookies', 'sage') ?>',
                                    description: '<?php _e('Essential cookies enable basic functions and are necessary for the website to function properly.', 'sage'); ?>',
                                    toggle: {
                                        value: 'necessary',
                                        enabled: true,
                                        readonly: true
                                    }
                                },
                                {
                                    title: 'Google Analytics',
                                    description: '<?php _e('These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you. <a href="https://policies.google.com/privacy?hl=en">https://policies.google.com/privacy?hl=en</a>', 'sage') ?>',
                                    toggle: {
                                        value: 'analytics',
                                        enabled: false,
                                        readonly: false
                                    },
                                    cookie_table: [
                                        {
                                            col1: '^_ga',
                                            col2: 'Google LLC',
                                            col3: '2 years',
                                            col4: 'Permanent cookie',
                                        },
                                        {
                                            col1: '_gid',
                                            col2: 'Google LLC',
                                            col3: '1 day',
                                            col4: 'Permanent cookie'
                                        }
                                    ]
                                }
                            <?php } ?>
                        ]
                    }
                }
            }
        }
    </script>

    <?php echo sanitize_output(ob_get_clean()); // Minify HTML Output

}

add_action('wp_head', 'customizer_theme_styles');
add_action('admin_head', 'customizer_theme_styles');
