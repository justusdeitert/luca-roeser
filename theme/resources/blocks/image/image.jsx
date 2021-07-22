import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {ToggleControl, Button, RangeControl, FocalPointPicker, SelectControl, ToolbarGroup, ToolbarDropdownMenu, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup} from '@wordpress/components';
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
        hasRatio: {
            type: 'boolean',
            default: false,
        },
        imagesRatio: {
            type: 'string',
            default: '3x2',
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

        const onChangeImagesRatio = (value) => {
            setAttributes({imageRatio: value});
        }

        const onChangeHasRatio = (value) => {
            setAttributes({hasRatio: value});
        }

        const onChangeImageSizeUnit = (value) => {
            if (value === '%' && attributes.imageSize > 100) {
                setAttributes({imageSize: 100});
            }

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
        // <div className={`ratio ratio-${attributes.imagesRatio}`}>

        const blockProps = useBlockProps({
            className: classNames(className, 'image-block', `align-${attributes.imageAlignment}`, attributes.hasRatio && `ratio ratio-${attributes.imagesRatio}`),
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
                        <ToggleControl
                            label={__('Image has Ratio', 'sage')}
                            checked={attributes.hasRatio}
                            onChange={onChangeHasRatio}
                        />
                        {attributes.hasRatio &&
                        <>
                            <hr/>
                            <p>{__('Images Ratio', 'sage')}</p>
                            <RadioGroup
                                onChange={onChangeImagesRatio}
                                checked={attributes.imagesRatio}
                                defaultChecked={'3x2'}
                            >
                                <Radio value="1x1">{__('1x1', 'sage')}</Radio>
                                <Radio value="4x3">{__('4x3', 'sage')}</Radio>
                                <Radio value="3x2">{__('3x2', 'sage')}</Radio>
                                <Radio value="16x9">{__('16x9', 'sage')}</Radio>
                                <Radio value="21x9">{__('21x9', 'sage')}</Radio>
                            </RadioGroup>
                        </>
                        }
                        <hr/>
                        <p>{__('Size Unit', 'sage')}</p>
                        <RadioGroup
                            onChange={onChangeImageSizeUnit}
                            checked={attributes.imageSizeUnit}
                            defaultChecked={"px"}
                        >
                            <Radio value="px">{__('Pixel', 'sage')}</Radio>
                            <Radio value="%">{__('%', 'sage')}</Radio>
                        </RadioGroup>
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
                        {/*<SelectControl
                            value={attributes.imagePositioning}
                            options={[
                                {label: __('Static', 'sage'), value: 'static'},
                                {label: __('Absolute', 'sage'), value: 'absolute'},
                            ]}
                            onChange={onChangeImagePositioning}
                        />*/}
                        <RadioGroup
                            onChange={onChangeImagePositioning}
                            checked={attributes.imagePositioning}
                            defaultChecked={"static"}
                        >
                            <Radio value="static">{__('Static', 'sage')}</Radio>
                            <Radio value="absolute">{__('Absolute', 'sage')}</Radio>
                        </RadioGroup>
                        {/*<SelectControl
                            value={attributes.imagePositionUnit}
                            options={[
                                {label: __('Pixel', 'sage'), value: 'px'},
                                {label: __('Percent', 'sage'), value: '%'},
                            ]}
                            onChange={onChangeImagePositionUnit}
                        />*/}
                        <hr/>
                        <p>{__('Position', 'sage')}</p>
                        <div style={{display: 'flex', marginBottom: '20px'}}>
                            <RadioGroup
                                onChange={onChangeImagePositionUnit}
                                checked={attributes.imagePositionUnit}
                                defaultChecked={"px"}
                            >
                                <Radio value="px">{__('Pixel', 'sage')}</Radio>
                                <Radio value="%">{__('%', 'sage')}</Radio>
                            </RadioGroup>
                            <Button
                                className={'is-secondary'}
                                onClick={setBackImagePosition}
                                text={__('Reset', 'sage')}
                                style={{marginLeft: '10px'}}
                            />
                        </div>
                        <FocalPointPicker
                            className={'no-picker-controls'}
                            value={attributes.imagePosition}
                            onChange={onChangeImagePosition}
                            onDrag={onChangeImagePosition}
                        />
                    </div>
                </InspectorControls>
                <div style={{position: 'relative'}}>
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
                    <MediaUpload
                        onSelect={onSelectImage}
                        allowedTypes={['image']}
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
                </div>

            </>
        );
    },
    save: ({className, attributes}) => {

        const blockProps = useBlockProps.save({
            className: classNames(className, 'image-block', `align-${attributes.imageAlignment}`, attributes.hasRatio && `ratio ratio-${attributes.imagesRatio}`),
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

