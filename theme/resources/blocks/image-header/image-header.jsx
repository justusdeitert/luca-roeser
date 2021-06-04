import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {createElement} from '@wordpress/element';
import {RangeControl, Button, ToggleControl} from '@wordpress/components';

import {
    RichText,
    MediaUpload,
    InspectorControls,
    InnerBlocks
} from '@wordpress/block-editor';

import classNames from 'classnames';
import {getImage} from "../utility";

const blockIcon = createElement('svg', {width: 20, height: 20},
    createElement('path', {
        d: 'M19.1666667,12 L19.1666667,2 C19.1666667,1.07916667 18.4208333,0.333333333 17.5,0.333333333 L2.5,0.333333333 C1.57916667,0.333333333 0.833333333,1.07916667 0.833333333,2 L0.833333333,12 C0.833333333,12.9208333 1.57916667,13.6666667 2.5,13.6666667 L17.5,13.6666667 C18.4208333,13.6666667 19.1666667,12.9208333 19.1666667,12 Z M7.08333333,7.41666667 L9.16666667,9.92083333 L12.0833333,6.16666667 L15.8333333,11.1666667 L4.16666667,11.1666667 L7.08333333,7.41666667 Z'
    })
);

const attributes = {
    headerImage: {
        type: 'object',
    },
    icon: {
        type: 'object',
    },
    title: {
        type: 'string',
        default: ''
    },
    subTitle: {
        type: 'string',
        default: ''
    },
    blur: {
        type: 'number',
        default: 0,
    },
    headerHeight: {
        type: 'number',
        default: 450,
    },
    fullHeight: {
        type: 'boolean',
        default: false,
    },
    headerClipPathTop: {
        type: 'number',
        default: 0,
    },
    headerClipPathBottom: {
        type: 'number',
        default: 0,
    },
    hasOverlay: {
        type: 'boolean',
        default: false,
    },
}

