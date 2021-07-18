import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {Button, RangeControl, FocalPointPicker, SelectControl, ToolbarGroup, ToolbarDropdownMenu} from '@wordpress/components';
import {MediaUpload, InspectorControls, BlockControls, useBlockProps} from '@wordpress/block-editor';
import classNames from 'classnames';
import {getImage, focalPositionInPixel} from '../utility';
import {imageIcon} from '../icons';

// For not firing update to often
let onChangeImagePositionTimeout = true;

registerBlockType('custom/image', {
    apiVersion: 2,
    title: __('Image', 'sage'),
    icon: imageIcon,
    category: 'custom',
    attributes: {
        imageAlignment: {
            type: 'string',
            default: 'left'
        },
        imageObject: {
            type: 'object',
            default: ''
        },
        imageSizeUnit: {
            type: 'string',
            default: 'px'
        },
        imageSize: {
            type: 'number',
            default: 200
        },
        imagePositioning: {
            type: 'string',
            default: 'static'
        },
        imagePositionUnit: {
            type: 'string',
            default: 'px'
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

        const onChangeImageSizeUnit = (value) => {
            setAttributes({imageSizeUnit: value});
        };

        const onChangeImageSize = (value) => {
            setAttributes({imageSize: value});
        };

        const onChangeImagePositioning = (value) => {
            setAttributes({imagePositioning: value});
        };

        const onChangeImagePositionUnit = (value) => {
            setAttributes({imagePositionUnit: value});
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

        const onClickAlignment = (value) => {
            setAttributes({imageAlignment: value});
        }

        const getAlignmentIcon = () => {
            return 'align-' + attributes.imageAlignment;
        }

        // const imageStyle = {
        //     width: `${attributes.imageSize + attributes.imageSizeUnit}`,
        //     position: attributes.imagePositioning,
        //     transform: `translate(${focalPositionInPixel(attributes.imagePosition.x, attributes.imagePositionUnit)}, ${focalPositionInPixel(attributes.imagePosition.y, attributes.imagePositionUnit)})`,
        // };

        const blockProps = useBlockProps({
            className: classNames(className, 'image-block', `align-${attributes.imageAlignment}`),
            style: {
                marginTop: 0,
                marginBottom: 0,
                width: `${attributes.imageSize + attributes.imageSizeUnit}`,
                position: attributes.imagePositioning,
                transform: `translate(${focalPositionInPixel(attributes.imagePosition.x, attributes.imagePositionUnit)}, ${focalPositionInPixel(attributes.imagePosition.y, attributes.imagePositionUnit)})`,
            }
        });

        return (
            <>
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarDropdownMenu
                            icon={getAlignmentIcon()}
                            label={__('Select a position', 'sage')}
                            controls={[
                                {
                                    title: 'Left',
                                    icon: 'align-left',
                                    onClick: () => onClickAlignment('left'),
                                },
                                {
                                    title: 'Center',
                                    icon: 'align-center',
                                    onClick: () => onClickAlignment('center'),
                                },
                                {
                                    title: 'Right',
                                    icon: 'align-right',
                                    onClick: () => onClickAlignment('right'),
                                },
                            ]}
                        />
                    </ToolbarGroup>
                </BlockControls>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <hr/>
                        <p>{__('Size Unit', 'sage')}</p>
                        <SelectControl
                            // label={__('Horizontal', 'sage')}
                            value={attributes.imageSizeUnit}
                            options={[
                                {label: __('Pixel', 'sage'), value: 'px'},
                                {label: __('Percent', 'sage'), value: '%'},
                            ]}
                            onChange={onChangeImageSizeUnit}
                        />
                        <hr/>
                        <p>{__('Size', 'sage')}</p>
                        <RangeControl
                            value={attributes.imageSize}
                            min={20}
                            max={attributes.imageSizeUnit === '%' ? 100 : 1000}
                            step={1}
                            onChange={onChangeImageSize}
                        />
                        <hr/>
                        <p>{__('Positioning', 'sage')}</p>
                        <SelectControl
                            value={attributes.imagePositioning}
                            options={[
                                {label: __('Static', 'sage'), value: 'static'},
                                {label: __('Absolute', 'sage'), value: 'absolute'},
                            ]}
                            onChange={onChangeImagePositioning}
                        />
                        <hr/>
                        <p>{__('Position Unit', 'sage')}</p>
                        <SelectControl
                            value={attributes.imagePositionUnit}
                            options={[
                                {label: __('Pixel', 'sage'), value: 'px'},
                                {label: __('Percent', 'sage'), value: '%'},
                            ]}
                            onChange={onChangeImagePositionUnit}
                        />
                        <hr/>
                        <p>{__('Position', 'sage')}</p>
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
                <div {...blockProps}>
                    {/*<div className="image-block__wrapper">*/}
                        <MediaUpload
                            onSelect={onSelectImage}
                            allowedTypes={['image']}
                            // value={attributes.mediaID}
                            // render={({open}) => (
                            //     <Button variant="primary" className={'is-secondary'} onClick={open}>
                            //         {!attributes.imageObject ? __('Upload Image', 'sage') : __('Change Image', 'sage')}
                            //     </Button>
                            // )}
                            render={({open}) => (
                                <Button
                                    className={'button'}
                                    onClick={open}
                                    icon={'format-image'}
                                    isSmall={true}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        bottom: '10px',
                                        zIndex: '10'
                                    }}
                                />
                            )}
                        />
                        {attributes.imageObject.mime !== 'image/svg+xml' ?
                            <img alt={getImage(attributes.imageObject, 'alt')}
                                 srcSet={`${getImage(attributes.imageObject, 'tiny', 400)} 768w, ${getImage(attributes.imageObject, 'small', 400)} 1360w`}
                                 src={getImage(attributes.imageObject, 'tiny', 400)}
                                 style={{width: '100%'}}
                            /> :
                            <img alt={getImage(attributes.imageObject, 'alt')}
                                 src={getImage(attributes.imageObject, 'tiny', 400)}
                                 style={{width: '100%'}}
                            />
                        }
                    {/*</div>*/}
                </div>
            </>
        );
    },
    save: ({className, attributes}) => {

        // const imageStyle = {
        //     width: `${attributes.imageSize + attributes.imageSizeUnit}`,
        //     position: attributes.imagePositioning,
        //     transform: `translate(${focalPositionInPixel(attributes.imagePosition.x, attributes.imagePositionUnit)}, ${focalPositionInPixel(attributes.imagePosition.y, attributes.imagePositionUnit)})`,
        // };

        const blockProps = useBlockProps.save({
            className: classNames(className, 'image-block', `align-${attributes.imageAlignment}`),
            style: {
                width: `${attributes.imageSize + attributes.imageSizeUnit}`,
                position: attributes.imagePositioning,
                transform: `translate(${focalPositionInPixel(attributes.imagePosition.x, attributes.imagePositionUnit)}, ${focalPositionInPixel(attributes.imagePosition.y, attributes.imagePositionUnit)})`,
            }
        });

        return (
            <>
                <div {...blockProps}>
                    {attributes.imageObject.mime !== 'image/svg+xml' ?
                        <img alt={getImage(attributes.imageObject, 'alt')}
                             srcSet={`${getImage(attributes.imageObject, 'tiny', 400)} 768w, ${getImage(attributes.imageObject, 'small', 400)} 1360w`}
                             src={getImage(attributes.imageObject, 'tiny', 400)}
                             style={{width: '100%'}}
                        /> :
                        <img alt={getImage(attributes.imageObject, 'alt')}
                             src={getImage(attributes.imageObject, 'tiny', 400)}
                             style={{width: '100%'}}
                        />
                    }
                </div>
            </>
        );
    },
});

