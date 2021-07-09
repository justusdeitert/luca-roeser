import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {Button, RangeControl, FocalPointPicker, SelectControl} from '@wordpress/components';
import {MediaUpload, InspectorControls} from '@wordpress/block-editor';
import classNames from 'classnames';
import {getImage, focalPositionInPixel} from '../utility';
import {imageIcon} from '../icons';

// For not firing update to often
let onChangeImagePositionTimeout = true;

registerBlockType('custom/image', {
    title: __('Image', 'sage'),
    icon: imageIcon,
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

