/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Wordpress dependencies
 */
import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {
    ToggleControl,
    Button,
    RangeControl,
    FocalPointPicker,
    PanelBody,
    SelectControl,
    ToolbarGroup,
    ToolbarDropdownMenu,
    __experimentalRadio as Radio,
    __experimentalRadioGroup as RadioGroup,
    __experimentalAlignmentMatrixControl as AlignmentMatrixControl,
} from '@wordpress/components';
import {MediaUpload, InspectorControls, BlockControls, useBlockProps} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {getImage, focalPositionInPixel, MobileSwitch, MobileSwitchInner} from '../utility';
import {imageIcon} from '../icons';

// For not firing update to often
let onChangeImagePositionTimeout = true;

/**
 * Returning Bootstrap absolute positioning class
 * @param position
 */
const returnPositioningClasses = (position) => {
    const positionArray = position.split(' ');
    let positionY = positionArray[0]
    let positionX = positionArray[1]

    let returnPositionYClass = () => {
        switch (positionY) {
            case 'top':
                return 'top-0';
            case 'bottom':
                return 'bottom-0';
        }
    }

    let returnPositionXClass = () => {
        switch (positionX) {
            case 'left':
                return 'start-0';
            case 'right':
                return 'end-0';
        }
    }

    return [
        returnPositionYClass(),
        returnPositionXClass()
    ].join(' ');
};

/**
 * Block attributes
 */
