const mix = require('laravel-mix');
require('@tinypixelco/laravel-mix-wp-blocks');
require('laravel-mix-bundle-analyzer');
require('laravel-mix-purgecss');

// Require dotenv yarn add dotenv
require('dotenv').config({path: '../bedrock/.env'});

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

    // let whitelistPattern = [
    //   '/^navbar(-.*)?$/',
    // ];

// console.log(require('purgecss-with-wordpress').safelist);
// console.log(whitelistPattern);

let purgeCssConfig = {
    // enabled: true, // Also work on development by default
    content: ['index.php', '**/*.html', '**/*.php', '**/*.js', '**/*.jsx', '**/*.ts', '**/*.vue', '**/*.twig'],
}

mix
    .setPublicPath('./public')
    .browserSync(process.env.WP_HOME);

mix
    .sass('resources/styles/app.scss', 'styles')
    .sass('resources/styles/editor.scss', 'styles')
    .sass('resources/styles/admin.scss', 'styles')
    .options({
        processCssUrls: false,
        postCss: [
            require('autoprefixer'),
        ],
    })
    .purgeCss(purgeCssConfig);

mix
    .js('resources/scripts/app.js', 'scripts')
    .js('resources/scripts/customizer.js', 'scripts')
    .blocks('resources/scripts/editor.js', 'scripts')
    .autoload({jquery: ['$', 'window.jQuery']})
    .extract();

mix
    .js('resources/scripts/admin.js', 'scripts')
    .extract(['codemirror', 'lorem-ipsum/dist'], 'scripts/vendor-admin.js');

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
