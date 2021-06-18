<?php

namespace Deployer;

/**
 * Class WordpressDeployer
 * @package Deployer
 */
class DeployerWordpress
{
    public function __construct()
    {
        /**
         * Require all recipes here
         * @link https://deployer.org/recipes.html
         */
        require 'recipes/clean-up.php';
        require 'recipes/composer-install.php';
        require 'recipes/npm-install.php';
        require 'recipes/custom-writeable-dirs.php';
        require 'recipes/sync-database.php';
        require 'recipes/sync-dirs.php';
        require 'recipes/upload-dist.php';
        require 'recipes/upload-folders.php';
    }
}