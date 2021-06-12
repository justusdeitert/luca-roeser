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
