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
import {group as sectionIcon} from '@wordpress/icons';

/**
 * Internal dependencies
 */
import {
    editorThemeColors,
    getColorObject,
    ALLOWEDBLOCKS,
    removeArrayItems,
    isDefined,
    focalPositionInPixel
} from "../utility";

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
                border: '1px dashed var(--wp-admin-theme-color)'
            }
        });

        const innerBlocksProps = useInnerBlocksProps(blockProps, {
            allowedBlocks: removeArrayItems(ALLOWEDBLOCKS, ['custom/section']),
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
                        <ToggleControl
                            label={__('Auto width', 'sage')}
                            // help={__('Enable continuous loop mode (does not apply on the editor)', 'sage')}
                            checked={attributes.autoWidth}
                            onChange={(value) => setAttributes({autoWidth: value})}
                        />
                        {!attributes.autoWidth && <>
                            <hr/>
                            <p>{__('Width', 'sage')}</p>
                            <RangeControl
                                value={attributes.wrapperWidth}
                                min={attributes.wrapperWidthUnit === 'px' ? 60 : 10}
                                max={attributes.wrapperWidthUnit === 'px' ? 1200 : 100}
                                step={1}
                                onChange={(value) => {
                                    setAttributes({wrapperWidth: value})
                                }}
                                // allowReset={true}
                                // resetFallbackValue={100}
                            />
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
                        <p>{__('Height', 'sage')}</p>
                        <RangeControl
                            value={attributes.wrapperHeight}
                            min={60}
                            max={800}
                            step={1}
                            onChange={(value) => {
                                setAttributes({wrapperHeight: value})
                            }}
                            allowReset={true}
                            resetFallbackValue={false}
                        />
                        <hr/>
                        <div style={{display: 'flex'}}>
                            <p>{__('Horizontal padding', 'sage')}</p>
                            <Dashicon icon="image-flip-horizontal" style={{marginLeft: 'auto'}}/>
                        </div>
                        <RangeControl
                            value={attributes.horizontalPadding}
                            min={0}
                            max={100}
                            step={1}
                            onChange={(value) => {
                                setAttributes({horizontalPadding: value})
                            }}
                            allowReset={true}
                            resetFallbackValue={false}
                        />
                        <hr/>
                        <div style={{display: 'flex'}}>
                            <p>{__('Vertical padding', 'sage')}</p>
                            <Dashicon icon="image-flip-vertical" style={{marginLeft: 'auto'}}/>
                        </div>
                        <RangeControl
                            value={attributes.verticalPadding}
                            min={0}
                            max={100}
                            step={1}
                            onChange={(value) => {
                                setAttributes({verticalPadding: value})
                            }}
                            allowReset={true}
                            resetFallbackValue={false}
                        />
                        <hr/>
                        <p>{__('Background color', 'sage')}</p>
                        <ColorPalette
                            colors={editorThemeColors}
                            value={attributes.wrapperBgColor}
                            onChange={(value) => setAttributes({wrapperBgColor: value})}
                            disableCustomColors={true}
                        />
                        <hr/>
                        <p>{__('Movement', 'sage')}</p>
                        <div style={{display: 'flex', marginBottom: '20px'}}>
                            <RadioGroup
                                onChange={(value) => setAttributes({positionUnit: value})}
                                checked={attributes.positionUnit}
                                defaultChecked={"px"}
                            >
                                <Radio value="px">{__('Pixel', 'sage')}</Radio>
                                <Radio value="%">{__('%', 'sage')}</Radio>
                            </RadioGroup>
                            <Button
                                className={'is-secondary'}
                                onClick={() => setAttributes({wrapperMove: {x: 0.5, y: 0.5}})}
                                text={__('Reset', 'sage')}
                                style={{marginLeft: '10px'}}
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
                            getColorObject(attributes.wrapperBgColor) && `has-${getColorObject(attributes.wrapperBgColor).slug}-background-color has-background`,
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
                            transform: `translate(${focalPositionInPixel(attributes.wrapperMove.x, attributes.positionUnit)}, ${focalPositionInPixel(attributes.wrapperMove.y, attributes.positionUnit)})`
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
                        getColorObject(attributes.wrapperBgColor) && `has-${getColorObject(attributes.wrapperBgColor).slug}-background-color has-background`,
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
                        transform: `translate(${focalPositionInPixel(attributes.wrapperMove.x, attributes.positionUnit)}, ${focalPositionInPixel(attributes.wrapperMove.y, attributes.positionUnit)})`
                    }}
                >
                    <InnerBlocks.Content/>
                </div>
            </div>
        );
    },
});
