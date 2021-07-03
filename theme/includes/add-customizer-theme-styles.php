<?php

/**
 * Get and adjust theme mod variables
 */

function customizer_theme_styles() {

    global $standard_google_fonts;

    /**
     * Custom google font
     * TODO: Better Google Font Implementation
     */
    $custom_text_font = get_theme_mod('custom_text_font', 'Montserrat');
    $custom_text_font_plus = str_replace(' ', '+', $custom_text_font); /* replace space with + */
    $custom_headline_font = get_theme_mod('custom_headline_font', 'Montserrat');
    $custom_headline_font_plus = str_replace(' ', '+', $custom_headline_font); /* replace space with + */
    $custom_google_font_string = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap';

    if ($custom_text_font !== $custom_headline_font) {
        $custom_google_font_string = 'https://fonts.googleapis.com/css2?family=' . $custom_text_font_plus . ':wght@300;400;500&family=' . $custom_headline_font_plus . ':wght@300;400;500&display=swap';
    } else {
        $custom_google_font_string = 'https://fonts.googleapis.com/css2?family=' . $custom_text_font_plus . ':wght@300;400;500&display=swap';
    }

    /**
     * Adds Dark Color variations to general colors
     */
    $general_colors = [
        'primary' => get_theme_mod('custom_primary_color', '#0d6efd'),
        'secondary' => get_theme_mod('custom_secondary_color', '#6c757d'),
        'tertiary' => get_theme_mod('custom_tertiary_color', '#6c757d'),
        'light' => get_theme_mod('custom_light_color', '#f8f9fa'),
        'dark' => get_theme_mod('custom_dark_color', '#212529'),
        'success' => get_theme_mod('custom_success_color', '#8ac837'),
        'danger' => get_theme_mod('custom_danger_color', '#dc3545'),
        'warning' => get_theme_mod('custom_warning_color', '#ffc107'),
        'info' => get_theme_mod('custom_info_color', '#0dcaf0'),
    ];

    foreach ($general_colors as $color => $value) {
        $general_color_versions[$color] = convert_hex($value);
        $general_color_versions[$color . '-dark'] = convert_hex(adjustBrightness($value, -0.1));
        $general_color_versions[$color . '-darker'] = convert_hex(adjustBrightness($value, -0.4));
    }

    $theme_colors = [

        // Font Colors
        'font' => convert_hex(get_theme_mod('custom_font_color', '#212529')),
        'link' => convert_hex(get_theme_mod('custom_link_color', '#0d6efd')),
        'link-hover' => convert_hex(get_theme_mod('custom_link_hover_color', '#0d6efd')),

        // Content Colors
        'body-background' => convert_hex(get_theme_mod('custom_body_background_color', '#f8f9fa')),
        'controls' => convert_hex(get_theme_mod('custom_controls_color', '#212529')),

        // Menu Colors
        'navbar-background' => convert_hex(get_theme_mod('custom_navbar_background_color', '#f8f9fa')),
        'navbar-font' => convert_hex(get_theme_mod('custom_navbar_font_color', '#212529')),
        'navbar-font-active' => convert_hex(get_theme_mod('custom_navbar_font_active_color', '#f8f9fa')),
        'navbar-background-active' => convert_hex(get_theme_mod('custom_navbar_background_active_color', '#f8f9fa')),
        'navbar-submenu-background' => convert_hex(get_theme_mod('custom_navbar_submenu_background_color', '#f8f9fa')),
        'navbar-submenu-font' => convert_hex(get_theme_mod('custom_navbar_submenu_font_color', '#212529')),
        'navbar-submenu-font-active' => convert_hex(get_theme_mod('custom_navbar_submenu_font_active_color', '#212529')),
        'navbar-submenu-background-active' => convert_hex(get_theme_mod('custom_navbar_submenu_background_active_color', '#f8f9fa')),

        // Form Colors
        'form-font' => convert_hex(get_theme_mod('custom_form_font_color', '#212529')),
        'form-focus' => convert_hex(get_theme_mod('custom_form_focus_color', '#0d6efd')),
        'form-background' => convert_hex(get_theme_mod('custom_form_background_color', '#f8f9fa')),
        'form-border' => convert_hex(get_theme_mod('custom_form_border_color', '#6c757d')),

        // Footer Colors
        'footer-background' => convert_hex(get_theme_mod('custom_footer_background_color', '#f8f9fa')),
        'footer-font' => convert_hex(get_theme_mod('custom_footer_font_color', '#212529')),
        'footer-link' => convert_hex(get_theme_mod('custom_footer_link_color', '#0d6efd')),
        'footer-link-hover' => convert_hex(get_theme_mod('custom_footer_link_hover_color', '#0d6efd')),

        // Footer Colors
        'cookie-background' => convert_hex(get_theme_mod('custom_cookie_background_color', '#f8f9fa')),
        'cookie-background-highlight' => convert_hex(get_theme_mod('custom_cookie_background_highlight_color', '#6c757d')),
        'cookie-font' => convert_hex(get_theme_mod('custom_cookie_font_color', '#212529')),
        'cookie-link' => convert_hex(get_theme_mod('custom_cookie_link_color', '#0d6efd')),
        'cookie-link-hover' => convert_hex(get_theme_mod('custom_cookie_link_hover_color', '#0d6efd')),
    ];

    /**
     * Gray/Shade Colors
     * TODO: One Shade needs to be added and let it be adjustable...
     */
    $gray_colors = [];
    $dark_color = get_theme_mod('custom_dark_color', '#212529');
    foreach (range(1, 9) as $number) {
        $gray_colors[$number * 100] = convert_hex(adjustBrightness($dark_color, (1 - $number * 0.03)));
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

    <?php
        /**
         * Custom Preload Google Font
         * Preloading CSS with rel="preload"
         * @link https://metabox.io/load-google-fonts-faster-wordpress/
         */
    ?>
    <link href="<?php echo $custom_google_font_string; ?>" rel="preload" as="style" onload="this.rel='stylesheet'">
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
            --custom-headline-weight: <?php echo get_theme_mod('custom_headline_weight', '400'); ?>;
            --custom-headline-font: <?php echo get_theme_mod('custom_headline_font', 'Roboto'); ?>;
            --custom-text-font: <?php echo get_theme_mod('custom_text_font', 'Roboto'); ?>;
            --custom-headline-font-family: '<?php echo $custom_headline_font; ?>', <?php echo $standard_google_fonts[$custom_headline_font]; ?>;
            --custom-text-font-family: '<?php echo $custom_text_font; ?>', <?php echo $standard_google_fonts[$custom_text_font]; ?>;

            /* Font Settings */
            --custom-form-height: <?php echo get_theme_mod('custom_form_height'); ?>px;

            /* General Colors */
            <?php foreach ($general_color_versions as $name => $value) { ?>
                --custom-<?php echo $name; ?>-color: <?php echo $value; ?>;
            <?php } ?>

            /* Theme Colors */
            <?php foreach ($theme_colors as $name => $value) { ?>
                --custom-<?php echo $name; ?>-color: <?php echo $value; ?>;
            <?php } ?>

            /* Gray Color Shades */
            <?php foreach ($gray_colors as $name => $value) { ?>
                --custom-gray-<?php echo $name; ?>-color: <?php echo $value; ?>;
            <?php } ?>

            /* Navbar Settings */
            --custom-navbar-height:  <?php echo get_theme_mod('custom_navbar_height', 60); ?>px;

            /*
             * Custom Navbar Positioning
             */
            <?php
                $custom_navbar_position = 'static';
                $custom_navbar_behavior = get_theme_mod('custom_navbar_behavior', 'moving');
                $custom_navbar_top_position = get_theme_mod('custom_navbar_top_position', 0);

                if ($custom_navbar_top_position === '0') {
                    $custom_navbar_position = ($custom_navbar_behavior === 'moving') ? 'sticky' : 'static';
                } else {
                    $custom_navbar_position = ($custom_navbar_behavior === 'moving') ? 'fixed' : 'absolute';
                }
            ?>

            --custom-navbar-position:  <?php echo $custom_navbar_position; ?>;
            --custom-navbar-top-position:  <?php echo $custom_navbar_top_position; ?>px;
            --custom-navbar-box-shadow: <?php echo $custom_shadows[get_theme_mod('custom_navbar_shadow', 'no-shadow')]; ?>;
            --custom-navbar-logo-height:  <?php echo get_theme_mod('custom_navbar_logo_height', 100); ?>%;
            --custom-navbar-logo-wrapper-width:  <?php echo get_theme_mod('custom_navbar_logo_wrapper_width', 100); ?>px;
            --custom-navbar-font-size:  <?php echo get_theme_mod('custom_navbar_font_size', 16) / 16; ?>rem;
            --custom-navbar-font-weight:  <?php echo get_theme_mod('custom_navbar_font_weight', 300); ?>;
            --custom-navbar-item-spacing:  <?php echo get_theme_mod('custom_navbar_item_spacing', 5); ?>px;
            --custom-navbar-submenu-item-height:  <?php echo get_theme_mod('custom_navbar_submenu_item_height', 40); ?>px;

            /*
             * Custom Cookie Consent Variables
             */
            --custom-cookie-consent-padding:  <?php echo get_theme_mod('custom_cookie_consent_padding', 25); ?>px;
        }

        /* Icon Settings */
        @font-face {
            font-family: 'custom-icon-font';
            src: url('<?php echo get_stylesheet_directory_uri(); ?>/resources/fonts/icons/<?php echo get_theme_mod('custom_icons', 'bootstrap-icons')  ?>.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
            font-display: block;
        }

        <?php foreach ($general_color_versions as $name => $value) { ?>
            .has-<?php echo $name; ?>-color {
                color: rgb(<?php echo $value; ?>);
            }

            .has-<?php echo $name; ?>-background-color {
                background-color: rgb(<?php echo $value; ?>);
            }
        <?php } ?>

        <?php foreach ($theme_colors as $name => $value) { ?>
            .has-<?php echo $name; ?>-color {
                color: rgb(<?php echo $value; ?>);
            }

            .has-<?php echo $name; ?>-background-color {
                background-color: rgb(<?php echo $value; ?>);
            }
        <?php } ?>

        <?php foreach ($gray_colors as $name => $value) { ?>
            .has-gray-<?php echo $name; ?>-color {
                color: rgb(<?php echo $value; ?>);
            }

            .has-gray-<?php echo $name; ?>-background-color {
                background-color: rgb(<?php echo $value; ?>);
            }
        <?php } ?>
    </style>

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
                    layout: 'box', /* box / bar */
                    position: 'left', /* left / right */
                    transition: 'slide' /* zoom / slide */
                }
            },
            languages : {
                en : {
                    consent_modal : {
                        title :  '<?php echo get_theme_mod('custom_cookie_consent_title', 'I use cookies'); ?>',
                        description :  '<?php echo get_theme_mod('custom_cookie_consent_description', 'Your cookie consent message here'); ?>',
                        primary_btn: {
                            text: '<?php echo get_theme_mod('custom_cookie_consent_primary_button_text', 'Accept'); ?>',
                            role: 'accept_all'  /* 'accept_selected' or 'accept_all' */
                        },
                        secondary_btn: {
                            text : '<?php echo get_theme_mod('custom_cookie_consent_secondary_button_text', 'Reject'); ?>',
                            role : 'accept_necessary'   /* 'settings' or 'accept_necessary' */
                        }
                    },
                    settings_modal : {
                        title: '<?php echo get_theme_mod('custom_cookie_settings_title', 'Cookie Settings'); ?>',
                        save_settings_btn: '<?php echo get_theme_mod('custom_cookie_settings_save_settings_button_text', 'Save settings'); ?>',
                        accept_all_btn: '<?php echo get_theme_mod('custom_cookie_settings_accept_all_button_text', 'Accept all'); ?>',
                        reject_all_btn: '<?php echo get_theme_mod('custom_cookie_settings_reject_all_button_text', 'Reject all'); ?>', /* optional, [v.2.5.0 +] */
                        close_btn_label: '<?php echo get_theme_mod('custom_cookie_settings_close_button_text', 'Close'); ?>',
                        blocks : [
                            {
                                title : "Cookie usage",
                                description: 'Your cookie usage disclaimer'
                            },{
                                title : "Strictly necessary cookies",
                                description: 'Category description ... ',
                                toggle : {
                                    value : 'necessary',
                                    enabled : false,
                                    readonly: true
                                }
                            },{
                                title : "Analytics cookies",
                                description: 'Category description ... ',
                                toggle : {
                                    value : 'analytics',
                                    enabled : false,
                                    readonly: false
                                }
                            },
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
