import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {ToggleControl, Button, RangeControl, FocalPointPicker, SelectControl, ToolbarGroup, ToolbarDropdownMenu, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup} from '@wordpress/components';
import {MediaUpload, InspectorControls, BlockControls, useBlockProps} from '@wordpress/block-editor';
import classnames from 'classnames';
import {getImage, focalPositionInPixel, MobileSwitch, MobileSwitchInner} from '../utility';
import {imageIcon} from '../icons';

// For not firing update to often
let onChangeImagePositionTimeout = true;

registerBlockType('custom/image', {
    apiVersion: 2,
    title: __('Image', 'sage'),
    icon: imageIcon,
    category: 'custom',
    attributes: {
        horizontalAlign: {
            type: 'string',
            default: 'left'
        },
        imageObject: {
            type: 'object',
            default: ''
        },
        imageRatio: {
            type: 'string',
            default: false,
        },
        imageSizeUnit: {
            type: 'string',
            default: '%'
        },
        imageSizeDesktop: {
            type: 'number',
            default: 100
        },
        imageSizeMobile: {
            type: 'number',
            default: 100
        },
        imagePositioning: {
            type: 'string',
            default: 'relative'
        },
        imagePositionUnit: {
            type: 'string',
            default: 'px'
        },
        horizontalImagePosition: {
            type: 'string',
            default: 'left'
        },
        verticalImagePosition: {
            type: 'string',
            default: 'top'
        },
        imageMove: {
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
                setAttributes({imageMove: value});

                onChangeImagePositionTimeout = false;

                setTimeout(function () {
                    onChangeImagePositionTimeout = true;
                }, 30);
            }
        };

        const showImageUploader = () => {

            if (attributes.imageSizeUnit === 'px') {
                if (attributes.imageSizeDesktop < 120) {
                    return false;
                }
            } else {
                if (attributes.imageSizeDesktop < 40) {
                    return false;
                }
            }

            return true;
        }

        const blockProps = useBlockProps({
            className: classnames(
                className,
                'image-block',
                (attributes.imagePositioning === 'absolute' && attributes.horizontalImagePosition === 'right') && 'end-0',
                (attributes.imagePositioning === 'absolute' && attributes.verticalImagePosition === 'bottom') && 'bottom-0',
                (attributes.imagePositioning === 'absolute' && attributes.imageSizeUnit === 'px') && `unit-size-px`
            ),
            style: {
                border: '1px dashed var(--wp-admin-theme-color)',
                ...(attributes.imagePositioning === 'absolute') && {
                    // width: `${attributes.imageSizeDesktop + attributes.imageSizeUnit}`,
                    position: attributes.imagePositioning,
                    transform: `translate(${focalPositionInPixel(attributes.imageMove.x, attributes.imagePositionUnit)}, ${focalPositionInPixel(attributes.imageMove.y, attributes.imagePositionUnit)})`,
                },
                ...(attributes.imageSizeUnit === 'px') && {
                    '--desktop-size': `${attributes.imageSizeDesktop}px`,
                    '--mobile-size': `${attributes.imageSizeMobile}px`,
                    '--size-difference': `${attributes.imageSizeDesktop - attributes.imageSizeMobile}`,
                },
                ...(attributes.imageSizeUnit === '%') && {
                    '--size': `${attributes.imageSizeDesktop}%`,
                }
            }
        });

        const innerBlockProps = {
            className: classnames(
                'image-block__inner',
                attributes.imagePositioning === 'relative' && `align-${attributes.horizontalAlign}`,
                (attributes.imagePositioning === 'relative' && attributes.imageSizeUnit === 'px') && `unit-size-px`
            ),
            style: {
                ...(attributes.imagePositioning === 'relative') && {
                    // width: `${attributes.imageSizeDesktop + attributes.imageSizeUnit}`,
                    position: attributes.imagePositioning,
                    transform: `translate(${focalPositionInPixel(attributes.imageMove.x, attributes.imagePositionUnit)}, ${focalPositionInPixel(attributes.imageMove.y, attributes.imagePositionUnit)})`,
                }
            }
        }

        return (
            <>
                {(attributes.imagePositioning !== 'absolute') &&
                <>
                    <BlockControls>
                        <ToolbarGroup>
                            <ToolbarDropdownMenu
                                icon={`align-${attributes.horizontalAlign}`}
                                label={__('Select a position', 'sage')}
                                controls={[
                                    {
                                        title: 'Left',
                                        icon: 'align-left',
                                        onClick: () => setAttributes({horizontalAlign: 'left'}),
                                    },
                                    {
                                        title: 'Center',
                                        icon: 'align-center',
                                        onClick: () => setAttributes({horizontalAlign: 'center'}),
                                    },
                                    {
                                        title: 'Right',
                                        icon: 'align-right',
                                        onClick: () => setAttributes({horizontalAlign: 'right'}),
                                    },
                                ]}
                            />
                        </ToolbarGroup>
                    </BlockControls>
                </>
                }
                <InspectorControls>
                    <div className="inspector-controls-container">
                        {!showImageUploader() && <>
                            <MediaUpload
                                onSelect={(value) => setAttributes({imageObject: value})}
                                allowedTypes={['image']}
                                render={({open}) => (
                                    <Button
                                        className={'button'}
                                        onClick={open}
                                        icon={'format-image'}
                                        // isSmall={true}
                                        text={attributes.imageObject ? __('Change Image', 'sage') : __('Upload Image', 'sage')}
                                    />
                                )}
                            />
                        </>}
                        <hr/>
                        <p>{__('Images Ratio', 'sage')}</p>
                        <RadioGroup
                            onChange={(value) => setAttributes({imageRatio: value})}
                            checked={attributes.imageRatio}
                            defaultChecked={'3x2'}
                        >
                            <Radio value={false}>{__('None', 'sage')}</Radio>
                            <Radio value="1x1">{__('1x1', 'sage')}</Radio>
                            <Radio value="4x3">{__('4x3', 'sage')}</Radio>
                            <Radio value="3x2">{__('3x2', 'sage')}</Radio>
                            <Radio value="16x9">{__('16x9', 'sage')}</Radio>
                            <Radio value="21x9">{__('21x9', 'sage')}</Radio>
                        </RadioGroup>
                        <hr/>
                        {attributes.imageSizeUnit === 'px' ? <>
                            <MobileSwitch headline={__('Size', 'sage')}>
                                <MobileSwitchInner type={'desktop'}>
                                    <RangeControl
                                        value={attributes.imageSizeDesktop}
                                        min={5}
                                        max={1000}
                                        step={1}
                                        onChange={(value) => {
                                            if(attributes.imageSizeMobile === attributes.imageSizeDesktop) {
                                                setAttributes({imageSizeMobile: value})
                                            }

                                            setAttributes({imageSizeDesktop: value})
                                        }}
                                        allowReset={true}
                                        resetFallbackValue={100}
                                    />
                                </MobileSwitchInner>
                                <MobileSwitchInner type={'mobile'}>
                                    <RangeControl
                                        value={attributes.imageSizeMobile}
                                        min={5}
                                        max={attributes.imageSizeDesktop}
                                        step={1}
                                        onChange={(value) => {
                                            setAttributes({imageSizeMobile: value})
                                        }}
                                        allowReset={true}
                                        resetFallbackValue={attributes.imageSizeDesktop}
                                    />
                                </MobileSwitchInner>
                            </MobileSwitch>
                            </> : <>
                            <p>{__('Size', 'sage')}</p>
                                <RangeControl
                                value={attributes.imageSizeDesktop}
                                min={5}
                                max={100}
                                step={1}
                                onChange={(value) => setAttributes({imageSizeDesktop: value})}
                                allowReset={true}
                                resetFallbackValue={100}
                            />
                        </>}
                        <RadioGroup
                            onChange={(value) => {
                                if (value === '%' && attributes.imageSizeDesktop > 100) {
                                    setAttributes({imageSizeDesktop: 100});
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
                        <p>{__('Positioning', 'sage')}</p>
                        <RadioGroup
                            onChange={(value) => setAttributes({imagePositioning: value})}
                            checked={attributes.imagePositioning}
                            defaultChecked={'relative'}
                        >
                            <Radio value="relative">{__('Relative', 'sage')}</Radio>
                            <Radio value="absolute">{__('Absolute', 'sage')}</Radio>
                        </RadioGroup>
                        {(attributes.imagePositioning === 'absolute') &&
                        <>
                            <hr/>
                            <p>{__('Position', 'sage')}</p>
                            <RadioGroup
                                onChange={(value) => setAttributes({horizontalImagePosition: value})}
                                checked={attributes.horizontalImagePosition}
                                defaultChecked={'left'}
                            >
                                <Radio value="left">{__('Left', 'sage')}</Radio>
                                <Radio value="right">{__('Right', 'sage')}</Radio>
                            </RadioGroup>
                            <br/>
                            <RadioGroup
                                onChange={(value) => setAttributes({verticalImagePosition: value})}
                                checked={attributes.verticalImagePosition}
                                defaultChecked={'top'}
                            >
                                <Radio value="top">{__('Top', 'sage')}</Radio>
                                <Radio value="bottom">{__('Bottom', 'sage')}</Radio>
                            </RadioGroup>
                        </>
                        }
                        <hr/>
                        <p>{__('Movement', 'sage')}</p>
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
                                onClick={() => setAttributes({imageMove: {x: 0.5, y: 0.5}})}
                                text={__('Reset', 'sage')}
                                style={{marginLeft: '10px'}}
                            />
                        </div>
                        <FocalPointPicker
                            className={'no-picker-controls'}
                            value={attributes.imageMove}
                            onChange={onChangeImagePosition}
                            onDrag={onChangeImagePosition}
                        />
                    </div>
                </InspectorControls>
                <div {...blockProps}>
                    <div {...innerBlockProps}>
                        {showImageUploader() && <>
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
                                            top: '10px',
                                            zIndex: '10'
                                        }}
                                    />
                                )}
                            />
                        </>}
                        <div className={attributes.imageRatio ? `ratio ratio-${attributes.imageRatio}` : ''}>
                            {attributes.imageObject.mime !== 'image/svg+xml' ?
                                <img alt={getImage(attributes.imageObject, 'alt')}
                                     srcSet={`${getImage(attributes.imageObject, 'tiny', 400)} 768w, ${getImage(attributes.imageObject, 'small', 400)} 1360w`}
                                     src={getImage(attributes.imageObject, 'tiny', 400)}
                                     style={{width: '100%'}}
                                     width={getImage(attributes.imageObject, 'width')}
                                     height={getImage(attributes.imageObject, 'height')}
                                /> :
                                <img alt={getImage(attributes.imageObject, 'alt')}
                                     src={getImage(attributes.imageObject, 'tiny', 400)}
                                     style={{width: '100%'}}
                                     width={getImage(attributes.imageObject, 'width')}
                                     height={getImage(attributes.imageObject, 'height')}
                                />
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    },
    save: ({attributes}) => {

        const blockProps = useBlockProps.save({
            className: classnames(
                'image-block',
                `align-${attributes.horizontalAlign}`,
                attributes.imageRatio ? `ratio ratio-${attributes.imageRatio}` : '',
                (attributes.imagePositioning === 'absolute' && attributes.horizontalImagePosition === 'right') && 'end-0',
                (attributes.imagePositioning === 'absolute' && attributes.verticalImagePosition === 'bottom') && 'bottom-0',
                (attributes.imageSizeUnit === 'px') && `unit-size-px`
            ),
            style: {
                // width: `${attributes.imageSizeDesktop + attributes.imageSizeUnit}`,
                position: attributes.imagePositioning,
                transform: `translate(${focalPositionInPixel(attributes.imageMove.x, attributes.imagePositionUnit)}, ${focalPositionInPixel(attributes.imageMove.y, attributes.imagePositionUnit)})`,
                ...(attributes.imageSizeUnit === 'px') && {
                    '--desktop-size': `${attributes.imageSizeDesktop}px`,
                    '--mobile-size': `${attributes.imageSizeMobile}px`,
                    '--size-difference': `${attributes.imageSizeDesktop - attributes.imageSizeMobile}`,
                },
                ...(attributes.imageSizeUnit === '%') && {
                    '--size': `${attributes.imageSizeDesktop}%`,
                }
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
                             width={getImage(attributes.imageObject, 'width')}
                             height={getImage(attributes.imageObject, 'height')}
                        /> :
                        <img alt={getImage(attributes.imageObject, 'alt')}
                             src={getImage(attributes.imageObject, 'tiny', 400)}
                             style={{width: '100%'}}
                             width={getImage(attributes.imageObject, 'width')}
                             height={getImage(attributes.imageObject, 'height')}
                        />
                    }
                </div>
            </>
        );
    },
});

