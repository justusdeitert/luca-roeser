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

        <!-- Sidebar Navigation -->
        <nav class="sidebar">
            <div class="sidebar__inner">
                <a class="d-none d-md-block" href="<?php echo esc_url(home_url('/')); ?>" style="text-decoration: none">
                    <h1><?php bloginfo('name'); ?> <span>(<?php bloginfo('description'); ?>)</span></h1>
                </a>

                <?php if (has_nav_menu('primary_navigation')) : ?>
                    <?php wp_nav_menu([
                        'theme_location' => 'primary_navigation',
                        'menu_class' => 'sidebar__menu sidebar__primary-desktop-menu',
                        'container' => false,
                    ]); ?>
                <?php endif; ?>

                <div class="sidebar__bottom">
                    <?php if (has_nav_menu('footer_navigation')) : ?>
                        <?php wp_nav_menu([
                            'theme_location' => 'footer_navigation',
                            'menu_class' => 'sidebar__menu sidebar__secondary-desktop-menu',
                            'container' => false,
                        ]); ?>
                    <?php endif; ?>
                </div>
            </div>
        </nav>

        <!-- Mobile Navigation -->
        <div class="navbar--mobile d-flex d-md-none">
            <a class="d-block d-md-none" href="<?php echo esc_url(home_url('/')); ?>" style="text-decoration: none">
                <h1><?php bloginfo('name'); ?> <span>(<?php bloginfo('description'); ?>)</span></h1>
            </a>

            <div class="hamburger">
                <span></span>
            </div>
        </div>

        <div id="app">
            <!-- Overlay for video zoom -->
            <div class="overlay-background"></div>

            <main class="main">
                <div class="container">
                    <?php
                    if (have_posts()) :
                        while (have_posts()) : the_post();
                            the_content();
                        endwhile;
                    else :
                        echo '<p>No content found.</p>';
                    endif;
                    ?>
                </div>
            </main>
        </div>

        <footer class="footer">
            <div class="footer__social-media">
                <a href="https://www.instagram.com/luc_razor" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://vimeo.com/lucrazor" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.875 10.063c-2.442 5.217-8.337 12.319-12.063 12.319-3.672 0-4.203-7.831-6.208-13.043-.987-2.565-1.624-1.976-3.474-.681l-1.128-1.455c2.698-2.372 5.398-5.127 7.057-5.28 1.868-.179 3.018 1.098 3.448 3.832.568 3.593 1.362 9.17 2.748 9.17 1.08 0 3.741-4.424 3.878-6.006.243-2.316-1.703-2.386-3.392-1.663 2.673-8.754 13.793-7.142 9.134 2.807z"/></svg>
                </a>
            </div>
        </footer>

        <?php do_action('get_footer'); ?>
        <?php wp_footer(); ?>

        <?php if (isset($post) && current_user_can('edit_post', $post->ID)) { ?>
            <a class="edit-post-link" href="<?php echo get_edit_post_link(); ?>"><i class="icon-edit"></i></a>
        <?php } ?>
    </body>
</html>
