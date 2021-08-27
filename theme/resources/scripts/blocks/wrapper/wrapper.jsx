/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Wordpress dependencies
 */
import {__} from '@wordpress/i18n';
import {registerBlockType, createBlock} from '@wordpress/blocks';
import {
    SelectControl,
    RangeControl,
    ToggleControl,
    ToolbarGroup,
    ToolbarDropdownMenu,
    Button,
    PanelBody,
    __experimentalRadio as Radio,
    __experimentalRadioGroup as RadioGroup,
    __experimentalBoxControl as BoxControl,
    Dashicon,
    FocalPointPicker
} from '@wordpress/components';
import {
    InnerBlocks,
    InspectorControls,
    ColorPalette,
    BlockControls,
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    BlockVerticalAlignmentToolbar
} from '@wordpress/block-editor';
import {
    group as sectionIcon,
    color as colorIcon, moveTo as moveIcon
} from '@wordpress/icons';

/**
 * Internal dependencies
 */
import {
    editorThemeColors,
    getColorObject,
    ALLOWED_BLOCKS,
    removeArrayItems,
    isDefined,
    focalPositionInPixel,
    SettingsHeading,
    ResetWrapperControl,
    returnBackgroundColorClass,
    returnBackgroundColorStyle,
} from "../utility";
import {
    width as widthIcon,
    height as heightIcon,
    horizontalPadding as horizontalPaddingIcon,
    verticalPadding as verticalPaddingIcon,
} from "../custom-icons";

/**
 * Block attributes
 */
const attributes = {

    /**
     * Default Attributes
     */
    clientId: {
        type: 'string',
        default: ''
    },

    /**
     * Section Properties
     */
    wrapperBgColor: {
        type: 'string',
        default: ''
    },
    wrapperBorderRadius: {
        type: 'number',
        default: false,
    },
    autoWidth: {
        type: 'boolean',
        default: false,
    },
    wrapperWidth: {
        type: 'number',
        default: 100,
    },
    wrapperWidthUnit: {
        type: 'string',
        default: '%',
    },
    wrapperHeight: {
        type: 'number',
        default: false,
    },
    horizontalAlign: {
        type: 'string',
        default: 'left'
    },
    horizontalPadding: {
        type: 'number',
        default: false,
    },
    verticalAlign: {
        type: 'string',
        default: 'center'
    },
    verticalPadding: {
        type: 'number',
        default: false,
    },

    /**
     * Translate
     */
    positionUnit: {
        type: 'string',
        default: 'px'
    },
    wrapperMove: {
        type: 'object',
        default: {x: 0.5, y: 0.5}
    },
};

// For not firing update to often
let onChangePositionTimeout = true;

/**
 * Register block
 */
