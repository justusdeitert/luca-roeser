import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks, InspectorControls, ColorPalette, useBlockProps, __experimentalUseInnerBlocksProps as useInnerBlocksProps, BlockControls, BlockVerticalAlignmentToolbar} from '@wordpress/block-editor';
import {ToolbarGroup} from '@wordpress/components';
import classNames from 'classnames';
import {gridListInnerIcon} from '../icons';
import {
    ALLOWEDBLOCKS,
    editorThemeColors,
    getColorObject,
    parentAttributes,
    removeArrayItems,
    SelectClipPath
} from '../utility';
import * as clipPaths from "../clip-paths";

const returnColClass = (columns, size = false) => {
    let colNumber = Math.floor(12 / columns);
    if (!size) {
        return `col-${colNumber}`;
    }
    return `col-${size}-${colNumber}`;
}

const attributes = {
    clientId: {
        type: 'string',
        default: ''
    },
    backgroundColor: {
        type: 'string',
        default: ''
    },
    parentBackgroundColor: {
        type: 'string',
        default: ''
    },
    clipPath: {
        type: 'string',
        default: 'none'
    },
    verticalAlign: {
        type: 'string',
        default: 'center'
    },
    columnsDesktop: {
        type: 'number',
        default: 3
    },
    columnsTablet: {
        type: 'number',
        default: 2
    },
    columnsMobile: {
        type: 'number',
        default: 1
    },
};

registerBlockType('custom/grid-list-inner', {
    apiVersion: 2,
    title: __('Grid List Inner', 'sage'),
    category: 'custom',
    icon: gridListInnerIcon,
    attributes,
    parent: ['custom/grid-list'],
    // supports: {
    //     // inserter: false,
    //     reusable: false,
    //     html: false,
    // },
    edit: ({setAttributes, attributes, className, clientId}) => {

        attributes.clientId = clientId;
        attributes.parentBackgroundColor = parentAttributes(attributes.clientId).generalBackgroundColor;
        attributes.columnsDesktop = parentAttributes(attributes.clientId).columnsDesktop;
        attributes.columnsTablet = parentAttributes(attributes.clientId).columnsTablet;
        attributes.columnsMobile = parentAttributes(attributes.clientId).columnsMobile;

        const blockProps = useBlockProps({
            style: {
                marginTop: 0,
                marginBottom: 0,
                width: '100%',
                height: '100%',
                border: !(attributes.backgroundColor || attributes.parentBackgroundColor) ? '1px dashed var(--wp-admin-theme-color)' : 'none',
            }
        });

        // console.log(removeArrayItems(ALLOWEDBLOCKS, ['custom/grid-list']));
        // console.log(typeof removeArrayItems(ALLOWEDBLOCKS, ['custom/grid-list']));
        // console.log(['core/paragraph', 'core/group']);
        // console.log(typeof ['core/paragraph', 'core/group']);

        const innerBlocksProps = useInnerBlocksProps(blockProps, {
            // allowedBlocks: [removeArrayItems(ALLOWEDBLOCKS, ['custom/grid-list'])],
            // allowedBlocks: ['core/paragraph'], // TODO: Dont Allow grid-list itself
            // templateLock: false,
            // renderAppender: InnerBlocks.DefaultBlockAppender,
        });

        // <InnerBlocks templateLock={false} allowedBlocks={removeArrayItems(ALLOWEDBLOCKS, ['custom/grid-list'])} renderAppender={InnerBlocks.DefaultBlockAppender} />

        return (
            <>
                <BlockControls>
                    <ToolbarGroup>
                        <BlockVerticalAlignmentToolbar
                            value={attributes.verticalAlign}
                            onChange={(value) => {
                                if (value === 'top') {value = 'start';}
                                if (value === 'bottom') {value = 'end';}
                                setAttributes({verticalAlign: value});
                            }}
                        />
                    </ToolbarGroup>
                </BlockControls>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <hr/>
                        <p>{__('Background Color', 'sage')}</p>
                        <ColorPalette
                            colors={[...editorThemeColors]}
                            value={attributes.backgroundColor}
                            onChange={(value) => setAttributes({backgroundColor: value})}
                            disableCustomColors={true}
                        />
                        <hr/>
                        <p>{__('Section Clip Path', 'sage')}</p>
                        <SelectClipPath
                            clipPathsModules={clipPaths}
                            clickFunction={(value) => {
                                if (value !== attributes.clipPath) {
                                    setAttributes({clipPath: value});
                                } else {
                                    setAttributes({clipPath: 'none'});
                                }
                            }}
                            value={attributes.clipPath}
                        />
                    </div>
                </InspectorControls>
                <div className={classNames(
                    'grid-list-block__col',
                    returnColClass(attributes.columnsMobile),
                    returnColClass(attributes.columnsTablet, 'sm'),
                    returnColClass(attributes.columnsDesktop, 'lg')
                )}>
                    {clipPaths[attributes.clipPath] &&
                        clipPaths[attributes.clipPath](`clip-path-${attributes.clientId}`)
                    }
                    <div {...innerBlocksProps}>
                        <div className={classNames(
                                className,
                                'grid-list-block__inner',
                                getColorObject(attributes.parentBackgroundColor) && `has-background has-${getColorObject(attributes.parentBackgroundColor).slug}-background-color`,
                                `align-items-${attributes.verticalAlign}`
                            )}
                             style={{
                                 clipPath: clipPaths[attributes.clipPath] ? `url(#clip-path-${attributes.clientId})` : 'none',
                             }}
                        >
                            <div className="grid-list-block__wrapper">
                                {/*<InnerBlocks templateLock={false} allowedBlocks={removeArrayItems(ALLOWEDBLOCKS, ['custom/grid-list'])} renderAppender={InnerBlocks.DefaultBlockAppender} />*/}
                                {innerBlocksProps.children}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    },
    save: ({attributes}) => {

        // Need to use for passing classes to save function
        const blockProps = useBlockProps.save({
            className: classNames(
                `grid-list-block__col`,
                returnColClass(attributes.columnsMobile),
                returnColClass(attributes.columnsTablet, 'sm'),
                returnColClass(attributes.columnsDesktop, 'lg')
            )
        });

        return (
            <div {...blockProps}>
                {clipPaths[attributes.clipPath] &&
                    clipPaths[attributes.clipPath](`clip-path-${attributes.clientId}`)
                }
                <div className={classNames(
                        'grid-list-block__inner',
                        getColorObject(attributes.parentBackgroundColor) && `has-background has-${getColorObject(attributes.parentBackgroundColor).slug}-background-color`,
                        `align-items-${attributes.verticalAlign}`
                    )}
                     style={{
                        clipPath: clipPaths[attributes.clipPath] ? `url(#clip-path-${attributes.clientId})` : 'none',
                    }}
                >
                    <div className="grid-list-block__wrapper">
                        <InnerBlocks.Content/>
                    </div>
                </div>
            </div>
        );
    },
});
