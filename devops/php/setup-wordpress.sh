#!/bin/bash

# Wait for the database to be ready
/usr/local/bin/wait-for-it.sh mysql:3306 --timeout=30 --strict -- echo "Database is up"

# Ensure the wp-cli is installed and available
if ! command -v wp &> /dev/null; then
    echo "wp-cli could not be found. Please install it first."
    exit 1
fi

# Install WordPress
if [ ! -f wp-config.php ]; then
    echo "wp core download"
    wp core download --version=6.7 --allow-root

    echo "wp config create"
    wp config create --dbname="$MYSQL_DATABASE" --dbuser="$MYSQL_USER" --dbhost="$MYSQL_HOST" --dbpass="$MYSQL_PASSWORD" --allow-root

    echo "wp core install"
    wp core install --url="$WORDPRESS_URL" --title="$WORDPRESS_TITLE" --admin_user="$WORDPRESS_ADMIN_USER" --admin_password="$WORDPRESS_ADMIN_PASSWORD" --admin_email="$WORDPRESS_ADMIN_EMAIL" --allow-root

    echo "Activating theme"
    wp theme activate "$WORDPRESS_THEME" --allow-root
fi

# Define the list of plugins to install
plugins=(
    "advanced-custom-fields-pro"
    "autodescription:5.0.7:activate"
    "clean-image-filenames:1.5:activate"
    "disable-comments:2.4.6:activate"
    "enable-media-replace:4.1.5:activate"
    "imsanity:2.8.5:activate"
    "phoenix-media-rename:3.11.8:activate"
    "svg-support:2.5.8:activate"
    "user-switching:1.8.0:activate"
    "webp-converter-for-media:6.0.0:activate"
)

# Install plugins
for plugin in "${plugins[@]}"; do
    IFS=":" read -r plugin_slug plugin_version plugin_action <<< "$plugin"
    
    # Skip ACF Pro (needs manual installation)
    if [ "$plugin_slug" == "advanced-custom-fields-pro" ]; then
        echo "Skipping ACF Pro - requires manual installation"
        continue
    fi

    if [ "$plugin_action" == "activate" ]; then
        wp plugin install "$plugin_slug" --version="$plugin_version" --activate --allow-root
    else
        wp plugin install "$plugin_slug" --version="$plugin_version" --allow-root
    fi
done
