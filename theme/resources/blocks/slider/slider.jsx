import {__} from '@wordpress/i18n';
import {registerBlockType,} from '@wordpress/blocks';
import {Button} from '@wordpress/components';
import {ToggleControl, RangeControl, SelectControl, PanelBody, ColorPalette} from '@wordpress/components';
import {createElement, Component} from '@wordpress/element';
import {RichText, MediaUpload, InspectorControls, getColorObjectByColorValue} from '@wordpress/block-editor';
import classNames from 'classnames';
import {cloneArray, editorThemeColors, getImage} from "../utility";

const blockIcon = createElement('svg', {width: 20, height: 20},
    createElement('path', {
        d: 'M14.9333333,10.7733333 L14.9333333,2.45333333 C14.9333333,1.6872 14.3128,1.06666667 13.5466667,1.06666667 L5.22666667,1.06666667 C4.46053333,1.06666667 3.84,1.6872 3.84,2.45333333 L3.84,10.7733333 C3.84,11.5394667 4.46053333,12.16 5.22666667,12.16 L13.5466667,12.16 C14.3128,12.16 14.9333333,11.5394667 14.9333333,10.7733333 Z M7.30666667,8 L8.71413333,9.87893333 L10.7733333,7.30666667 L13.5466667,10.7733333 L5.22666667,10.7733333 L7.30666667,8 Z M1.06666667,3.84 L1.06666667,13.5466667 C1.06666667,14.3128 1.6872,14.9333333 2.45333333,14.9333333 L12.16,14.9333333 L12.16,13.5466667 L2.45333333,13.5466667 L2.45333333,3.84 L1.06666667,3.84 Z'
    })
);

