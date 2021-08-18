/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {registerBlockType, createBlock} from '@wordpress/blocks';
import {SelectControl, RangeControl, ToggleControl, Button, PanelBody, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup, __experimentalBoxControl as BoxControl, ToolbarGroup} from '@wordpress/components';
import {InnerBlocks, InspectorControls, ColorPalette, useBlockProps, __experimentalUseInnerBlocksProps as useInnerBlocksProps, BlockControls, BlockVerticalAlignmentToolbar} from '@wordpress/block-editor';

/**
 * Block dependencies
 */
const htmlElementMessages = {
    header: __(
        'The <header> element should represent introductory content, typically a group of introductory or navigational aids.'
    ),
    main: __(
        'The <main> element should be used for the primary content of your document only. '
    ),
    section: __(
        "The <section> element should represent a standalone portion of the document that can't be better represented by another element."
    ),
    article: __(
        'The <article> element should represent a self contained, syndicatable portion of the document.'
    ),
    aside: __(
        "The <aside> element should represent a portion of a document whose content is only indirectly related to the document's main content."
    ),
    footer: __(
        'The <footer> element should represent a footer for its nearest sectioning element (e.g.: <section>, <article>, <main> etc.).'
    ),
};

/**
 * Internal dependencies
 */
import * as sectionShapes from '../section-shapes'
import {sectionIcon} from '../icons';
import classnames from 'classnames';
import {
    editorThemeColors,
    getColorObject,
    ALLOWEDBLOCKS,
    removeArrayItems,
    SelectSectionShapes,
    getCssVariable,
    MobileSwitch,
    MobileSwitchInner,
    isDefined
} from '../utility';

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
    tagName: {
        type: 'string',
        default: 'div'
    },
    fullHeight: {
        type: 'boolean',
        default: false,
    },
    minHeightDesktop: {
        type: 'number',
        default: false,
    },
    minHeightMobile: {
        type: 'number',
        default: false,
    },
    sectionBackgroundColor: {
        type: 'string',
        default: ''
    },
    sectionBorderRadius: {
        type: 'number',
        default: false,
    },
    fullWidth: {
        type: 'boolean',
        default: false,
    },
    innerWidth: {
        type: 'number',
        default: false,
    },
    verticalPadding: {
        type: 'number',
        default: false,
    },
    verticalAlign: {
        type: 'string',
        default: 'center'
    },
    // horizontalPadding: {
    //     type: 'number',
    //     default: false,
    // },

    /**
     * Shape Settings
     */
    sectionShape: {
        type: 'string',
        default: false,
    },
    sectionShapeHeightDesktop: {
        type: 'number',
        default: 90,
    },
    sectionShapeHeightMobile: {
        type: 'number',
        default: 30,
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
    apiVersion: 2,
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
                        blocks[0].name === 'custom/section' ||
                        blocks[0].name === 'custom/wrapper'
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
            className: classnames(
                className,
                'section-block',
                getColorObject(attributes.sectionBackgroundColor) && (
                    `has-${getColorObject(attributes.sectionBackgroundColor).slug}-background-color has-background`
                ),
                attributes.fullHeight ? 'full-height' : isDefined(attributes.minHeightDesktop) && 'min-height',
                `align-items-${attributes.verticalAlign}`
            ),
            style: {
                border: !attributes.sectionBackgroundColor ? '1 px dashed var(--wp-admin-theme-color)' : 'none',
                height: attributes.fullHeight ? '100%' : 'initial',
                ...(attributes.sectionBorderRadius && !attributes.sectionShape) && {
                    borderRadius: `${attributes.sectionBorderRadius}px`
                },
                // ...!attributes.sectionShape && {
                //     paddingTop: `${attributes.sectionShapeHeightDesktop + 10}px`,
                //     paddingBottom: `${attributes.sectionShapeHeightDesktop + 10}px`,
                // },
                ...isDefined(attributes.minHeightDesktop) && {
                    '--min-height-desktop': `${attributes.minHeightDesktop}px`,
                    '--min-height-mobile': `${attributes.minHeightMobile}px`,
                    '--min-height-desktop-mobile': `${attributes.minHeightDesktop - attributes.minHeightMobile}`,
                },
                ...attributes.sectionShape && {
                    '--shape-height-desktop': `${attributes.sectionShapeHeightDesktop}px`,
                    '--shape-height-mobile': `${attributes.sectionShapeHeightMobile}px`,
                    '--shape-height-desktop-mobile': `${attributes.sectionShapeHeightDesktop - attributes.sectionShapeHeightMobile}`,
                }
            }
        });

        const innerBlocksProps = useInnerBlocksProps(blockProps, {
            allowedBlocks: removeArrayItems(ALLOWEDBLOCKS, ['custom/section']),
            templateLock: false,
        });

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
                        {/*<div style={{height: '20px'}}/>*/}
                        <SelectControl
                            label={__('HTML element')}
                            options={[
                                {label: __('Default (<div>)'), value: 'div'},
                                {label: '<header>', value: 'header'},
                                {label: '<main>', value: 'main'},
                                {label: '<section>', value: 'section'},
                                {label: '<article>', value: 'article'},
                                {label: '<aside>', value: 'aside'},
                                {label: '<footer>', value: 'footer'},
                            ]}
                            value={attributes.tagName}
                            onChange={(value) =>
                                setAttributes({tagName: value})
                            }
                            help={htmlElementMessages[attributes.tagName]}
                        />
                        <hr/>
                        <ToggleControl
                            label={__('Set to window height', 'sage')}
                            // help={ attributes.switchContent ? 'Image is left' : 'Image is right' }
                            checked={attributes.fullHeight}
                            onChange={(value) => setAttributes({fullHeight: value})}
                        />
                        {!attributes.fullHeight &&
                        <>
                            <hr/>
                            <MobileSwitch headline={__('Min height', 'sage')}>
                                <MobileSwitchInner type={'desktop'}>
                                    <RangeControl
                                        value={attributes.minHeightDesktop}
                                        min={200}
                                        max={1200}
                                        step={10}
                                        onChange={(value) => {
                                            if(attributes.minHeightMobile === attributes.minHeightDesktop) {
                                                setAttributes({minHeightMobile: value})
                                            }

                                            setAttributes({minHeightDesktop: value})
                                        }}
                                        allowReset={true}
                                        resetFallbackValue={false}
                                        style={{
                                            marginBottom: '10px'
                                        }}
                                    />
                                </MobileSwitchInner>
                                <MobileSwitchInner type={'mobile'}>
                                    <RangeControl
                                        value={attributes.minHeightMobile}
                                        min={200}
                                        max={attributes.minHeightDesktop}
                                        step={10}
                                        onChange={(value) => {
                                            setAttributes({minHeightMobile: value})
                                        }}
                                        allowReset={true}
                                        resetFallbackValue={attributes.minHeightDesktop}
                                        style={{
                                            marginBottom: '10px'
                                        }}
                                    />
                                </MobileSwitchInner>
                            </MobileSwitch>
                        </>
                        }
                        <hr/>
                        <ToggleControl
                            label={__('Full inner width', 'sage')}
                            checked={attributes.fullWidth}
                            onChange={(value) => setAttributes({fullWidth: value})}
                        />
                        {!attributes.fullWidth &&
                        <>
                            <hr/>
                            <p>{__('Max width', 'sage')}</p>
                            <RangeControl
                                value={attributes.innerWidth}
                                min={320}
                                max={1920}
                                step={10}
                                onChange={(value) => setAttributes({innerWidth: value})}
                                allowReset={true}
                                resetFallbackValue={false}
                                style={{
                                    marginBottom: '10px'
                                }}
                            />
                        </>
                        }
                        <hr/>
                        <p>{__('Background color', 'sage')}</p>
                        <ColorPalette
                            colors={editorThemeColors}
                            value={attributes.sectionBackgroundColor}
                            onChange={(value) => setAttributes({sectionBackgroundColor: value})}
                            disableCustomColors={true}
                        />
                        {!attributes.sectionShape &&
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
                        <hr/>
                        <p>{__('Vertical Padding', 'sage')}</p>
                        <RangeControl
                            value={attributes.verticalPadding}
                            min={0}
                            max={200}
                            step={1}
                            onChange={(value) => setAttributes({verticalPadding: value})}
                            allowReset={true}
                            resetFallbackValue={false}
                        />
                    </div>
                    <PanelBody title={__('Shape', 'sage')}>
                        {/*<div style={{height: '20px'}}/>*/}
                        {/*<hr/>*/}
                        <p>{__('Section Shape', 'sage')}</p>
                        <SelectSectionShapes
                            sectionShapes={sectionShapes}
                            clickFunction={(value) => {
                                if (value !== attributes.sectionShape) {
                                    setAttributes({sectionShape: value});
                                } else {
                                    setAttributes({sectionShape: false});
                                }
                            }}
                            value={attributes.sectionShape}
                        />
                        {attributes.sectionShape &&
                        <>
                            <hr/>
                            <MobileSwitch headline={__('Shape Height', 'sage')}>
                                <MobileSwitchInner type={'desktop'}>
                                    <RangeControl
                                        value={attributes.sectionShapeHeightDesktop}
                                        min={20}
                                        max={300}
                                        step={1}
                                        onChange={(value) => {
                                            setAttributes({sectionShapeHeightDesktop: value});

                                            if (attributes.sectionShapeHeightMobile* 2 === attributes.sectionShapeHeightDesktop) {
                                                setAttributes({sectionShapeHeightMobile: value / 3});
                                            }
                                        }}
                                        allowReset={true}
                                        resetFallbackValue={100}
                                    />
                                </MobileSwitchInner>
                                <MobileSwitchInner type={'mobile'}>
                                    <RangeControl
                                        value={attributes.sectionShapeHeightMobile}
                                        min={20}
                                        max={attributes.sectionShapeHeightDesktop}
                                        step={1}
                                        onChange={(value) => setAttributes({sectionShapeHeightMobile: value})}
                                        allowReset={true}
                                        resetFallbackValue={attributes.sectionShapeHeightDesktop / 3}
                                    />
                                </MobileSwitchInner>
                            </MobileSwitch>
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
                            {attributes.sectionShapeTopClass !== 'none' &&
                            <>
                                <hr/>
                                <p>{__('Top Shape Background Color', 'sage')}</p>
                                <ColorPalette
                                    colors={editorThemeColors}
                                    value={attributes.sectionTopShapeBgColor}
                                    onChange={(value) => setAttributes({sectionTopShapeBgColor: value})}
                                    disableCustomColors={true}
                                    defaultValue={`rgb(${getCssVariable('--custom-body-background-color')})`}
                                />
                            </>
                            }
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
                            {attributes.sectionShapeBottomClass !== 'none' &&
                            <>
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
                        </>
                        }
                    </PanelBody>
                </InspectorControls>
                <attributes.tagName {...innerBlocksProps}>
                    <div className={classnames("section-block__inner", attributes.fullWidth && 'full-width')} style={{
                        ...(!attributes.fullWidth && attributes.innerWidth) && {
                            maxWidth: `${attributes.innerWidth}px`
                        },
                        ...isDefined(attributes.verticalPadding) && {
                            paddingTop: `${attributes.verticalPadding}px`,
                            paddingBottom: `${attributes.verticalPadding}px`
                        },
                        // ...!attributes.sectionShape && {
                        //     paddingTop: 0,
                        //     paddingBottom: 0,
                        // }
                    }}>
                        {innerBlocksProps.children}
                    </div>

                    {(sectionShapes[attributes.sectionShape] && attributes.sectionShapeTopClass !== 'none') && sectionShapes[attributes.sectionShape](
                        'top',
                        classnames(attributes.sectionShapeTopClass),
                        getColorObject(attributes.sectionTopShapeBgColor) ? `rgb(var(--custom-${getColorObject(attributes.sectionTopShapeBgColor).slug}-color))` : 'rgb(var(--custom-body-background-color))'
                    )}

                    {(sectionShapes[attributes.sectionShape] && attributes.sectionShapeBottomClass !== 'none') && sectionShapes[attributes.sectionShape](
                        'bottom',
                        classnames(attributes.sectionShapeBottomClass),
                        getColorObject(attributes.sectionBottomShapeBgColor) ? `rgb(var(--custom-${getColorObject(attributes.sectionBottomShapeBgColor).slug}-color))` : 'rgb(var(--custom-body-background-color))'
                    )}
                </attributes.tagName>
            </>
        );
    },
    save: ({attributes}) => {

        const blockProps = useBlockProps.save({
            className: classnames(
                'section-block',
                getColorObject(attributes.sectionBackgroundColor) && `has-${getColorObject(attributes.sectionBackgroundColor).slug}-background-color has-background`,
                attributes.fullHeight ? 'full-height' : isDefined(attributes.minHeightDesktop) && 'min-height',
                `align-items-${attributes.verticalAlign}`
            ),
            style: {
                ...(attributes.sectionBorderRadius && !attributes.sectionShape) && {
                    borderRadius: `${attributes.sectionBorderRadius}px`
                },
                // ...!attributes.sectionShape && {
                //     paddingTop: `${attributes.sectionShapeHeightDesktop + 10}px`,
                //     paddingBottom: `${attributes.sectionShapeHeightDesktop + 10}px`,
                // },
                ...isDefined(attributes.minHeightDesktop) && {
                    '--min-height-desktop': `${attributes.minHeightDesktop}px`,
                    '--min-height-mobile': `${attributes.minHeightMobile}px`,
                    '--min-height-desktop-mobile': `${attributes.minHeightDesktop - attributes.minHeightMobile}`,
                },
                ...attributes.sectionShape && {
                    '--shape-height-desktop': `${attributes.sectionShapeHeightDesktop}px`,
                    '--shape-height-mobile': `${attributes.sectionShapeHeightMobile}px`,
                    '--shape-height-desktop-mobile': `${attributes.sectionShapeHeightDesktop - attributes.sectionShapeHeightMobile}`,
                }
            }
        });

        return (
            <attributes.tagName {...blockProps}>
                <div className={classnames("section-block__inner", attributes.fullWidth && 'full-width')} style={{
                    ...(!attributes.fullWidth && attributes.innerWidth) && {
                        maxWidth: `${attributes.innerWidth}px`
                    },
                    ...isDefined(attributes.verticalPadding) && {
                        paddingTop: `${attributes.verticalPadding}px`,
                        paddingBottom: `${attributes.verticalPadding}px`
                    },
                    // ...!attributes.sectionShape && {
                    //     paddingTop: 0,
                    //     paddingBottom: 0,
                    // }
                }}>
                    <InnerBlocks.Content/>
                </div>

                {(sectionShapes[attributes.sectionShape] && attributes.sectionShapeTopClass !== 'none') && sectionShapes[attributes.sectionShape](
                    'top',
                    classnames(attributes.sectionShapeTopClass),
                    getColorObject(attributes.sectionTopShapeBgColor) ? `rgb(var(--custom-${getColorObject(attributes.sectionTopShapeBgColor).slug}-color))` : 'rgb(var(--custom-body-background-color))'
                )}

                {(sectionShapes[attributes.sectionShape] && attributes.sectionShapeBottomClass !== 'none') && sectionShapes[attributes.sectionShape](
                    'bottom',
                    classnames(attributes.sectionShapeBottomClass),
                    getColorObject(attributes.sectionBottomShapeBgColor) ? `rgb(var(--custom-${getColorObject(attributes.sectionBottomShapeBgColor).slug}-color))` : 'rgb(var(--custom-body-background-color))'
                )}
            </attributes.tagName>
        );
    },
});
