<?php
/**
 * Changing the Login Logo
 * @link https://codex.wordpress.org/Customizing_the_Login_Form
 */

add_action('login_enqueue_scripts', function () { ?>
    <style type="text/css">
        #login h1 a, .login h1 a {
            background-image: url(<?php echo get_stylesheet_directory_uri(); ?>/logo.png);
            height: 150px;
            width: 150px;
            background-size: contain;
            background-repeat: no-repeat;
            margin-bottom: 30px;
        }
    </style>
<?php });

