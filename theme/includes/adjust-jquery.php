<?php

// Remove jQuery from frontend
if (!is_admin() && !is_login_page()) {
    add_action('init', function () {
        wp_deregister_script('jquery');
    });
}

