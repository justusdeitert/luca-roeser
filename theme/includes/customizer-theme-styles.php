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
    $custom_text_font = get_theme_mod('custom_text_font');
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

    if (is_admin()) { ?>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="<?php echo $custom_google_font_string; ?>" rel="stylesheet">
        <style>

            .editor-styles-wrapper {
                font-family: '<?php echo $custom_text_font; ?>', <?php echo $standard_google_fonts[$custom_text_font]; ?> !important;
            }

            .editor-styles-wrapper .wp-block {
                max-width: <?php echo $max_container_width . 'px'; ?> !important;
            }

            @media (min-width: 720px) {
                .editor-styles-wrapper .wp-block {
                    max-width: <?php echo $max_container_width . 'px'; ?> !important;
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
        </style>
    <?php } else { ?>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="<?php echo $custom_google_font_string; ?>" rel="stylesheet">
        <style>
            .container {
                max-width: <?php echo $max_container_width + ($mobile_container_padding * 2) . 'px'; ?> !important;
                padding-right: var(--bs-gutter-x, <?php echo $mobile_container_padding . 'px'; ?>);
                padding-left: var(--bs-gutter-x, <?php echo $mobile_container_padding . 'px'; ?>);
            }

            @media (min-width: 720px) {
                .container {
                    max-width: <?php echo $max_container_width + ($tablet_container_padding * 2)  . 'px'; ?> !important;
                    padding-right: var(--bs-gutter-x, <?php echo $tablet_container_padding . 'px'; ?>);
                    padding-left: var(--bs-gutter-x, <?php echo $tablet_container_padding . 'px'; ?>);
                }
            }

            body {
                font-family: '<?php echo $custom_text_font; ?>', sans-serif;
            }

            h1, h2, h3, h4, h5, h6 {
                font-family: '<?php echo $custom_headline_font; ?>', sans-serif;
            }
        </style>
    <?php }
}

add_action('wp_head', 'customizer_theme_styles');
add_action('admin_head', 'customizer_theme_styles');