const attributes = {
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
    imageSizePixelDesktop: {
        type: 'number',
        default: 300
    },
    imageSizePixelMobile: {
        type: 'number',
        default: 300
    },
    imageSizePercent: {
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
    absolutePosition: {
        type: 'string',
        default: 'top left'
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
};

registerBlockType('custom/image', {
    apiVersion: 2,
    title: __('Image', 'sage'),
    icon: imageIcon,
    category: 'custom',
    attributes,
    edit: ({className, attributes, setAttributes}) => {

        const isPixel = attributes.imageSizeUnit === 'px';
        const isFluid = attributes.imageSizePixelDesktop !== attributes.imageSizePixelMobile
        const isAbsolute = attributes.imagePositioning === 'absolute';

        const onChangeImagePosition = (value) => {
            /**
             * Timeout for Image Position On Change
             * TODO: Better timout implementation
             */
            if (onChangeImagePositionTimeout) {
                setAttributes({imageMove: value});

                onChangeImagePositionTimeout = false;

                setTimeout(function () {
                    onChangeImagePositionTimeout = true;
                }, 30);
            }
        };

        const imageIsSmall = () => {
            if (isPixel) {
                return attributes.imageSizePixelDesktop < 100;
            }

            return attributes.imageSizePercent < 100;
        };

        const blockProps = useBlockProps({
            className: classnames(
                className,
                'image-block',
                isAbsolute && 'image-wrapper',
                isAbsolute && returnPositioningClasses(attributes.absolutePosition),
                isAbsolute && {
                    'has-fluid-width': isPixel && isFluid
                }
            ),
            style: {
                border: '1px dashed var(--wp-admin-theme-color)',
                ...(isAbsolute) && {
                    position: attributes.imagePositioning,
                    transform: `translate(${focalPositionInPixel(attributes.imageMove.x, attributes.imagePositionUnit)}, ${focalPositionInPixel(attributes.imageMove.y, attributes.imagePositionUnit)})`,
                    ...(isPixel) ? {
                        ...(isFluid) ? {
                            '--width-desktop': `${attributes.imageSizePixelDesktop}px`,
                            '--width-mobile': `${attributes.imageSizePixelMobile}px`,
                            '--width-difference': `${attributes.imageSizePixelDesktop - attributes.imageSizePixelMobile}`,
                        } : {
                            '--width': `${attributes.imageSizePixelDesktop}px`,
                        }
                    } : {
                        '--width': `${attributes.imageSizePercent}%`,
                    }
                }
            }
        });

        const innerBlockProps = {
            className: classnames(
                'image-block__inner',
                !isAbsolute && `align-${attributes.horizontalAlign}`,
                !isAbsolute && 'image-wrapper',
                isAbsolute && {
                    'has-fluid-width': isPixel && isFluid
                }
            ),
            style: {
                ...(!isAbsolute) && {
                    position: attributes.imagePositioning,
                    transform: `translate(${focalPositionInPixel(attributes.imageMove.x, attributes.imagePositionUnit)}, ${focalPositionInPixel(attributes.imageMove.y, attributes.imagePositionUnit)})`,
                    ...(isPixel) ? {
                        ...(isFluid) ? {
                            '--width-desktop': `${attributes.imageSizePixelDesktop}px`,
                            '--width-mobile': `${attributes.imageSizePixelMobile}px`,
                            '--width-difference': `${attributes.imageSizePixelDesktop - attributes.imageSizePixelMobile}`,
                        } : {
                            '--width': `${attributes.imageSizePixelDesktop}px`,
                        }
                    } : {
                        '--width': `${attributes.imageSizePercent}%`,
                    }
                }
            }
        }

        return (
            <>
                {!isAbsolute && <>
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
                </>}
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <MediaUpload
                            onSelect={(value) => setAttributes({imageObject: value})}
                            allowedTypes={['image']}
                            render={({open}) => (
                                <Button
                                    className={'button'}
                                    onClick={open}
                                    icon={'format-image'}
                                    text={attributes.imageObject ? __('Change Image', 'sage') : __('Upload Image', 'sage')}
                                />
                            )}
                        />
                        <hr/>
                        <p>{__('Ratio', 'sage')}</p>
                        <RadioGroup {...{
                            onChange: (value) => setAttributes({imageRatio: value}),
                            checked: attributes.imageRatio,
                            defaultChecked: '3x2'
                        }}>
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
                                        value={attributes.imageSizePixelDesktop}
                                        min={20}
                                        max={1000}
                                        step={1}
                                        onChange={(value) => {
                                            if(attributes.imageSizePixelMobile === attributes.imageSizePixelDesktop) {
                                                setAttributes({imageSizePixelMobile: value})
                                            }

                                            setAttributes({imageSizePixelDesktop: value})
                                        }}
                                        allowReset={true}
                                        resetFallbackValue={300}
                                    />
                                </MobileSwitchInner>
                                <MobileSwitchInner type={'mobile'}>
                                    <RangeControl
                                        value={attributes.imageSizePixelMobile}
                                        min={5}
                                        max={attributes.imageSizePixelDesktop}
                                        step={1}
                                        onChange={(value) => {
                                            setAttributes({imageSizePixelMobile: value})
                                        }}
                                        allowReset={true}
                                        resetFallbackValue={attributes.imageSizePixelDesktop}
                                    />
                                </MobileSwitchInner>
                            </MobileSwitch>
                        </> : <>
                            <p>{__('Size', 'sage')}</p>
                            <RangeControl
                                value={attributes.imageSizePercent}
                                min={5}
                                max={100}
                                step={1}
                                onChange={(value) => setAttributes({imageSizePercent: value})}
                                allowReset={true}
                                resetFallbackValue={100}
                            />
                        </>}
                        <RadioGroup {...{
                            onChange: (value) => setAttributes({imageSizeUnit: value}),
                            checked: attributes.imageSizeUnit,
                            defaultChecked: 'px'
                        }}>
                            <Radio value="px">{__('Pixel', 'sage')}</Radio>
                            <Radio value="%">{__('%', 'sage')}</Radio>
                        </RadioGroup>
                    </div>
                    <PanelBody title={__('Positioning', 'sage')} initialOpen={false}>
                        <p>{__('Move', 'sage')}</p>
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
                            />
                        </div>
                        <FocalPointPicker
                            className={'no-picker-controls'}
                            value={attributes.imageMove}
                            onChange={onChangeImagePosition}
                            onDrag={onChangeImagePosition}
                        />
                        <hr/>
                        <p>{__('Position', 'sage')}</p>
                        <RadioGroup {...{
                            onChange: (value) => setAttributes({imagePositioning: value}),
                            checked: attributes.imagePositioning,
                            defaultChecked: 'relative'
                        }}>
                            <Radio value="relative">{__('Relative', 'sage')}</Radio>
                            <Radio value="absolute">{__('Absolute', 'sage')}</Radio>
                        </RadioGroup>
                        {isAbsolute && <>
                            <div style={{height: '10px'}}/>
                            <div className="no-center-cells">
                                <AlignmentMatrixControl
                                    classNames={'no-center-cells'}
                                    value={attributes.absolutePosition}
                                    onChange={(value) => setAttributes({absolutePosition: value})}
                                />
                            </div>
                        </>}
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <div {...innerBlockProps}>
                        {!imageIsSmall() && <>
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

        const isPixel = attributes.imageSizeUnit === 'px';
        const isFluid = attributes.imageSizePixelDesktop !== attributes.imageSizePixelMobile
        const isAbsolute = attributes.imagePositioning === 'absolute';

        const blockProps = useBlockProps.save({
            className: classnames(
                'image-block',
                'image-wrapper',
                isAbsolute && returnPositioningClasses(attributes.absolutePosition),
                (isPixel && isFluid) && 'has-fluid-width',
                `align-${attributes.horizontalAlign}`,
                attributes.imageRatio ? `ratio ratio-${attributes.imageRatio}` : '',
            ),
            style: {
                position: attributes.imagePositioning,
                transform: `translate(${focalPositionInPixel(attributes.imageMove.x, attributes.imagePositionUnit)}, ${focalPositionInPixel(attributes.imageMove.y, attributes.imagePositionUnit)})`,
                ...(isPixel) ? {
                    ...(isFluid) ? {
                        '--width-desktop': `${attributes.imageSizePixelDesktop}px`,
                        '--width-mobile': `${attributes.imageSizePixelMobile}px`,
                        '--width-difference': `${attributes.imageSizePixelDesktop - attributes.imageSizePixelMobile}`,
                    } : {
                        '--width': `${attributes.imageSizePixelDesktop}px`,
                    }
                } : {
                    '--width': `${attributes.imageSizePercent}%`,
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

