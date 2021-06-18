<?php

namespace Deployer;

/**
 * Autoload Vendors
 */
require __DIR__ . '/vendor/autoload.php';

/**
 * Require Deployer Recipes
 * @link https://deployer.org/recipes.html
 */
require 'recipe/common.php';
require 'recipe/slack.php';

/**
 * Deployer Wordpress Setup
 */
new DeployerWordpress();

/**
 * Local Path Needs to be set, there is no such deployer variable
 */
set('local_path', __DIR__);

/*
 * Used for push and pull commands
 */
set('sync_dirs', [
    '{{local_path}}/bedrock/web/app/uploads/' => '{{deploy_path}}/shared/bedrock/web/app/uploads/',
    // '{{local_path}}/bedrock/web/app/uploads-webpc/' => '{{deploy_path}}/shared/bedrock/web/app/uploads-webpc/',
]);

/**
 * Upload Folders eg. if you quickly want to add a plugin without composer..
 */
set('upload_folders', [
    // '{{local_path}}/bedrock/web/app/plugins/aad-sso-wordpress-master' => '{{release_path}}/bedrock/web/app/plugins/',
]);

/**
 * Set writeable Folders
 */
set('custom_writable_dirs', [
    'bedrock/web/app/uploads',
    // '{{local_path}}/bedrock/web/app/uploads-webpc',
    'theme/acf-json',
]);


set('custom_clean_up', [
    // 'test'
]);

/**
 * Configure Theme Paths For uploading Dist Folders after local build
 */
set('theme_paths', [
    'theme' // theme is symlinked to 'bedrock/web/app/themes/theme'
]);

/**
 * Configure Composer Paths For Installing Composer Packages on Server
 */
set('composer_paths', [
    'bedrock',
    'theme'
]);

/**
 * Configure NPM Paths For Installing NPM Packages on Server
 */
set('npm_paths', [
    'bedrock/web/app/themes/theme'
]);

/**
 * Project name
 */
set('application', 'dr-ladwig');

/*
 * Project repository
 */
set('repository', 'git@lab.justusdeitert.de:JD/johannes-ladwig.git');

/**
 * Number of releases to keep. -1 for unlimited releases. Default to 5.
 */
set('keep_releases', 5);

/**
 * [Optional] Allocate tty for git clone. Default value is false.
 */
set('git_tty', true);

/**
 * Shared files
 */
set('shared_files', [
    'bedrock/.env',
    'bedrock/web/.htaccess'
]);

/**
 * Setup default deployment stage
 */
set('default_stage', 'staging');

/**
 * Individually load shared dirs
 */
set('shared_dirs', [
    'bedrock/web/app/uploads',
]);

// Load host setup
inventory(__DIR__ . '/hosts.yml');

// Tasks
// https://deployer.org/docs/advanced/deploy-strategies.html
desc('Deploy your project');
task('deploy', [
    'deploy:info',
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'deploy:writable',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup', // Cleaning up old releases
    'success'
]);

// after('deploy:update_code', 'npm:install');
after('deploy:shared', 'upload:dist');
after('deploy:shared', 'upload:folders');
after('deploy:shared', 'composer:install');

/**
 * If deploy fails automatically unlock.
 */
after('deploy:failed', 'deploy:unlock');

/**
 * After successfully deployed
 */
// after('success', 'custom_task');

/**
 * This Is Needed due to a styles issue when deploying borlabs cookie plugin
 */
// desc('Deactivate unnecessary Plugins');
// task('deactivate_password_protected', function () {
//     writeln("<comment>Deactivate Password Protected plugin</comment>");
//     runLocally("cd bedrock && wp plugin deactivate password-protected");
// });

desc('Push Project DB & Uploads Folder');
task('push', [
    'push:db',
    'push:files'
]);

desc('Pull Project DB & Uploads Folder');
task('pull', [
    'custom_writeable_dirs',
    'pull:db',
    'pull:files',
    // 'deactivate_password_protected'
]);

// Slack Messaging
// ------------------------>
// https://deployer.org/recipes/slack.html
// -------------------------->
// set('slack_webhook', 'getenv('SLACK_WEBHOOK_URL')');
// set('slack_title', '{{application}}'); // the title of application, default {{application}}
// set('slack_text', '_{{user}}_ deploying `{{branch}}` to *{{application}}.{{target}}*');
// set('slack_success_text', 'Deploy to *{{target}}* successful'); // 'Successfully Deployed to *{{application}}.{{target}}*'
// set('slack_failure_text', 'Deploy to *{{target}}* failed');

// Fire Slack Notifications on
// Only Notifies if deployment was Successfull
// ------------->
// after('success', 'slack:notify:success');
// before('deploy', 'slack:notify');
// after('deploy:failed', 'slack:notify:failure');
