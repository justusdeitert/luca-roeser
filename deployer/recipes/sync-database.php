<?php

/*
 * Deployer recipe to push Bedrock database from local development machine to a server and vice versa.
 * Will create a backups on the target or local machine
 */

namespace Deployer;

set('local_path', dirname(__FILE__, 2));

desc('Pulls DB from server and installs it locally, after backup of local DB');
task('pull:db', function () {

    /**
     * Export db
     */
    $exportFilename = get('stage') . '_db_export_' . date('Y-m-d_H-i-s') . '.sql';
    $exportAbsFile = get('deploy_path') . '/' . $exportFilename;
    writeln("<comment>Generate {$exportAbsFile}</comment>");
    run("cd {{current_path}}/bedrock && {{bin/wp}} db export {$exportAbsFile}");

    /**
     * Download db export
     */
    $downloadedExport = '{{local_path}}/' . $exportFilename;
    writeln("<comment>Downloading DB export from Server</comment>");
    download($exportAbsFile, $downloadedExport);

    /**
     * Cleanup exports on server
     */
    writeln("<info>Cleaned up</info>");
    run("rm {$exportAbsFile}");

    /**
     * Check if Backup Folder exists
     */
    $backupFolder = "{{local_path}}/backups/";

    if (!testLocally("[ -d $backupFolder ]")) {
        // Create /backups dir if it does not exist.
        runLocally("mkdir -p $backupFolder");
    }

    /**
     * Create backup of local DB
     */
    $backupFilename = get('stage') . '_db_backup_' . date('Y-m-d_H-i-s') . '.sql';
    $backupAbsFile = '{{local_path}}/backups/' . $backupFilename;
    writeln("<comment>Make DB Backup on Local</comment>");
    runLocally("cd {{local_path}}/bedrock; wp db export --allow-root {$backupAbsFile}");

    /**
     * Empty local DB
     */
    writeln("<comment>Reset Local DB</comment>");
    runLocally("cd {{local_path}}/bedrock; wp db reset --allow-root");

    /**
     * Import export file
     */
    writeln("<comment>Importing Server DB on Local</comment>");
    runLocally("cd {{local_path}}/bedrock; wp db import --allow-root ../{$exportFilename}");

    /**
     * Update URL in DB
     * In a multisite environment, the DOMAIN_CURRENT_SITE in the .env file uses the new remote domain.
     * In the DB however, this new remote domain doesn't exist yet before search-replace. So we have
     * to specify the old (remote) domain as --url parameter.
     */
    writeln("<comment>Updating the URLs in the DB</comment>");

    foreach (get('sites') as $key => $value) {
        runLocally("cd {{local_path}}/bedrock && wp search-replace '{$value}' '{$key}' --skip-themes --allow-root --url='{$value}' --network");
    }

    /**
     * Cleanup exports on local machine
     */
    writeln("<comment>Replace https with http in wp_posts table</comment>");
    runLocally("cd {{local_path}}/bedrock && wp search-replace 'https://' 'http://' --allow-root wp_posts");

    /**
     * Cleanup exports on local machine
     */
    writeln("<comment>Replace https with http in wp_posts table</comment>");
    runLocally("cd {{local_path}}/bedrock && wp search-replace 'https://' 'http://' --allow-root wp_posts");

    /**
     * Cleanup exports on local machine
     */
    writeln("<info>Cleaning up</info>");
    runLocally("rm {$downloadedExport}");

});

desc('Pushes DB from local to server and installs it, after backup of server DB');
task('push:db', function () {

    /**
     * Export db on Local
     */
    $exportFilename = get('stage') . '_db_export_' . date('Y-m-d_H-i-s') . '.sql';
    $exportAbsFile = '{{local_path}}/bedrock/' . $exportFilename;
    writeln("<comment>Generate {$exportAbsFile}</comment>");
    runLocally("cd {{local_path}}/bedrock; wp db export {$exportFilename}");

    /**
     * Upload export to server
     */
    $uploadedExport = '{{current_path}}/bedrock/' . $exportFilename;
    writeln("<comment>Upload DB export to Server</comment>");
    upload($exportAbsFile, $uploadedExport);

    /**
     * Cleanup local export
     */
    writeln("<info>Cleaned up</info>");
    runLocally("rm {$exportAbsFile}");

    /**
     * Check if Backup Folder exists locally
     */
    $backupFolder = "{{deploy_path}}/backups/";

    if (!test("[ -d $backupFolder ]")) {
        // Create /backups dir if it does not exist.
        run("mkdir -p $backupFolder");
    }

    /**
     * Creates backup of server DB
     */
    $backupFilename = '{{stage}}_db_backup_' . date('Y-m-d_H-i-s') . '.sql';
    $backupAbsFile = '{{deploy_path}}/backups/' . $backupFilename;
    writeln("<comment>Make DB Backup on Server</comment>");
    writeln("cd {{current_path}}/bedrock && wp db export {$backupAbsFile}");
    run("cd {{current_path}}/bedrock && {{bin/wp}} db export {$backupAbsFile}");

    /**
     * Empty server DB
     */
    writeln("<comment>Reset Server DB</comment>");
    run("cd {{current_path}}/bedrock && {{bin/wp}} db reset");

    /**
     * Import export file
     */
    writeln("<comment>Importing DB on Server</comment>");
    run("cd {{current_path}}/bedrock && {{bin/wp}} db import {$uploadedExport}");

    /**
     * Update URL in DB
     * In a multisite environment, the DOMAIN_CURRENT_SITE in the .env file uses the new remote domain.
     * In the DB however, this new remote domain doesn't exist yet before search-replace. So we have
     * to specify the old (local) domain as --url parameter.
     */
    writeln("<comment>Updating URLs in the DB</comment>");

    foreach (get('sites') as $key => $value) {
        run("cd {{current_path}}/bedrock && {{bin/wp}} search-replace '{$key}' '{$value}' --skip-themes --url='{$key}' --network");
    }

    /**
     * Cleanup exports on local machine
     */
    writeln("<comment>Replace http with https in wp_posts table on server</comment>");
    runLocally("cd {{current_path}}/bedrock && {{bin/wp}} search-replace 'http://' 'https://' --allow-root wp_posts");

    /**
     * Cleanup uploaded file
     */
    writeln("<info>Cleaning up</info>");
    run("rm {$uploadedExport}");
});
