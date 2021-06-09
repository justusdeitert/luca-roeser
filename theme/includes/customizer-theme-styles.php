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
    $mobile_container_padding = get_theme_mod('mobile_container_padding', '30');
    $tablet_container_padding = get_theme_mod('tablet_container_padding', '30');

    /**
     * Custom google font
     */
    $custom_text_font = get_theme_mod('custom_text_font', 'Montserrat');
    $custom_text_font_plus = str_replace(' ', '+', $custom_text_font); // replace space with +
    $custom_headline_font = get_theme_mod('custom_headline_font');
    $custom_headline_font_plus = str_replace(' ', '+', $custom_headline_font); // replace space with +
    $custom_google_font_string = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap';
    $custom_font_size = get_theme_mod('custom_font_size');

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

    // $gray_colors = [];
    //
    // foreach (range(1, 10) as $number) {
    //     $gray_colors[$number * 100] = adjustBrightness($custom_dark_color, $number * 0.1);
    // }

    if (is_admin()) { ?>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="<?php echo $custom_google_font_string; ?>" rel="stylesheet">
        <style>

            html {
                font-size: <?php echo $custom_font_size; ?>px;
            }

            .editor-styles-wrapper {
                font-family: '<?php echo $custom_text_font; ?>', <?php echo $standard_google_fonts[$custom_text_font]; ?> !important;
                color: <?php echo get_theme_mod('custom_text_color', '#212529'); ?>;
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
                font-family: '<?php echo $custom_headline_font; ?>', <?php echo $standard_google_fonts[$custom_text_font]; ?>;
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

                <?php //foreach ($gray_colors as $name => $value) { ?>
                /*    --color-gray-*/<?php //echo $name; ?>/*: */<?php //echo $value; ?>/*;*/
                <?php //} ?>
            }

        </style>
    <?php } else { ?>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="<?php echo $custom_google_font_string; ?>" rel="stylesheet">
        <style>
            .container, .wp-block-group__inner-container {
                max-width: <?php echo $max_container_width + ($mobile_container_padding * 2) . 'px'; ?> !important;
                padding-right: var(--bs-gutter-x, <?php echo $mobile_container_padding . 'px'; ?>);
                padding-left: var(--bs-gutter-x, <?php echo $mobile_container_padding . 'px'; ?>);
            }

            @media (min-width: 720px) {
                .container, .wp-block-group__inner-container {
                    max-width: <?php echo $max_container_width + ($tablet_container_padding * 2)  . 'px'; ?> !important;
                    padding-right: var(--bs-gutter-x, <?php echo $tablet_container_padding . 'px'; ?>);
                    padding-left: var(--bs-gutter-x, <?php echo $tablet_container_padding . 'px'; ?>);
                }
            }

            html {
                font-size: <?php echo $custom_font_size; ?>px;
            }

            body {
                font-family: '<?php echo $custom_text_font; ?>', sans-serif;
                color: <?php echo get_theme_mod('custom_text_color', '#212529'); ?>;
                background-color: <?php echo get_theme_mod('custom_background_color', '#f8f9fa'); ?>;
            }

            h1, h2, h3, h4, h5, h6 {
                font-family: '<?php echo $custom_headline_font; ?>', sans-serif;
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

                <?php //foreach ($gray_colors as $name => $value) { ?>
                /*    --color-gray-*/<?php //echo $name; ?>/*: */<?php //echo $value; ?>/*;*/
                <?php //} ?>
            }

        </style>
    <?php }
}

add_action('wp_head', 'customizer_theme_styles');
add_action('admin_head', 'customizer_theme_styles');
