FROM php:8.2-fpm

# Install necessary PHP extensions
RUN docker-php-ext-install mysqli

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    less \
    vim \
    mariadb-client \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip \
    tree \
    zsh \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install WP-CLI
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x wp-cli.phar \
    && mv wp-cli.phar /usr/local/bin/wp

# Install wait-for-it script
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Install Oh My Zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended \
    && chsh -s $(which zsh)

# Copy scripts
COPY devops/php/entrypoint.sh /usr/local/bin/entrypoint.sh
COPY devops/php/setup-wordpress.sh /usr/local/bin/setup-wordpress.sh
COPY devops/php/search-replace-export-db.sh /usr/local/bin/search-replace-export-db.sh
COPY devops/php/search-replace-import-db.sh /usr/local/bin/search-replace-import-db.sh

# Make the scripts executable
RUN chmod +x /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/setup-wordpress.sh
RUN chmod +x /usr/local/bin/search-replace-export-db.sh
RUN chmod +x /usr/local/bin/search-replace-import-db.sh

# Set the working directory
WORKDIR /var/www/html

# Set the entrypoint to the setup script
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
