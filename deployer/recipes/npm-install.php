<?php

/*
 * Installs NPM Packages
 * Needs npm_paths to be defined as single array
 */

namespace Deployer;

desc('Install npm packages');
task('npm:install', function () {
    foreach (get('npm_paths') as $key => $value) {
        if (has('previous_release')) {
            if (test("[ -d {{previous_release}}/{$value}/node_modules ]")) {
                writeln("Copy NPM Packages in from {{previous_release}}/{$value}/node_modules to {{release_path}}/{$value}");
                run("cp -R {{previous_release}}/{$value}/node_modules {{release_path}}/{$value}");
            }
        }

        writeln("Install NPM Packages in {{release_path}}/{$value}");
        run("cd {{release_path}}/{$value} && {{bin/npm}} install");

        writeln("Run Build Production in {{release_path}}/{$value}");
        run("cd {{release_path}}/{$value} && {{bin/npm}} run build:production");
    }
});
