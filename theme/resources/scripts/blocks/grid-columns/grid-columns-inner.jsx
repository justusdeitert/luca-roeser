/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Wordpress dependencies
 */
import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {
    InnerBlocks,
    InspectorControls,
    ColorPalette,
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    BlockControls,
    BlockVerticalAlignmentToolbar
} from '@wordpress/block-editor';
import {ToolbarGroup} from '@wordpress/components';

/**
 * Internal dependencies
 */
import {columnIcon} from '../icons';
import {
    ALLOWEDBLOCKS,
    editorThemeColors,
    getColorObject,
    parentAttributes,
    removeArrayItems,
    SelectClipPath
} from '../utility';
import * as clipPaths from "../clip-paths";

/**
 * Return col class for bootstrap 5
 * @param columns
 * @param size
 * @returns {string}
 */
const returnColClass = (columns, size = false) => {
    let colNumber = Math.floor(12 / columns);
    if (!size) {
        return `col-${colNumber}`;
    }
    return `col-${size}-${colNumber}`;
}

/**
 * Block attributes
 */
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
    columnSizeDesktop: {
        type: 'number',
        default: 2
    },
    columnSizeTablet: {
        type: 'number',
        default: 2
    },
    columnSizeMobile: {
        type: 'number',
        default: 1
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

registerBlockType('custom/grid-columns-inner', {
    apiVersion: 2,
    title: __('Grid Columns Inner', 'sage'),
    category: 'custom',
    icon: columnIcon,
    attributes,
    parent: ['custom/grid-columns'],
    // supports: {
    //     inserter: false,
    //     reusable: false,
    //     html: false,
    // },
    edit: ({setAttributes, attributes, className, clientId}) => {

        attributes.clientId = clientId;

        /**
         * Get attributes from parent block
         */
        attributes.parentBackgroundColor = parentAttributes(attributes.clientId).generalBackgroundColor;

        /**
         * Number of columns
         */
        attributes.columnsTablet = parentAttributes(attributes.clientId).columnsTablet;
        attributes.columnsMobile = parentAttributes(attributes.clientId).columnsMobile;

        /**
         * Columns Size
         */
        attributes.columnSizeDesktop = parentAttributes(attributes.clientId).columnSizeDesktop;
        attributes.columnSizeTablet = parentAttributes(attributes.clientId).columnSizeTablet;
        attributes.columnSizeMobile = parentAttributes(attributes.clientId).columnSizeMobile;

        const blockProps = useBlockProps({
            style: {
                marginTop: 0,
                marginBottom: 0,
                width: '100%',
                height: '100%',
                border: !(attributes.backgroundColor || attributes.parentBackgroundColor) ? '1px dashed var(--wp-admin-theme-color)' : 'none',
            }
        });

        const innerBlocksProps = useInnerBlocksProps(blockProps, {
            allowedBlocks: removeArrayItems(ALLOWEDBLOCKS, ['custom/grid-columns']),
            templateLock: false
        });

        return (
            <>
                <BlockControls>
                    <ToolbarGroup>
                        <BlockVerticalAlignmentToolbar
                            value={attributes.verticalAlign}
                            onChange={(value) => {
                                if (value === 'top') {
                                    value = 'start';
                                }
                                if (value === 'bottom') {
                                    value = 'end';
                                }
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
                    'grid-columns-block__col',
                    returnColClass(attributes.columnsMobile),
                    returnColClass(attributes.columnsTablet, 'sm'),
                    returnColClass(2, 'lg')
                )}>
                    {clipPaths[attributes.clipPath] && <>
                        clipPaths[attributes.clipPath](`clip-path-${attributes.clientId}`)
                    </>}
                    <div {...innerBlocksProps}>
                        <div className={classNames(
                            className,
                            'grid-columns-block__inner',
                            getColorObject(attributes.parentBackgroundColor) && `has-background has-${getColorObject(attributes.parentBackgroundColor).slug}-background-color`,
                            `align-items-${attributes.verticalAlign}`
                        )}
                             style={{
                                 clipPath: clipPaths[attributes.clipPath] ? `url(#clip-path-${attributes.clientId})` : 'none',
                             }}
                        >
                            <div className="grid-columns-block__wrapper">
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
                `grid-columns-block__col`,
                returnColClass(attributes.columnsMobile),
                returnColClass(attributes.columnsTablet, 'sm'),
                returnColClass(2, 'lg')
            )
        });

        return (
            <div {...blockProps}>
                {clipPaths[attributes.clipPath] && <>
                    clipPaths[attributes.clipPath](`clip-path-${attributes.clientId}`)
                </>}
                <div className={classNames(
                    'grid-columns-block__inner',
                    getColorObject(attributes.parentBackgroundColor) && `has-background has-${getColorObject(attributes.parentBackgroundColor).slug}-background-color`,
                    `align-items-${attributes.verticalAlign}`
                )}
                     style={{
                         clipPath: clipPaths[attributes.clipPath] ? `url(#clip-path-${attributes.clientId})` : 'none',
                     }}
                >
                    <div className="grid-columns-block__wrapper">
                        <InnerBlocks.Content/>
                    </div>
                </div>
            </div>
        );
    },
});
