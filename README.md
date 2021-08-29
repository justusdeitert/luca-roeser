# Luca Roeser

A modern WordPress project built with [Bedrock](https://roots.io/bedrock/) and [Sage](https://roots.io/sage/).

## 🏗️ Tech Stack

- **[Bedrock](https://roots.io/bedrock/)** — Modern WordPress boilerplate with improved folder structure, Composer-based dependency management, and environment-specific configuration
- **[Sage](https://roots.io/sage/)** — WordPress starter theme with Laravel Blade templating, modern build tools, and a clean MVC-like structure
- **[Laravel Mix](https://laravel-mix.com/)** — Elegant wrapper around Webpack for asset compilation
- **[Deployer](https://deployer.org/)** — PHP deployment tool for automated deployments

## 📁 Project Structure

```
├── bedrock/              # WordPress installation (Bedrock)
│   ├── config/           # Environment configuration
│   └── web/              # Web root
│       ├── app/          # WordPress content (themes, plugins, uploads)
│       └── wp/           # WordPress core (managed by Composer)
├── theme/                # Sage theme
│   ├── app/              # Theme PHP files
│   ├── config/           # Theme configuration
│   ├── resources/        # Assets, views, and language files
│   │   ├── fonts/
│   │   ├── images/
│   │   ├── scripts/
│   │   ├── styles/
│   │   └── views/        # Blade templates
│   └── public/           # Compiled assets
├── deployer/             # Deployment recipes
├── hosts/                # Deployment host configurations
└── backups/              # Database backups
```

## 🚀 Getting Started

### Prerequisites

- PHP >= 7.4
- Composer
- Node.js >= 12.14.0
- npm or Yarn
- MySQL or MariaDB

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd luca-roeser
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   cd bedrock && composer install
   cd ../theme && composer install
   ```

3. **Install Node dependencies**
   ```bash
   cd theme
   npm install
   ```

4. **Configure environment**
   ```bash
   cp bedrock/.env.example bedrock/.env
   ```
   Edit `bedrock/.env` and configure your database credentials and other settings.

5. **Build assets**
   ```bash
   cd theme
   npm run build
   ```

## 💻 Development

### Theme Development

Navigate to the theme directory and run:

```bash
cd theme

# Start development server with hot reloading
npm run start

# Build assets for development
npm run build

# Build optimized assets for production
npm run build:production
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run start` | Start development with file watching |
| `npm run hot` | Start development with hot module replacement |
| `npm run build` | Compile assets for development |
| `npm run build:production` | Compile and minify assets for production |
| `npm run lint` | Run JavaScript and CSS linting |
| `npm run translate` | Generate translation files |

## 🚢 Deployment

This project uses [Deployer](https://deployer.org/) for automated deployments. Host configurations are stored in the `hosts/` directory.

### Deploy to a host

```bash
dep deploy <hostname>
```

### Sync database

```bash
dep sync:database <hostname>
```

### Sync uploads

```bash
dep sync:dirs <hostname>
```

## 📝 License

This project is licensed under the MIT License.
