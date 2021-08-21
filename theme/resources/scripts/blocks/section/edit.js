/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {registerBlockType, createBlock} from '@wordpress/blocks';
import {SelectControl, RangeControl, ToggleControl, Button, PanelBody, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup, __experimentalBoxControl as BoxControl, ToolbarGroup} from '@wordpress/components';
import {InnerBlocks, InspectorControls, ColorPalette, useBlockProps, __experimentalUseInnerBlocksProps as useInnerBlocksProps, BlockControls, BlockVerticalAlignmentToolbar} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
// import {
//     ALLOWED_BLOCKS,
//     editorThemeColors,
//     getColorObject,
//     getCssVariable,
//     isDefined,
//     MobileSwitch,
//     MobileSwitchInner,
//     removeArrayItems, SelectSectionShapes
// } from "../utility";
// import * as sectionShapes from "../section-shapes";
// import classnames from "classnames";




import classnames from 'classnames';
import {sectionIcon} from '../icons';
import {editorThemeColors, getColorObject, ALLOWED_BLOCKS, removeArrayItems, SelectSectionShapes, getCssVariable, MobileSwitch, MobileSwitchInner, isDefined} from "../utility";
import * as sectionShapes from "../section-shapes"



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

export default function edit({setAttributes, attributes, className, clientId}) {

    attributes.clientId = clientId;

    const blockProps = useBlockProps({
        style: {
            border: !attributes.sectionBackgroundColor ? '1px dashed var(--wp-admin-theme-color)' : 'none',
            height: attributes.fullHeight ? '100%' : 'initial',
        }
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        allowedBlocks: removeArrayItems(ALLOWED_BLOCKS, ['custom/section']),
        templateLock: false,
    });

    let sectionStyles = {
        borderRadius: attributes.sectionBorderRadius ? `${attributes.sectionBorderRadius}px` : 0,
        paddingTop: (attributes.sectionShape !== 'none') ? `${attributes.sectionShapeHeight + 10}px` : 0,
        paddingBottom: (attributes.sectionShape !== 'none') ? `${attributes.sectionShapeHeight + 10}px` : 0,
    };

    // let style={ someCondition ? { textAlign:'center', paddingTop: '50%'} : {}}

    // let sectionStyles = {
    //     (attributes.sectionBorderRadius) && {borderRadius: `${attributes.sectionBorderRadius}px`}
    // }

    // New Section Styles!
    // let style = {
    //     ...attributes.sectionBorderRadius && {borderRadius: `${attributes.sectionBorderRadius}px`},
    //     ...(attributes.sectionShape !== 'none') && {
    //         paddingTop: `${attributes.sectionShapeHeight + 10}px`,
    //         paddingBottom: `${attributes.sectionShapeHeight + 10}px`,
    //     }
    // }

    // console.log(style);

    if (isDefined(attributes.minHeightDesktop)) {
        sectionStyles['--min-height-desktop'] = `${attributes.minHeightDesktop}px`;
        sectionStyles['--min-height-mobile'] = `${attributes.minHeightMobile}px`;
        sectionStyles['--min-height-desktop-mobile'] = `${attributes.minHeightDesktop - attributes.minHeightMobile}`;
    }

    let sectionInnerStyles = {};

    if (!attributes.fullWidth && attributes.innerWidth) {
        sectionInnerStyles.maxWidth = `${attributes.innerWidth}px`;
    }

    if (isDefined(attributes.verticalPadding)) {
        sectionInnerStyles.paddingTop = `${attributes.verticalPadding}px`;
        sectionInnerStyles.paddingBottom = `${attributes.verticalPadding}px`;
    }

    if (attributes.sectionShape !== 'none') {
        sectionInnerStyles.paddingTop = 0;
        sectionInnerStyles.paddingBottom = 0;
    }

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
                    <div style={{height: '20px'}}/>
                    <ToggleControl
                        label={__('Set to window height', 'sage')}
                        // help={ attributes.switchContent ? 'Image is left' : 'Image is right' }
                        checked={attributes.fullHeight}
                        onChange={(value) => setAttributes({fullHeight: value})}
                    />
                    <hr/>
                    <ToggleControl
                        label={__('Full inner width', 'sage')}
                        checked={attributes.fullWidth}
                        onChange={(value) => setAttributes({fullWidth: value})}
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
                    <>
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
                    </>
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
            <div {...innerBlocksProps}>
                <div
                    className={classnames(
                        className,
                        'section-block',
                        getColorObject(attributes.sectionBackgroundColor) && `has-${getColorObject(attributes.sectionBackgroundColor).slug}-background-color has-background`,
                        attributes.fullHeight ? 'full-height' : isDefined(attributes.minHeightDesktop) && 'min-height',
                        `align-items-${attributes.verticalAlign}`
                    )}
                    style={sectionStyles}
                >

                    <div className={classnames("section-block__inner", attributes.fullWidth && 'full-width')} style={sectionInnerStyles}>
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
}
