import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {createBlock} from '@wordpress/blocks';
import {RangeControl} from '@wordpress/components';
import {InnerBlocks, InspectorControls, ColorPalette} from '@wordpress/block-editor';
import classNames from 'classnames';

const blockIcon = createElement('svg', {width: 20, height: 20},
    createElement('path', {
        d: 'M11.6,8.14285714 L2,8.14285714 L2,9.71428571 L11.6,9.71428571 L11.6,8.14285714 Z M11.6,5 L2,5 L2,6.57142857 L11.6,6.57142857 L11.6,5 Z M14.8,11.2857143 L14.8,8.14285714 L13.2,8.14285714 L13.2,11.2857143 L10,11.2857143 L10,12.8571429 L13.2,12.8571429 L13.2,16 L14.8,16 L14.8,12.8571429 L18,12.8571429 L18,11.2857143 L14.8,11.2857143 Z M2,12.8571429 L8.4,12.8571429 L8.4,11.2857143 L2,11.2857143 L2,12.8571429 Z'
    })
);

const ALLOWED_BLOCKS = [
    'core/paragraph',
    'core/heading',
    'core/list',
    'core/shortcode',
    'core/spacer',
    'custom/button',
    'custom/icon-text',
    'custom/row',
    'custom/divider'
];

registerBlockType('custom/slider-item', {
    title: __('Slide Item', 'sage'),
    category: 'custom',
    icon: blockIcon,
    // Einfach den Namespace des Parent Innerblocks hinzufügen
    parent: ['custom/slider'],
    supports: {
        // inserter: false,
        reusable: false,
        html: false,
    },
    edit: ({setAttributes, attributes, className}) => {
        return (
            <div className={classNames(className, 'slider-item')} style={{border: '1px solid green'}}>
                <InnerBlocks templateLock={false} allowedBlocks={ALLOWED_BLOCKS}/>
            </div>
        );
    },
    save: ({attributes, className}) => {
        return (
            <div className={classNames(className, 'slider-item')} style={{border: '1px solid green'}}>
                <InnerBlocks.Content/>
            </div>
        );
    },
});
