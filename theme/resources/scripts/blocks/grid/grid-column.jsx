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
// import {column as gridListInnerIcon} from '@wordpress/icons';

/**
 * Internal dependencies
 */
import {
    ALLOWED_BLOCKS,
    editorThemeColors,
    getColorObject,
    isDefined,
    MobileSwitch,
    MobileSwitchInner,
    parentAttributes,
    removeArrayItems,
    SelectClipPath
} from '../utility';
import * as clipPaths from "../clip-paths";
import {gridColumn as gridListInnerIcon} from '../custom-icons';

/**
 * Return col class for bootstrap 5
 */
const returnColClass = (columns, size = false) => {
    if (!size) {
        return `col-${columns}`;
    }
    return `col-${size}-${columns}`;
}

let returnBackgroundColorClass = (backgroundColor, parentBackgroundColor) => {
    if (getColorObject(backgroundColor)) {
        return `has-background has-${getColorObject(backgroundColor).slug}-background-color`
    } else if (getColorObject(parentBackgroundColor)) {
        return `has-background has-${getColorObject(parentBackgroundColor).slug}-background-color`
    }
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
        default: 'top'
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
    verticalPaddingDesktop: {
        type: 'number',
        default: false,
    },
    verticalPaddingMobile: {
        type: 'number',
        default: false,
    },
};

registerBlockType('custom/grid-column', {
    apiVersion: 2,
    title: __('Grid Column', 'sage'),
    category: 'custom',
    icon: gridListInnerIcon,
    description: __('A single column within a columns block.', 'sage'),
    attributes,
    parent: ['custom/grid'],
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
        attributes.verticalPaddingDesktop = parentAttributes(attributes.clientId).verticalPaddingDesktop;
        attributes.verticalPaddingMobile = parentAttributes(attributes.clientId).verticalPaddingMobile;

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

        let hasPaddingY =
            isDefined(attributes.verticalPaddingDesktop) &&
            isDefined(attributes.verticalPaddingMobile);

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
            allowedBlocks: removeArrayItems(ALLOWED_BLOCKS, ['custom/grid']),
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
                            // help={__('Define a custom column size','sage')}
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
                    'grid-block__col',
                    returnColClass(attributes.columnSizeMobile),
                    returnColClass(attributes.columnSizeTablet, 'sm'),
                    returnColClass(attributes.columnSizeDesktop, 'lg')
                )}>
                    {clipPaths[attributes.clipPath] && <>
                        {clipPaths[attributes.clipPath](`clip-path-${attributes.clientId}`)}
                    </>}
                    <div {...innerBlocksProps}>
                        <div className={classNames(
                            className,
                            'grid-block__inner',
                            returnBackgroundColorClass(attributes.backgroundColor, attributes.parentBackgroundColor),
                            `align-items-${attributes.verticalAlign}`,
                            hasPaddingY && 'has-fluid-padding-y'
                        )}
                             style={{
                                 clipPath: clipPaths[attributes.clipPath] ? `url(#clip-path-${attributes.clientId})` : 'none',
                             }}
                        >
                            <div className="grid-block__wrapper">
                                {innerBlocksProps.children}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    },
    save: ({attributes}) => {

        let hasPaddingY =
            isDefined(attributes.verticalPaddingDesktop) &&
            isDefined(attributes.verticalPaddingMobile);

        // Need to use for passing classes to save function
        const blockProps = useBlockProps.save({
            className: classNames(
                `grid-block__col`,
                returnColClass(attributes.columnSizeMobile),
                returnColClass(attributes.columnSizeTablet, 'sm'),
                returnColClass(attributes.columnSizeDesktop, 'lg')
            )
        });

        return (
            <div {...blockProps}>
                {clipPaths[attributes.clipPath] && <>
                    {clipPaths[attributes.clipPath](`clip-path-${attributes.clientId}`)}
                </>}
                <div className={classNames(
                    'grid-block__inner',
                    returnBackgroundColorClass(attributes.backgroundColor, attributes.parentBackgroundColor),
                    `align-items-${attributes.verticalAlign}`,
                    hasPaddingY && 'has-fluid-padding-y'
                )}
                     style={{
                         clipPath: clipPaths[attributes.clipPath] ? `url(#clip-path-${attributes.clientId})` : 'none',
                     }}
                >
                    <div className="grid-block__wrapper">
                        <InnerBlocks.Content/>
                    </div>
                </div>
            </div>
        );
    },
});
