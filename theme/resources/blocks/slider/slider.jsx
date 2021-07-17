import {__} from '@wordpress/i18n';
import {registerBlockType,} from '@wordpress/blocks';
import {Button} from '@wordpress/components';
import {ToggleControl, RangeControl, SelectControl, PanelBody, ColorPalette} from '@wordpress/components';
import {createElement, Component, useEffect} from '@wordpress/element';
import {InnerBlocks, RichText, MediaUpload, InspectorControls, getColorObjectByColorValue, useBlockProps, __experimentalUseInnerBlocksProps as useInnerBlocksProps, ButtonBlockAppender} from '@wordpress/block-editor';
import classNames from 'classnames';
import {cloneArray, editorThemeColors, getColorObject, getImage, loremIpsum} from "../utility";
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
    slidesPerView: {
        type: 'number',
        default: 3,
    },
    slidesBackgroundColor: {
        type: 'string',
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
    paginationSize: {
        type: 'number',
        default: 10,
    },
    showArrows: {
        type: 'boolean',
        default: true,
    },
    arrowSize: {
        type: 'number',
        default: 32,
    },

    /**
     * Text Properties
     */
    sliderShowTextWrapper: {
        type: 'boolean',
        default: true,
    },
    sliderShowHeadline: {
        type: 'boolean',
        default: true,
    },
    headlineType: {
        type: 'string',
        default: 'h5'
    },
    // minimalTextHeight: {
    //     type: 'number',
    //     default: 110
    // },
    centerText: {
        type: 'boolean',
        default: false
    },

    /**
     * Image Properties
     */
    sliderShowImages: {
        type: 'boolean',
        default: true,
    },
    sliderImagesRatio: {
        type: 'string',
        default: '4x3',
    },
}

// let getInnerBlockLength = (blockList, blockName) => {
//     let filteredBlockList = blockList.filter(block => {
//         return block.name === blockName;
//     });
//
//     let innerBlockCount = filteredBlockList.map(block => {
//         return block.innerBlocks.length;
//     });
//
//     return innerBlockCount;
// }


