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
import {
    ToolbarGroup,
    RangeControl,
    ToggleControl,
    __experimentalRadio as Radio,
    __experimentalRadioGroup as RadioGroup
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import {gridListInnerIcon} from '../icons';
import {
    ALLOWEDBLOCKS,
    editorThemeColors,
    getColorObject, MobileSwitch, MobileSwitchInner,
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
    if (!size) {
        return `col-${columns}`;
    }
    return `col-${size}-${columns}`;
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
    customSize: {
        type: 'boolean',
        default: false,
    },
    columnSizeDesktop: {
        type: 'number',
        default: 4
    },
    columnSizeTablet: {
        type: 'number',
        default: 6
    },
    columnSizeMobile: {
        type: 'number',
        default: 12
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
        let parent = {
            columnSizeDesktop: Math.floor(12 / parentAttributes(attributes.clientId).columnsDesktop),
            columnSizeTablet: Math.floor(12 / parentAttributes(attributes.clientId).columnsTablet),
            columnSizeMobile: Math.floor(12 / parentAttributes(attributes.clientId).columnsMobile),
        }

        if(!attributes.customSize) {
            attributes.columnSizeDesktop = parent.columnSizeDesktop;
            attributes.columnSizeTablet = parent.columnSizeTablet;
            attributes.columnSizeMobile = parent.columnSizeMobile;
        }

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
            allowedBlocks: removeArrayItems(ALLOWEDBLOCKS, ['custom/grid-list']),
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
                        <ToggleControl
                            label={__('Custom Size', 'sage')}
                            help={__('Define a custom column size','sage')}
                            checked={attributes.customSize}
                            onChange={(value) => {
                                setAttributes({customSize: value})
                            }}
                        />
                        <hr/>
                        <MobileSwitch headline={__('Column Size', 'sage')}>
                            <MobileSwitchInner type={'desktop'}>
                                <RangeControl
                                    value={attributes.columnSizeDesktop}
                                    min={1}
                                    max={12}
                                    step={1}
                                    onChange={(value) => {
                                        setAttributes({customSize: true})
                                        setAttributes({columnSizeDesktop: value})
                                    }}
                                    allowReset={true}
                                    resetFallbackValue={parent.columnSizeDesktop}
                                />
                            </MobileSwitchInner>
                            <MobileSwitchInner type={'tablet'}>
                                <RangeControl
                                    value={attributes.columnSizeTablet}
                                    min={1}
                                    max={12}
                                    step={1}
                                    onChange={(value) => {
                                        setAttributes({customSize: true})
                                        setAttributes({columnSizeTablet: value})
                                    }}
                                    allowReset={true}
                                    resetFallbackValue={parent.columnSizeTablet}
                                />
                            </MobileSwitchInner>
                            <MobileSwitchInner type={'mobile'}>
                                <RangeControl
                                    value={attributes.columnSizeMobile}
                                    min={1}
                                    max={12}
                                    step={1}
                                    onChange={(value) => {
                                        setAttributes({customSize: true})
                                        setAttributes({columnSizeMobile: value})
                                    }}
                                    allowReset={true}
                                    resetFallbackValue={parent.columnSizeMobile}
                                />
                            </MobileSwitchInner>
                        </MobileSwitch>
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
                    returnColClass(attributes.columnSizeMobile),
                    returnColClass(attributes.columnSizeTablet, 'sm'),
                    returnColClass(attributes.columnSizeDesktop, 'lg')
                )}>
                    {clipPaths[attributes.clipPath] && <>
                        clipPaths[attributes.clipPath](`clip-path-${attributes.clientId}`)
                    </>}
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
                returnColClass(attributes.columnSizeMobile),
                returnColClass(attributes.columnSizeTablet, 'sm'),
                returnColClass(attributes.columnSizeDesktop, 'lg')
            )
        });

        return (
            <div {...blockProps}>
                {clipPaths[attributes.clipPath] && <>
                    clipPaths[attributes.clipPath](`clip-path-${attributes.clientId}`)
                </>}
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
