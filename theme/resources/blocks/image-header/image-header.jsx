import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {createElement} from '@wordpress/element';
import {RangeControl, Button, ToggleControl, SelectControl, PanelBody, ColorPalette, FocalPointPicker} from '@wordpress/components';
import {__experimentalAlignmentMatrixControl as AlignmentMatrixControl} from '@wordpress/components';
import {MediaUpload, InspectorControls, InnerBlocks, getColorObjectByColorValue} from '@wordpress/block-editor';
import classNames from 'classnames';
import {editorThemeColors, getImage, focalPositionInPixel} from "../utility";
import * as clipPaths from "../clip-path-svgs"
import {imageHeaderIcon} from "../icons";

const attributes = {
    /**
     * Default Attributes
     * @link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/#align
     */
    align: {
        type: 'string',
        default: 'full'
    },
    /**
     * Header Properties
     */
    headerFullHeight: {
        type: 'boolean',
        default: false,
    },
    headerHeight: {
        type: 'number',
        default: 500,
    },
    headerMobileHeight: {
        type: 'number',
        default: 300,
    },
    headerClipPath: {
        type: 'string',
        default: 'none',
    },
    headerBackgroundColor: {
        type: 'string',
        default: ''
    },
    headerBackgroundHasOverlay: {
        type: 'boolean',
        default: false,
    },
    headerBackgroundOverlayColor: {
        type: 'string',
        default: 'light'
    },

    /**
     * Image Properties
     */
    headerImage: {
        type: 'object',
        default: ''
    },
    headerImageRemove: {
        type: 'boolean',
        default: false
    },
    headerImageBlur: {
        type: 'number',
        default: 0,
    },
    headerImageOpacity: {
        type: 'number',
        default: 1,
    },
    headerImageAlignment: {
        type: 'string',
        default: 'center center'
    },

    /**
     * Text Properties
     */
    textPosition: {
        type: 'object',
        default: {x: 0.5, y: 0.5}
    },
}

const getOverlayColor = (overlayColor) => {
    switch (overlayColor) {
        case 'light':
            return `radial-gradient(at center top, rgba(255, 255, 255, 0.8) 20%, rgba(255, 255, 255, 0) 80%)`
        case 'dark':
            return `radial-gradient(at center top, rgba(0, 0, 0, 0.5) 20%, rgba(0, 0, 0, 0) 80%)`
        default:
            return `radial-gradient(at center top, rgba(255, 255, 255, 0.5) 20%, rgba(255, 255, 255, 0) 80%)`
    }
}

// For not firing update to often
let onChangeTextPositionTimeout = true;

const ALLOWED_BLOCKS = [
    'core/paragraph',
    'core/heading',
    'core/list',
    'core/shortcode',
    'core/spacer',
    'core/group',
    'custom/button',
    'custom/icon-text',
    'custom/row',
    'custom/divider',
    'custom/image'
];

