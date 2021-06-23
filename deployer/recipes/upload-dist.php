<?php

/**
 * This deployer recipe runs npm build:production on local and uploads /dist folder to remote
 */

namespace Deployer;

/**
 * Build Production locally
 */
desc('Build production locally');
task('npm:build_production', function () {
    foreach (get('theme_paths') as $key => $value) {
        writeln("Build for Production in {$value}");
        run("cd {{local_path}}/{$value} && yarn clear && yarn build:production");
    }
})->local();

/**
 * Upload Dist Folder
 */
desc('Upload public folder');
task('upload:public_folder', function () {
    foreach (get('theme_paths') as $key => $value) {
        writeln("Upload: {{local_path}}/{$value}/public");
        writeln("Destination: " . "{{release_path}}/{$value}/public");
        upload("{{local_path}}/{$value}/public", "{{release_path}}/{$value}");
    }
});

/**
 * Combined task to upload dist
 */
desc('Build production locally & upload dist folder');
task('upload:dist', [
    'npm:build_production',
    'upload:public_folder'
]);
