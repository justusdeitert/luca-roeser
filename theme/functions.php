<?php

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader for
| our theme. We will simply require it into the script here so that we
| don't have to worry about manually loading any of our classes later on.
|
*/

if (!file_exists($composer = __DIR__ . '/vendor/autoload.php')) {
    wp_die(__('Error locating autoloader. Please run <code>composer install</code>.', 'sage'));
}

require $composer;

/*
|--------------------------------------------------------------------------
| Run The Theme
|--------------------------------------------------------------------------
|
| Once we have the theme booted, we can handle the incoming request using
| the application's HTTP kernel. Then, we will send the response back
| to this client's browser, allowing them to enjoy our application.
|
*/

require_once __DIR__ . '/bootstrap/app.php';

/**
 * Custom Includes
 * TODO: Replace with PSR-4 autoloading standart
 */
foreach (new DirectoryIterator(locate_template('includes/')) as $file_info) {

    // If is not dot & and php & does not have a underline as first letter
    // ----------------------------->
    if (!$file_info->isDot() && $file_info->getExtension() === 'php' && substr($file_info->getFilename(), 0, 1) !== '_') {
        include $file_info->getPathname();
    }
}



$max_container_width = get_theme_setting('max_container_width', '1260');