registerBlockType('custom/wrapper', {
    apiVersion: 2,
    title: __('Wrapper', 'sage'),
    category: 'custom',
    description: __('Combine blocks into a wrapper to add animations or transformations.', 'sage'),
    icon: sectionIcon,
    attributes,
    supports: {
        anchor: true,
        html: false
    },
    /**
     * This is Copied from the core/group block element from gutenberg
     * @link https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/group/index.js
     * @param blocks
     * @returns {*}
     * @private
     */
    transforms: {
        from: [
            {
                type: 'block',
                isMultiBlock: true,
                blocks: ['*'],
                __experimentalConvert(blocks) {
                    // Avoid transforming a single `core/group` Block
                    if (
                        blocks.length === 1 &&
                        blocks[0].name === 'custom/wrapper'
                    ) {
                        return;
                    }

                    // Clone the Blocks to be Grouped
                    // Failing to create new block references causes the original blocks
                    // to be replaced in the switchToBlockType call thereby meaning they
                    // are removed both from their original location and within the
                    // new group block.
                    const groupInnerBlocks = blocks.map((block) => {
                        return createBlock(
                            block.name,
                            block.attributes,
                            block.innerBlocks
                        );
                    });

                    return createBlock(
                        'custom/wrapper',
                        {},
                        groupInnerBlocks
                    );
                },
            },
        ],
    },
    edit: ({setAttributes, attributes, className, clientId}) => {

        attributes.clientId = clientId;

        const blockProps = useBlockProps({
            className: classnames(
                className,
                'wrapper-block',
            ),
            style: {
                border: '1px dashed var(--wp-admin-theme-color)',
                // ...!attributes.wrapperBgColor && {
                //     backgroundColor: 'repeating-linear-gradient(45deg, #606dbc, #606dbc 10px, #465298 10px)'
                // }
            }
        });

        const innerBlocksProps = useInnerBlocksProps(blockProps, {
            allowedBlocks: removeArrayItems(ALLOWED_BLOCKS, ['custom/section']),
            // templateLock: false,
            // renderAppender: InnerBlocks.DefaultBlockAppender
        });

        const onChangeWrapperPosition = (value) => {

            /**
             * Timeout for Image Position On Change
             */
            if (onChangePositionTimeout) {
                setAttributes({wrapperMove: value});

                onChangePositionTimeout = false;

                setTimeout(function () {
                    onChangePositionTimeout = true;
                }, 30);
            }
        };


        return (
            <>
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarDropdownMenu
                            icon={`align-${attributes.horizontalAlign}`}
                            label={__('Select a position', 'sage')}
                            controls={[
                                {
                                    title: 'Left',
                                    icon: 'align-left',
                                    onClick: () => setAttributes({horizontalAlign: 'left'}),
                                },
                                {
                                    title: 'Center',
                                    icon: 'align-center',
                                    onClick: () => setAttributes({horizontalAlign: 'center'}),
                                },
                                {
                                    title: 'Right',
                                    icon: 'align-right',
                                    onClick: () => setAttributes({horizontalAlign: 'right'}),
                                },
                            ]}
                        />
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
                        <hr style={{marginTop:0}}/>
                        <ToggleControl
                            label={__('Auto width', 'sage')}
                            // help={__('Enable continuous loop mode (does not apply on the editor)', 'sage')}
                            checked={attributes.autoWidth}
                            onChange={(value) => setAttributes({autoWidth: value})}
                        />
                        {!attributes.autoWidth && <>
                            <hr/>
                            {/*<p>{__('Width', 'sage')}</p>*/}
                            <SettingsHeading headline={'Width'} icon={widthIcon}/>
                            <ResetWrapperControl onClick={() => setAttributes({wrapperWidth: 100})}>
                                <RangeControl
                                    // TODO: Difference attributes for pixel and percent width!
                                    value={attributes.wrapperWidth}
                                    min={attributes.wrapperWidthUnit === 'px' ? 60 : 10}
                                    max={attributes.wrapperWidthUnit === 'px' ? 1200 : 100}
                                    step={1}
                                    onChange={(value) => {
                                        setAttributes({wrapperWidth: value})
                                    }}
                                />
                            </ResetWrapperControl>
                            <RadioGroup
                                onChange={(value) => {
                                    setAttributes({wrapperWidthUnit: value})

                                    if (attributes.wrapperWidthUnit === '%') {
                                        setAttributes({wrapperWidth: 100})
                                    } else {
                                        setAttributes({wrapperWidth: 400})
                                    }
                                }}
                                checked={attributes.wrapperWidthUnit}
                                defaultChecked={'%'}
                            >
                                <Radio value="px">{__('px', 'sage')}</Radio>
                                <Radio value="%">{__('%', 'sage')}</Radio>
                            </RadioGroup>
                        </>}
                        <hr/>
                        {/*<p>{__('Height', 'sage')}</p>*/}
                        <SettingsHeading headline={'Height'} icon={heightIcon}/>
                        <ResetWrapperControl onClick={() => setAttributes({wrapperHeight: false})}>
                            <RangeControl
                                value={attributes.wrapperHeight}
                                min={60}
                                max={800}
                                step={1}
                                onChange={(value) => {
                                    setAttributes({wrapperHeight: value})
                                }}
                            />
                        </ResetWrapperControl>
                        <hr/>
                        <SettingsHeading headline={'Horizontal padding'} icon={horizontalPaddingIcon}/>
                        <ResetWrapperControl onClick={() => setAttributes({horizontalPadding: false})}>
                            <RangeControl
                                value={attributes.horizontalPadding}
                                min={0}
                                max={100}
                                step={1}
                                onChange={(value) => {
                                    setAttributes({horizontalPadding: value})
                                }}
                            />
                        </ResetWrapperControl>
                        <hr/>
                        <SettingsHeading headline={'Vertical padding'} icon={verticalPaddingIcon}/>
                        <ResetWrapperControl onClick={() => setAttributes({verticalPadding: false})}>
                            <RangeControl
                                value={attributes.verticalPadding}
                                min={0}
                                max={100}
                                step={1}
                                onChange={(value) => {
                                    setAttributes({verticalPadding: value})
                                }}
                            />
                        </ResetWrapperControl>
                        <hr/>
                        {/*<p>{__('Background color', 'sage')}</p>*/}
                        <SettingsHeading headline={'Background color'} icon={colorIcon}/>
                        <ColorPalette
                            colors={editorThemeColors}
                            value={attributes.wrapperBgColor}
                            onChange={(value) => setAttributes({wrapperBgColor: value})}
                            // disableCustomColors={true}
                        />
                        <hr/>
                        { /*<p>{__('Move', 'sage')}</p>*/ }
                        <SettingsHeading headline={'Move'} icon={moveIcon}/>
                        <div style={{display: 'flex', marginBottom: '10px'}}>
                            <RadioGroup
                                onChange={(value) => setAttributes({positionUnit: value})}
                                checked={attributes.positionUnit}
                                defaultChecked={'px'}
                            >
                                <Radio value="px">{__('px', 'sage')}</Radio>
                                <Radio value="%">{__('%', 'sage')}</Radio>
                            </RadioGroup>
                            <Button
                                className={'is-secondary'}
                                onClick={() => setAttributes({wrapperMove: {x: 0.5, y: 0.5}})}
                                text={__('Reset', 'sage')}
                            />
                        </div>
                        <FocalPointPicker
                            className={'no-picker-controls'}
                            value={attributes.wrapperMove}
                            onChange={onChangeWrapperPosition}
                            onDrag={onChangeWrapperPosition}
                        />
                    </div>
                </InspectorControls>
                <div {...innerBlocksProps}>
                    <div
                        className={classnames(
                            'wrapper-block__inner',
                            attributes.horizontalAlign && `align-${attributes.horizontalAlign}`,
                            attributes.verticalAlign && `justify-content-${attributes.verticalAlign}`,
                            returnBackgroundColorClass(attributes.wrapperBgColor),
                            // getColorObject(attributes.wrapperBgColor) && `has-${getColorObject(attributes.wrapperBgColor).slug}-background-color has-background`,
                        )}
                        style={{
                            ...!attributes.autoWidth && {
                                width: '100%',
                                maxWidth: `${attributes.wrapperWidth}${attributes.wrapperWidthUnit}`
                            },
                            ...isDefined(attributes.horizontalPadding) && {
                                paddingLeft: `${attributes.horizontalPadding}px`,
                                paddingRight: `${attributes.horizontalPadding}px`,
                            },
                            ...isDefined(attributes.verticalPadding) && {
                                paddingTop: `${attributes.verticalPadding}px`,
                                paddingBottom: `${attributes.verticalPadding}px`,
                            },
                            ...isDefined(attributes.wrapperHeight) && {
                                minHeight: `${attributes.wrapperHeight}px`
                            },
                            transform: `translate(${focalPositionInPixel(attributes.wrapperMove.x, attributes.positionUnit)}, ${focalPositionInPixel(attributes.wrapperMove.y, attributes.positionUnit)})`,
                            ...returnBackgroundColorStyle(attributes.wrapperBgColor),
                        }}
                    >
                        {innerBlocksProps.children}
                    </div>
                </div>
            </>
        );

    },
    save: ({attributes}) => {

        const blockProps = useBlockProps.save({
            className: classnames(
                'wrapper-block',
            )
        });

        return (
            <div {...blockProps}>
                <div
                    className={classnames(
                        'wrapper-block__inner',
                        attributes.horizontalAlign && `align-${attributes.horizontalAlign}`,
                        attributes.verticalAlign && `justify-content-${attributes.verticalAlign}`,
                        // getColorObject(attributes.wrapperBgColor) && `has-${getColorObject(attributes.wrapperBgColor).slug}-background-color has-background`,
                        returnBackgroundColorClass(attributes.wrapperBgColor),
                    )}
                    style={{
                        ...!attributes.autoWidth && {
                            width: '100%',
                            maxWidth: `${attributes.wrapperWidth}${attributes.wrapperWidthUnit}`
                        },
                        ...isDefined(attributes.horizontalPadding) && {
                            paddingLeft: `${attributes.horizontalPadding}px`,
                            paddingRight: `${attributes.horizontalPadding}px`,
                        },
                        ...isDefined(attributes.verticalPadding) && {
                            paddingTop: `${attributes.verticalPadding}px`,
                            paddingBottom: `${attributes.verticalPadding}px`,
                        },
                        ...isDefined(attributes.wrapperHeight) && {
                            minHeight: `${attributes.wrapperHeight}px`
                        },
                        transform: `translate(${focalPositionInPixel(attributes.wrapperMove.x, attributes.positionUnit)}, ${focalPositionInPixel(attributes.wrapperMove.y, attributes.positionUnit)})`,
                        ...returnBackgroundColorStyle(attributes.wrapperBgColor),
                    }}
                >
                    <InnerBlocks.Content/>
                </div>
            </div>
        );
    },
});
