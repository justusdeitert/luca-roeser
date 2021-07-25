import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {ToggleControl, Button, RangeControl, FocalPointPicker, SelectControl, ToolbarGroup, ToolbarDropdownMenu, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup} from '@wordpress/components';
import {MediaUpload, InspectorControls, BlockControls, useBlockProps} from '@wordpress/block-editor';
import classnames from 'classnames';
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
        imageRatio: {
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
            default: 'relative'
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

        const onClickAlignment = (value) => {
            setAttributes({imageAlignment: value});
        }

        const blockProps = useBlockProps({
            className: classnames(className, 'image-block', `align-${attributes.imageAlignment}`),
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
                            icon={`align-${attributes.imageAlignment}`}
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
                            onChange={(value) => setAttributes({hasRatio: value})}
                        />
                        {attributes.hasRatio &&
                        <>
                            <hr/>
                            <p>{__('Images Ratio', 'sage')}</p>
                            <RadioGroup
                                onChange={(value) => setAttributes({imageRatio: value})}
                                checked={attributes.imageRatio}
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
                            onChange={(value) => {
                                if (value === '%' && attributes.imageSize > 100) {
                                    setAttributes({imageSize: 100});
                                }

                                setAttributes({imageSizeUnit: value});
                            }}
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
                            onChange={(value) => setAttributes({imageSize: value})}
                        />
                        <hr/>
                        <p>{__('Positioning', 'sage')}</p>
                        <RadioGroup
                            onChange={(value) => setAttributes({imagePositioning: value})}
                            checked={attributes.imagePositioning}
                            defaultChecked={"relative"}
                        >
                            <Radio value="relative">{__('Relative', 'sage')}</Radio>
                            <Radio value="absolute">{__('Absolute', 'sage')}</Radio>
                        </RadioGroup>
                        <hr/>
                        <p>{__('Position', 'sage')}</p>
                        <div style={{display: 'flex', marginBottom: '20px'}}>
                            <RadioGroup
                                onChange={(value) => setAttributes({imagePositionUnit: value})}
                                checked={attributes.imagePositionUnit}
                                defaultChecked={"px"}
                            >
                                <Radio value="px">{__('Pixel', 'sage')}</Radio>
                                <Radio value="%">{__('%', 'sage')}</Radio>
                            </RadioGroup>
                            <Button
                                className={'is-secondary'}
                                onClick={() => setAttributes({imagePosition: {x: 0.5, y: 0.5}})}
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
                <div {...blockProps}>
                    <MediaUpload
                        onSelect={(value) => setAttributes({imageObject: value})}
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
                    <div className={attributes.hasRatio ? `ratio ratio-${attributes.imageRatio}` : ''}>
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
                </div>

            </>
        );
    },
    save: ({attributes}) => {

        const blockProps = useBlockProps.save({
            className: classnames('image-block', `align-${attributes.imageAlignment}`, attributes.hasRatio ? `ratio ratio-${attributes.imageRatio}` : ''),
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

