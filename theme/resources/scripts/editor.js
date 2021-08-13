// import {__} from '@wordpress/i18n';
import '@wordpress/edit-post';
import domReady from '@wordpress/dom-ready';
// import {registerBlockStyle} from '@wordpress/blocks';

/**
 * External Dependencies
 */
import './external';

/**
 * Gutenberg Blocks
 */
import '../blocks';

/**
 * Block Scripts & Plugins
 */
import './editor-scripts';

/**
 * Gutenberg Block Formats
 */
import '../block-formats';

/**
 * Core Block Extends
 */
import '../block-extends';

domReady(() => {
    // registerBlockStyle('core/heading', [
    //     {
    //         name: 'text-shadow',
    //         label: __('Text Shadow', 'sage'),
    //     },
    // ]);

    // registerBlockStyle('core/list', [
    //     {
    //         name: 'no-format',
    //         label: __('No Format', 'sage'),
    //     },
    // ]);
});
