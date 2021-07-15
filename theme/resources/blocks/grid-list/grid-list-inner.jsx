import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks, InspectorControls, ColorPalette, useBlockProps, __experimentalUseInnerBlocksProps as useInnerBlocksProps} from '@wordpress/block-editor';
import classNames from 'classnames';
import {gridListInner} from '../icons';
import {ALLOWEDBLOCKS, editorThemeColors, getColorObject, parentAttributes} from '../utility';

const attributes = {
    clientId: {
        type: 'string',
        default: ''
    },
    backgroundColor: {
        type: 'string',
        default: ''
    },
    generalBackgroundColor: {
        type: 'string',
        default: ''
    },
};

/**
 * Returns background color slug
 * @param backgroundColor
 * @param fallbackColor
 */
const getBackgroundColorSlug = (backgroundColor, fallbackColor) => {
    let backgroundColorSlug = false;

    if (getColorObject(fallbackColor)) {
        backgroundColorSlug = getColorObject(fallbackColor).slug;
    }

    if (getColorObject(backgroundColor)) {
        backgroundColorSlug = getColorObject(backgroundColor).slug;
    }

    return backgroundColorSlug;
}

registerBlockType('custom/grid-list-inner', {
    apiVersion: 2,
    title: __('Grid List Inner', 'sage'),
    category: 'custom',
    icon: gridListInner,
    attributes,
    parent: ['custom/grid-list'],
    // supports: {
    //     // inserter: false,
    //     reusable: false,
    //     html: false,
    // },
    edit: ({setAttributes, attributes, className, clientId}) => {

        const onChangeBackgroundColor = (value) => {
            setAttributes({backgroundColor: value});
        };

        if (parentAttributes(clientId).generalBackgroundColor) {
            attributes.generalBackgroundColor = parentAttributes(clientId).generalBackgroundColor;
        }

        let backgroundColorSlug = getBackgroundColorSlug(attributes.backgroundColor, attributes.generalBackgroundColor);

        const blockProps = useBlockProps({
            className: classNames(className, 'grid-list-block__inner', backgroundColorSlug && `has-${backgroundColorSlug}-background-color`),
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
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <hr/>
                        <p>{__('Background Color', 'sage')}</p>
                        <ColorPalette
                            colors={[...editorThemeColors]}
                            value={attributes.backgroundColor}
                            onChange={onChangeBackgroundColor}
                        />
                    </div>
                </InspectorControls>
                <div className={classNames(className, 'grid-list-block__col')}>
                    <div { ...blockProps }>
                        <InnerBlocks templateLock={false} allowedBlocks={ALLOWEDBLOCKS} renderAppender={InnerBlocks.DefaultBlockAppender} />
                    </div>
                </div>
            </>
        );
    },
    save: ({attributes}) => {

        let backgroundColorSlug = getBackgroundColorSlug(attributes.backgroundColor, attributes.generalBackgroundColor);

        // Need to use for passing classes to save function
        const blockProps = useBlockProps.save({
            className: `grid-list-block__col`
        });

        return (
            <div {...blockProps}>
                <div className={classNames('grid-list-block__inner', backgroundColorSlug && `has-${backgroundColorSlug}-background-color`)}>
                    <InnerBlocks.Content/>
                </div>
            </div>
        );
    },
});
