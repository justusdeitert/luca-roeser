import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks} from '@wordpress/block-editor';
import classNames from 'classnames';
import {buttonIcon} from '../icons';

const ALLOWEDBLOCKS = [
    'core/paragraph',
    'core/heading',
    'core/list',
    'core/shortcode',
    'core/spacer',
    'core/group',
    'custom/button',
    'custom/icon-text',
    'custom/row',
    'custom/divider',
    'custom/image'
];

registerBlockType('custom/content', {
    title: __('Content', 'sage'),
    category: 'custom',
    icon: buttonIcon,
    supports: {
        // inserter: false,
        reusable: false,
        html: false,
    },
    edit: ({setAttributes, attributes, className}) => {
        return (
            <div className={classNames(className, 'column-block')}>
                <div className="column-block__inner">
                    <InnerBlocks templateLock={false} allowedBlocks={ALLOWEDBLOCKS}/>
                </div>
            </div>
        );
    },
    save: ({attributes, className}) => {
        return (
            <div className={classNames(className, 'column-block')}>
                <div className="column-block__inner">
                    <InnerBlocks.Content/>
                </div>
            </div>
        );
    },
});
