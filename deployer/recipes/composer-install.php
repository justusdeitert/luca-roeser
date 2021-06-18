<?php

/**
 * Installs Composer Packages
 * Needs composer_paths be defines as single array
 */

namespace Deployer;

desc('Install Composer Packages in composer paths');
task('composer:install', function () {

    foreach (get('composer_paths') as $key => $value) {
        writeln("Install Composer Packages in {$value}");
        run("cd {{release_path}}/{$value} && {{bin/composer}} install", ['timeout' => 600]);
    }
});
