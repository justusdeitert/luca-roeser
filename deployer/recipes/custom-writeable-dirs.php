<?php

/**
 * Sets Custom writeable modes to files and folders
 * Needs custom_writable_dirs be defined as single array
 */

namespace Deployer;

desc('Set writeable modes to files files & folders');
task('custom_writeable_dirs', function () {
    foreach (get('custom_writable_dirs') as $value) {
        runLocally("sudo chown -R $(whoami) {{local_path}}/{$value}");
        runLocally("sudo chmod -R 777 {{local_path}}/{$value}");
        writeln("<info>Made {$value} writable</info>");
    }
});
