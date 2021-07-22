import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {RangeControl, Button, ToggleControl, SelectControl, PanelBody, ColorPalette, FocalPointPicker, __experimentalAlignmentMatrixControl as AlignmentMatrixControl} from '@wordpress/components';
import {MediaUpload, InspectorControls, InnerBlocks, useBlockProps, __experimentalColorGradientControl as ColorGradientControl, __experimentalGradientPicker as GradientPicker} from '@wordpress/block-editor';
import classNames from 'classnames';
import {editorThemeColors, getImage, focalPositionInPixel, getColorObject, ALLOWEDBLOCKS, removeArrayItems, SelectClipPath} from "../utility";
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
    heroFullHeight: {
        type: 'boolean',
        default: false,
    },
    heroHeight: {
        type: 'number',
        default: 500,
    },
    heroMobileHeight: {
        type: 'number',
        default: 300,
    },
    heroClipPath: {
        type: 'string',
        default: 'none',
    },
    heroBackgroundColor: {
        type: 'string',
        default: ''
    },
    // heroBackgroundGradient: {
    //     type: 'string',
    //     default: ''
    // },
    heroBackgroundHasOverlay: {
        type: 'boolean',
        default: false,
    },
    // heroBackgroundOverlayColor: {
    //     type: 'string',
    //     default: 'light'
    // },
    heroBackgroundOverlayGradient: {
        type: 'string',
        default: 'linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)'
    },
    heroBackgroundOverlayGradientPosition: {
        type: 'string',
        default: 'center center'
    },
    /**
     * Image Properties
     */
    heroImage: {
        type: 'object',
        default: false
    },
    heroImageBlur: {
        type: 'number',
        default: 0,
    },
    heroImageOpacity: {
        type: 'number',
        default: 1,
    },
    heroImageAlignment: {
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

// const getOverlayColor = (overlayColor) => {
//     switch (overlayColor) {
//         case 'light':
//             return `radial-gradient(at center top, rgba(255, 255, 255, 0.8) 20%, rgba(255, 255, 255, 0) 80%)`
//         case 'dark':
//             return `radial-gradient(at center top, rgba(0, 0, 0, 0.5) 20%, rgba(0, 0, 0, 0) 80%)`
//         default:
//             return `radial-gradient(at center top, rgba(255, 255, 255, 0.5) 20%, rgba(255, 255, 255, 0) 80%)`
//     }
// }

// For not firing update to often
let onChangeTextPositionTimeout = true;

/**
 * Adds Position to Radial Gradient String
 * @param value
 * @param position
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
            setAttributes({heroFullHeight: value});
        };

        const onChangeHeroHeight = (value) => {
            setAttributes({heroHeight: value});
        };

        const onChangeHeroMobileHeight = (value) => {
            setAttributes({heroMobileHeight: value});
        };

        const onChangeHeroClipPath = (value) => {
            setAttributes({heroClipPath: value});
        };

        const onChangeHeroBackgroundColor = (value) => {
            setAttributes({heroBackgroundColor: value});
        };

        const onChangeHeroBackgroundHasOverlay = (value) => {
            setAttributes({heroBackgroundHasOverlay: value});
        };

        const onChangeHeroBackgroundOverlayGradient = (value) => {
            setAttributes({heroBackgroundOverlayGradient: value});
        };

        const onChangeHeroBackgroundOverlayGradientPosition = (value) => {
            setAttributes({heroBackgroundOverlayGradientPosition: value});
        };

        /**
         * Image Properties
         */

        const onSelectHeroImage = (imageObject) => {
            setAttributes({heroImage: imageObject});
        };

        const removeHeroImage = () => {
            setAttributes({heroImage: false});
        };

        const onChangeHeroImageBlur = (value) => {
            setAttributes({heroImageBlur: value});
        };

        const onChangeHeroImageOpacity = (value) => {
            setAttributes({heroImageOpacity: value});
        };

        const onChangeHeroImageAlignment = (value) => {
            setAttributes({heroImageAlignment: value});
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

        // console.log(adjustOverlayPosition(attributes.heroBackgroundOverlayGradient, attributes.heroBackgroundOverlayGradientPosition));

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
                border: (!attributes.heroImage && !attributes.heroBackgroundColor) ? '1px dashed var(--wp-admin-theme-color)' : 'none',
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
                            checked={attributes.heroFullHeight}
                            onChange={onChangeFullHeight}
                        />
                        {!attributes.heroFullHeight &&
                            <>
                                <hr/>
                                <p>{__('Hero Height', 'sage')}</p>
                                <RangeControl
                                    value={attributes.heroHeight}
                                    min={attributes.heroMobileHeight}
                                    max={1000}
                                    step={10}
                                    onChange={onChangeHeroHeight}
                                />
                                <hr/>
                                <p>{__('Mobile Hero Height', 'sage')}</p>
                                <RangeControl
                                    value={attributes.heroMobileHeight}
                                    min={200}
                                    max={700}
                                    step={10}
                                    onChange={onChangeHeroMobileHeight}
                                />
                            </>
                        }
                        <hr/>
                        <p>{__('Hero Background Color', 'sage')}</p>
                        <ColorPalette
                            colors={editorThemeColors}
                            value={attributes.heroBackgroundColor}
                            onChange={onChangeHeroBackgroundColor}
                            disableCustomColors={true}
                        />
                        {/*<p>{__('Hero Background Color', 'sage')}</p>
                        <ColorGradientControl
                            colorValue={attributes.heroBackgroundColor}
                            gradientValue={attributes.heroBackgroundGradient}
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
                            onColorChange={onChangeHeroBackgroundColor}
                            onGradientChange={onChangeHeroBackgroundGradient}
                        />
                        */}
                        {(attributes.heroImage || attributes.heroBackgroundColor) &&
                        <>
                            <hr/>
                            <p>{__('Section Clip Path', 'sage')}</p>
                            <SelectClipPath
                                clipPathsModules={clipPaths}
                                clickFunction={onChangeHeroClipPath}
                                value={attributes.heroClipPath}
                            />
                        </>
                        }
                        <hr/>
                        <ToggleControl
                            label={__('Background Overlay', 'sage')}
                            checked={attributes.heroBackgroundHasOverlay}
                            onChange={onChangeHeroBackgroundHasOverlay}
                        />
                        {attributes.heroBackgroundHasOverlay &&
                        <>
                            <GradientPicker
                                value={attributes.heroBackgroundOverlayGradient}
                                onChange={onChangeHeroBackgroundOverlayGradient}
                                // disableCustomGradients={true}
                                gradients={[
                                    {
                                        name: 'Dark Radial',
                                        gradient: 'radial-gradient(rgba(0,0,0,0.5) 0%,rgba(0,0,0,0) 100%)',
                                        slug: 'dark-radial',
                                    },
                                    {
                                        name: 'Dark Linear',
                                        gradient: 'linear-gradient(90deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0) 100%)',
                                        slug: 'dark-linear',
                                    },
                                    {
                                        name: 'Light Radial',
                                        gradient: 'radial-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0) 100%)',
                                        slug: 'dark-radial',
                                    },
                                    {
                                        name: 'Light Linear',
                                        gradient: 'linear-gradient(90deg,rgba(255,255,255,0.5) 0%,rgba(255,255,255,0) 100%)',
                                        slug: 'dark-radial',
                                    },
                                ]}
                            />
                            {attributes.heroBackgroundOverlayGradient.includes('radial-gradient') &&
                                <>
                                    {/*<hr/>*/}
                                    <p>{__('Radial Overlay Position', 'sage')}</p>
                                    <AlignmentMatrixControl
                                        value={attributes.heroBackgroundOverlayGradientPosition}
                                        onChange={onChangeHeroBackgroundOverlayGradientPosition}
                                    />
                                </>
                            }
                        </>
                        }
                    </PanelBody>
                    {attributes.heroImage &&
                        <PanelBody title={__('Background Image', 'sage')} initialOpen={false}>
                            <hr/>
                            <p>{__('Image Blur', 'sage')}</p>
                            <RangeControl
                                value={attributes.heroImageBlur}
                                min={0}
                                max={10}
                                onChange={onChangeHeroImageBlur}
                            />
                            <hr/>
                            <p>{__('Image Opacity', 'sage')}</p>
                            <RangeControl
                                value={attributes.heroImageOpacity}
                                min={0}
                                max={1}
                                step={0.05}
                                onChange={onChangeHeroImageOpacity}
                            />
                            <hr/>
                            <p>{__('Background Image Alignment', 'sage')}</p>
                            <AlignmentMatrixControl
                                value={attributes.heroImageAlignment}
                                onChange={onChangeHeroImageAlignment}
                            />
                        </PanelBody>
                    }
                    <PanelBody title={__('Text Properties', 'sage')} initialOpen={false}>
                        <hr/>
                        <p>{__('Text Position', 'sage')}</p>
                        <Button className={'button'}
                                onClick={setBackTextPosition}
                                style={{marginBottom: '20px'}}
                                text={__('Default Position', 'sage')}
                        />
                        <FocalPointPicker
                            className={'no-picker-controls'}
                            value={attributes.textPosition}
                            onChange={onChangeTextPosition}
                            onDrag={onChangeTextPosition}
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <div
                        className={classNames(
                            className,
                            'hero-block',
                            getColorObject(attributes.heroBackgroundColor) && `has-${getColorObject(attributes.heroBackgroundColor).slug}-background-color`,
                            attributes.heroFullHeight && 'full-height'
                        )}
                        style={{
                            clipPath: attributes.heroClipPath !== 'none' ? `url(#clip-path-${attributes.clientId})` : 'none',
                            '--hero-height-desktop': `${attributes.heroHeight}px`,
                            '--hero-height-mobile': `${attributes.heroMobileHeight}px`,
                            '--hero-min-max-height': `${attributes.heroHeight - attributes.heroMobileHeight}`,
                        }}
                    >

                        {clipPaths[attributes.heroClipPath] &&
                            clipPaths[attributes.heroClipPath](`clip-path-${attributes.clientId}`)
                        }

                        {attributes.heroImage &&
                            <img
                                className={classNames('hero-block__image', attributes.heroImageBlur > 0 ? 'is-blurred' : '')}
                                style={{
                                    filter: `blur(${attributes.heroImageBlur}px)`,
                                    objectPosition: `${attributes.heroImageAlignment}`,
                                    opacity: attributes.heroImageOpacity,
                                }}
                                src={getImage(attributes.heroImage, 'x_large')}
                                alt={getImage(attributes.heroImage, 'alt')}
                                width={getImage(attributes.heroImage, 'width')}
                                height={getImage(attributes.heroImage, 'height')}
                            />
                        }
                        {attributes.heroBackgroundHasOverlay &&
                            <div className="hero-block__overlay"
                                 style={{
                                     // backgroundImage: getOverlayColor(attributes.heroBackgroundOverlayColor)
                                     backgroundImage: adjustOverlayPosition(attributes.heroBackgroundOverlayGradient, attributes.heroBackgroundOverlayGradientPosition)
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
                                        text={attributes.heroImage ? __('Change Image', 'sage') : __('Upload Image', 'sage')}
                                    />
                                    {attributes.heroImage &&
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
                    getColorObject(attributes.heroBackgroundColor) && `has-${getColorObject(attributes.heroBackgroundColor).slug}-background-color`,
                    attributes.heroFullHeight && 'full-height'
                )}
                style={{
                    clipPath: attributes.heroClipPath !== 'none' ? `url(#clip-path-${attributes.clientId})` : 'none',
                    '--hero-height-desktop': `${attributes.heroHeight}px`,
                    '--hero-height-mobile': `${attributes.heroMobileHeight}px`,
                    '--hero-min-max-height': `${attributes.heroHeight - attributes.heroMobileHeight}`,
                }}
            >

                {clipPaths[attributes.heroClipPath] &&
                    clipPaths[attributes.heroClipPath](`clip-path-${attributes.clientId}`)
                }

                {attributes.heroImage &&
                    <img className={classNames('hero-block__image', attributes.heroImageBlur > 0 ? 'is-blurred' : '')}
                         style={{
                             filter: `blur(${attributes.heroImageBlur}px)`,
                             objectPosition: `${attributes.heroImageAlignment}`,
                             opacity: attributes.heroImageOpacity,
                         }}
                         srcSet={`${getImage(attributes.heroImage, 'tiny')} 480w, ${getImage(attributes.heroImage, 'small')} 768w, ${getImage(attributes.heroImage, 'medium')} 1024w, ${getImage(attributes.heroImage, 'x_large')} 1360w`}
                         sizes="100w"
                         src={getImage(attributes.heroImage, 'medium')}
                         alt={getImage(attributes.heroImage, 'alt')}
                    />
                }
                {attributes.heroBackgroundHasOverlay &&
                    <div className="hero-block__overlay"
                         style={{
                             // backgroundImage: getOverlayColor(attributes.heroBackgroundOverlayColor),
                             backgroundImage: adjustOverlayPosition(attributes.heroBackgroundOverlayGradient, attributes.heroBackgroundOverlayGradientPosition)
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

