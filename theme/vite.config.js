import { defineConfig } from 'vite';
import path from 'path';

// WordPress packages that are provided globally in the editor
const wpExternals = [
    '@wordpress/blocks',
    '@wordpress/i18n',
    '@wordpress/element',
    '@wordpress/components',
    '@wordpress/block-editor',
    '@wordpress/editor',
    '@wordpress/dom-ready',
    '@wordpress/edit-post',
    '@wordpress/data',
    '@wordpress/compose',
    '@wordpress/hooks',
    '@wordpress/plugins',
    '@wordpress/rich-text',
    '@wordpress/url',
    '@wordpress/api-fetch',
    '@wordpress/icons',
    '@wordpress/primitives',
    // Note: classnames is NOT an external - it needs to be bundled
    'lodash',
    'react',
    'react-dom',
];

// Convert @wordpress/package-name to wp.packageName
function wpExternalToGlobal(id) {
    if (id === 'lodash') return 'lodash';
    if (id === 'react') return 'React';
    if (id === 'react-dom') return 'ReactDOM';

    const match = id.match(/^@wordpress\/(.+)$/);
    if (match) {
        const packageName = match[1]
            .split('-')
            .map((part, i) => i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1))
            .join('');
        return `wp.${packageName}`;
    }
    return id;
}