registerBlockType('custom/image-header', {
    title: __('Image Header', 'sage'),
    icon: imageHeaderIcon,
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
    edit: ({className, attributes, setAttributes}) => {

        /**
         * Header Properties
         */

        const onChangeFullHeight = (value) => {
            setAttributes({headerFullHeight: value});
        };

        const onChangeHeaderHeight = (value) => {
            setAttributes({headerHeight: value});
        };

        const onChangeHeaderMobileHeight = (value) => {
            setAttributes({headerMobileHeight: value});
        };

        const onChangeHeaderClipPath = (value) => {
            setAttributes({headerClipPath: value});
        };

        const onChangeHeaderBackgroundColor = (value) => {
            setAttributes({headerBackgroundColor: value});
        };

        const onChangeHeaderBackgroundHasOverlay = (value) => {
            setAttributes({headerBackgroundHasOverlay: value});
        };

        const onChangeHeaderBackgroundOverlayColor = (value) => {
            setAttributes({headerBackgroundOverlayColor: value});
        };

        /**
         * Image Properties
         */

        const onSelectHeaderImage = (imageObject) => {
            setAttributes({headerImage: imageObject});
        };

        const headerImageRemove = () => {
            setAttributes({headerImageRemove: !attributes.headerImageRemove});
        };

        const onChangeHeaderImageBlur = (value) => {
            setAttributes({headerImageBlur: value});
        };

        const onChangeHeaderImageOpacity = (value) => {
            setAttributes({headerImageOpacity: value});
        };

        const onChangeHeaderImageAlignment = (value) => {
            setAttributes({headerImageAlignment: value});
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
            setAttributes({imagePosition: {x: 0.5, y: 0.5}});
        };

        const TEMPLATE = [
            ['core/heading', {placeholder: 'The Title...'}],
            ['core/heading', {placeholder: 'This is the Subtitle...'}],
        ];

        const headerBackgroundColor = getColorObjectByColorValue(editorThemeColors, attributes.headerBackgroundColor);

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Header Properties', 'sage')} initialOpen={false}>
                        <hr/>
                        <ToggleControl
                            label={__('Full Height header', 'sage')}
                            // help={ attributes.switchContent ? 'Image is left' : 'Image is right' }
                            checked={attributes.headerFullHeight}
                            onChange={onChangeFullHeight}
                        />
                        {!attributes.headerFullHeight &&
                            <>
                                <hr/>
                                <p>{__('Header Height', 'sage')}</p>
                                <RangeControl
                                    value={attributes.headerHeight}
                                    min={attributes.headerMobileHeight}
                                    max={800}
                                    step={10}
                                    onChange={onChangeHeaderHeight}
                                />
                                <hr/>
                                <p>{__('Mobile Header Height', 'sage')}</p>
                                <RangeControl
                                    value={attributes.headerMobileHeight}
                                    min={200}
                                    max={500}
                                    step={10}
                                    onChange={onChangeHeaderMobileHeight}
                                />
                                <hr/>
                                <SelectControl
                                    label={__('Header Clip Path', 'sage')}
                                    value={attributes.headerClipPath}
                                    options={[
                                        {label: __('None', 'sage'), value: 'none'},
                                        {label: __('Slope', 'sage'), value: 'slope'},
                                        {label: __('Curves', 'sage'), value: 'curves'},
                                        {label: __('Curves 02', 'sage'), value: 'curves_02'},
                                    ]}
                                    onChange={onChangeHeaderClipPath}
                                />
                            </>
                        }
                        <hr/>
                        <p>{__('Header Background Color', 'sage')}</p>
                        <ColorPalette
                            colors={[...editorThemeColors]}
                            value={attributes.headerBackgroundColor}
                            onChange={onChangeHeaderBackgroundColor}
                        />
                        <hr/>
                        <ToggleControl
                            label={__('Background Overlay', 'sage')}
                            checked={attributes.headerBackgroundHasOverlay}
                            onChange={onChangeHeaderBackgroundHasOverlay}
                        />
                        {attributes.headerBackgroundHasOverlay &&
                        <>
                            <SelectControl
                                label={__('Select Overlay Color', 'sage')}
                                value={attributes.headerBackgroundOverlayColor}
                                options={[
                                    {label: __('Dark', 'sage'), value: 'dark'},
                                    {label: __('Light', 'sage'), value: 'light'},
                                ]}
                                onChange={onChangeHeaderBackgroundOverlayColor}
                            />
                        </>
                        }
                    </PanelBody>
                    {!attributes.headerImageRemove &&
                        <PanelBody title={__('Background Image Properties', 'sage')} initialOpen={false}>
                            <hr/>
                            <p>{__('Image Blur', 'sage')}</p>
                            <RangeControl
                                value={attributes.headerImageBlur}
                                min={0}
                                max={10}
                                onChange={onChangeHeaderImageBlur}
                            />
                            <hr/>
                            <p>{__('Image Opacity', 'sage')}</p>
                            <RangeControl
                                value={attributes.headerImageOpacity}
                                min={0}
                                max={1}
                                step={0.05}
                                onChange={onChangeHeaderImageOpacity}
                            />
                            <hr/>
                            <p>{__('Background Image Alignment', 'sage')}</p>
                            <AlignmentMatrixControl
                                value={attributes.headerImageAlignment}
                                onChange={onChangeHeaderImageAlignment}
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
                <div
                    className={classNames(className, 'image-header-block', headerBackgroundColor && `has-${headerBackgroundColor.slug}-background-color`)}
                    style={{
                        maxHeight: attributes.headerFullHeight ? `initial` : `${attributes.headerHeight}px`,
                        minHeight: attributes.headerFullHeight ? `initial` : `${attributes.headerMobileHeight}px`,
                        height: attributes.headerFullHeight ? `100vh` : '60vw',
                        clipPath: attributes.headerClipPath !== 'none' ? 'url(#clipPolygon)' : 'none'
                        // clipPath: attributes.headerFullHeight ? 'initial' : getClipPath(),
                    }}
                >
                    {attributes.headerClipPath !== 'none' && clipPaths[attributes.headerClipPath]}
                    {!attributes.headerImageRemove &&
                        <img
                            className={classNames('image-header-block__image', attributes.headerImageBlur > 0 ? 'is-blurred' : '')}
                            style={{
                                filter: `blur(${attributes.headerImageBlur}px)`,
                                objectPosition: `${attributes.headerImageAlignment}`,
                                opacity: attributes.headerImageOpacity,
                            }}
                            src={getImage(attributes.headerImage, 'x_large')}
                            alt={getImage(attributes.headerImage, 'alt')}
                            width={getImage(attributes.headerImage, 'width')}
                            height={getImage(attributes.headerImage, 'height')}
                        />
                    }
                    {attributes.headerBackgroundHasOverlay &&
                        <div className="image-header-block__overlay"
                             style={{
                                 backgroundImage: getOverlayColor(attributes.headerBackgroundOverlayColor)
                             }}
                        />
                    }
                    <div className="container image-header-block__container">
                        <div className="image-header-block__text-wrapper"
                             style={{
                                 transform: `translate(${focalPositionInPixel(attributes.textPosition.x)}, ${focalPositionInPixel(attributes.textPosition.y)})`,
                             }}
                        >
                            <InnerBlocks template={TEMPLATE} allowedBlocks={ALLOWED_BLOCKS}/>
                        </div>
                    </div>
                </div>
                <MediaUpload
                    onSelect={onSelectHeaderImage}
                    allowedTypes={[
                        'image/jpeg',
                        'image/jpg',
                        'image/png',
                        'image/gif'
                    ]}
                    // value={attributes.mediaID}
                    render={({open}) => (
                        <>
                            <Button className={'button'}
                                    onClick={open}
                                    icon={'format-image'}
                                    style={{
                                        position: `absolute`,
                                        right: `70px`,
                                        bottom: `20px`
                                    }}
                                    text={__('Change Image', 'sage')}
                            />
                            <Button className={'button'}
                                    onClick={headerImageRemove}
                                    icon={!attributes.headerImageRemove ? 'visibility' : 'hidden'}
                                    style={{
                                        position: `absolute`,
                                        right: `20px`,
                                        bottom: `20px`
                                    }}
                            />
                        </>
                    )}
                />
            </>
        );
    },
    save: ({className, attributes}) => {

        const headerBackgroundColor = getColorObjectByColorValue(editorThemeColors, attributes.headerBackgroundColor);

        return (
            <div
                className={classNames(className, 'image-header-block', headerBackgroundColor && `has-${headerBackgroundColor.slug}-background-color`)}
                style={{
                    maxHeight: attributes.headerFullHeight ? `initial` : `${attributes.headerHeight}px`,
                    minHeight: attributes.headerFullHeight ? `initial` : `${attributes.headerMobileHeight}px`,
                    height: attributes.headerFullHeight ? `100vh` : '60vw',
                    clipPath: attributes.headerClipPath !== 'none' ? 'url(#clipPolygon)' : 'none'
                    // clipPath: attributes.headerFullHeight ? 'initial' : getClipPath(),
                }}
            >
                {attributes.headerClipPath !== 'none' && clipPaths[attributes.headerClipPath]}
                {!attributes.headerImageRemove &&
                    <img className={classNames('image-header-block__image', attributes.headerImageBlur > 0 ? 'is-blurred' : '')}
                         style={{
                             filter: `blur(${attributes.headerImageBlur}px)`,
                             objectPosition: `${attributes.headerImageAlignment}`,
                             opacity: attributes.headerImageOpacity,
                         }}
                         srcSet={`${getImage(attributes.headerImage, 'tiny')} 480w, ${getImage(attributes.headerImage, 'small')} 768w, ${getImage(attributes.headerImage, 'medium')} 1024w, ${getImage(attributes.headerImage, 'x_large')} 1360w`}
                         sizes="100w"
                         src={getImage(attributes.headerImage, 'medium')}
                         alt={getImage(attributes.headerImage, 'alt')}
                    />
                }
                {attributes.headerBackgroundHasOverlay &&
                    <div className="image-header-block__overlay"
                         style={{
                             backgroundImage: getOverlayColor(attributes.headerBackgroundOverlayColor)
                         }}
                    />
                }
                <div className="container image-header-block__container">
                    <div className="image-header-block__text-wrapper"
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