const attributes = {
    blockId: {
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

    /**
     * Slider Items
     */
    sliderItems: {
        type: 'array',
        default: [
            {
                headline: __('The Headline...', 'sage'),
                text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
                slideImage: false
            },
            {
                headline: __('The Headline...', 'sage'),
                text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
                slideImage: false
            },
            {
                headline: __('The Headline...', 'sage'),
                text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
                slideImage: false
            },
        ],
    }
}

registerBlockType('custom/slider', {
    title: __('Slider', 'sage'),
    icon: blockIcon,
    category: 'custom',
    // supports: {
    //     align: ['wide'],
    // },
    attributes,
    // Access React Lifecycle Methods within gutenberg block
    // https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
    // https://dev.to/martinkr/create-a-wordpress-s-gutenberg-block-with-all-react-lifecycle-methods-in-5-minutes-213p
    edit: class extends Component {

        //standard constructor for a component
        constructor() {
            super(...arguments);
            // console.log(this.props.name, ": constructor()");

            // example how to bind `this` to the current component for our callbacks
            this.onChangeContent = this.onChangeContent.bind(this);

            // some place for your state
            this.state = {};
        }

        componentDidMount() {
            // console.log(this.props.name, ": componentDidMount()");
            window.initSliderBlockInstances();
        }

        componentDidUpdate() {
            // console.log(this.props.name, ": componentDidUpdate()");
        }

        componentWillUnmount() {
            // console.log(this.props.name, ": componentWillUnmount()");
        }

        // update attributes when content is updated
        onChangeContent(data) {
            // set attribute the react way
            this.props.setAttributes({content: data});
        }

        render() {

            let {attributes, className, setAttributes, clientId} = this.props;

            const slidesBackgroundColor = getColorObjectByColorValue(editorThemeColors, attributes.slidesBackgroundColor);

            const repeaterSlides = attributes.sliderItems.map((item, index) => {

                const onChangeHeadline = (value) => {

                    // Iterate through sliderItems and only change value of selected item
                    attributes.sliderItems.map((innerItem, innerIndex) => {
                        if (innerIndex === index) {
                            innerItem.headline = value;
                        }
                    });

                    setAttributes({
                        sliderItems: cloneArray(attributes.sliderItems) // Again... Clone Array to fire reload in Editor
                    });
                };

                const onChangeText = (value) => {
                    // Iterate through sliderItems and only change value of selected item
                    attributes.sliderItems.map((innerItem, innerIndex) => {
                        if (innerIndex === index) {
                            innerItem.text = value;
                        }
                    });

                    setAttributes({
                        sliderItems: cloneArray(attributes.sliderItems) // Again Clone Array to reload in Editor
                    });
                };

                const onSelectImage = (image) => {
                    // Iterate through sliderItems and only change value of selected item
                    attributes.sliderItems.map((innerItem, innerIndex) => {
                        if (innerIndex === index) {
                            innerItem.slideImage = image;
                        }
                    });

                    setAttributes({
                        sliderItems: cloneArray(attributes.sliderItems) // Again Clone Array to reload in Editor
                    });
                };

                const addElementAfter = (index) => {

                    let newItem = {
                        headline: __('The Headline...', 'sage'),
                        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
                        slideImage: false
                    };

                    attributes.sliderItems.splice(index + 1, 0, newItem) // Adds the new Item at position

                    setAttributes({
                        sliderItems: [...attributes.sliderItems] // Replace With cool spread operator!!
                    });

                    setTimeout(() => {
                        window.sliderBlockInstances[attributes.blockId].updateSlides()

                        // slide to last if added at last position
                        if (attributes.sliderItems.length - 1 === index + 1) {
                            window.sliderBlockInstances[attributes.blockId].slideTo(index, 0);
                        }
                    }, 300)
                };

                const removeElement = (index) => {
                    // let arrayPop = attributes.sliderItems.pop(); // Remove last Array Element
                    attributes.sliderItems.splice(index, 1) // Removes item from position

                    setAttributes({
                        sliderItems: [...attributes.sliderItems] // Clone Array Otherwise there is not reload
                    });

                    setTimeout(() => {
                        window.sliderBlockInstances[attributes.blockId].updateSlides();

                        // slide to second last if removed at last position
                        if (attributes.sliderItems.length === index) {
                            window.sliderBlockInstances[attributes.blockId].slideTo(index, 0);
                        }
                    }, 300)
                };

                return (
                    <div key={index} className={'swiper-slide slider-block__slide'}>
                        <div
                            className={classNames('slider-block__slide-inner', 'custom-border', 'custom-border-radius', 'custom-shadow', slidesBackgroundColor && `has-${slidesBackgroundColor.slug}-background-color`)}>
                            <Button icon={'plus'}
                                    isSmall={true}
                                    className={'button button--icon-only'}
                                // label={__('Add Item after', 'sage')}
                                    onClick={() => {
                                        addElementAfter(index)
                                    }}
                                    style={{
                                        position: 'absolute',
                                        right: '-15px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        zIndex: '100',
                                    }}
                            />
                            <Button icon={'minus'}
                                    isSmall={true}
                                    className={'button button--icon-only'}
                                // label={__('Add Item after', 'sage')}
                                    onClick={() => removeElement(index)}
                                    style={{
                                        position: 'absolute',
                                        left: '20px',
                                        top: '20px',
                                        zIndex: '100',
                                    }}
                            />
                            {attributes.sliderShowImages &&
                            <div
                                className={classNames('slider-block__image-wrapper', `ratio ratio-${attributes.sliderImagesRatio}`)}>
                                <img alt={getImage(item.slideImage, 'alt')}
                                     src={getImage(item.slideImage, 'medium', index)}
                                     className={classNames('slider-block__image', 'custom-border-radius')}
                                />

                                <MediaUpload
                                    onSelect={onSelectImage}
                                    allowedTypes="image"
                                    // value={item.imageID}
                                    render={({open}) => (
                                        <div>
                                            <Button className={'button'}
                                                    onClick={open}
                                                    icon={'format-image'}
                                                    isSmall={true}
                                                    style={{
                                                        position: 'absolute',
                                                        right: '10px',
                                                        top: '10px'
                                                    }}
                                            />
                                        </div>
                                    )}
                                />
                            </div>
                            }
                            {attributes.sliderShowTextWrapper &&
                            <div className={'slider-block__text-wrapper'}
                                 style={{
                                     // minHeight: `${attributes.minimalTextHeight}px`,
                                     alignItems: attributes.centerText ? 'center' : 'flex-start'
                                 }}
                            >
                                {attributes.sliderShowHeadline &&
                                <RichText
                                    tagName={attributes.headlineType}
                                    placeholder={__('The Headline...', 'sage')}
                                    value={item.headline}
                                    onChange={onChangeHeadline}
                                    className="slider-block__headline"
                                />
                                }
                                <RichText
                                    tagName="p"
                                    placeholder={'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'}
                                    value={item.text}
                                    onChange={onChangeText}
                                    className="slider-block__text"
                                />
                            </div>
                            }
                        </div>
                    </div>
                )
            });

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

            // const onChangeMinimalTextHeight = (value) => {
            //     setAttributes({minimalTextHeight: value});
            //     window.sliderBlockInstances[attributes.blockId].updateAutoHeight(0)
            // };

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
                window.sliderBlockInstances[attributes.blockId].slideNext(300);
            };

            const slidePrev = () => {
                window.sliderBlockInstances[attributes.blockId].slidePrev(300);
            };

            attributes.blockId = clientId;

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
                                {/*<hr/>
                                <p>{__('Minimal Text Height', 'sage')}</p>
                                <RangeControl
                                    value={attributes.minimalTextHeight}
                                    min={20}
                                    initialPosition={110}
                                    max={500}
                                    step={1}
                                    onChange={onChangeMinimalTextHeight}
                                />*/}
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
                    <div className={classNames(className, 'slider-block', 'custom-spacing')}
                         data-slides-per-view={attributes.slidesPerView}
                         data-slider-id={attributes.blockId}
                         data-slider-loop={attributes.sliderLoop}
                    >
                        <div className="swiper-container slider-block__container">
                            {attributes.controlsPosition === 'top' &&
                            slideControls()
                            }
                            <div className="swiper-wrapper slider-block__slides-wrapper">
                                {repeaterSlides}
                            </div>
                            {attributes.controlsPosition === 'bottom' &&
                            slideControls()
                            }
                        </div>
                    </div>
                </>
            )
        }
    },

    save: ({className, attributes}) => {

        const slidesBackgroundColor = getColorObjectByColorValue(editorThemeColors, attributes.slidesBackgroundColor);

        const repeaterSlides = attributes.sliderItems.map((item, index) => {

            return (
                <div key={index} className={'swiper-slide slider-block__slide'}>
                    <div
                        className={classNames('slider-block__slide-inner', 'custom-border', 'custom-border-radius', 'custom-shadow', slidesBackgroundColor && `has-${slidesBackgroundColor.slug}-background-color`)}>
                        {attributes.sliderShowImages &&
                        <div
                            className={classNames('slider-block__image-wrapper', `ratio ratio-${attributes.sliderImagesRatio}`)}>
                            <img alt={getImage(item.slideImage, 'alt')}
                                 srcSet={`${getImage(item.slideImage, 'tiny')} 480w, ${getImage(item.slideImage, 'small')} 768w, ${getImage(item.slideImage, 'medium')} 1360w`}
                                 src={getImage(item.slideImage, 'small', index)}
                                 className={classNames('slider-block__image', 'custom-border-radius')}
                            />
                        </div>
                        }
                        {attributes.sliderShowTextWrapper &&
                        <div className={'slider-block__text-wrapper'}
                             style={{
                                 // minHeight: `${attributes.minimalTextHeight}px`,
                                 alignItems: attributes.centerText ? 'center' : 'flex-start'
                             }}
                        >
                            {attributes.sliderShowHeadline &&
                            <RichText.Content tagName={attributes.headlineType}
                                              className="slider-block__headline"
                                              value={item.headline}/>
                            }
                            <RichText.Content tagName="p" className="slider-block__text" value={item.text}/>
                        </div>
                        }
                    </div>
                </div>
            )
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
            <div className={classNames(className, 'slider-block', 'custom-spacing')}
                 data-slides-per-view={attributes.slidesPerView}
                 data-slider-id={attributes.blockId}
                 data-slider-loop={attributes.sliderLoop}
            >
                <div className="swiper-container slider-block__container">
                    {attributes.controlsPosition === 'top' &&
                        slideControls()
                    }
                    <div className="swiper-wrapper slider-block__slides-wrapper">
                        {repeaterSlides}
                    </div>
                    {attributes.controlsPosition === 'bottom' &&
                        slideControls()
                    }
                </div>
            </div>
        )
    },
});
