import {__} from '@wordpress/i18n';
import {registerBlockType, createBlock} from '@wordpress/blocks';
import {SelectControl, RangeControl, ToggleControl, ToolbarGroup, ToolbarDropdownMenu, Button, PanelBody, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup, __experimentalBoxControl as BoxControl} from '@wordpress/components';
import {InnerBlocks, InspectorControls, ColorPalette, BlockControls, useBlockProps, __experimentalUseInnerBlocksProps as useInnerBlocksProps} from '@wordpress/block-editor';
import classnames from 'classnames';
import {sectionIcon} from '../icons';
import {editorThemeColors, getColorObject, ALLOWEDBLOCKS, removeArrayItems, isDefined} from "../utility";
// import classNames from "classnames";
// import * as wrapperShapes from "../wrapper-shapes"
// import {select, dispatch, useSelect} from "@wordpress/data";

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
    wrapperHeight: {
        type: 'number',
        default: false,
    },
    removeWrapperWidth: {
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
    horizontalAlign: {
        type: 'string',
        default: 'left'
    },
};

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
            templateLock: false,
            renderAppender: InnerBlocks.DefaultBlockAppender
        });

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
                    </ToolbarGroup>
                </BlockControls>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <ToggleControl
                            label={__('Remove max width', 'sage')}
                            // help={__('Enable continuous loop mode (does not apply on the editor)', 'sage')}
                            checked={attributes.removeWrapperWidth}
                            onChange={(value) => setAttributes({removeWrapperWidth: value})}
                        />
                        {!attributes.removeWrapperWidth && <>
                            <hr/>
                            <p>{__('Max width', 'sage')}</p>
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
                        <p>{__('Background color', 'sage')}</p>
                        <ColorPalette
                            colors={editorThemeColors}
                            value={attributes.wrapperBgColor}
                            onChange={(value) => setAttributes({wrapperBgColor: value})}
                            disableCustomColors={true}
                        />
                    </div>
                </InspectorControls>
                <div {...innerBlocksProps}>
                    <div
                        className={classnames(
                            'wrapper-block__inner',
                            `align-${attributes.horizontalAlign}`,
                            getColorObject(attributes.wrapperBgColor) && `has-${getColorObject(attributes.wrapperBgColor).slug}-background-color has-background`,
                        )}
                        style={{
                            ...!attributes.removeWrapperWidth && {
                                width: '100%',
                                maxWidth: `${attributes.wrapperWidth}${attributes.wrapperWidthUnit}`
                            }
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
                `align-${attributes.horizontalAlign}`,
                getColorObject(attributes.wrapperBgColor) && `has-${getColorObject(attributes.wrapperBgColor).slug}-background-color has-background`,
            ),
            style: {
                ...!attributes.removeWrapperWidth && {
                    width: '100%',
                    maxWidth: `${attributes.wrapperWidth}${attributes.wrapperWidthUnit}`
                }
            }
        });

        return (
            <div {...blockProps}>
                <InnerBlocks.Content/>
            </div>
        );
    },
});
