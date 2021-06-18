<?php
/**
 * Provides Deployer tasks to upload and download files
 * from and to server. When not explicitly using the
 * xyz:files-no-bak, a backup of the current files is
 * created, before new files are transferred.
 *
 * Requires these Deployer variables to be set:
 *   sync_dirs: Array of paths, that will be simultaneously updated
 *              with $absoluteLocalPath => $absoluteRemotePath
 *              If a path has a trailing slash, only its content
 *              will be transferred, not the directory itself.
 */

namespace Deployer;

/**
 * Check if dir is empty
 * @param $dir
 * @return bool|null
 */
function is_dir_empty($dir)
{
    if (!is_readable($dir)) {
        return null;
    }
    return (count(scandir($dir)) == 2);
}

desc('Create backup from sync directories on server');
task('backup:remote_files', function () {

    foreach (get('sync_dirs') as $localDir => $serverDir) {
        if (!is_dir_empty($serverDir)) {
            $backupFilename = get('stage') . '_' . basename($serverDir) . '_backup_' . date('Y-m-d_H-i-s') . '.zip';

            $backupFolder = "{{deploy_path}}/backups/";

            /**
             * Create /backups dir if it does not exist.
             */
            if (!test("[ -d $backupFolder ]")) {
                run("mkdir -p $backupFolder");
            }

            /**
             * Note: sync_dirs can have a trailing slash (which means, sync only the content of the specified directory)
             */
            if (substr($serverDir, -1) == '/') {

                /**
                 * Add everything from synced directory to zip, but exclude previous backups
                 */
                run("cd {$serverDir} && zip -r {$backupFolder}{$backupFilename} .");
            } else {

                /**
                 * Add everything from synced directory to zip, but exclude previous backups
                 */
                $backupDir = dirname($serverDir);
                $dir = basename($serverDir);
                run("cd {$backupDir} && zip -r {$backupFolder}{$backupFilename} {$dir}");
            }
        }
    };
});

desc('Create backup from sync directories on local machine');
task('backup:local_files', function () {

    foreach (get('sync_dirs') as $localDir => $serverDir) {
        if (!is_dir_empty($localDir)) {
            $backupFilename = get('stage') . '_' . basename($localDir) . '_backup_' . date('Y-m-d_H-i-s') . '.zip';

            /**
             * Note: sync_dirs can have a trailing slash (which means, sync only the content of the specified directory)
             */

            /**
             * Check if Backup Folder exists locally
             */
            $backupFolder = "{{local_path}}/backups/";

            if (!testLocally("[ -d $backupFolder ]")) {
                /**
                 * Create /backups dir if it does not exist.
                 */
                runLocally("mkdir -p $backupFolder");
            }

            if (substr($localDir, -1) == '/') {

                /**
                 * Add everything from synced directory to zip, but exclude previous backups
                 */
                runLocally("cd {$localDir} && zip -r {$backupFolder}{$backupFilename} .");
            } else {
                /**
                 * Add everything from synced directory to zip, but exclude previous backups
                 */
                $backupDir = dirname($localDir);
                $dir = basename($localDir);
                runLocally("cd {$backupDir} && zip -r {$backupFolder}{$backupFilename} {$dir}");
            }
        }
    };
});

desc('Upload sync directories from local to server');
task('push:files_no_backup', function () {
    foreach (get('sync_dirs') as $localDir => $serverDir) {
        upload($localDir, $serverDir);
    };
});

desc('Download sync directories from server to local');
task('pull:files_no_backup', function () {
    foreach (get('sync_dirs') as $localDir => $serverDir) {
        download($serverDir, $localDir);
    };
});

desc('Upload sync directories from local to server after making backup of remote files');
task('push:files', [
    'backup:remote_files',
    'push:files_no_backup',
]);

desc('Download sync directories from server to local machine after making backup of local files');
task('pull:files', [
    'backup:local_files',
    'pull:files_no_backup',
]);
