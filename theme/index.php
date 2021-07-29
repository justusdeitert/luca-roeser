<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <?php wp_head(); ?>
</head>

    <body <?php body_class(); ?>>
        <?php wp_body_open(); ?>
        <?php do_action('get_header'); ?>

        <div id="app">
            <?php //var_dump(get_theme_mod('custom_primary_color', '#0d6efd')); ?>
            <?php //var_dump(get_theme_mod('custom_secondary_color', '#6c757d')); ?>
            <?php //var_dump(get_theme_mod('custom_tertiary_color', '#6c757d')); ?>

            <?php echo \Roots\view(\Roots\app('sage.view'), \Roots\app('sage.data'))->render(); ?>
        </div>

        <?php do_action('get_footer'); ?>
        <?php wp_footer(); ?>

        <?php if (isset($post) && current_user_can('edit_post', $post->ID)) { ?>
            <a class="edit-post-link" href="<?php echo get_edit_post_link(); ?>"><i class="icon-edit"></i></a>
        <?php } ?>
    </body>
</html>
