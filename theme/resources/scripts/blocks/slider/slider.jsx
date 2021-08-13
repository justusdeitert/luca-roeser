import {__} from '@wordpress/i18n';
import {registerBlockType,} from '@wordpress/blocks';
import {Button} from '@wordpress/components';
import {ToggleControl, RangeControl, SelectControl, PanelBody, ColorPalette, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup} from '@wordpress/components';
import {createElement, Component, useEffect} from '@wordpress/element';
import {InnerBlocks, RichText, MediaUpload, InspectorControls, getColorObjectByColorValue, useBlockProps, __experimentalUseInnerBlocksProps as useInnerBlocksProps} from '@wordpress/block-editor';
import classNames from 'classnames';
import {cloneArray, editorThemeColors, getColorObject, getImage, loremIpsum, updateInnerBlocks} from "../utility";
import {sliderIcon} from "../icons";

const attributes = {
    clientId: {
        type: 'string'
    },

    /**
     * Slider Properties
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

    /**
     * Slider Controls
     */
    controlsPosition: {
        type: 'string',
        default: 'bottom',
    },
    controlsStyle: {
        type: 'string',
        default: 'center',
    },
    showPagination: {
        type: 'boolean',
        default: true,
    },
    showArrows: {
        type: 'boolean',
        default: true,
    },
    controlsSize: {
        type: 'number',
        default: 16,
    },
    paginationSize: {
        type: 'number',
        default: 10,
    },
    arrowSize: {
        type: 'number',
        default: 32,
    },
}

