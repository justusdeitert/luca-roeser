import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {RangeControl, Button, ToggleControl, SelectControl, PanelBody, ColorPalette, FocalPointPicker, __experimentalAlignmentMatrixControl as AlignmentMatrixControl} from '@wordpress/components';
import {MediaUpload, InspectorControls, InnerBlocks, useBlockProps, __experimentalColorGradientControl as ColorGradientControl, __experimentalGradientPicker as GradientPicker} from '@wordpress/block-editor';
import classNames from 'classnames';
import {editorThemeColors, getImage, focalPositionInPixel, getColorObject, ALLOWEDBLOCKS, removeArrayItems, SelectClipPath, MobileSwitch, MobileSwitchInner} from "../utility";
import * as clipPaths from "../clip-paths"
import {heroIcon} from "../icons";

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
    // heroBackgroundGradient: {
    //     type: 'string',
    //     default: ''
    // },
    hasOverlay: {
        type: 'boolean',
        default: false,
    },
    // heroBackgroundOverlayColor: {
    //     type: 'string',
    //     default: 'light'
    // },
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
     * Text Properties
     */
    textPosition: {
        type: 'object',
        default: {x: 0.5, y: 0.5}
    },
}

// For not firing update to often
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

        /**
         * Hero Properties
         */

        const onChangeFullHeight = (value) => {
            setAttributes({isFullHeight: value});
        };

        const onChangeHeight = (value) => {
            setAttributes({desktopHeight: value});
        };

        const onChangeMobileHeight = (value) => {
            setAttributes({mobileHeight: value});
        };

        const onChangeClipPath = (value) => {
            if (value !== attributes.clipPath) {
                setAttributes({clipPath: value});
            } else {
                setAttributes({clipPath: 'none'});
            }
        };

        const onChangeBackgroundColor = (value) => {
            setAttributes({backgroundColor: value});
        };

        const onChangeHasOverlay = (value) => {
            setAttributes({hasOverlay: value});
        };

        const onChangeOverlayGradient = (value) => {
            if (value) {
                setAttributes({overlayGradient: value});
            }
        };

        const onChangeOverlayGradientPosition = (value) => {
            setAttributes({overlayGradientPosition: value});
        };

        /**
         * Image Properties
         */

        const onSelectHeroImage = (imageObject) => {
            setAttributes({backgroundImage: imageObject});
        };

        const removeHeroImage = () => {
            setAttributes({backgroundImage: false});
        };

        const onChangeImageBlur = (value) => {
            setAttributes({backgroundImageBlur: value});
        };

        const onChangeImageOpacity = (value) => {
            setAttributes({backgroundImageOpacity: value});
        };

        const onChangeImageAlignment = (value) => {
            setAttributes({backgroundImageAlignment: value});
        };

        /**
         * Text Properties
         */

        const onChangeTextPosition = (value) => {

            /**
             * Timeout for Text Position On Change
             */
            if (onChangeTextPositionTimeout) {
                setAttributes({textPosition: value});

                onChangeTextPositionTimeout = false;

                setTimeout(function () {
                    onChangeTextPositionTimeout = true;
                }, 30);
            }
        };

        const setBackTextPosition = () => {
            setAttributes({textPosition: {x: 0.5, y: 0.5}});
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
                            onChange={onChangeFullHeight}
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
                                            onChange={onChangeHeight}
                                        />
                                    </MobileSwitchInner>
                                    <MobileSwitchInner type={'mobile'}>
                                        <RangeControl
                                            value={attributes.mobileHeight}
                                            min={200}
                                            max={700}
                                            step={10}
                                            onChange={onChangeMobileHeight}
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
                            onChange={onChangeBackgroundColor}
                            disableCustomColors={true}
                        />
                        {/*<p>{__('Hero Background Color', 'sage')}</p>
                        <ColorGradientControl
                            colorValue={attributes.backgroundColor}
                            gradientValue={attributes.overlayGradient}
                            colors={editorThemeColors}
                            gradients={[
                                {
                                    name: 'Vivid cyan blue to vivid purple',
                                    gradient: 'linear-gradient(135deg,rgba(6,147,227,1) 0%,rgb(155,81,224) 100%)',
                                    slug: 'vivid-cyan-blue-to-vivid-purple',
                                },
                                {
                                    name: 'Light green cyan to vivid green cyan',
                                        gradient: 'linear-gradient(135deg,rgb(122,220,180) 0%,rgb(0,208,130) 100%)',
                                    slug: 'light-green-cyan-to-vivid-green-cyan',
                                },
                                {
                                    name: 'Luminous vivid amber to luminous vivid orange',
                                    gradient: 'linear-gradient(135deg,rgba(252,185,0,1) 0%,rgba(255,105,0,1) 100%)',
                                    slug: 'luminous-vivid-amber-to-luminous-vivid-orange',
                                },
                            ]}
                            onColorChange={onChangeBackgroundColor}
                            onGradientChange={onChangeOverlayGradient}
                        />*/}
                        {/*{(attributes.backgroundImage || attributes.backgroundColor) &&*/}
                        <>
                            <hr/>
                            <p>{__('Section Clip Path', 'sage')}</p>
                            <SelectClipPath
                                clipPathsModules={clipPaths}
                                clickFunction={onChangeClipPath}
                                value={attributes.clipPath}
                            />
                        </>
                        {/*}*/}
                        <hr/>
                        <ToggleControl
                            label={__('Background Overlay', 'sage')}
                            checked={attributes.hasOverlay}
                            onChange={onChangeHasOverlay}
                        />
                        {attributes.hasOverlay &&
                        <>
                            <GradientPicker
                                value={attributes.overlayGradient}
                                onChange={onChangeOverlayGradient}
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
                                    {/*<hr/>*/}
                                    <p>{__('Radial Overlay Position', 'sage')}</p>
                                    <AlignmentMatrixControl
                                        value={attributes.overlayGradientPosition}
                                        onChange={onChangeOverlayGradientPosition}
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
                                onChange={onChangeImageBlur}
                            />
                            <hr/>
                            <p>{__('Image Opacity', 'sage')}</p>
                            <RangeControl
                                value={attributes.backgroundImageOpacity}
                                min={0}
                                max={1}
                                step={0.05}
                                onChange={onChangeImageOpacity}
                            />
                            <hr/>
                            <p>{__('Background Image Alignment', 'sage')}</p>
                            <AlignmentMatrixControl
                                value={attributes.backgroundImageAlignment}
                                onChange={onChangeImageAlignment}
                            />
                        </PanelBody>
                    }
                    <PanelBody title={__('Text Properties', 'sage')} initialOpen={false}>
                        {/*<hr/>*/}
                        <div style={{height: '20px'}}/>
                        <p>{__('Text Position', 'sage')}</p>
                        <Button className={'is-secondary'}
                                onClick={setBackTextPosition}
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
                            clipPath: attributes.clipPath !== 'none' ? `url(#clip-path-${attributes.clientId})` : 'none',
                            '--hero-height-desktop': `${attributes.desktopHeight}px`,
                            '--hero-height-mobile': `${attributes.mobileHeight}px`,
                            '--hero-min-max-height': `${attributes.desktopHeight - attributes.mobileHeight}`,
                        }}
                    >

                        {clipPaths[attributes.clipPath] &&
                            clipPaths[attributes.clipPath](`clip-path-${attributes.clientId}`)
                        }

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
                                <InnerBlocks template={TEMPLATE} allowedBlocks={removeArrayItems(ALLOWEDBLOCKS, ['custom/hero'])}/>
                            </div>
                        </div>
                    </div>
                    <MediaUpload
                        onSelect={onSelectHeroImage}
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
                                            onClick={removeHeroImage}
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
                    clipPath: attributes.clipPath !== 'none' ? `url(#clip-path-${attributes.clientId})` : 'none',
                    '--hero-height-desktop': `${attributes.desktopHeight}px`,
                    '--hero-height-mobile': `${attributes.mobileHeight}px`,
                    '--hero-min-max-height': `${attributes.desktopHeight - attributes.mobileHeight}`,
                }}
            >

                {clipPaths[attributes.clipPath] &&
                    clipPaths[attributes.clipPath](`clip-path-${attributes.clientId}`)
                }

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
            </div>
        );
    },
});

