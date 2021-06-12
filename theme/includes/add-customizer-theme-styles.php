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
        // Theme Colors
        'primary' => get_theme_mod('custom_primary_color', '#0d6efd'),
        'secondary' => get_theme_mod('custom_secondary_color', '#6c757d'),
        'light' => get_theme_mod('custom_light_color', '#f8f9fa'),
        'dark' => get_theme_mod('custom_dark_color', '#212529'),

        // Standard Colors
        'font' => get_theme_mod('custom_font_color', '#212529'),
        'link' => get_theme_mod('custom_link_color', '#0d6efd'),
        'background' => get_theme_mod('custom_background_color', '#f8f9fa'),

        // Alert Colors
        'success' => get_theme_mod('custom_success_color', '#198754'),
        'danger' => get_theme_mod('custom_danger_color', '#dc3545'),
        'warning' => get_theme_mod('custom_warning_color', '#ffc107'),
        'info' => get_theme_mod('custom_info_color', '#0dcaf0'),
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
            /* Content Sizes */
            --max-container-width: <?php echo get_theme_mod('max_container_width', 1280); ?>px;
            --container-padding-mobile: <?php echo get_theme_mod('container_padding_mobile', 15) / 16; ?>rem;
            --container-padding-desktop: <?php echo get_theme_mod('container_padding_desktop', 30) / 16; ?>rem;
            --custom-gutter-mobile-x: <?php echo get_theme_mod('custom_gutter_size_mobile', 20) / 16; ?>rem;
            --custom-gutter-mobile-y: <?php echo get_theme_mod('custom_gutter_size_mobile', 20) / 16; ?>rem;
            --custom-gutter-desktop-x: <?php echo get_theme_mod('custom_gutter_size_desktop', 30) / 16; ?>rem;
            --custom-gutter-desktop-y: <?php echo get_theme_mod('custom_gutter_size_desktop', 30) / 16; ?>rem;
            --custom-block-spacing: <?php echo get_theme_mod('custom_block_spacing', 32) / 16; ?>rem;

            /* Font Sizes */
            --custom-font-size: <?php echo get_theme_mod('custom_font_size'); ?>px;
            --custom-font-weight: <?php echo get_theme_mod('custom_font_weight', '400'); ?>;
            --custom-headline-font: <?php echo get_theme_mod('custom_headline_font', 'Roboto'); ?>;
            --custom-text-font: <?php echo get_theme_mod('custom_text_font', 'Roboto'); ?>;
            --custom-headline-font-family: '<?php echo $custom_headline_font; ?>', <?php echo $standard_google_fonts[$custom_headline_font]; ?>;
            --custom-text-font-family: '<?php echo $custom_text_font; ?>', <?php echo $standard_google_fonts[$custom_text_font]; ?>;

            /* Color Settings */
            <?php foreach ($theme_colors as $name => $value) { ?>
                --color-<?php echo $name; ?>: <?php echo $value; ?>;
            <?php } ?>

            <?php foreach ($gray_colors as $name => $value) { ?>
                --color-gray-<?php echo $name; ?>: <?php echo $value; ?>;
            <?php } ?>

            /* Box Settings */
            --custom-border-width: <?php echo get_theme_mod('custom_border_width', 24) / 16; ?>rem;
            --custom-border-radius: <?php echo get_theme_mod('custom_border_radius', 0); ?>px;
            --custom-box-shadow: <?php echo $custom_shadows[get_theme_mod('custom_shadow', 'no-shadow')]; ?>;

            /* Menu Settings */
            --custom-menu-height:  <?php echo get_theme_mod('custom_menu_height', 60); ?>px;
            --custom-menu-icon-size:  <?php echo get_theme_mod('custom_menu_icon_size', 100); ?>%;
            --custom-menu-icon-wrapper-width:  <?php echo get_theme_mod('custom_menu_icon_wrapper_width', 100); ?>px;
            --custom-menu-item-spacing:  <?php echo get_theme_mod('custom_menu_item_spacing', 5); ?>px;
            --custom-menu-background-color:  <?php echo get_theme_mod('custom_menu_background_color', '#f8f9fa'); ?>;
            --custom-menu-font-weight:  <?php echo get_theme_mod('custom_menu_font_weight', 300); ?>;
            --custom-menu-font-size:  <?php echo get_theme_mod('custom_menu_font_size', 16) / 16; ?>rem;
            --custom-menu-link-color:  <?php echo get_theme_mod('custom_menu_link_color', '#212529'); ?>;
            --custom-menu-link-active-color:  <?php echo get_theme_mod('custom_menu_link_active_color', '#212529'); ?>;
            --custom-menu-link-active-background-color:  <?php echo get_theme_mod('custom_menu_link_active_background_color', '#f8f9fa'); ?>;
            --custom-submenu-link-color:  <?php echo get_theme_mod('custom_submenu_link_color', '#212529'); ?>;
            --custom-submenu-link-active-color:  <?php echo get_theme_mod('custom_submenu_link_active_color', '#212529'); ?>;

            /* Footer Settings */
            --custom-footer-background-color: <?php echo get_theme_mod('custom_footer_background_color'); ?>;
            --custom-footer-text-color: <?php echo get_theme_mod('custom_footer_text_color'); ?>;
            --custom-footer-link-color: <?php echo get_theme_mod('custom_footer_link_color'); ?>;
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
