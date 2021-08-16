import {__} from '@wordpress/i18n';
import {registerBlockType, createBlock} from '@wordpress/blocks';
import {SelectControl, RangeControl, ToggleControl, Button, PanelBody, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup, __experimentalBoxControl as BoxControl} from '@wordpress/components';
import {InnerBlocks, InspectorControls, ColorPalette, useBlockProps, __experimentalUseInnerBlocksProps as useInnerBlocksProps} from '@wordpress/block-editor';
import classnames from 'classnames';
import {sectionIcon} from '../icons';
import {editorThemeColors, getColorObject, ALLOWEDBLOCKS, removeArrayItems, SelectSectionShapes, getCssVariable} from "../utility";
import * as sectionShapes from "../section-shapes"

const attributes = {

    /**
     * Default Attributes
     * @link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/#align
     */
    align: {
        type: 'string',
        default: 'full'
    },
    clientId: {
        type: 'string',
        default: ''
    },

    /**
     * Section Properties
     */
    sectionBackgroundColor: {
        type: 'string',
        default: ''
    },
    sectionBorderRadius: {
        type: 'number',
        default: false,
    },
    innerWidth: {
        type: 'number',
        default: false,
    },
    customPadding: {
        type: 'number',
        default: false,
    },
    fullHeight: {
        type: 'boolean',
        default: false,
    },

    /**
     * Shape Settings
     */
    sectionShape: {
        type: 'string',
        default: 'none',
    },
    sectionShapeHeight: {
        type: 'number',
        default: 60,
    },
    sectionShapeTopClass: {
        type: 'string',
        default: 'none',
    },
    sectionShapeBottomClass: {
        type: 'string',
        default: 'normal',
    },
    sectionTopShapeBgColor: {
        type: 'string',
        default: '',
    },
    sectionBottomShapeBgColor: {
        type: 'string',
        default: '',
    },
};

