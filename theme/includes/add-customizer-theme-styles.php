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
    $custom_text_font_plus = str_replace(' ', '+', $custom_text_font); // replace space with +
    $custom_headline_font = get_theme_mod('custom_headline_font');
    $custom_headline_font_plus = str_replace(' ', '+', $custom_headline_font); // replace space with +
    $custom_google_font_string = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap';

    if ($custom_text_font !== $custom_headline_font) {
        $custom_google_font_string = 'https://fonts.googleapis.com/css2?family=' . $custom_text_font_plus . ':wght@300;400;500&family=' . $custom_headline_font_plus . ':wght@300;400;500&display=swap';
    } else {
        $custom_google_font_string = 'https://fonts.googleapis.com/css2?family=' . $custom_text_font_plus . ':wght@300;400;500&display=swap';
    }

    $theme_colors = [
        // General Colors
        'primary' => get_theme_mod('custom_primary_color', '#0d6efd'),
        'secondary' => get_theme_mod('custom_secondary_color', '#6c757d'),
        'tertiary' => get_theme_mod('custom_tertiary_color', '#6c757d'),
        'light' => get_theme_mod('custom_light_color', '#f8f9fa'),
        'dark' => get_theme_mod('custom_dark_color', '#212529'),

        // Font Colors
        'font' => get_theme_mod('custom_font_color', '#212529'),
        'link' => get_theme_mod('custom_link_color', '#0d6efd'),
        'link-hover' => get_theme_mod('custom_link_hover_color', '#0d6efd'),

        // Content Colors
        'body-background' => get_theme_mod('custom_body_background_color', '#f8f9fa'),

        // Alert Colors
        'success' => get_theme_mod('custom_success_color', '#198754'),
        'danger' => get_theme_mod('custom_danger_color', '#dc3545'),
        'warning' => get_theme_mod('custom_warning_color', '#ffc107'),
        'info' => get_theme_mod('custom_info_color', '#0dcaf0'),

        // Menu Colors
        'navbar-background' => get_theme_mod('custom_navbar_background_color', '#f8f9fa'),
        'navbar-font' => get_theme_mod('custom_navbar_font_color', '#212529'),
        'navbar-font-active' => get_theme_mod('custom_navbar_font_active_color', '#f8f9fa'),
        'navbar-font-active-background' => get_theme_mod('custom_navbar_font_active_background_color', '#f8f9fa'),
        'navbar-submenu-background' => get_theme_mod('custom_navbar_submenu_background_color', '#f8f9fa'),
        'navbar-submenu-font' => get_theme_mod('custom_navbar_submenu_font_color', '#212529'),
        'navbar-submenu-font-active' => get_theme_mod('custom_navbar_submenu_font_active_color', '#212529'),

        // Footer Colors
        'footer-background' => get_theme_mod('custom_footer_background_color', '#f8f9fa'),
        'footer-text' => get_theme_mod('custom_footer_text_color', '#f8f9fa'),
        'footer-link' => get_theme_mod('custom_footer_link_color', '#f8f9fa'),
        'footer-link-hover' => get_theme_mod('custom_footer_link_hover_color', '#f8f9fa'),
    ];

    /**
     * Gray/Shade Colors
     * TODO: One Shade needs to be added and let it be adjustable...
     */
    $gray_colors = [];
    foreach (range(1, 9) as $number) {
        $gray_colors[$number * 100] = adjustBrightness($theme_colors['dark'], (1 - $number * 0.03));
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
    <link href="<?php echo $custom_google_font_string; ?>" rel="stylesheet">
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
            --custom-block-spacing: <?php echo get_theme_mod('custom_block_spacing', 32) / 16; ?>rem;
            --custom-border-width: <?php echo get_theme_mod('custom_border_width', 24) / 16; ?>rem;
            --custom-border-radius: <?php echo get_theme_mod('custom_border_radius', 0); ?>px;
            --custom-box-shadow: <?php echo $custom_shadows[get_theme_mod('custom_shadow', 'no-shadow')]; ?>;

            /* Font Settings */
            --custom-font-size: <?php echo get_theme_mod('custom_font_size'); ?>px;
            --custom-font-weight: <?php echo get_theme_mod('custom_font_weight', '400'); ?>;
            --custom-headline-font: <?php echo get_theme_mod('custom_headline_font', 'Roboto'); ?>;
            --custom-text-font: <?php echo get_theme_mod('custom_text_font', 'Roboto'); ?>;
            --custom-headline-font-family: '<?php echo $custom_headline_font; ?>', <?php echo $standard_google_fonts[$custom_headline_font]; ?>;
            --custom-text-font-family: '<?php echo $custom_text_font; ?>', <?php echo $standard_google_fonts[$custom_text_font]; ?>;

            /* Color Settings */
            <?php foreach ($theme_colors as $name => $value) { ?>
                --custom-<?php echo $name; ?>-color: <?php echo $value; ?>;
            <?php } ?>

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
        }

        /* Icon Settings */
        @font-face {
            font-family: 'custom-icon-font';
            src: url('<?php echo get_stylesheet_directory_uri(); ?>/resources/fonts/icons/<?php echo get_theme_mod('custom_icons', 'bootstrap-icons')  ?>.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
            font-display: block;
        }

        <?php foreach ($theme_colors as $name => $value) { ?>
            .has-<?php echo $name; ?>-color {
                color: <?php echo $value; ?>;
            }

            .has-<?php echo $name; ?>-background-color {
                background-color: <?php echo $value; ?>;
            }
        <?php } ?>

        <?php foreach ($gray_colors as $name => $value) { ?>
            .has-gray-<?php echo $name; ?>-color {
                color: <?php echo $value; ?>;
            }

            .has-gray-<?php echo $name; ?>-background-color {
                background-color: <?php echo $value; ?>;
            }
        <?php } ?>
    </style>

    <?php echo sanitize_output(ob_get_clean()); // Minify HTML Output

}

add_action('wp_head', 'customizer_theme_styles');
add_action('admin_head', 'customizer_theme_styles');