const updateSlider = () => {
    setTimeout(() => {
        window.updateSliderBlockInstances();
    }, 300);
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
    // Access React Lifecycle Methods within gutenberg block
    // https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
    // https://dev.to/martinkr/create-a-wordpress-s-gutenberg-block-with-all-react-lifecycle-methods-in-5-minutes-213p
    edit: ({setAttributes, attributes, className, clientId}) => {

        /**
         * Init Slider only once when block loads!
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
                ['core/paragraph', {placeholder: loremIpsum, content: loremIpsum}]
            ]],
            ['custom/slider-inner', {}, [
                ['core/paragraph', {placeholder: loremIpsum, content: loremIpsum}]
            ]],
            ['custom/slider-inner', {}, [
                ['core/paragraph', {placeholder: loremIpsum, content: loremIpsum}],
            ]],
            ['custom/slider-inner', {}, [
                ['core/paragraph', {placeholder: loremIpsum, content: loremIpsum}],
            ]],
        ];

        const blockProps = useBlockProps({
            className: classNames('slider-block', 'custom-spacing', attributes.twoSlidesOnMobile && 'two-slides-on-mobile')
        });

        const innerBlocksProps = useInnerBlocksProps(blockProps, {
            allowedBlocks: ['custom/slider-inner'],
            orientation: 'horizontal', // default: 'vertical'
            template: TEMPLATE,
            // renderAppender: false
            // renderAppender: () => (
            //     <ButtonBlockAppender rootClientId={clientId} className={'lol'} />
            // )
        });

        const slideControls = () => {
            if ((attributes.showPagination || attributes.showArrows)) {
                return (
                    <div className={classNames("swiper-controls", `${attributes.controlsStyle}-position`)}
                         style={{'--slider-controls-size': `${attributes.controlsSize / 16}rem`}}
                    >
                        {attributes.showArrows &&
                        <>
                            <div className="swiper-button-prev">
                                <i className="icon-arrow-left"/>
                            </div>
                        </>
                        }
                        {attributes.showPagination &&
                        <>
                            <div className="swiper-pagination" />
                        </>
                        }
                        {attributes.showArrows &&
                        <>
                            <div className="swiper-button-next">
                                <i className="icon-arrow-right"/>
                            </div>
                        </>
                        }
                    </div>
                )
            }
        }

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
                        <p>{__('Slides per View', 'sage')}</p>
                        <RangeControl
                            value={attributes.slidesPerView}
                            min={1}
                            initialPosition={3}
                            max={4}
                            onChange={(value) => {
                                setAttributes({slidesPerView: value});
                                updateSlider();
                            }}
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
                    <PanelBody title={__('Slider Controls', 'sage')} initialOpen={false}>
                        <div style={{height: '20px'}}/>
                        <ToggleControl
                            label={__('Show Pagination', 'sage')}
                            checked={attributes.showPagination}
                            onChange={(value) => {
                                setAttributes({showPagination: value});
                                updateSlider();
                            }}
                        />
                        <ToggleControl
                            label={__('Show Arrows', 'sage')}
                            checked={attributes.showArrows}
                            onChange={(value) => {
                                setAttributes({showArrows: value});
                                updateSlider();
                            }}
                        />
                        {(attributes.showPagination || attributes.showArrows) &&
                        <>
                            <hr/>
                            <p>{__('Controls Size', 'sage')}</p>
                            <RangeControl
                                value={attributes.controlsSize}
                                min={8}
                                initialPosition={16}
                                max={36}
                                onChange={(value) => setAttributes({controlsSize: value})}
                            />
                            <hr/>
                            <p>{__('Controls Position', 'sage')}</p>
                            <RadioGroup
                                checked={attributes.controlsPosition}
                                onChange={(value) => {
                                    setAttributes({controlsPosition: value});
                                    updateSlider();
                                }}
                                defaultChecked={'bottom'}
                            >
                                <Radio value="top">{__('Top')}</Radio>
                                <Radio value="bottom">{__('Bottom')}</Radio>
                            </RadioGroup>
                            <hr/>
                            <p>{__('Controls Style', 'sage')}</p>
                            <RadioGroup
                                checked={attributes.controlsStyle}
                                onChange={(value) => setAttributes({controlsStyle: value})}
                                defaultChecked={'center'}
                            >
                                <Radio value="left">{__('Left')}</Radio>
                                <Radio value="center">{__('Center')}</Radio>
                                <Radio value="right">{__('Right')}</Radio>
                            </RadioGroup>
                        </>
                        }

                    </PanelBody>
                </InspectorControls>
                <div {...innerBlocksProps}
                     data-slides-per-view={attributes.slidesPerView}
                     data-slider-id={attributes.clientId}
                     data-slider-loop={false}
                     data-slider-autoplay={attributes.sliderAutoplaySeconds ? attributes.sliderAutoplaySeconds * 1000 : false}
                >
                    <div className="swiper-container slider-block__container">
                        {attributes.controlsPosition === 'top' &&
                        slideControls()
                        }
                        <div className="swiper-wrapper slider-block__slides-wrapper">
                            {innerBlocksProps.children}
                        </div>
                        {attributes.controlsPosition === 'bottom' &&
                        slideControls()
                        }
                    </div>
                </div>
            </>
        )
    },

    save: ({className, attributes}) => {

        const blockProps = useBlockProps.save({
            className: classNames(className, 'slider-block', 'custom-spacing', attributes.twoSlidesOnMobile && 'two-slides-on-mobile')
        });

        const slideControls = () => {
            if ((attributes.showPagination || attributes.showArrows)) {
                return (
                    <div className={classNames("swiper-controls", `${attributes.controlsStyle}-position`)}
                         style={{'--slider-controls-size': `${attributes.controlsSize / 16}rem`}}
                    >
                        {attributes.showArrows &&
                        <>
                            <div className="swiper-button-prev">
                                <i className="icon-arrow-left"/>
                            </div>
                        </>
                        }
                        {attributes.showPagination &&
                        <>
                            <div className="swiper-pagination" />
                        </>
                        }
                        {attributes.showArrows &&
                        <>
                            <div className="swiper-button-next">
                                <i className="icon-arrow-right"/>
                            </div>
                        </>
                        }
                    </div>
                )
            }
        }

        return (
            <div {...blockProps}
                 data-slides-per-view={attributes.slidesPerView}
                 data-slider-id={attributes.clientId}
                 data-slider-loop={attributes.sliderLoop}
                 data-slider-autoplay={attributes.sliderAutoplaySeconds ? attributes.sliderAutoplaySeconds * 1000 : false}
            >
                <div className="swiper-container slider-block__container">
                    {attributes.controlsPosition === 'top' &&
                    slideControls()
                    }
                    <div className="swiper-wrapper slider-block__slides-wrapper">
                        <InnerBlocks.Content/>
                    </div>
                    {attributes.controlsPosition === 'bottom' &&
                    slideControls()
                    }
                </div>
            </div>
        )
    },
});