// const getBlockList = () => wp.data.select('core/editor').getBlocks();
// let blockList = getBlockList();
//
// wp.data.subscribe(() => {
//     let newBlockList = getBlockList();
//     // let newBlockListInnerLength = getInnerBlockLength(newBlockList, 'custom/slider');
//     // let blockListInnerLength = getInnerBlockLength(blockList, 'custom/slider');
//     let blockListChanged = newBlockList !== blockList;
//
//     blockList = newBlockList;
//
//     if (blockListChanged) {
//         console.log('change');
//
//         // setTimeout(() => {
//         //     window.updateSliderBlockInstances();
//         // }, 500)
//
//         window.updateSliderBlockInstances();
//     }
// });

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


        // useEffect(() => {
        //     console.log('Parent Inserted');
        //     return () => {
        //         console.log('Parent Removed');
        //     };
        // }, []);

        /**
         * Init Slider only once when block loads!
         */
        if (!window.sliderBlockInstances[clientId]) {
            window.initSliderBlockInstances();
        }

        /**
         * Slider Properties
         */
        const onChangeSliderLoop = (value) => {
            setAttributes({sliderLoop: value});

            setTimeout(() => {
                window.updateSliderBlockInstances();
            }, 300)
        };

        const onChangeSlidesPerView = (value) => {
            setAttributes({slidesPerView: value});

            setTimeout(() => {
                window.updateSliderBlockInstances();
            }, 300)
        };

        const onChangeSlidesBackgroundColor = (value) => {
            setAttributes({slidesBackgroundColor: value});
        };

        /**
         * Slider Controls
         */
        const onChangeControlsPosition = (value) => {
            setAttributes({controlsPosition: value});

            setTimeout(() => {
                window.updateSliderBlockInstances();
            }, 300)
        };

        const onChangeControlsStyle = (value) => {
            setAttributes({controlsStyle: value});
        };

        const onChangeShowPagination = (value) => {
            setAttributes({showPagination: value});

            setTimeout(() => {
                window.updateSliderBlockInstances();
            }, 300)
        };

        const onChangePaginationSize = (value) => {
            setAttributes({paginationSize: value});
        };

        const onChangeShowArrows = (value) => {
            setAttributes({showArrows: value});
        };

        const onChangeArrowSize = (value) => {
            setAttributes({arrowSize: value});
        };

        /**
         * Text Properties
         */
        const onChangeSliderShowTextWrapper = (value) => {
            setAttributes({sliderShowTextWrapper: value});
        };

        const onChangeSliderShowHeadline = (value) => {
            setAttributes({sliderShowHeadline: value});
        };

        const onChangeHeadlineType = (value) => {
            setAttributes({headlineType: value});
        };

        const onChangeCenterText = (value) => {
            setAttributes({centerText: value});
        };

        /**
         * Image Properties
         */

        const onChangeSliderShowImages = (value) => {
            setAttributes({sliderShowImages: value});
        };

        const onChangeSliderImagesRatio = (value) => {
            setAttributes({sliderImagesRatio: value});
        };

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
            className: classNames('slider-block', 'custom-spacing')
        });

        const innerBlocksProps = useInnerBlocksProps(blockProps, {
            allowedBlocks: ['custom/slider-inner'],
            orientation: 'horizontal', // default: 'vertical'
            template: TEMPLATE,
            renderAppender: false
            // renderAppender: () => (
            //     <div className="swiper-slide slider-block__slide">
            //         <ButtonBlockAppender />
            //     </div>
            // )
            // renderAppender: () => (
            //     <ButtonBlockAppender rootClientId={clientId} className={'lol'} />
            // )
        });

        const slideControls = () => {
            if ((attributes.showPagination || attributes.showArrows)) {
                return (
                    <div className={classNames("swiper-controls", `${attributes.controlsStyle}-position`)}>
                        {attributes.showArrows &&
                        <div className="swiper-button-prev">
                            <i className="icon-arrow-left" style={{fontSize: `${attributes.arrowSize / 16}rem`}}/>
                        </div>
                        }
                        {attributes.showPagination &&
                        <>
                            <style>{`
                                .slider-block .swiper-pagination-bullet {
                                    width: ${attributes.paginationSize}px !important;
                                    min-width: ${attributes.paginationSize}px !important;
                                    height: ${attributes.paginationSize}px !important;
                                }
                            `}</style>
                            <div className="swiper-pagination"/>
                        </>
                        }
                        {attributes.showArrows &&
                        <div className="swiper-button-next">
                            <i className="icon-arrow-right" style={{fontSize: `${attributes.arrowSize / 16}rem`}}/>
                        </div>
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
                                className={'button'}
                                onClick={slidePrev}
                                iconPosition={'left'}
                                text={__('Slide Prev', 'sage')}
                        />
                        <Button icon={'arrow-right'}
                                className={'button'}
                                onClick={slideNext}
                                iconPosition={'right'}
                                text={__('Slide Next', 'sage')}
                                style={{marginLeft: '10px'}}
                        />
                    </div>
                    <PanelBody title={__('Slider Properties', 'sage')} initialOpen={true}>
                        <hr/>
                        <ToggleControl
                            label={__('Loop Slider', 'sage')}
                            // help={ attributes.withHeadline ? 'Image is left' : 'Image is right' }
                            checked={attributes.sliderLoop}
                            onChange={onChangeSliderLoop}
                        />
                        <hr/>
                        <p>{__('Slides per View', 'sage')}</p>
                        <RangeControl
                            value={attributes.slidesPerView}
                            min={1}
                            initialPosition={3}
                            max={4}
                            onChange={onChangeSlidesPerView}
                        />
                        <hr/>
                        <p>{__('Slides Background Color', 'sage')}</p>
                        <ColorPalette
                            colors={[...editorThemeColors]}
                            value={attributes.slidesBackgroundColor}
                            onChange={onChangeSlidesBackgroundColor}
                        />
                    </PanelBody>
                    <PanelBody title={__('Slider Controls', 'sage')} initialOpen={false}>
                        <hr/>
                        <p>{__('Controls Position', 'sage')}</p>
                        <SelectControl
                            value={attributes.controlsPosition}
                            options={[
                                {label: __('Top'), value: 'top'},
                                {label: __('Bottom'), value: 'bottom'},
                            ]}
                            onChange={onChangeControlsPosition}
                        />
                        <hr/>
                        <p>{__('Controls Style', 'sage')}</p>
                        <SelectControl
                            value={attributes.controlsStyle}
                            options={[
                                {label: __('Left'), value: 'left'},
                                {label: __('Right'), value: 'right'},
                                {label: __('Center'), value: 'Center'},
                            ]}
                            onChange={onChangeControlsStyle}
                        />
                        <hr/>
                        <ToggleControl
                            label={__('Show Pagination', 'sage')}
                            // help={ attributes.withHeadline ? 'Image is left' : 'Image is right' }
                            checked={attributes.showPagination}
                            onChange={onChangeShowPagination}
                        />
                        {attributes.showPagination &&
                        <>
                            <hr/>
                            <p>{__('Pagination Size', 'sage')}</p>
                            <RangeControl
                                value={attributes.paginationSize}
                                min={10}
                                initialPosition={10}
                                max={20}
                                onChange={onChangePaginationSize}
                            />
                        </>
                        }
                        <hr/>
                        <ToggleControl
                            label={__('Show Arrows', 'sage')}
                            // help={ attributes.withHeadline ? 'Image is left' : 'Image is right' }
                            checked={attributes.showArrows}
                            onChange={onChangeShowArrows}
                        />
                        {attributes.showArrows &&
                        <>
                            <hr/>
                            <p>{__('Arrow Size', 'sage')}</p>
                            <RangeControl
                                value={attributes.arrowSize}
                                min={24}
                                initialPosition={40}
                                max={96}
                                onChange={onChangeArrowSize}
                            />

                        </>
                        }
                    </PanelBody>
                    <PanelBody title={__('Text Properties', 'sage')} initialOpen={false}>
                        <hr/>
                        <ToggleControl
                            label={__('Show Text Wrapper', 'sage')}
                            // help={ attributes.withHeadline ? 'Image is left' : 'Image is right' }
                            checked={attributes.sliderShowTextWrapper}
                            onChange={onChangeSliderShowTextWrapper}
                        />
                        {attributes.sliderShowTextWrapper &&
                        <>
                            <hr/>
                            <ToggleControl
                                label={__('Show Headline', 'sage')}
                                // help={ attributes.withHeadline ? 'Image is left' : 'Image is right' }
                                checked={attributes.sliderShowHeadline}
                                onChange={onChangeSliderShowHeadline}
                            />
                            {attributes.sliderShowHeadline &&
                            <>
                                <hr/>
                                <p>{__('Headline Type', 'sage')}</p>
                                <SelectControl
                                    value={attributes.headlineType}
                                    options={[
                                        {label: __('H4'), value: 'h4'},
                                        {label: __('H5'), value: 'h5'},
                                        {label: __('H6'), value: 'h6'},
                                    ]}
                                    onChange={onChangeHeadlineType}
                                />
                            </>
                            }
                            <hr/>
                            <ToggleControl
                                label={__('Center Text', 'sage')}
                                // help={ attributes.sliderShowImages ? 'Image is left' : 'Image is right' }
                                checked={attributes.centerText}
                                onChange={onChangeCenterText}
                            />
                        </>
                        }

                    </PanelBody>
                    <PanelBody title={__('Image Properties', 'sage')} initialOpen={false}>
                        <hr/>
                        <ToggleControl
                            label={__('Show Images', 'sage')}
                            // help={ attributes.sliderShowImages ? 'Image is left' : 'Image is right' }
                            checked={attributes.sliderShowImages}
                            onChange={onChangeSliderShowImages}
                        />
                        {attributes.sliderShowImages &&
                        <>
                            <hr/>
                            <p>{__('Images Ratio', 'sage')}</p>
                            <SelectControl
                                value={attributes.sliderImagesRatio}
                                options={[
                                    {label: __('1x1'), value: '1x1'},
                                    {label: __('4x3'), value: '4x3'},
                                    {label: __('3x2'), value: '3x2'},
                                    {label: __('16x9'), value: '16x9'},
                                    {label: __('21x9'), value: '21x9'},
                                ]}
                                onChange={onChangeSliderImagesRatio}
                            />
                        </>
                        }
                    </PanelBody>
                </InspectorControls>
                <div {...innerBlocksProps}
                     data-slides-per-view={attributes.slidesPerView}
                     data-slider-id={attributes.clientId}
                     data-slider-loop={attributes.sliderLoop}
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
            className: classNames(className, 'slider-block', 'custom-spacing')
        });

        const slideControls = () => {
            if ((attributes.showPagination || attributes.showArrows)) {
                return (
                    <div className={classNames("swiper-controls", `${attributes.controlsStyle}-position`)}>
                        {attributes.showArrows &&
                        <div className="swiper-button-prev">
                            <i className="icon-arrow-left" style={{fontSize: `${attributes.arrowSize / 16}rem`}}/>
                        </div>
                        }
                        {attributes.showPagination &&
                        <>
                            <style>{`
                                    .slider-block .swiper-pagination-bullet {
                                        width: ${attributes.paginationSize}px !important;
                                        min-width: ${attributes.paginationSize}px !important;
                                        height: ${attributes.paginationSize}px !important;
                                    }
                                `}</style>
                            <div className="swiper-pagination"/>
                        </>
                        }
                        {attributes.showArrows &&
                        <div className="swiper-button-next">
                            <i className="icon-arrow-right" style={{fontSize: `${attributes.arrowSize / 16}rem`}}/>
                        </div>
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
            >
                <div className="swiper-container slider-block__container">
                    {attributes.controlsPosition === 'top' &&
                        slideControls()
                    }
                    <div className="swiper-wrapper slider-block__slides-wrapper">
                        <InnerBlocks.Content />
                    </div>
                    {attributes.controlsPosition === 'bottom' &&
                        slideControls()
                    }
                </div>
            </div>
        )
    },
});
