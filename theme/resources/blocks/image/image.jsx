import {__} from '@wordpress/i18n';
import {registerBlockType, createBlock} from '@wordpress/blocks';
import {createElement, Component} from '@wordpress/element';
import {Button, Draggable, RangeControl, FocalPointPicker, SelectControl} from '@wordpress/components';
import {RichText, MediaUpload, InspectorControls, URLInput} from '@wordpress/block-editor';
// import {Icon, more} from '@wordpress/icons';
import classNames from 'classnames';
import {getImage, focalPositionInPixel} from '../utility';

const blockIcon = createElement('svg', {width: 20, height: 20},
    createElement('path', {
        d: 'M15,11 L15,13 L7,13 L7,11 L15,11 Z M3.5,8 C4.88071187,8 6,9.11928813 6,10.5 C6,11.8807119 4.88071187,13 3.5,13 C2.11928813,13 1,11.8807119 1,10.5 C1,9.11928813 2.11928813,8 3.5,8 Z M19,8 L19,10 L7,10 L7,8 L19,8 Z'
    })
);

// For not firing update to often
let onChangeImagePositionTimeout = true;

registerBlockType('custom/image', {
    title: __('Image', 'sage'),
    icon: blockIcon,
    category: 'custom',
    // multiple: false, // Use this block just once per post
    attributes: {
        imageObject: {
            type: 'object',
            default: ''
        },
        imageSize: {
            type: 'number',
            default: 200
        },
        imagePositioning: {
            type: 'string',
            default: 'static'
        },
        imagePosition: {
            type: 'object',
            default: {x: 0.5, y: 0.5}
        },
    },
    edit: ({className, attributes, setAttributes}) => {

        const onSelectImage = (imageObject) => {
            setAttributes({imageObject: imageObject});
        };

        const onChangeImageSize = (value) => {
            setAttributes({imageSize: value});
        };

        const onChangeImagePositioning = (value) => {
            setAttributes({imagePositioning: value});
        };

        const onChangeImagePosition = (value) => {

            /**
             * Timeout for Image Position On Change
             */
            if (onChangeImagePositionTimeout) {
                setAttributes({imagePosition: value});

                onChangeImagePositionTimeout = false;

                setTimeout(function () {
                    onChangeImagePositionTimeout = true;
                }, 30);
            }
        };

        const setBackImagePosition = () => {
            setAttributes({imagePosition: {x: 0.5, y: 0.5}});
        };

        const imageStyle = {
            width: `${attributes.imageSize}px`,
            position: attributes.imagePositioning,
            transform: `translate(${focalPositionInPixel(attributes.imagePosition.x)}, ${focalPositionInPixel(attributes.imagePosition.y)})`,
        };

        return (
            <>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <hr/>
                        <p>{__('Choose your Image', 'sage')}</p>
                        <MediaUpload
                            onSelect={onSelectImage}
                            allowedTypes={['image']}
                            // value={attributes.mediaID}
                            render={({open}) => (
                                <Button variant="primary" className={'button'} onClick={open}>
                                    {!attributes.imageObject ? __('Upload IMage', 'sage') : __('Change Image', 'sage')}
                                </Button>
                            )}
                        />
                        <hr/>
                        <p>{__('Image Size', 'sage')}</p>
                        <RangeControl
                            value={attributes.imageSize}
                            min={20}
                            max={1000}
                            step={1}
                            onChange={onChangeImageSize}
                        />
                        <hr/>
                        <p>{__('Image Positioning', 'sage')}</p>
                        <SelectControl
                            // label={__('Horizontal', 'sage')}
                            value={attributes.imagePositioning}
                            options={[
                                {label: __('Static', 'sage'), value: 'static'},
                                {label: __('Absolute', 'sage'), value: 'absolute'},
                            ]}
                            onChange={onChangeImagePositioning}
                        />
                        <hr/>
                        <p>{__('Image Position', 'sage')}</p>
                        <Button className={'button'}
                                onClick={setBackImagePosition}
                                style={{marginBottom: '20px'}}
                                text={__('Default Position', 'sage')}
                        />
                        <FocalPointPicker
                            className={'no-picker-controls'}
                            value={attributes.imagePosition}
                            onChange={onChangeImagePosition}
                            onDrag={onChangeImagePosition}
                        />
                    </div>
                </InspectorControls>
                {attributes.imageObject.mime !== 'image/svg+xml' ?
                    <img className={classNames(className, 'image-block')}
                         style={imageStyle}
                         alt={getImage(attributes.imageObject, 'alt')}
                         srcSet={`${getImage(attributes.imageObject, 'tiny')} 768w, ${getImage(attributes.imageObject, 'small')} 1360w`}
                         src={getImage(attributes.imageObject, 'tiny')}
                    /> :
                    <img className={classNames(className, 'image-block')}
                         style={imageStyle}
                         alt={getImage(attributes.imageObject, 'alt')}
                         src={getImage(attributes.imageObject, 'tiny')}
                    />
                }
            </>
        );
    },
    save: ({className, attributes}) => {

        const imageStyle = {
            width: `${attributes.imageSize}px`,
            position: attributes.imagePositioning,
            transform: `translate(${focalPositionInPixel(attributes.imagePosition.x)}, ${focalPositionInPixel(attributes.imagePosition.y)})`,
        };

        return (
            <>
                {attributes.imageObject.mime !== 'image/svg+xml' ?
                    <img className={classNames(className, 'image-block')}
                         style={imageStyle}
                         alt={getImage(attributes.imageObject, 'alt')}
                         srcSet={`${getImage(attributes.imageObject, 'tiny')} 768w, ${getImage(attributes.imageObject, 'small')} 1360w`}
                         src={getImage(attributes.imageObject, 'tiny')}
                    /> :
                    <img className={classNames(className, 'image-block')}
                         style={imageStyle}
                         alt={getImage(attributes.imageObject, 'alt')}
                         src={getImage(attributes.imageObject, 'tiny')}
                    />
                }
            </>
        );
    },
});

