<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <?php wp_head(); ?>

    <?php
        $max_container_width = get_theme_mod('max_container_width', '1260');
        $mobile_container_padding = get_theme_mod('mobile_container_padding', '30');
        $tablet_container_padding = get_theme_mod('tablet_container_padding', '30');
    ?>

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
    </style>

</head>

    <body <?php body_class(); ?>>
        <?php wp_body_open(); ?>
        <?php do_action('get_header'); ?>

        <div id="app">
            <?php echo \Roots\view(\Roots\app('sage.view'), \Roots\app('sage.data'))->render(); ?>
        </div>

        <?php do_action('get_footer'); ?>
        <?php wp_footer(); ?>
    </body>
</html>