registerBlockType('custom/section', {
    title: __('Section', 'sage'),
    category: 'custom',
    icon: sectionIcon,
    attributes,
    supports: {
        anchor: true,
        html: false,
        align: ['wide', 'full'],
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
                        blocks[0].name === 'custom/section'
                    ) {
                        return;
                    }

                    const alignments = ['wide', 'full'];

                    // Determine the widest setting of all the blocks to be grouped
                    const widestAlignment = blocks.reduce(
                        (accumulator, block) => {
                            const {align} = block.attributes;
                            return alignments.indexOf(align) >
                            alignments.indexOf(accumulator)
                                ? align
                                : accumulator;
                        },
                        undefined
                    );

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
                        'custom/section',
                        {
                            align: widestAlignment,
                        },
                        groupInnerBlocks
                    );
                },
            },
        ],
    },
    edit: ({setAttributes, attributes, className, clientId}) => {

        attributes.clientId = clientId;

        const blockProps = useBlockProps({
            style: {
                border: !attributes.sectionBackgroundColor ? '1px dashed var(--wp-admin-theme-color)' : 'none',
                height: attributes.fullHeight ? '100%' : 'initial',
            }
        });

        const innerBlocksProps = useInnerBlocksProps(blockProps, {
            allowedBlocks: removeArrayItems(ALLOWEDBLOCKS, ['custom/section']),
            templateLock: false,
        });

        let sectionInnerStyles = {};
        if (attributes.innerWidth) {sectionInnerStyles.maxWidth = `${attributes.innerWidth}px`;}
        if (attributes.customPadding) {sectionInnerStyles.padding = `${attributes.customPadding}px`;}

        if (attributes.sectionShape !== 'none') {
            sectionInnerStyles.paddingTop = 0;
            sectionInnerStyles.paddingBottom = 0;
        }

        return (
            <>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <p>{__('Background Color', 'sage')}</p>
                        <ColorPalette
                            colors={editorThemeColors}
                            value={attributes.sectionBackgroundColor}
                            onChange={(value) => setAttributes({sectionBackgroundColor: value})}
                            disableCustomColors={true}
                        />
                        {attributes.sectionClipPath === 'none' &&
                        <>
                            <hr/>
                            <p>{__('Border Radius', 'sage')}</p>
                            <RangeControl
                                value={attributes.sectionBorderRadius}
                                min={0}
                                max={180}
                                step={1}
                                onChange={(value) => setAttributes({sectionBorderRadius: value})}
                                allowReset={true}
                                resetFallbackValue={false}
                            />
                        </>
                        }
                        <>
                            <hr/>
                            <p>{__('Inner Width', 'sage')}</p>
                            <RangeControl
                                value={attributes.innerWidth}
                                min={200}
                                max={1200}
                                step={10}
                                onChange={(value) => setAttributes({innerWidth: value})}
                                allowReset={true}
                                resetFallbackValue={false}
                            />
                        </>
                        <>
                            <hr/>
                            <p>{__('Custom Padding', 'sage')}</p>
                            <RangeControl
                                value={attributes.customPadding}
                                min={0}
                                max={100}
                                step={1}
                                onChange={(value) => setAttributes({customPadding: value})}
                                allowReset={true}
                                resetFallbackValue={false}
                            />
                        </>
                        <hr/>
                        <ToggleControl
                            label={__('Full Height', 'sage')}
                            checked={attributes.fullHeight}
                            onChange={(value) => setAttributes({fullHeight: value})}
                        />
                    </div>
                    <PanelBody title={__('Section Shape', 'sage')}>
                        <div style={{height: '20px'}}/>
                        <p>{__('Section Shape', 'sage')}</p>
                        <SelectSectionShapes
                            sectionShapes={sectionShapes}
                            clickFunction={(value) => {
                                if (value !== attributes.sectionShape) {
                                    setAttributes({sectionShape: value});
                                } else {
                                    setAttributes({sectionShape: 'none'});
                                }
                            }}
                            value={attributes.sectionShape}
                        />
                        {(attributes.sectionShape !== 'none') &&
                        <>
                            <hr/>
                            <p>{__('Shape Height', 'sage')}</p>
                            <RangeControl
                                value={attributes.sectionShapeHeight}
                                min={20}
                                max={300}
                                step={1}
                                onChange={(value) => setAttributes({sectionShapeHeight: value})}
                                allowReset={true}
                                resetFallbackValue={100}
                            />
                            <hr/>
                            <p>{__('Top Shape', 'sage')}</p>
                            <RadioGroup
                                checked={attributes.sectionShapeTopClass}
                                onChange={(value) => setAttributes({sectionShapeTopClass: value})}
                                defaultChecked={'none'}
                            >
                                <Radio value="none">{__('None', 'sage')}</Radio>
                                <Radio value="normal">{__('Normal', 'sage')}</Radio>
                                <Radio value="inverted">{__('Inverted', 'sage')}</Radio>
                            </RadioGroup>
                            <hr/>
                            <p>{__('Top Shape Background Color', 'sage')}</p>
                            <ColorPalette
                                colors={editorThemeColors}
                                value={attributes.sectionTopShapeBgColor}
                                onChange={(value) => setAttributes({sectionTopShapeBgColor: value})}
                                disableCustomColors={true}
                                defaultValue={`rgb(${getCssVariable('--custom-body-background-color')})`}
                            />
                            <hr/>
                            <p>{__('Bottom Shape', 'sage')}</p>
                            <RadioGroup
                                checked={attributes.sectionShapeBottomClass}
                                onChange={(value) => setAttributes({sectionShapeBottomClass: value})}
                                defaultChecked={'normal'}
                            >
                                <Radio value="none">{__('None', 'sage')}</Radio>
                                <Radio value="normal">{__('Normal', 'sage')}</Radio>
                                <Radio value="inverted">{__('Inverted', 'sage')}</Radio>
                            </RadioGroup>
                            <hr/>
                            <p>{__('Bottom Shape Background Color', 'sage')}</p>
                            <ColorPalette
                                colors={editorThemeColors}
                                value={attributes.sectionBottomShapeBgColor}
                                onChange={(value) => setAttributes({sectionBottomShapeBgColor: value})}
                                disableCustomColors={true}
                                defaultValue={`rgb(${getCssVariable('--custom-body-background-color')})`}
                            />
                        </>
                        }
                    </PanelBody>
                </InspectorControls>
                <div {...innerBlocksProps}>
                    <div
                        className={classnames(
                            className,
                            'section-block',
                            getColorObject(attributes.sectionBackgroundColor) && `has-${getColorObject(attributes.sectionBackgroundColor).slug}-background-color has-background`,
                            'custom-border-radius'
                        )}
                         style={{
                             borderRadius: (attributes.sectionClipPath === 'none' && attributes.sectionBorderRadius) ? `${attributes.sectionBorderRadius}px` : 0,
                             paddingTop: (attributes.sectionShape !== 'none') ? `${attributes.sectionShapeHeight + 10}px` : 0,
                             paddingBottom: (attributes.sectionShape !== 'none') ? `${attributes.sectionShapeHeight + 10}px` : 0,
                         }}
                    >

                        <div className="section-block__inner" style={sectionInnerStyles}>
                            {innerBlocksProps.children}
                        </div>

                        {(sectionShapes[attributes.sectionShape] && attributes.sectionShapeTopClass !== 'none') && sectionShapes[attributes.sectionShape](
                            'top',
                            `${attributes.sectionShapeHeight}px`,
                            classnames(attributes.sectionShapeTopClass),
                            getColorObject(attributes.sectionTopShapeBgColor) ? `rgb(var(--custom-${getColorObject(attributes.sectionTopShapeBgColor).slug}-color))` : 'rgb(var(--custom-body-background-color))'
                        )}

                        {(sectionShapes[attributes.sectionShape] && attributes.sectionShapeBottomClass !== 'none') && sectionShapes[attributes.sectionShape](
                            'bottom',
                            `${attributes.sectionShapeHeight}px`,
                            classnames(attributes.sectionShapeBottomClass),
                            getColorObject(attributes.sectionBottomShapeBgColor) ? `rgb(var(--custom-${getColorObject(attributes.sectionBottomShapeBgColor).slug}-color))` : 'rgb(var(--custom-body-background-color))'
                        )}
                    </div>
                </div>
            </>
        );
    },
    save: ({attributes}) => {

        let sectionInnerStyles = {};
        if (attributes.innerWidth) {sectionInnerStyles.maxWidth = `${attributes.innerWidth}px`;}
        if (attributes.customPadding) {sectionInnerStyles.padding = `${attributes.customPadding}px`;}

        if (attributes.sectionShape !== 'none') {
            sectionInnerStyles.paddingTop = 0;
            sectionInnerStyles.paddingBottom = 0;
        }

        return (
            <div
                className={classnames(
                    className,
                    'section-block',
                    getColorObject(attributes.sectionBackgroundColor) && `has-${getColorObject(attributes.sectionBackgroundColor).slug}-background-color has-background`,
                    'custom-border-radius'
                )}
                 style={{
                     borderRadius: (attributes.sectionClipPath === 'none' && attributes.sectionBorderRadius) ? `${attributes.sectionBorderRadius}px` : 0,
                     height: attributes.fullHeight ? '100%' : 'initial',
                     paddingTop: (attributes.sectionShape !== 'none') ? `${attributes.sectionShapeHeight + 10}px` : 0,
                     paddingBottom: (attributes.sectionShape !== 'none') ? `${attributes.sectionShapeHeight + 10}px` : 0,
                 }}
            >

                <div className="section-block__inner" style={sectionInnerStyles}>
                    <InnerBlocks.Content/>
                </div>

                {(sectionShapes[attributes.sectionShape] && attributes.sectionShapeTopClass !== 'none') && sectionShapes[attributes.sectionShape](
                    'top',
                    `${attributes.sectionShapeHeight}px`,
                    classnames(attributes.sectionShapeTopClass),
                    getColorObject(attributes.sectionTopShapeBgColor) ? `rgb(var(--custom-${getColorObject(attributes.sectionTopShapeBgColor).slug}-color))` : 'rgb(var(--custom-body-background-color))'
                )}

                {(sectionShapes[attributes.sectionShape] && attributes.sectionShapeBottomClass !== 'none') && sectionShapes[attributes.sectionShape](
                    'bottom',
                    `${attributes.sectionShapeHeight}px`,
                    classnames(attributes.sectionShapeBottomClass),
                    getColorObject(attributes.sectionBottomShapeBgColor) ? `rgb(var(--custom-${getColorObject(attributes.sectionBottomShapeBgColor).slug}-color))` : 'rgb(var(--custom-body-background-color))'
                )}
            </div>
        );
    },
});
