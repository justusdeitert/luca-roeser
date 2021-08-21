import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {
    RangeControl,
    Button,
    ToggleControl,
    SelectControl,
    PanelBody,
    ColorPalette,
    FocalPointPicker,
    __experimentalAlignmentMatrixControl as AlignmentMatrixControl,
    __experimentalRadio as Radio,
    __experimentalRadioGroup as RadioGroup
} from '@wordpress/components';
import {
    MediaUpload,
    InspectorControls,
    InnerBlocks,
    useBlockProps,
    __experimentalColorGradientControl as ColorGradientControl,
    __experimentalGradientPicker as GradientPicker
} from '@wordpress/block-editor';
import classNames from 'classnames';
import {
    editorThemeColors,
    getImage,
    focalPositionInPixel,
    getColorObject,
    ALLOWEDBLOCKS,
    removeArrayItems,
    SelectClipPath,
    MobileSwitch,
    MobileSwitchInner,
    SelectSectionShapes,
    getCssVariable
} from "../utility";
// import * as clipPaths from "../clip-paths"
import {heroIcon} from "../custom-icons";
import * as sectionShapes from "../section-shapes";
import classnames from "classnames";

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
     * Hero Properties
     */
    isFullHeight: {
        type: 'boolean',
        default: false,
    },
    desktopHeight: {
        type: 'number',
        default: 500,
    },
    mobileHeight: {
        type: 'number',
        default: 300,
    },
    clipPath: {
        type: 'string',
        default: 'none',
    },
    backgroundColor: {
        type: 'string',
        default: ''
    },
    hasOverlay: {
        type: 'boolean',
        default: false,
    },
    overlayGradient: {
        type: 'string',
        default: 'radial-gradient(rgba(0,0,0,0.3) 0%,rgba(0,0,0,0) 100%)'
    },
    overlayGradientPosition: {
        type: 'string',
        default: 'center center'
    },

    /**
     * Image Properties
     */
    backgroundImage: {
        type: 'object',
        default: false
    },
    backgroundImageBlur: {
        type: 'number',
        default: 0,
    },
    backgroundImageOpacity: {
        type: 'number',
        default: 1,
    },
    backgroundImageAlignment: {
        type: 'string',
        default: 'center top'
    },

    /**
     * Section Shape
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

    /**
     * Text Properties
     */
    textPosition: {
        type: 'object',
        default: {x: 0.5, y: 0.5}
    },
}

/**
 * For not firing update function to often
 * @type {boolean}
 */
let onChangeTextPositionTimeout = true;

/**
 * Adds Position to Radial Gradient String
 * @param value
 * @param position
 * @param defaultGradient
 * @returns {*}
 */
const adjustOverlayPosition = (value, position) => {
    if (value.includes('radial-gradient')) {
        return value.replace('radial-gradient(', `radial-gradient(at ${position},`)
    }

    return value;
};

