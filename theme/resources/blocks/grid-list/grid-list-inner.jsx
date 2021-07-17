import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks, InspectorControls, ColorPalette, useBlockProps, __experimentalUseInnerBlocksProps as useInnerBlocksProps} from '@wordpress/block-editor';
import classNames from 'classnames';
import {gridListInner} from '../icons';
import {ALLOWEDBLOCKS, editorThemeColors, getColorObject, parentAttributes, SelectClipPath} from '../utility';
import * as clipPaths from "../clip-paths";


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
    clipPath: {
        type: 'string',
        default: 'none'
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

        const onChangeClipPath = (value) => {
            setAttributes({clipPath: value});
        };

        if (parentAttributes(clientId).generalBackgroundColor) {
            // console.log(parentAttributes(clientId).generalBackgroundColor);
            attributes.generalBackgroundColor = parentAttributes(clientId).generalBackgroundColor;
        } else {
            // console.log('no general background');
            attributes.generalBackgroundColor = '';
        }

        let backgroundColorSlug = getBackgroundColorSlug(attributes.backgroundColor, attributes.generalBackgroundColor);

        const blockProps = useBlockProps({
            style: {
                marginTop: '0',
                marginBottom: '0',
                width: '100%',
                height: '100%',
                border: !(attributes.backgroundColor || attributes.generalBackgroundColor) ? '1px dashed var(--wp-admin-theme-color)' : 'none',
            }
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

        attributes.clientId = clientId;

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
                        <hr/>
                        <p>{__('Section Clip Path', 'sage')}</p>
                        <SelectClipPath clipPathsModules={clipPaths} clickFunction={onChangeClipPath} />
                    </div>
                </InspectorControls>
                <div className={classNames('grid-list-block__col')}>
                    {clipPaths[attributes.clipPath] &&
                        clipPaths[attributes.clipPath](`clip-path-${attributes.clientId}`)
                    }
                    <div { ...blockProps }>
                        <div className={classNames(className, 'grid-list-block__inner', backgroundColorSlug && `has-${backgroundColorSlug}-background-color`)}
                             style={{
                                 width: '100%',
                                 height: '100%',
                                 clipPath: clipPaths[attributes.clipPath] ? `url(#clip-path-${attributes.clientId})` : 'none',
                             }}
                        >
                            <InnerBlocks templateLock={false} allowedBlocks={ALLOWEDBLOCKS} renderAppender={InnerBlocks.DefaultBlockAppender} />
                        </div>
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
                {clipPaths[attributes.clipPath] &&
                    clipPaths[attributes.clipPath](`clip-path-${attributes.clientId}`)
                }
                <div className={classNames('grid-list-block__inner', backgroundColorSlug && `has-${backgroundColorSlug}-background-color`)}
                     style={{
                        width: '100%',
                        height: '100%',
                        clipPath: clipPaths[attributes.clipPath] ? `url(#clip-path-${attributes.clientId})` : 'none',
                    }}
                >
                    <InnerBlocks.Content/>
                </div>
            </div>
        );
    },
});
