# Install composer
composer install
composer install --working-dir=./theme
composer install --working-dir=./bedrock

# Install yarn
yarn --cwd ./theme
yarn --cwd ./theme build

# TODO: Setup .env file & .htaccess
# --------->
