<?php

/**
 * Disable Admin Bar
 */

add_filter('show_admin_bar', function () {
    return false;
});
