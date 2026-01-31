# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-01-31

### Added
- WordPress externals plugin for Vite to handle @wordpress/* imports
- Editor entry point with proper WP script dependencies
- Virtual modules for WordPress packages (blocks, components, editor, etc.)
- Experimental API fallbacks (useInnerBlocksProps)
- Favicon and site icons support
- Test file for debugging WordPress API availability

### Changed
- Renamed utility.js to utility.jsx for JSX support
- Updated functions.php with proper editor asset enqueueing
- Improved cookie consent with v3 API detection and graceful fallback

### Fixed
- Icon font path for dev/production environments

### Dependencies
- Added classnames as bundled dependency
- Added lorem-ipsum as bundled dependency

## [1.0.0] - Initial Release

### Added
- Initial WordPress theme setup
- Docker development environment
- Vite build configuration
- Custom Gutenberg blocks
- SCSS styling with Bootstrap
