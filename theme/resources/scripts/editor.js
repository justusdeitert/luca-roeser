import '@wordpress/edit-post';
import domReady from '@wordpress/dom-ready';
import {unregisterBlockStyle, registerBlockStyle} from '@wordpress/blocks';

/**
 * External Dependencies
 */
import './external';

/**
 * Gutenberg Blocks
 */
import '../blocks';

/**
 * Gutenberg Block Formats
 */
import '../block-formats';

domReady(() => {
    unregisterBlockStyle('core/button', 'outline');

    registerBlockStyle('core/button', {
        name: 'outline',
        label: 'Outline',
    });
});
