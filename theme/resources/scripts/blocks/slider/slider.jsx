/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Wordpress dependencies
 */
import {__} from '@wordpress/i18n';
import {registerBlockType,} from '@wordpress/blocks';
import {
    Button,
    ToggleControl,
    RangeControl,
    SelectControl,
    PanelBody,
    ColorPalette,
    __experimentalRadio as Radio,
    __experimentalRadioGroup as RadioGroup,
    __experimentalAlignmentMatrixControl as AlignmentMatrixControl
} from '@wordpress/components';
import {createElement, Component, useEffect} from '@wordpress/element';
import {
    InnerBlocks,
    RichText,
    MediaUpload,
    InspectorControls,
    getColorObjectByColorValue,
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {
    cloneArray,
    editorThemeColors,
    getColorObject,
    getImage,
    loremIpsum,
    updateInnerBlocks,
    isDefined
} from "../utility";
import {
    slider as sliderIcon
} from "../custom-icons";

/**
 * Block attributes
 */
const attributes = {
    /**
     * Core attibutes
     */
    clientId: {
        type: 'string'
    },

    /**
     * Slider properties
     */
    sliderLoop: {
        type: 'boolean',
        default: false,
    },
    sliderAutoplaySeconds: {
        type: 'number',
        default: false,
    },
    slidesPerView: {
        type: 'number',
        default: 3,
    },
    slidesBackgroundColor: {
        type: 'string',
        default: '',
    },
    twoSlidesOnMobile: {
        type: 'boolean',
        default: false,
    },
    sliderGutter: {
        type: 'number',
        default: false,
    },

    /**
     * Slider controls
     */
    controlsSize: {
        type: 'number',
        default: 42,
    },
    controlsOffset: {
        type: 'boolean',
        default: true,
    },
    showPagination: {
        type: 'boolean',
        default: true,
    },
    paginationPosition: {
        type: 'string',
        default: 'bottom right',
    },
    showArrows: {
        type: 'boolean',
        default: true,
    },
    arrowsPosition: {
        type: 'string',
        default: 'bottom left',
    },
}

/**
 * Custom functions
 */
const updateSlider = () => {
    setTimeout(() => {
        window.updateSliderBlockInstances();
    }, 300);
}

const getPosition = (matrix) => {
    let splitMatrix = matrix.split(' ');

    return {
        y: splitMatrix[0],
        x: splitMatrix[1],
    }
}

const returnStylesY = (positionString) => {
    switch (positionString) {
        case 'top':
            return {top: 0, transform: 'translateY(-100%)'};
        case 'center':
            return {top: '50%', transform: 'translateY(-50%)'};
        case 'bottom':
            return {bottom: 0, transform: 'translateY(100%)'};
        default:
            return {top: 0, transform: 'translateY(100%)'};
    }
};

const returnStylesX = (positionString) => {
    switch (positionString) {
        case 'left':
            return {marginRight: 'auto'};
        case 'center':
            return {marginLeft: 'auto', marginRight: 'auto'};
        case 'right':
            return {marginLeft: 'auto'};
        default:
            return {marginRight: 'auto'};
    }
};

let returnOffsetClass = (name, isShown, position) => {
    let verticalPosition = getPosition(position).y
    if (name && isShown && position) {
        return `${name}-${verticalPosition}`
    }
    return '';
}

let autoplayTreshold = true;

registerBlockType('custom/slider', {
    apiVersion: 2,
    title: __('Slider', 'sage'),
    icon: sliderIcon,
    category: 'custom',
    supports: {
        align: ['wide', 'full'],
    },
    attributes,
    edit: ({setAttributes, attributes, clientId}) => {

        /**
         * Init slider only once when block loads!
         */
        if (!window.sliderBlockInstances[clientId]) {
            window.initSliderBlockInstances();
        }

        /**
         * Prev & Next button controls
         */
        const slideNext = () => {
            window.sliderBlockInstances[attributes.clientId].slideNext(300);
        };

        const slidePrev = () => {
            window.sliderBlockInstances[attributes.clientId].slidePrev(300);
        };

        attributes.clientId = clientId;

        const TEMPLATE = [
            ['custom/slider-inner', {}, [
                ['core/paragraph']
            ]],
            ['custom/slider-inner', {}, [
                ['core/paragraph']
            ]],
            ['custom/slider-inner', {}, [
                ['core/paragraph'],
            ]],
            ['custom/slider-inner', {}, [
                ['core/paragraph'],
            ]],
        ];

        const blockProps = useBlockProps({
            className: classNames(
                'slider-block',
                attributes.twoSlidesOnMobile && 'two-slides-on-mobile',
                returnOffsetClass('arrows', attributes.showArrows, attributes.arrowsPosition),
                returnOffsetClass('pagination', attributes.showPagination, attributes.paginationPosition),
                attributes.controlsOffset && 'controls-offset',
            ),
            style: {
                ...(attributes.sliderGutter !== false && attributes.sliderGutter !== undefined) && {
                    '--custom-gutter-desktop': `${attributes.sliderGutter / 16}em`,
                    '--custom-gutter-mobile': `${attributes.sliderGutter / 16}em`
                },
                '--slider-controls-size': `${attributes.controlsSize}px`
            }
        });

        // TODO: Currently AppenderButton is not shown!!! FIX FIX FIX
        const innerBlocksProps = useInnerBlocksProps(blockProps, {
            allowedBlocks: ['custom/slider-inner'],
            orientation: 'horizontal', // default: 'vertical'
            template: TEMPLATE,
            // renderAppender: false
            // renderAppender: () => (
            //     <ButtonBlockAppender rootClientId={clientId} className={'lol'} />
            // )
        });

        return (
            <>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <Button icon={'arrow-left'}
                                className={'is-secondary'}
                                onClick={slidePrev}
                                text={__('Prev', 'sage')}
                                iconPosition={'left'}
                                style={{float: 'left', width: 'initial', padding: 6}}

                        />
                        <Button icon={'arrow-right'}
                                className={'is-secondary'}
                                onClick={slideNext}
                                text={__('Next', 'sage')}
                                iconPosition={'right'}
                                style={{marginLeft: '10px', width: 'initial', padding: 6}}
                        />
                        <hr/>
                        <ToggleControl
                            label={__('Loop', 'sage')}
                            help={__('Enable continuous loop mode (does not apply on the editor)', 'sage')}
                            checked={attributes.sliderLoop}
                            onChange={(value) => {
                                setAttributes({sliderLoop: value});
                                updateSlider();
                            }}
                        />
                        <hr/>
                        <p>{__('Slides per view', 'sage')}</p>
                        <RadioGroup
                            onChange={(value) => {
                                setAttributes({slidesPerView: value});
                                updateSlider();
                            }}
                            checked={attributes.slidesPerView}
                            defaultChecked={3}
                        >
                            <Radio value={1}>1</Radio>
                            <Radio value={2}>2</Radio>
                            <Radio value={3}>3</Radio>
                            <Radio value={4}>4</Radio>
                        </RadioGroup>
                        <hr/>
                        <p>{__('Autoplay Seconds', 'sage')}</p>
                        <RangeControl
                            value={attributes.sliderAutoplaySeconds}
                            min={1}
                            // initialPosition={false}
                            step={0.1}
                            max={15}
                            onChange={(value) => {
                                setAttributes({sliderAutoplaySeconds: value});

                                if (autoplayTreshold) {
                                    updateSlider();
                                    autoplayTreshold = false;

                                    setTimeout(() => {
                                        autoplayTreshold = true;
                                    }, 500);
                                }
                            }}
                            allowReset={true}
                            resetFallbackValue={false}
                        />
                        <hr/>
                        <p>{__('Gutter', 'sage')}</p>
                        <RangeControl
                            value={attributes.sliderGutter}
                            onChange={(value) => {
                                setAttributes({sliderGutter: value});
                            }}
                            min={0}
                            max={80}
                            step={1}
                            allowReset={true}
                            resetFallbackValue={false}
                        />
                        <hr/>
                        <ToggleControl
                            label={__('Two Slides on Mobile', 'sage')}
                            help={__('On activation the slider will show two slides on the second smallest breakpoint', 'sage')}
                            checked={attributes.twoSlidesOnMobile}
                            onChange={(value) => {
                                setAttributes({twoSlidesOnMobile: value});
                                updateSlider();
                            }}
                        />
                        <hr/>
                        <p>{__('Slides Background Color', 'sage')}</p>
                        <ColorPalette
                            colors={[...editorThemeColors]}
                            disableCustomColors={true}
                            value={attributes.slidesBackgroundColor}
                            onChange={(value) => {
                                setAttributes({slidesBackgroundColor: value});
                                updateInnerBlocks(clientId);
                            }}
                        />
                    </div>
                    <PanelBody title={__('Controls', 'sage')} initialOpen={false}>
                        <p>{__('Controls size', 'sage')}</p>
                        <RangeControl
                            value={attributes.controlsSize}
                            min={8}
                            max={86}
                            onChange={(value) => setAttributes({controlsSize: value})}
                            allowReset={true}
                            resetFallbackValue={42}
                        />
                        <hr/>
                        <ToggleControl
                            label={__('Has offset', 'sage')}
                            checked={attributes.controlsOffset}
                            onChange={(value) => {
                                setAttributes({controlsOffset: value});
                            }}
                        />
                        <hr/>
                        <ToggleControl
                            label={__('Show pagination', 'sage')}
                            checked={attributes.showPagination}
                            onChange={(value) => {
                                setAttributes({showPagination: value});
                                updateSlider();
                            }}
                        />
                        {attributes.showPagination && <>
                            <AlignmentMatrixControl
                                value={attributes.paginationPosition}
                                onChange={(value) => setAttributes({paginationPosition: value})}
                            />
                        </>}
                        <hr/>
                        <ToggleControl
                            label={__('Show Arrows', 'sage')}
                            checked={attributes.showArrows}
                            onChange={(value) => {
                                setAttributes({showArrows: value});
                                updateSlider();
                            }}
                        />
                        {attributes.showArrows && <>
                            <ToggleControl
                                label={__('100%', 'sage')}
                                checked={attributes.arrowsWidth}
                                onChange={(value) => {
                                    setAttributes({arrowsWidth: value});
                                }}
                            />
                            <AlignmentMatrixControl
                                value={attributes.arrowsPosition}
                                onChange={(value) => setAttributes({arrowsPosition: value})}
                            />
                        </>}
                    </PanelBody>
                </InspectorControls>
                <div {...innerBlocksProps}
                     data-slides-per-view={attributes.slidesPerView}
                     data-slider-id={attributes.clientId}
                     data-slider-loop={false}
                     data-slider-autoplay={attributes.sliderAutoplaySeconds ? attributes.sliderAutoplaySeconds * 1000 : false}
                >
                    <div className="slider-block__inner">
                        {attributes.showPagination && <>
                            <div className="swiper-pagination__wrapper" style={{
                                ...returnStylesY(getPosition(attributes.paginationPosition).y),
                                pointerEvents: 'none'
                            }}>
                                <div className="swiper-pagination" style={{
                                    ...returnStylesX(getPosition(attributes.paginationPosition).x)
                                }}/>
                            </div>
                        </>}

                        {attributes.showArrows && <>
                            <div className="swiper-arrows__wrapper" style={{
                                ...returnStylesY(getPosition(attributes.arrowsPosition).y),
                                pointerEvents: 'none'
                            }}>
                                <div className="swiper-arrows" style={{
                                    ...returnStylesX(getPosition(attributes.arrowsPosition).x),
                                    ...attributes.arrowsWidth && {
                                        width: '100%'
                                    }
                                }}>
                                    <div className="swiper-button-prev">
                                        <i className="icon-arrow-left"/>
                                    </div>
                                    <div className="swiper-button-next">
                                        <i className="icon-arrow-right"/>
                                    </div>
                                </div>
                            </div>
                        </>}

                        <div className="swiper-container slider-block__container">
                            <div className="swiper-wrapper slider-block__slides-wrapper">
                                {innerBlocksProps.children}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    },

    save: ({attributes}) => {

        const blockProps = useBlockProps.save({
            className: classNames(
                'slider-block',
                attributes.twoSlidesOnMobile && 'two-slides-on-mobile',
                returnOffsetClass('arrows', attributes.showArrows, attributes.arrowsPosition),
                returnOffsetClass('pagination', attributes.showPagination, attributes.paginationPosition),
                attributes.controlsOffset && 'controls-offset',
            ),
            style: {
                ...isDefined(attributes.sliderGutter) && {
                    '--custom-gutter-desktop': `${attributes.sliderGutter / 16}em`,
                    '--custom-gutter-mobile': `${attributes.sliderGutter / 16}em`
                },
                '--slider-controls-size': `${attributes.controlsSize}px`
            }
        });

        return (
            <div {...blockProps}
                 data-slides-per-view={attributes.slidesPerView}
                 data-slider-id={attributes.clientId}
                 data-slider-loop={attributes.sliderLoop}
                 data-slider-autoplay={attributes.sliderAutoplaySeconds ? attributes.sliderAutoplaySeconds * 1000 : false}
            >
                <div className="slider-block__inner">
                    {attributes.showPagination && <>
                        <div className="swiper-pagination__wrapper" style={{
                            ...returnStylesY(getPosition(attributes.paginationPosition).y),
                        }}>
                            <div className="swiper-pagination" style={{
                                ...returnStylesX(getPosition(attributes.paginationPosition).x)
                            }}/>
                        </div>
                    </>}

                    {attributes.showArrows && <>
                        <div className="swiper-arrows__wrapper" style={{
                            ...returnStylesY(getPosition(attributes.arrowsPosition).y),
                        }}>
                            <div className="swiper-arrows" style={{
                                ...returnStylesX(getPosition(attributes.arrowsPosition).x),
                                ...attributes.arrowsWidth && {
                                    width: '100%'
                                }
                            }}>
                                <div className="swiper-button-prev">
                                    <i className="icon-arrow-left"/>
                                </div>
                                <div className="swiper-button-next">
                                    <i className="icon-arrow-right"/>
                                </div>
                            </div>
                        </div>
                    </>}

                    <div className="swiper-container slider-block__container">
                        <div className="swiper-wrapper slider-block__slides-wrapper">
                            <InnerBlocks.Content/>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
});
