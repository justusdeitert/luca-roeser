import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig(async ({ mode }) => {
    const isProduction = mode === 'production';
    const assetsPath = path.resolve(__dirname, 'assets');

    if (!isProduction) {
        const fs = await import('fs');

        // Delete the assets folder in development mode
        if (fs.existsSync(assetsPath)) {
            fs.rmSync(assetsPath, { recursive: true, force: true });
            console.log('Assets folder deleted during development mode.');
        }
    }

    return {
        root: 'src',
        minify: 'esbuild',
        base: isProduction ? '/wp-content/themes/luca-roeser/assets/' : '/',
        build: {
            outDir: path.resolve(__dirname, 'assets'),
            emptyOutDir: true,
            sourcemap: true,
            manifest: true,
            rollupOptions: {
                input: {
                    main: path.resolve(__dirname, 'src/js/main.js'),
                },
                output: {
                    entryFileNames: 'js/[name].js',
                    assetFileNames: (assetInfo) => {
                        if (assetInfo.name.endsWith('.css')) {
                            return 'css/[name][extname]';
                        }

                        if (['.ttf', '.woff', '.woff2'].some((ext) => assetInfo.name.endsWith(ext))) {
                            return 'fonts/[name][extname]';
                        }

                        if (['.png', '.jpg', '.jpeg', '.svg', '.webp'].some((ext) => assetInfo.name.endsWith(ext))) {
                            return 'images/[name][extname]';
                        }

                        return '[name][extname]';
                    },
                },
            },
        },
        css: {
            devSourcemap: true,
            preprocessorOptions: {
                scss: {
                    api: 'legacy',
                    silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'mixed-decls'],
                },
            },
        },
        server: {
            host: '0.0.0.0',
            port: 5173,
            origin: 'http://localhost:5173',
            hmr: {
                host: 'localhost',
                port: 5173,
            },
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
    };
});