registerBlockType('custom/image-header', {
    title: __('Image Header', 'sage'),
    icon: blockIcon,
    category: 'custom',
    supports: {
        // align: true,
        align: ['full', 'wide'],
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

        const onSelectImage = (imageObject) => {
            setAttributes({headerImage: imageObject});
        };

        const onChangeBlur = (value) => {
            setAttributes({blur: value});
        };

        const onChangeHeaderHeight = (value) => {
            setAttributes({headerHeight: value});
        };

        const onChangeHeaderClipPathTop = (value) => {
            setAttributes({headerClipPathTop: value});
        };

        const onChangeHeaderClipPathBottom = (value) => {
            setAttributes({headerClipPathBottom: value});
        };

        const onChangeFullHeight = (value) => {
            setAttributes({fullHeight: value});
        };

        const onChangeHasOverlay = (value) => {
            setAttributes({hasOverlay: value});
        };

        const TEMPLATE = [
            ['core/heading', {placeholder: 'The Title...'}],
            ['core/heading', {placeholder: 'This is the Subtitle...'}],
        ];

        const getClipPath = () => {

            let topLeft = attributes.headerClipPathTop < 0 ? 0 - attributes.headerClipPathTop : 0;
            let topRight = attributes.headerClipPathTop > 0 ? 0 + attributes.headerClipPathTop : 0;

            let bottomLeft = attributes.headerClipPathBottom < 0 ? 100 + attributes.headerClipPathBottom : 100;
            let bottomRight = attributes.headerClipPathBottom > 0 ? 100 - attributes.headerClipPathBottom: 100;

            return `polygon(0 ${topLeft}%,100% ${topRight}%,100% ${bottomLeft}%,0 ${bottomRight}%)`
        }

        return (
            <div className={classNames(className, 'image-header-block')}
                 style={{
                     height: attributes.fullHeight ? `100vh` : `${attributes.headerHeight}px`,
                     // fontSize: `${attributes.headerFontSize}px`
                 }}
            >
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <hr />
                        <p>{__('Adjust Image Blur', 'sage')}</p>
                        <RangeControl
                            value={attributes.blur}
                            min={0}
                            max={16}
                            onChange={onChangeBlur}
                        />
                        <hr />
                        <ToggleControl
                            label={__('Full Height header', 'sage')}
                            // help={ attributes.switchContent ? 'Image is left' : 'Image is right' }
                            checked={attributes.fullHeight}
                            onChange={onChangeFullHeight}
                        />
                        {!attributes.fullHeight &&
                            <>
                                <hr />
                                <p>{__('Adjust Header Height', 'sage')}</p>
                                <RangeControl
                                    value={attributes.headerHeight}
                                    min={280}
                                    max={680}
                                    step={10}
                                    onChange={onChangeHeaderHeight}
                                />
                                <hr />
                                <p>{__('Adjust Header Clip Path (Top)', 'sage')}</p>
                                <RangeControl
                                    value={attributes.headerClipPathTop}
                                    min={-15}
                                    max={+15}
                                    step={1}
                                    onChange={onChangeHeaderClipPathTop}
                                />
                                <hr />
                                <p>{__('Adjust Header Clip Path (Bottom)', 'sage')}</p>
                                <RangeControl
                                    value={attributes.headerClipPathBottom}
                                    min={-15}
                                    max={+15}
                                    step={1}
                                    onChange={onChangeHeaderClipPathBottom}
                                />
                            </>
                        }
                        <hr />
                        <ToggleControl
                            label={__('Image Overlay', 'sage')}
                            checked={attributes.hasOverlay}
                            onChange={onChangeHasOverlay}
                        />
                        {attributes.hasOverlay &&
                           <>
                               <hr />
                               <ToggleControl
                                   label={__('Image Overlay', 'sage')}
                                   checked={attributes.overlayColor}
                                   onChange={onChangeHasOverlay}
                               />
                               <ColorPalette
                                   colors={editorColors}
                                   value={attributes.overlayColor}
                                   disableCustomColors={true}
                                   onChange={onChangeTileBackgroundColor}
                                   clearable={false}
                               />
                           </>
                        }
                    </div>
                </InspectorControls>
                <img className={classNames('image-header-block__image', attributes.blur > 0 ? 'is-blurred' : '')}
                     style={{
                         filter: `blur(${attributes.blur}px)`,
                         clipPath: attributes.fullHeight ? 'initial' : getClipPath()
                     }}
                     src={getImage(attributes.headerImage, 'medium')}
                     alt={getImage(attributes.headerImage, 'alt')}
                     width={getImage(attributes.headerImage, 'width')}
                     height={getImage(attributes.headerImage, 'height')}
                />
                {attributes.hasOverlay &&
                    <div className="image-header-block__overlay"/>
                }
                <div className="container image-header-block__container">
                    <div className="image-header-block__text-wrapper">
                        <InnerBlocks templateLock='all' template={TEMPLATE} allowedBlocks={['custom/column']}/>
                    </div>
                </div>
                <MediaUpload
                    onSelect={onSelectImage}
                    allowedTypes={[
                        'image/jpeg',
                        'image/jpg',
                        'image/png',
                        'image/gif'
                    ]}
                    // value={attributes.mediaID}
                    render={({open}) => (
                        <Button variant="primary" className={'button button--image-upload'} onClick={open}>
                            {!attributes.headerImage ? __('Upload Image', 'sage') : __('Change Image', 'sage')}
                        </Button>
                    )}
                />
            </div>
        );
    },
    save: ({className, attributes}) => {

        const getClipPath = () => {

            let topLeft = attributes.headerClipPathTop < 0 ? 0 - attributes.headerClipPathTop : 0;
            let topRight = attributes.headerClipPathTop > 0 ? 0 + attributes.headerClipPathTop : 0;

            let bottomLeft = attributes.headerClipPathBottom < 0 ? 100 + attributes.headerClipPathBottom : 100;
            let bottomRight = attributes.headerClipPathBottom > 0 ? 100 - attributes.headerClipPathBottom: 100;

            return `polygon(0 ${topLeft}%,100% ${topRight}%,100% ${bottomLeft}%,0 ${bottomRight}%)`
        }

        return (
            <div className={classNames(className, 'image-header-block')}
                 style={{
                     height: attributes.fullHeight ? `100vh` : `${attributes.headerHeight}px`,
                     // fontSize: `${attributes.headerFontSize}px`
                 }}
            >

                <img className={classNames('image-header-block__image', attributes.blur > 0 ? 'is-blurred' : '')}
                     style={{
                         filter: `blur(${attributes.blur}px)`,
                         clipPath: attributes.fullHeight ? 'initial' : getClipPath()
                     }}
                     srcSet={`${getImage(attributes.headerImage, 'tiny')} 480w, ${getImage(attributes.headerImage, 'small')} 768w, ${getImage(attributes.headerImage, 'medium')} 1024w`}
                     sizes="100w"
                     src={getImage(attributes.headerImage, 'medium')}
                     alt={getImage(attributes.headerImage, 'alt')}
                />

                {attributes.hasOverlay &&
                    <div className="image-header-block__overlay"/>
                }

                <div className="container image-header-block__container">
                    <div className="image-header-block__text-wrapper">
                        <InnerBlocks.Content/>
                    </div>
                </div>
            </div>
        );
    },
});

