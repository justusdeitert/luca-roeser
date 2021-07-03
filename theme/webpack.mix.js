const mix = require('laravel-mix');
require('@tinypixelco/laravel-mix-wp-blocks');
require('laravel-mix-bundle-analyzer');
require('dotenv').config({path: '../bedrock/.env'});

/**
 * @link https://github.com/spatie/laravel-mix-purgecss
 * Not used atm.
 * Using postcss-purgecss-laravel via postcss plugins
 */
// require('laravel-mix-purgecss');

/**
 * Get Webpack Mode
 * @param $modeString
 * @returns {boolean}
 */
let isMode = ($modeString) => {
    return process.env.NODE_ENV === $modeString;
}

/**
 * Purge CSS Configuration
 * @type {{content: string[]}}
 */
let purgeCssConfig = {
    content: ['index.php', '**/*.html', '**/*.php', '**/*.js', '**/*.jsx', '**/*.ts', '**/*.vue', '**/*.twig'],
}

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Sage application. By default, we are compiling the Sass file
 | for your application, as well as bundling up your JS files.
 |
 */
mix
    .setPublicPath('./public')
    .browserSync(process.env.WP_HOME);

mix
    .sass('resources/styles/app.scss', 'styles', {}, [
        isMode('production') && require('postcss-purgecss-laravel')(purgeCssConfig)
    ])
    // .sass('resources/styles/app.scss', 'styles')
    .sass('resources/styles/editor.scss', 'styles')
    .sass('resources/styles/admin.scss', 'styles')
    .options({
        processCssUrls: false,
        postCss: [
            require('autoprefixer'),
        ],
    })

mix
    /**
     * Standart Scripts
     */
    .js('resources/scripts/customizer.js', 'scripts')
    .js('resources/scripts/admin.js', 'scripts')
    .js('resources/scripts/app.js', 'scripts')

    /**
     * External Libraries / don't extract libraries
     */
    .js('resources/scripts/external/bootstrap.js', 'scripts/external')
    .js('resources/scripts/external/lightgallery.js', 'scripts/external')
    .js('resources/scripts/external/photoswipe.js', 'scripts/external')
    .js('resources/scripts/external/swiper.js', 'scripts/external')

    /**
     * Editor Script for Blocks
     */
    .blocks('resources/scripts/editor.js', 'scripts')

    /**
     * Extracting Vendors
     * Keep in Mind that you need to include all scripts so that they work..
     */
    // .extract(['swiper'], 'scripts/swiper.js')
    // .extract(['lightGallery', 'lgThumbnail', 'lgHash'], 'scripts/lightgallery.js')
    // .extract(['codemirror', 'lorem-ipsum/dist'], 'scripts/vendor-admin.js')
    // .extract(); // extract all other files. Default: vendor.js

mix
    .copyDirectory('resources/images', 'public/images')
    .copyDirectory('resources/fonts', 'public/fonts');

mix
    .sourceMaps()
    .version();

/**
 * Bundle Analyser to see all included Bundles
 */
// mix.bundleAnalyzer();
