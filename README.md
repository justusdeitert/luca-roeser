# Luca Roeser - WordPress Theme

Custom WordPress theme with Docker development environment and Vite for asset bundling.

## Requirements

- Docker & Docker Compose
- Node.js 22+ (for local development without Docker)

## Quick Start

### 1. Setup Environment

```bash
# Copy environment file
cp .env.example .env

# Edit .env with your settings (passwords, etc.)
```

### 2. Start Docker Containers

```bash
# Build and start all containers
docker compose up -d --build

# WordPress will be available at: http://localhost:8080
# phpMyAdmin at: http://localhost:8081
```

### 3. Start Vite Dev Server

```bash
# Enter the node container
docker compose exec node sh

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

The Vite dev server runs at `http://localhost:5173` and provides HMR for JavaScript and CSS.

## Development

### Theme Structure

```
theme/
├── src/                    # Source files
│   ├── js/                 # JavaScript files
│   │   └── main.js         # Main entry point
│   ├── scss/               # SCSS stylesheets
│   │   └── main.scss       # Main stylesheet
│   ├── fonts/              # Font files
│   └── images/             # Image assets
├── inc/                    # PHP includes
├── acf-json/               # ACF field group JSON
├── assets/                 # Compiled assets (gitignored)
├── functions.php           # Theme functions
├── style.css               # Theme metadata
├── vite.config.js          # Vite configuration
└── package.json
```

### NPM Scripts

```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # Build production assets
```

### Docker Commands

```bash
# Start containers
docker compose up -d

# Stop containers
docker compose down

# View logs
docker compose logs -f

# Enter PHP container (WP-CLI available)
docker compose exec php zsh

# Enter Node container
docker compose exec node sh

# Rebuild containers
docker compose up -d --build
```

### WP-CLI Commands

```bash
# Inside the PHP container:
wp plugin list
wp theme activate luca-roeser
wp search-replace 'old-url' 'new-url' --dry-run
```

## Database Management

### Export Database

```bash
docker compose exec php search-replace-export-db.sh
```

### Import Database

```bash
docker compose exec php search-replace-import-db.sh
```

## Production Build

```bash
# Enter node container
docker compose exec node sh

# Build assets
npm run build
```

The compiled assets will be in `theme/assets/` and automatically loaded by WordPress.

## Ports

| Service     | Port |
|-------------|------|
| WordPress   | 8080 |
| phpMyAdmin  | 8081 |
| Vite HMR    | 5173 |
