<?php

/**
 * Clean Up Files and Folders
 * Needs custom_clean_up to be defined as an single array
 */

namespace Deployer;

desc('Clean up defined files & folders');
task('custom_clean_up', function () {

    foreach (get('custom_clean_up') as $value) {
        writeln("Deleting {$value}");
        run("rm -rf {$value}");
    }
});
