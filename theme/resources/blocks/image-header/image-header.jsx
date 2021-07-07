import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {createElement} from '@wordpress/element';
import {RangeControl, Button, ToggleControl, SelectControl, PanelBody, ColorPalette, Icon, Tooltip} from '@wordpress/components';
import {MediaUpload, InspectorControls, InnerBlocks, getColorObjectByColorValue} from '@wordpress/block-editor';
import classNames from 'classnames';
import {editorThemeColors, getImage} from "../utility";
import * as clipPaths from "../clip-path-svgs"

console.log(clipPaths['defaultClip']);

const blockIcon = createElement('svg', {width: 20, height: 20},
    createElement('path', {
        d: 'M19.1666667,12 L19.1666667,2 C19.1666667,1.07916667 18.4208333,0.333333333 17.5,0.333333333 L2.5,0.333333333 C1.57916667,0.333333333 0.833333333,1.07916667 0.833333333,2 L0.833333333,12 C0.833333333,12.9208333 1.57916667,13.6666667 2.5,13.6666667 L17.5,13.6666667 C18.4208333,13.6666667 19.1666667,12.9208333 19.1666667,12 Z M7.08333333,7.41666667 L9.16666667,9.92083333 L12.0833333,6.16666667 L15.8333333,11.1666667 L4.16666667,11.1666667 L7.08333333,7.41666667 Z'
    })
);

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
    // headerClipPathBottom: {
    //     type: 'number',
    //     default: 0,
    // },
    headerBackgroundColor: {
        type: 'string',
        default: ''
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
    headerImageHasOverlay: {
        type: 'boolean',
        default: false,
    },
    headerImageOverlayColor: {
        type: 'string',
        default: 'light'
    },
    headerImagePositionHorizontal: {
        type: 'string',
        default: 'center',
    },
    headerImagePositionVertical: {
        type: 'string',
        default: 'center',
    },

    /**
     * Logo Properties
     */
    headerLogo: {
        type: 'object',
    },
    headerLogoSize: {
        type: 'number',
        default: 100,
    },
    headerLogoSmallerOnMobile: {
        type: 'boolean',
        default: false,
    },
    headerLogoPosition: { // Left or Right
        type: 'boolean',
        default: false,
    },
    headerLogoPositionX: {
        type: 'number',
        default: 0,
    },
    headerLogoPositionY: {
        type: 'number',
        default: 0,
    },

    /**
     * Text Properties
     */
    textPositionX: {
        type: 'number',
        default: 0,
    },
    textPositionY: {
        type: 'number',
        default: 0,
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

const ALLOWED_BLOCKS = [
    'core/paragraph',
    'core/heading',
    'core/list',
    'core/shortcode',
    'core/spacer',
    'custom/button',
    'custom/icon-text',
    'custom/row',
    'custom/divider',
    'custom/image'
];

registerBlockType('custom/image-header', {
    title: __('Image Header', 'sage'),
    icon: blockIcon,
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

        // const onChangeHeaderClipPathBottom = (value) => {
        //     setAttributes({headerClipPathBottom: value});
        // };

        const onChangeHeaderBackgroundColor = (value) => {
            setAttributes({headerBackgroundColor: value});
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

        const onChangeHeaderImageHasOverlay = (value) => {
            setAttributes({headerImageHasOverlay: value});
        };

        const onChangeHeaderImageOverlayColor = (value) => {
            setAttributes({headerImageOverlayColor: value});
        };

        const onChangeHeaderImagePositionHorizontal = (value) => {
            setAttributes({headerImagePositionHorizontal: value});
        };

        const onChangeHeaderImagePositionVertical = (value) => {
            setAttributes({headerImagePositionVertical: value});
        };

        /**
         * Logo Properties
         */

        const onSelectHeaderLogo = (imageObject) => {
            setAttributes({headerLogo: imageObject});
        };

        const onChangeHeaderLogoSize = (value) => {
            setAttributes({headerLogoSize: value});
        };

        const onChangeHeaderLogoSmallerOnMobile = (value) => {
            setAttributes({headerLogoSmallerOnMobile: value});
        };

        const onChangeHeaderLogoPosition = (value) => {
            setAttributes({headerLogoPosition: value});
        };

        const onChangeHeaderLogoPositionX = (value) => {
            setAttributes({headerLogoPositionX: value});
        };

        const onChangeHeaderLogoPositionY = (value) => {
            setAttributes({headerLogoPositionY: value});
        };

        /**
         * Text Properties
         */

        const onChangeTextPositionX = (value) => {
            setAttributes({textPositionX: value});
        };

        const onChangeTextPositionY = (value) => {
            setAttributes({textPositionY: value});
        };

        const TEMPLATE = [
            ['core/heading', {placeholder: 'The Title...'}],
            ['core/heading', {placeholder: 'This is the Subtitle...'}],
        ];

        // const getClipPath = () => {
        //     let topLeft = attributes.headerClipPathTop < 0 ? 0 - attributes.headerClipPathTop : 0;
        //     let topRight = attributes.headerClipPathTop > 0 ? 0 + attributes.headerClipPathTop : 0;
        //     let bottomLeft = attributes.headerClipPathBottom < 0 ? 100 + attributes.headerClipPathBottom : 100;
        //     let bottomRight = attributes.headerClipPathBottom > 0 ? 100 - attributes.headerClipPathBottom : 100;
        //     return `polygon(0 ${topLeft}%,100% ${topRight}%,100% ${bottomLeft}%,0 ${bottomRight}%)`
        // }

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
                                    min={300}
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
                                        {label: __('Default Clip', 'sage'), value: 'defaultClip'},
                                        {label: __('House', 'sage'), value: 'house'},
                                    ]}
                                    onChange={onChangeHeaderClipPath}
                                />
                                {/*<hr/>
                                <p>{__('Adjust Header Clip Path (Top)', 'sage')}</p>
                                <RangeControl
                                    value={attributes.headerClipPathTop}
                                    min={-15}
                                    max={+15}
                                    step={1}
                                    onChange={onChangeHeaderClipPathTop}
                                />
                                <hr/>
                                <p>{__('Adjust Header Clip Path (Bottom)', 'sage')}</p>
                                <RangeControl
                                    value={attributes.headerClipPathBottom}
                                    min={-15}
                                    max={+15}
                                    step={1}
                                    onChange={onChangeHeaderClipPathBottom}
                                />*/}
                            </>
                        }
                        <hr/>
                        <p>{__('Header Background Color', 'sage')}</p>
                        <ColorPalette
                            colors={[...editorThemeColors]}
                            value={attributes.headerBackgroundColor}
                            onChange={onChangeHeaderBackgroundColor}
                        />
                    </PanelBody>
                    <PanelBody title={__('Image Properties', 'sage')} initialOpen={false}>
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
                        <ToggleControl
                            label={__('Image Overlay', 'sage')}
                            checked={attributes.headerImageHasOverlay}
                            onChange={onChangeHeaderImageHasOverlay}
                        />
                        {attributes.headerImageHasOverlay &&
                            <>
                                <SelectControl
                                    label={__('Select Overlay Color', 'sage')}
                                    value={attributes.headerImageOverlayColor}
                                    options={[
                                        {label: __('Dark', 'sage'), value: 'dark'},
                                        {label: __('Light', 'sage'), value: 'light'},
                                    ]}
                                    onChange={onChangeHeaderImageOverlayColor}
                                />
                            </>
                        }
                        <hr/>
                        <p>{__('Select Image Position', 'sage')}</p>
                        <SelectControl
                            label={__('Horizontal', 'sage')}
                            value={attributes.headerImagePositionHorizontal}
                            options={[
                                {label: __('Left', 'sage'), value: 'left'},
                                {label: __('Center', 'sage'), value: 'center'},
                                {label: __('Right', 'sage'), value: 'right'},
                            ]}
                            onChange={onChangeHeaderImagePositionHorizontal}
                        />
                        <SelectControl
                            label={__('Vertical', 'sage')}
                            value={attributes.headerImagePositionVertical}
                            options={[
                                {label: __('Top', 'sage'), value: 'top'},
                                {label: __('Center', 'sage'), value: 'center'},
                                {label: __('Bottom', 'sage'), value: 'bottom'},
                            ]}
                            onChange={onChangeHeaderImagePositionVertical}
                        />
                    </PanelBody>
                    {attributes.headerLogo &&
                        <PanelBody title={__('Logo Properties', 'sage')} initialOpen={false}>
                            <hr/>
                            <p>{__('Adjust Logo Size', 'sage')}</p>
                            <RangeControl
                                value={attributes.headerLogoSize}
                                min={50}
                                max={260}
                                step={1}
                                onChange={onChangeHeaderLogoSize}
                            />
                            <hr/>
                            <ToggleControl
                                label={__('Smaller Logo on Mobile', 'sage')}
                                // help={ attributes.switchContent ? 'Image is left' : 'Image is right' }
                                checked={attributes.headerLogoSmallerOnMobile}
                                onChange={onChangeHeaderLogoSmallerOnMobile}
                            />
                            <hr/>
                            <ToggleControl
                                label={__('Adjust Logo Position', 'sage')}
                                help={attributes.headerLogoPosition ? __('Logo sits right', 'sage') : __('Logo sits left', 'sage')}
                                checked={attributes.headerLogoPosition}
                                onChange={onChangeHeaderLogoPosition}
                            />
                            <hr/>
                            <p>{__('Header Logo Position X', 'sage')}</p>
                            <RangeControl
                                value={attributes.headerLogoPositionX}
                                min={-200}
                                max={200}
                                step={1}
                                onChange={onChangeHeaderLogoPositionX}
                            />
                            <hr/>
                            <p>{__('Header Logo Position Y', 'sage')}</p>
                            <RangeControl
                                value={attributes.headerLogoPositionY}
                                min={-200}
                                max={200}
                                step={1}
                                onChange={onChangeHeaderLogoPositionY}
                            />
                        </PanelBody>
                    }
                    <PanelBody title={__('Text Properties', 'sage')} initialOpen={false}>
                        <hr/>
                        <p>{__('Text Position X', 'sage')}</p>
                        <RangeControl
                            value={attributes.textPositionX}
                            min={-100}
                            max={100}
                            step={1}
                            onChange={onChangeTextPositionX}
                        />
                        <hr/>
                        <p>{__('Text Position Y', 'sage')}</p>
                        <RangeControl
                            value={attributes.textPositionY}
                            min={-100}
                            max={100}
                            step={1}
                            onChange={onChangeTextPositionY}
                        />
                    </PanelBody>
                </InspectorControls>
                <div
                    className={classNames(className, 'image-header-block', headerBackgroundColor && `has-${headerBackgroundColor.slug}-background-color`)}
                    style={{
                        maxHeight: attributes.headerFullHeight ? `initial` : `${attributes.headerHeight}px`,
                        minHeight: attributes.headerFullHeight ? `initial` : `${attributes.headerMobileHeight}px`,
                        height: attributes.headerFullHeight ? `100vh` : `${attributes.headerMobileHeight / attributes.headerHeight * 100}vw`,
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
                                objectPosition: `${attributes.headerImagePositionHorizontal} ${attributes.headerImagePositionVertical}`,
                                opacity: attributes.headerImageOpacity,
                            }}
                            src={getImage(attributes.headerImage, 'xlarge')}
                            alt={getImage(attributes.headerImage, 'alt')}
                            width={getImage(attributes.headerImage, 'width')}
                            height={getImage(attributes.headerImage, 'height')}
                        />
                    }
                    {attributes.headerImageHasOverlay &&
                        <div className="image-header-block__overlay"
                             style={{
                                 backgroundImage: getOverlayColor(attributes.headerImageOverlayColor)
                             }}
                        />
                    }
                    <div className="container image-header-block__container">
                        <div className="image-header-block__text-wrapper"
                             style={{
                                 left: `${attributes.textPositionX}px`,
                                 top: `${attributes.textPositionY}px`
                             }}
                        >
                            {attributes.headerLogo &&
                                <img
                                    className={classNames('image-header-block__logo', attributes.headerLogoSmallerOnMobile && 'smaller-on-mobile')}
                                    src={getImage(attributes.headerLogo, 'xlarge')}
                                    alt={getImage(attributes.headerLogo, 'alt')}
                                    style={{
                                        width: `${attributes.headerLogoSize}px`,
                                        height: `${attributes.headerLogoSize}px`,
                                        left: !attributes.headerLogoPosition ? `${attributes.headerLogoPositionX - attributes.headerLogoSize}px` : 'initial',
                                        right: attributes.headerLogoPosition ? `${attributes.headerLogoPositionX - attributes.headerLogoSize}px` : 'initial',
                                        top: `${attributes.headerLogoPositionY}px`,
                                    }}
                                />
                            }
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
                                    icon={'trash'}
                                    style={{
                                        position: `absolute`,
                                        right: `20px`,
                                        bottom: `20px`
                                    }}
                            />
                        </>
                    )}
                />
                <MediaUpload
                    onSelect={onSelectHeaderLogo}
                    allowedTypes={[
                        'image/svg+xml',
                    ]}
                    // value={attributes.mediaID}
                    render={({open}) => (
                        <Button className={'button'}
                                onClick={open}
                                icon={'admin-customizer'}
                                style={{
                                    position: `absolute`,
                                    right: `20px`,
                                    top: `20px`
                                }}
                                text={!attributes.headerLogo ? __('Upload Logo', 'sage') : __('Change Logo', 'sage')}
                        />
                    )}
                />
            </>
        );
    },
    save: ({className, attributes}) => {

        // const getClipPath = () => {
        //     let topLeft = attributes.headerClipPathTop < 0 ? 0 - attributes.headerClipPathTop : 0;
        //     let topRight = attributes.headerClipPathTop > 0 ? 0 + attributes.headerClipPathTop : 0;
        //     let bottomLeft = attributes.headerClipPathBottom < 0 ? 100 + attributes.headerClipPathBottom : 100;
        //     let bottomRight = attributes.headerClipPathBottom > 0 ? 100 - attributes.headerClipPathBottom : 100;
        //     return `polygon(0 ${topLeft}%,100% ${topRight}%,100% ${bottomLeft}%,0 ${bottomRight}%)`
        // }

        const headerBackgroundColor = getColorObjectByColorValue(editorThemeColors, attributes.headerBackgroundColor);

        return (
            <div
                className={classNames(className, 'image-header-block', headerBackgroundColor && `has-${headerBackgroundColor.slug}-background-color`)}
                style={{
                    maxHeight: attributes.headerFullHeight ? `initial` : `${attributes.headerHeight}px`,
                    minHeight: attributes.headerFullHeight ? `initial` : `${attributes.headerMobileHeight}px`,
                    height: attributes.headerFullHeight ? `100vh` : `${attributes.headerMobileHeight / attributes.headerHeight * 100}vw`,
                    clipPath: attributes.headerClipPath !== 'none' ? 'url(#clipPolygon)' : 'none'
                    // clipPath: attributes.headerFullHeight ? 'initial' : getClipPath(),
                }}
            >
                {attributes.headerClipPath !== 'none' && clipPaths[attributes.headerClipPath]}
                {!attributes.headerImageRemove &&
                    <img className={classNames('image-header-block__image', attributes.headerImageBlur > 0 ? 'is-blurred' : '')}
                         style={{
                             filter: `blur(${attributes.headerImageBlur}px)`,
                             objectPosition: `${attributes.headerImagePositionHorizontal} ${attributes.headerImagePositionVertical}`,
                             opacity: attributes.headerImageOpacity,
                         }}
                         srcSet={`${getImage(attributes.headerImage, 'tiny')} 480w, ${getImage(attributes.headerImage, 'small')} 768w, ${getImage(attributes.headerImage, 'medium')} 1024w, ${getImage(attributes.headerImage, 'xlarge')} 1360w`}
                         sizes="100w"
                         src={getImage(attributes.headerImage, 'medium')}
                         alt={getImage(attributes.headerImage, 'alt')}
                    />
                }
                {attributes.headerImageHasOverlay &&
                    <div className="image-header-block__overlay"
                         style={{
                             backgroundImage: getOverlayColor(attributes.headerImageOverlayColor)
                         }}
                    />
                }
                <div className="container image-header-block__container">
                    <div className="image-header-block__text-wrapper"
                         style={{
                             left: `${attributes.textPositionX}px`,
                             top: `${attributes.textPositionY}px`
                         }}
                    >
                        {attributes.headerLogo &&
                            <img
                                className={classNames('image-header-block__logo', attributes.headerLogoSmallerOnMobile && 'smaller-on-mobile')}
                                src={getImage(attributes.headerLogo, 'xlarge')}
                                alt={getImage(attributes.headerLogo, 'alt')}
                                style={{
                                    width: `${attributes.headerLogoSize}px`,
                                    height: `${attributes.headerLogoSize}px`,
                                    left: !attributes.headerLogoPosition ? `${attributes.headerLogoPositionX - attributes.headerLogoSize}px` : 'initial',
                                    right: attributes.headerLogoPosition ? `${attributes.headerLogoPositionX - attributes.headerLogoSize}px` : 'initial',
                                    top: `${attributes.headerLogoPositionY}px`,
                                }}
                            />
                        }
                        <InnerBlocks.Content/>
                    </div>
                </div>
            </div>
        );
    },
});

