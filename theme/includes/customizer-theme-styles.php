<?php

/**
 * Get and adjust theme mod variables
 */

function customizer_theme_styles() {

    global $standard_google_fonts;

    /**
     * Container max-width & padding
     */
    $max_container_width = get_theme_mod('max_container_width', '1260');

    /**
     * Custom google font
     */
    $custom_text_font = get_theme_mod('custom_text_font', 'Montserrat');
    $custom_text_font_plus = str_replace(' ', '+', $custom_text_font); // replace space with +
    $custom_headline_font = get_theme_mod('custom_headline_font');
    $custom_headline_font_plus = str_replace(' ', '+', $custom_headline_font); // replace space with +
    $custom_google_font_string = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap';

    if ($custom_text_font !== $custom_headline_font) {
        $custom_google_font_string = 'https://fonts.googleapis.com/css2?family=' . $custom_text_font_plus .
            ':wght@300;400;500&family=' . $custom_headline_font_plus . ':wght@300;400;500&display=swap';
    } else {
        $custom_google_font_string = 'https://fonts.googleapis.com/css2?family=' . $custom_text_font_plus .
            ':wght@300;400;500&display=swap';
    }

    /**
     * Theme Colors
     */
    $theme_colors = [
        'primary' => get_theme_mod('custom_primary_color', '#0d6efd'),
        'secondary' => get_theme_mod('custom_secondary_color', '#6c757d'),
        'light' => get_theme_mod('custom_light_color', '#f8f9fa'),
        'dark' => get_theme_mod('custom_dark_color', '#212529'),
    ];

    /**
     * Standard Colors
     */
    $standard_colors = [
        'font' => get_theme_mod('custom_font_color', '#212529'),
        'link' => get_theme_mod('custom_link_color', '#0d6efd'),
        'background' => get_theme_mod('custom_background_color', '#f8f9fa'),
    ];

    /**
     * Alert Colors
     */
    $alert_colors = [
        'success' => get_theme_mod('custom_success_color', '#198754'),
        'danger' => get_theme_mod('custom_danger_color', '#dc3545'),
        'warning' => get_theme_mod('custom_warning_color', '#ffc107'),
        'info' => get_theme_mod('custom_info_color', '#0dcaf0'),
    ];

    // TODO: Color System needs to be updated with gray & text shades
    // $gray_colors = [];
    // foreach (range(1, 10) as $number) {
    //     $gray_colors[$number * 100] = adjustBrightness($custom_dark_color, $number * 0.1);
    // }

    if (is_admin()) { ?>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="<?php echo $custom_google_font_string; ?>" rel="stylesheet">
        <style>

            html {
                font-size: <?php echo get_theme_mod('custom_font_size'); ?>px;
            }

            .block-editor .editor-styles-wrapper {
                font-family: '<?php echo $custom_text_font; ?>', <?php echo $standard_google_fonts[$custom_text_font]; ?>;
                color: <?php echo get_theme_mod('custom_text_color', '#212529'); ?>;
                font-weight: <?php echo get_theme_mod('custom_font_weight', '400'); ?>;

                /* Set custom vars for block editor */
                --container-padding-mobile: <?php echo get_theme_mod('container_padding_mobile', '15'); ?>px;
                --container-padding-tablet: <?php echo get_theme_mod('container_padding_tablet', '30'); ?>px;
                --max-container-width: <?php echo get_theme_mod('max_container_width', '1260'); ?>px;
            }

            .wp-block {
                max-width: <?php echo $max_container_width . 'px'; ?>;
            }

            @media (min-width: 720px) {
                .wp-block {
                    max-width: <?php echo $max_container_width . 'px'; ?>;
                }
            }

            .editor-styles-wrapper h1,
            .editor-styles-wrapper h2,
            .editor-styles-wrapper h3,
            .editor-styles-wrapper h4,
            .editor-styles-wrapper h5,
            .editor-styles-wrapper h6 {
                font-family: '<?php echo $custom_headline_font; ?>', <?php echo $standard_google_fonts[$custom_headline_font]; ?>;
            }

            .block-editor .editor-styles-wrapper a,
            .block-editor .editor-styles-wrapper a:hover {
                color: <?php echo get_theme_mod('custom_link_color', '#212529'); ?>;
            }

            <?php foreach (array_merge($theme_colors, $standard_colors) as $name => $value) { ?>
                .has-<?php echo $name; ?>-color {
                    color: <?php echo $value; ?>;
                }

                .has-<?php echo $name; ?>-background-color {
                    background-color: <?php echo $value; ?>;
                }
            <?php } ?>

            :root {
                <?php foreach (array_merge($theme_colors, $standard_colors, $alert_colors) as $name => $value) { ?>
                    --color-<?php echo $name; ?>: <?php echo $value; ?>;
                <?php } ?>
            }

            .block-editor .editor-styles-wrapper .row {
                --bs-gutter-x: <?php echo get_theme_mod('custom_gutter_size', 24) / 16; ?>rem;
                --bs-gutter-y: <?php echo get_theme_mod('custom_gutter_size', 24) / 16; ?>rem;
            }

            .custom-border {
                padding: <?php echo get_theme_mod('custom_image_border_width', 0); ?>px;
                background-color: <?php echo get_theme_mod('custom_image_border_color', '#FFF'); ?>;
                border-radius: <?php echo get_theme_mod('custom_image_border_radius', 0); ?>px;

                <?php if(get_theme_mod('custom_image_border_width', 0) > 0) { ?>
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 0 rgba(0, 0, 0, 0.3);
                <?php } ?>
            }

            .custom-spacing {
                margin-top: <?php echo get_theme_mod('custom_block_spacing', 32) / 16; ?>rem;
                margin-bottom: <?php echo get_theme_mod('custom_block_spacing', 32) / 16; ?>rem;
            }

        </style>
    <?php } else { ?>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="<?php echo $custom_google_font_string; ?>" rel="stylesheet">
        <style>

            html {
                font-size: <?php echo get_theme_mod('custom_font_size'); ?>px;
            }

            body {
                font-family: '<?php echo $custom_text_font; ?>', <?php echo $standard_google_fonts[$custom_text_font]; ?>;
                color: <?php echo get_theme_mod('custom_text_color', '#212529'); ?>;
                background-color: <?php echo get_theme_mod('custom_background_color', '#f8f9fa'); ?>;
                font-weight: <?php echo get_theme_mod('custom_font_weight', '400'); ?>;
            }

            h1, h2, h3, h4, h5, h6 {
                font-family: '<?php echo $custom_headline_font; ?>', <?php echo $standard_google_fonts[$custom_headline_font]; ?>;
            }

            a, a:hover {
                color: <?php echo get_theme_mod('custom_link_color', '#212529'); ?>;
            }

            <?php foreach (array_merge($theme_colors, $standard_colors) as $name => $value) { ?>
                .has-<?php echo $name; ?>-color {
                    color: <?php echo $value; ?>;
                }

                .has-<?php echo $name; ?>-background-color {
                    background-color: <?php echo $value; ?>;
                }
            <?php } ?>

            :root {
                <?php foreach (array_merge($theme_colors, $standard_colors, $alert_colors) as $name => $value) { ?>
                    --color-<?php echo $name; ?>: <?php echo $value; ?>;
                <?php } ?>
            }

            <?php // TODO: Have a look at different bootstrap 5 container settings ?>
            .container {
                --container-padding-mobile: <?php echo get_theme_mod('container_padding_mobile', '15'); ?>px;
                --container-padding-tablet: <?php echo get_theme_mod('container_padding_tablet', '30'); ?>px;
                --max-container-width: <?php echo get_theme_mod('max_container_width', '1260'); ?>px;
            }

            .row {
                --bs-gutter-x: <?php echo get_theme_mod('custom_gutter_size', 24) / 16; ?>rem;
                --bs-gutter-y: <?php echo get_theme_mod('custom_gutter_size', 24) / 16; ?>rem;
            }

            .custom-border {
                padding: <?php echo get_theme_mod('custom_image_border_width', 0)?>px;
                background-color: <?php echo get_theme_mod('custom_image_border_color', '#FFF'); ?>;
                border-radius: <?php echo get_theme_mod('custom_image_border_radius', 0); ?>px;

                <?php if(get_theme_mod('custom_image_border_width', 0) > 0) { ?>
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 0 rgba(0, 0, 0, 0.3);
                <?php } ?>
            }

            .custom-spacing {
                margin-top: <?php echo get_theme_mod('custom_block_spacing', 32) / 16; ?>rem;
                margin-bottom: <?php echo get_theme_mod('custom_block_spacing', 32) / 16; ?>rem;
            }

        </style>
    <?php }
}

add_action('wp_head', 'customizer_theme_styles');
add_action('admin_head', 'customizer_theme_styles');
