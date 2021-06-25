<?php

// Remove jQuery from frontend
add_action('init', function () {
    if (!is_admin() && !is_login_page()) {
        wp_deregister_script('jquery');
    }
});

