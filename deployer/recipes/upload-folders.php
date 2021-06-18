<?php

/**
 * Deploy Recipe to Update Multiple files and folder.
 * needs upload_folders to be defined as multi array
 */

namespace Deployer;

desc('Upload defined files & folder directly');
task('upload:folders', function () {
    foreach (get('upload_folders') as $localDir => $serverDir) {
        writeln("$localDir => $serverDir");
        upload($localDir, $serverDir);
    }
});
