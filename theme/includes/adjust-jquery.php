<?php

// Remove jQuery from frontend
if (!is_admin()) {
    add_action('init', function () {
        wp_deregister_script('jquery');
    });
}

