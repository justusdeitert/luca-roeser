<?php

/**
 * Utility Functions
 */

/**
 * Increases or decreases the brightness of a color by a percentage of the current brightness.
 *
 * @param string $hexCode Supported formats: `#FFF`, `#FFFFFF`, `FFF`, `FFFFFF`
 * @param float $adjustPercent A number between -1 and 1. E.g. 0.3 = 30% lighter; -0.4 = 40% darker.
 * @return string
 * @link https://stackoverflow.com/questions/3512311/how-to-generate-lighter-darker-color-with-php
 */
function adjustBrightness($hexCode, $adjustPercent) {
    $hexCode = ltrim($hexCode, '#');

    if (strlen($hexCode) == 3) {
        $hexCode = $hexCode[0] . $hexCode[0] . $hexCode[1] . $hexCode[1] . $hexCode[2] . $hexCode[2];
    }

    $hexCode = array_map('hexdec', str_split($hexCode, 2));

    foreach ($hexCode as & $color) {
        $adjustableLimit = $adjustPercent < 0 ? $color : 255 - $color;
        $adjustAmount = ceil($adjustableLimit * $adjustPercent);
        $color = str_pad(dechex($color + $adjustAmount), 2, '0', STR_PAD_LEFT);
    }

    return '#' . implode($hexCode);
}

/**
 * Minify HTML Output
 * @link https://stackoverflow.com/questions/6225351/how-to-minify-php-page-html-output
 *
 * @param $buffer
 * @return string|string[]|null
 */
function sanitize_output($buffer) {

    $search = [
        '/\>[^\S ]+/s',                     // strip whitespaces after tags, except space
        '/[^\S ]+\</s',                     // strip whitespaces before tags, except space
        '/(\s)+/s',                         // shorten multiple whitespace sequences
        '/<!--(.|\s)*?-->/',                // Remove HTML comments
        '/\>\s+\</',                        // Remove Extra space between Tags
        '!/\*[^*]*\*+([^/][^*]*\*+)*/!'     // Remove CSS comments
    ];

    $replace = [
        '>',
        '<',
        '\\1',
        '',
        '><',
        ''
    ];

    $buffer = preg_replace($search, $replace, $buffer);

    return $buffer;
}

/**
 * Check to see if the current page is the login/register page.
 * Use this in conjunction with is_admin() to separate the front-end
 * from the back-end of your theme.
 *
 * @link https://wordpress.stackexchange.com/questions/12863/check-if-wp-login-is-current-page/12865#12865
 * @link https://stevegrunwell.com/blog/wordpress-is-login-page-function/
 * @return bool
 */
if (!function_exists('is_login_page')) {
    function is_login_page() {
        return in_array(
            $GLOBALS['pagenow'],
            array('wp-login.php', 'wp-register.php'),
            true
        );
    }
}

/**
 * Convert RGB String to HEX Code
 * @param $hex
 * @return string
 */
function convert_hex($hex) {
    $hex = str_replace('#', '', $hex);
    $first = substr($hex, 0, 2);
    $second = substr($hex, 2, 2);
    $third = substr($hex, 4, 2);
    return hexdec($first) . ', ' . hexdec($second) . ', ' . hexdec($third);
}

/**
 * @param $string
 * @return bool
 */
function isMode($string) {
    return WP_ENV === $string;
}

function is_gutenberg_editor() {
    if (!function_exists('get_current_screen')) {
        return false;
    }

    $screen = get_current_screen();
    return $screen->is_block_editor;
}