registerBlockType('custom/hero', {
    title: __('Hero', 'sage'),
    icon: heroIcon,
    category: 'custom',
    supports: {
        // align: true,
        align: ['full'],
    },
    multiple: false, // Use this block just once per post
    attributes,
    // example: {
    //     attributes: {
    //         title: __('The Title...'),
    //         subTitle: __('Lorem ipsum dolor sit amet.'),
    //     },
    // },
    edit: ({className, attributes, setAttributes, clientId}) => {

        const onChangeTextPosition = (value) => {

            /**
             * Timeout for Text Position On Change
             */
            if (onChangeTextPositionTimeout) {
                setAttributes({textPosition: value});

                onChangeTextPositionTimeout = false;

                setTimeout(function () {
                    onChangeTextPositionTimeout = true;
                }, 50);
            }
        };

        const TEMPLATE = [
            ['core/heading', {placeholder: 'The Title...'}],
            ['core/heading', {placeholder: 'This is the Subtitle...'}],
        ];

        attributes.clientId = clientId;

        const blockProps = useBlockProps({
            className: className,
            style: {
                border: (!attributes.backgroundImage && !attributes.backgroundColor) ? '1px dashed var(--wp-admin-theme-color)' : 'none',
            }
        });

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Hero Properties', 'sage')} initialOpen={true}>
                        <div style={{height: '20px'}}/>
                        <ToggleControl
                            label={__('Full Height', 'sage')}
                            // help={ attributes.switchContent ? 'Image is left' : 'Image is right' }
                            checked={attributes.isFullHeight}
                            onChange={(value) => setAttributes({isFullHeight: value})}
                        />
                        {!attributes.isFullHeight &&
                        <>
                            <hr/>
                            <MobileSwitch headline={__('Height', 'sage')}>
                                <MobileSwitchInner type={'desktop'}>
                                    <RangeControl
                                        value={attributes.desktopHeight}
                                        min={attributes.mobileHeight}
                                        max={1000}
                                        step={10}
                                        onChange={(value) => setAttributes({desktopHeight: value})}
                                    />
                                </MobileSwitchInner>
                                <MobileSwitchInner type={'mobile'}>
                                    <RangeControl
                                        value={attributes.mobileHeight}
                                        min={200}
                                        max={700}
                                        step={10}
                                        onChange={(value) => setAttributes({mobileHeight: value})}
                                    />
                                </MobileSwitchInner>
                            </MobileSwitch>
                        </>
                        }
                        <hr/>
                        <p>{__('Background Color', 'sage')}</p>
                        <ColorPalette
                            colors={editorThemeColors}
                            value={attributes.backgroundColor}
                            onChange={(value) => setAttributes({backgroundColor: value})}
                            disableCustomColors={true}
                        />
                        {/*<>
                            <hr/>
                            <p>{__('Section Clip Path', 'sage')}</p>
                            <SelectClipPath
                                clipPathsModules={clipPaths}
                                clickFunction={onChangeClipPath}
                                value={attributes.clipPath}
                            />
                        </>*/}
                        <hr/>
                        <ToggleControl
                            label={__('Background Overlay', 'sage')}
                            checked={attributes.hasOverlay}
                            onChange={(value) => setAttributes({hasOverlay: value})}
                        />
                        {attributes.hasOverlay &&
                        <>
                            <GradientPicker
                                value={attributes.overlayGradient}
                                onChange={(value) => value && setAttributes({overlayGradient: value})}
                                // disableCustomGradients={true}
                                gradients={[
                                    {
                                        name: 'Dark Radial',
                                        gradient: 'radial-gradient(rgba(0,0,0,0.3) 0%,rgba(0,0,0,0) 100%)',
                                        slug: 'dark-radial',
                                    },
                                    {
                                        name: 'Dark Linear',
                                        gradient: 'linear-gradient(0deg,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0) 100%)',
                                        slug: 'dark-linear',
                                    },
                                    {
                                        name: 'Light Radial',
                                        gradient: 'radial-gradient(rgba(255,255,255,0.3) 0%,rgba(255,255,255,0) 100%)',
                                        slug: 'dark-radial',
                                    },
                                    {
                                        name: 'Light Linear',
                                        gradient: 'linear-gradient(0deg,rgba(255,255,255,0.5) 0%,rgba(255,255,255,0) 100%)',
                                        slug: 'dark-radial',
                                    },
                                ]}
                            />
                            {attributes.overlayGradient.includes('radial-gradient') &&
                            <>
                                <p>{__('Radial Overlay Position', 'sage')}</p>
                                <AlignmentMatrixControl
                                    value={attributes.overlayGradientPosition}
                                    onChange={(value) => setAttributes({overlayGradientPosition: value})}
                                />
                            </>
                            }
                        </>
                        }
                    </PanelBody>
                    {attributes.backgroundImage &&
                    <PanelBody title={__('Background Image', 'sage')} initialOpen={false}>
                        <div style={{height: '20px'}}/>
                        <p>{__('Image Blur', 'sage')}</p>
                        <RangeControl
                            value={attributes.backgroundImageBlur}
                            min={0}
                            max={10}
                            onChange={(value) => setAttributes({backgroundImageBlur: value})}
                        />
                        <hr/>
                        <p>{__('Image Opacity', 'sage')}</p>
                        <RangeControl
                            value={attributes.backgroundImageOpacity}
                            min={0}
                            max={1}
                            step={0.05}
                            onChange={(value) => setAttributes({backgroundImageOpacity: value})}
                        />
                        <hr/>
                        <p>{__('Background Image Alignment', 'sage')}</p>
                        <AlignmentMatrixControl
                            value={attributes.backgroundImageAlignment}
                            onChange={(value) => setAttributes({backgroundImageAlignment: value})}
                        />
                    </PanelBody>
                    }
                    <PanelBody title={__('Hero Shape', 'sage')}>
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
                    <PanelBody title={__('Text Properties', 'sage')} initialOpen={false}>
                        <div style={{height: '20px'}}/>
                        <p>{__('Text Position', 'sage')}</p>
                        <Button className={'is-secondary'}
                                onClick={() => setAttributes({textPosition: {x: 0.5, y: 0.5}})}
                                style={{marginBottom: '20px'}}
                                text={__('Default Position', 'sage')}
                        />
                        <FocalPointPicker
                            className={'no-picker-controls'}
                            value={attributes.textPosition}
                            onChange={onChangeTextPosition}
                            onDrag={onChangeTextPosition}
                            // dimensions={{
                            //     width: 400,
                            //     height: 100,
                            // }}
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <div
                        className={classNames(
                            className,
                            'hero-block',
                            getColorObject(attributes.backgroundColor) && `has-${getColorObject(attributes.backgroundColor).slug}-background-color`,
                            attributes.isFullHeight && 'full-height'
                        )}
                        style={{
                            '--hero-height-desktop': `${attributes.desktopHeight}px`,
                            '--hero-height-mobile': `${attributes.mobileHeight}px`,
                            '--hero-min-max-height': `${attributes.desktopHeight - attributes.mobileHeight}`,
                            paddingTop: `${attributes.sectionShapeHeight}px`,
                            paddingBottom: `${attributes.sectionShapeHeight}px`,
                        }}
                    >

                        {attributes.backgroundImage &&
                        <img
                            className={classNames('hero-block__image', attributes.backgroundImageBlur > 0 ? 'is-blurred' : '')}
                            style={{
                                filter: `blur(${attributes.backgroundImageBlur}px)`,
                                objectPosition: `${attributes.backgroundImageAlignment}`,
                                opacity: attributes.backgroundImageOpacity,
                            }}
                            src={getImage(attributes.backgroundImage, 'x_large')}
                            alt={getImage(attributes.backgroundImage, 'alt')}
                            width={getImage(attributes.backgroundImage, 'width')}
                            height={getImage(attributes.backgroundImage, 'height')}
                        />
                        }

                        {attributes.hasOverlay &&
                        <div className="hero-block__overlay"
                             style={{
                                 // backgroundImage: getOverlayColor(attributes.heroBackgroundOverlayColor)
                                 backgroundImage: adjustOverlayPosition(attributes.overlayGradient, attributes.overlayGradientPosition)
                             }}
                        />
                        }

                        <div className="container hero-block__container">
                            <div className="hero-block__text-wrapper"
                                 style={{
                                     transform: `translate(${focalPositionInPixel(attributes.textPosition.x)}, ${focalPositionInPixel(attributes.textPosition.y)})`,
                                 }}
                            >
                                <InnerBlocks template={TEMPLATE}
                                             allowedBlocks={removeArrayItems(ALLOWEDBLOCKS, ['custom/hero'])}/>
                            </div>
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
                            getColorObject(attributes.sectionBottomShapeBgColor) ? `rgb(var(--custom-${getColorObject(attributes.sectionBottomShapeBgColor).slug}-color))` : 'rgb(var(--custom-body-background-color))',
                        )}

                    </div>
                    <MediaUpload
                        onSelect={(value) => setAttributes({backgroundImage: value})}
                        allowedTypes={[
                            'image/jpeg',
                            'image/jpg',
                            'image/png',
                            'image/gif'
                        ]}
                        // value={attributes.mediaID}
                        render={({open}) => (
                            <>
                                <div style={{
                                    position: `absolute`,
                                    right: `10px`,
                                    bottom: `10px`
                                }}>
                                    <Button
                                        className={'button'}
                                        onClick={open}
                                        icon={'format-image'}
                                        text={attributes.backgroundImage ? __('Change Image', 'sage') : __('Upload Image', 'sage')}
                                    />
                                    {attributes.backgroundImage &&
                                    <>
                                        <Button
                                            className={'button'}
                                            onClick={() => setAttributes({backgroundImage: false})}
                                            icon={'trash'}
                                            style={{marginLeft: '10px'}}
                                        />
                                    </>
                                    }
                                </div>
                            </>
                        )}
                    />
                </div>
            </>
        );
    },
    save: ({attributes}) => {

        return (
            <div
                className={classNames(
                    'hero-block',
                    getColorObject(attributes.backgroundColor) && `has-${getColorObject(attributes.backgroundColor).slug}-background-color`,
                    attributes.isFullHeight && 'full-height'
                )}
                style={{
                    // clipPath: attributes.clipPath !== 'none' ? `url(#clip-path-${attributes.clientId})` : 'none',
                    '--hero-height-desktop': `${attributes.desktopHeight}px`,
                    '--hero-height-mobile': `${attributes.mobileHeight}px`,
                    '--hero-min-max-height': `${attributes.desktopHeight - attributes.mobileHeight}`,
                    paddingTop: `${attributes.sectionShapeHeight}px`,
                    paddingBottom: `${attributes.sectionShapeHeight}px`,
                }}
            >

                {attributes.backgroundImage &&
                <img className={classNames('hero-block__image', attributes.backgroundImageBlur > 0 ? 'is-blurred' : '')}
                     style={{
                         filter: `blur(${attributes.backgroundImageBlur}px)`,
                         objectPosition: `${attributes.backgroundImageAlignment}`,
                         opacity: attributes.backgroundImageOpacity,
                     }}
                     srcSet={`${getImage(attributes.backgroundImage, 'tiny')} 480w, ${getImage(attributes.backgroundImage, 'small')} 768w, ${getImage(attributes.backgroundImage, 'medium')} 1024w, ${getImage(attributes.backgroundImage, 'x_large')} 1360w`}
                     sizes="100w"
                     src={getImage(attributes.backgroundImage, 'medium')}
                     alt={getImage(attributes.backgroundImage, 'alt')}
                />
                }

                {attributes.hasOverlay &&
                <div className="hero-block__overlay"
                     style={{
                         // backgroundImage: getOverlayColor(attributes.heroBackgroundOverlayColor),
                         backgroundImage: adjustOverlayPosition(attributes.overlayGradient, attributes.overlayGradientPosition)
                     }}
                />
                }

                <div className="container hero-block__container">
                    <div className="hero-block__text-wrapper"
                         style={{
                             transform: `translate(${focalPositionInPixel(attributes.textPosition.x)}, ${focalPositionInPixel(attributes.textPosition.y)})`,
                         }}
                    >
                        <InnerBlocks.Content/>
                    </div>
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

