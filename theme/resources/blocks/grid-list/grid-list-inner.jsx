import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks, useBlockProps, __experimentalUseInnerBlocksProps as useInnerBlocksProps} from '@wordpress/block-editor';
import classNames from 'classnames';
import {gridListInner} from '../icons';
import {ALLOWEDBLOCKS} from '../utility';

registerBlockType('custom/grid-list-inner', {
    apiVersion: 2,
    title: __('Grid List Inner', 'sage'),
    category: 'custom',
    icon: gridListInner,
    parent: ['custom/grid-list'],
    // supports: {
    //     // inserter: false,
    //     reusable: false,
    //     html: false,
    // },
    edit: ({setAttributes, attributes, className}) => {

        const blockProps = useBlockProps({
            className: classNames(className, 'grid-list-block__inner'),
        });

        /**
         * useInnerBlocksProps is still experimental and will be ready in future versions
         */
        // const innerBlocksProps = useInnerBlocksProps(blockProps, {
        //     allowedBlocks: [ALLOWEDBLOCKS],
        //     template: TEMPLATE,
        //     templateLock: false,
        //     renderAppender: InnerBlocks.ButtonBlockAppender,
        // });

        return (
            <>
                <div className={classNames(className, 'grid-list-block__col')}>
                    <div { ...blockProps }>
                        <InnerBlocks templateLock={false} allowedBlocks={ALLOWEDBLOCKS} renderAppender={InnerBlocks.DefaultBlockAppender} />
                    </div>
                </div>
            </>
        );
    },
    save: ({attributes, className}) => {
        return (
            <div className={classNames(className, 'grid-list-block__col')}>
                <div className='grid-list-block__inner'>
                    <InnerBlocks.Content/>
                </div>
            </div>
        );
    },
});