// Plugin to handle WordPress externals in dev mode
function wordpressExternalsPlugin() {
    const virtualModulePrefix = '\0wp-external:';

    // Map of package names to their known exports
    const wpPackageExports = {
        '@wordpress/blocks': ['registerBlockType', 'createBlock', 'getBlockTypes', 'getBlockType', 'getBlockAttributes', 'unregisterBlockType', 'registerBlockStyle', 'unregisterBlockStyle', 'registerBlockVariation', 'unregisterBlockVariation', 'getBlockVariations', 'getDefaultBlockName', 'setDefaultBlockName', 'getGroupingBlockName', 'setGroupingBlockName', 'getFreeformContentHandlerName', 'setFreeformContentHandlerName', 'getUnregisteredTypeHandlerName', 'setUnregisteredTypeHandlerName', 'serialize', 'parse', 'pasteHandler', 'rawHandler', 'cloneBlock', 'getPossibleBlockTransformations', 'switchToBlockType', 'getBlockTransforms', 'findTransform', 'hasBlockSupport', 'isReusableBlock', 'isTemplatePart', 'getBlockDefaultClassName', 'getBlockMenuDefaultClassName', 'getSaveElement', 'getSaveContent', 'store'],
        '@wordpress/i18n': ['__', '_x', '_n', '_nx', 'sprintf', 'setLocaleData'],
        '@wordpress/element': ['createElement', 'Fragment', 'useState', 'useEffect', 'useCallback', 'useMemo', 'useRef', 'useContext', 'createContext', 'forwardRef', 'cloneElement', 'Children', 'memo', 'createPortal', 'render', 'unmountComponentAtNode', 'Component', 'PureComponent', 'createRef', 'isValidElement', 'StrictMode', 'Suspense', 'lazy', 'startTransition', 'useId', 'useSyncExternalStore', 'useTransition', 'useDeferredValue', 'useLayoutEffect', 'useImperativeHandle', 'useDebugValue', 'useReducer', 'flushSync', 'createRoot', 'hydrateRoot', 'RawHTML', 'renderToString', 'Platform', 'useInsertionEffect'],
        '@wordpress/components': ['Button', 'TextControl', 'TextareaControl', 'SelectControl', 'ToggleControl', 'RangeControl', 'CheckboxControl', 'RadioControl', 'PanelBody', 'PanelRow', 'Modal', 'Popover', 'Tooltip', 'Icon', 'Dashicon', 'Spinner', 'Notice', 'ToolbarGroup', 'ToolbarButton', 'ToolbarDropdownMenu', 'ColorPicker', 'ColorPalette', 'Disabled', 'Card', 'CardBody', 'CardHeader', 'CardFooter', 'Flex', 'FlexItem', 'FlexBlock', '__experimentalRadio', '__experimentalRadioGroup', '__experimentalBoxControl', '__experimentalAlignmentMatrixControl', '__experimentalUnitControl', '__experimentalGradientPicker', 'FocalPointPicker', 'BaseControl', 'FormTokenField', 'MenuGroup', 'MenuItem', 'MenuItemsChoice', 'NavigableMenu', 'ExternalLink', 'Guide', 'GuidePage', 'Placeholder', 'ResizableBox', 'SandBox', 'SnackbarList', 'TabPanel', 'Tip', 'VisuallyHidden', 'IsolatedEventContainer', 'Animate', 'Fill', 'Slot', 'SlotFillProvider', 'withFilters', 'withFocusReturn', 'withNotices', 'withSpokenMessages', 'ColorIndicator', 'DropZone', 'Dropdown', 'DropdownMenu', 'FontSizePicker', 'FormFileUpload', 'KeyboardShortcuts', 'ResponsiveWrapper'],
        '@wordpress/block-editor': ['InnerBlocks', 'InspectorControls', 'BlockControls', 'RichText', 'RichTextToolbarButton', 'MediaUpload', 'MediaUploadCheck', 'ColorPalette', 'useBlockProps', 'withColors', 'PanelColorSettings', 'BlockAlignmentToolbar', 'BlockVerticalAlignmentToolbar', 'AlignmentToolbar', 'URLInput', 'URLInputButton', 'PlainText', 'getColorClassName', 'getColorObjectByColorValue', 'withFontSizes', '__experimentalColorGradientControl', '__experimentalLinkControl', '__experimentalGradientPicker', 'BlockIcon', 'Warning', 'ContrastChecker', 'WritingFlow', 'BlockList', 'BlockEditorProvider', 'BlockEditorKeyboardShortcuts', 'ObserveTyping', 'store'],
        '@wordpress/editor': ['EditorProvider', 'PostTitle', 'PostPublishPanel', 'PostSavedState', 'EditorHistoryRedo', 'EditorHistoryUndo', 'PostPreviewButton', 'PostPendingStatusCheck', 'PostScheduleCheck', 'PostSwitchToDraftButton', 'PostVisibility', 'PostVisibilityCheck', 'PostFormat', 'PostFormatCheck', 'store'],
        '@wordpress/dom-ready': ['default'],
        '@wordpress/edit-post': ['PluginSidebar', 'PluginSidebarMoreMenuItem', 'PluginDocumentSettingPanel', 'PluginMoreMenuItem', 'PluginBlockSettingsMenuItem', 'PluginPostStatusInfo', 'PluginPrePublishPanel', 'PluginPostPublishPanel', 'store'],
        '@wordpress/data': ['select', 'dispatch', 'useSelect', 'useDispatch', 'withSelect', 'withDispatch', 'combineReducers', 'createRegistry', 'createRegistryControl', 'createRegistrySelector', 'register', 'registerStore', 'subscribe', 'use'],
        '@wordpress/compose': ['compose', 'createHigherOrderComponent', 'ifCondition', 'pure', 'withGlobalEvents', 'withInstanceId', 'withSafeTimeout', 'withState', 'useInstanceId', 'useViewportMatch', 'useCopyOnClick', 'useDebounce', 'useFocusOnMount', 'useThrottle', 'useMergeRefs', 'usePrevious', 'useReducedMotion', 'useResizeObserver', 'useAsyncList', 'useFocusReturn', 'useFocusableIframe', 'useConstrainedTabbing', 'useDialog', 'useDisabled'],
        '@wordpress/hooks': ['addAction', 'addFilter', 'removeAction', 'removeFilter', 'removeAllActions', 'removeAllFilters', 'doAction', 'applyFilters', 'currentAction', 'currentFilter', 'doingAction', 'doingFilter', 'didAction', 'didFilter', 'hasAction', 'hasFilter', 'actions', 'filters', 'createHooks'],
        '@wordpress/plugins': ['registerPlugin', 'unregisterPlugin', 'getPlugin', 'getPlugins'],
        '@wordpress/rich-text': ['registerFormatType', 'unregisterFormatType', 'applyFormat', 'removeFormat', 'toggleFormat', 'create', 'toHTMLString', 'insert', 'remove', 'getTextContent', 'isCollapsed', 'isEmpty', 'getActiveFormat', 'getActiveFormats', 'getActiveObject', 'slice', 'split', 'join', 'replace', 'insertObject', 'concat', 'useAnchorRef', 'useAnchor', 'store'],
        '@wordpress/url': ['addQueryArgs', 'getQueryArg', 'getQueryArgs', 'hasQueryArg', 'removeQueryArgs', 'prependHTTP', 'safeDecodeURI', 'safeDecodeURIComponent', 'filterURLForDisplay', 'cleanForSlug', 'isURL', 'isEmail', 'getProtocol', 'isValidProtocol', 'getAuthority', 'isValidAuthority', 'getPath', 'isValidPath', 'getQueryString', 'isValidQueryString', 'getFragment', 'isValidFragment', 'buildQueryString', 'normalizePath'],
        '@wordpress/api-fetch': ['default'],
        '@wordpress/icons': ['Icon', 'check', 'close', 'cog', 'chevronDown', 'chevronUp', 'chevronLeft', 'chevronRight', 'arrowLeft', 'arrowRight', 'arrowUp', 'arrowDown', 'plus', 'plusCircle', 'minus', 'trash', 'edit', 'cloud', 'brush', 'group', 'color', 'moveTo', 'mobile', 'tablet', 'desktop', 'undo', 'redo', 'search', 'menu', 'moreVertical', 'moreHorizontal', 'dragHandle', 'formatBold', 'formatItalic', 'formatUnderline', 'formatStrikethrough', 'formatCapitalize', 'link', 'linkOff', 'image', 'video', 'upload', 'download', 'external', 'lock', 'unlock', 'warning', 'info', 'help', 'code', 'globe', 'settings', 'star', 'starFilled', 'starEmpty', 'heart', 'mapMarker', 'pin', 'calendar', 'clock', 'comment', 'people', 'person', 'institution', 'page', 'pages', 'postList', 'postContent', 'postExcerpt', 'postFeaturedImage', 'postDate', 'postAuthor', 'postCategories', 'postTags', 'postTitle', 'columns', 'column', 'grid', 'row', 'heading', 'paragraph', 'list', 'listView', 'blockDefault', 'aspectRatio', 'separator', 'resizeCornerNE', 'box', 'button', 'cover', 'layout', 'styles', 'loop', 'flipVertical', 'html', 'blockTable', 'table', 'pullLeft', 'pullRight', 'formatIndent', 'formatOutdent', 'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'textColor', 'background', 'customPostType', 'archive', 'tag', 'category', 'media', 'lineDashed', 'lineDotted', 'lineSolid', 'create', 'keyboardReturn', 'position', 'stretchWide', 'stretchFullWidth', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifySpaceBetween'],
        '@wordpress/primitives': ['SVG', 'Path', 'Circle', 'Polygon', 'Rect', 'G', 'Line', 'Defs', 'ClipPath', 'LinearGradient', 'RadialGradient', 'Stop'],
    };

    return {
        name: 'wordpress-externals',
        enforce: 'pre',
        resolveId(id) {
            if (wpExternals.includes(id)) {
                return virtualModulePrefix + id;
            }
            return null;
        },
        load(id) {
            if (id.startsWith(virtualModulePrefix)) {
                const actualId = id.slice(virtualModulePrefix.length);
                const globalVar = wpExternalToGlobal(actualId);
                const knownExports = wpPackageExports[actualId] || [];

                // Special handling for packages that are just functions (default exports only)
                if (actualId === 'lodash') {
                    return `
const lodash = window.lodash;
export default lodash;
export { lodash as _ };
`;
                }

                if (actualId === 'react') {
                    return `
const React = window.React;
export default React;
export const { createElement, Fragment, useState, useEffect, useCallback, useMemo, useRef, useContext, createContext, forwardRef, cloneElement, Children, memo, createPortal, Component, PureComponent, createRef, isValidElement, StrictMode, Suspense, lazy, startTransition, useId, useSyncExternalStore, useTransition, useDeferredValue, useLayoutEffect, useImperativeHandle, useDebugValue, useReducer } = React;
`;
                }

                if (actualId === 'react-dom') {
                    return `
const ReactDOM = window.ReactDOM;
export default ReactDOM;
export const { render, unmountComponentAtNode, createPortal, flushSync, createRoot, hydrateRoot } = ReactDOM;
`;
                }

                // Special handling for block-editor with experimental fallbacks
                if (actualId === '@wordpress/block-editor') {
                    const baseExports = knownExports
                        .filter(exp => exp !== 'default' && !exp.includes('UseInnerBlocksProps'))
                        .map(exp => `export const ${exp} = window.wp.blockEditor?.${exp};`)
                        .join('\n');
                    
                    return `
const wpModule = window.wp.blockEditor;
export default wpModule;
${baseExports}
// useInnerBlocksProps - prefer stable, fall back to experimental
export const useInnerBlocksProps = window.wp.blockEditor?.useInnerBlocksProps || window.wp.blockEditor?.__experimentalUseInnerBlocksProps;
// Also export experimental name pointing to same function for backwards compatibility
export const __experimentalUseInnerBlocksProps = window.wp.blockEditor?.useInnerBlocksProps || window.wp.blockEditor?.__experimentalUseInnerBlocksProps;
`;
                }

                // Generate named exports for WordPress packages
                const namedExports = knownExports
                    .filter(exp => exp !== 'default')
                    .map(exp => `export const ${exp} = window.${globalVar}?.${exp};`)
                    .join('\n');

                return `
const wpModule = window.${globalVar};
export default wpModule;
${namedExports}
`;
            }
            return null;
        },
    };
}

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
        plugins: [wordpressExternalsPlugin()],
        build: {
            outDir: path.resolve(__dirname, 'assets'),
            emptyOutDir: true,
            sourcemap: true,
            manifest: true,
            rollupOptions: {
                input: {
                    main: path.resolve(__dirname, 'src/js/main.js'),
                    editor: path.resolve(__dirname, 'src/js/editor-entry.js'),
                },
                external: wpExternals,
                output: {
                    globals: Object.fromEntries(
                        wpExternals.map(ext => [ext, wpExternalToGlobal(ext)])
                    ),
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
