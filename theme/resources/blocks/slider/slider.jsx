import {__} from '@wordpress/i18n';
import {registerBlockType,} from '@wordpress/blocks';
import {Button} from '@wordpress/components';
import {ToggleControl, RangeControl, SelectControl} from '@wordpress/components';
import {createElement, Component} from '@wordpress/element';
import {RichText, MediaUpload, InspectorControls} from '@wordpress/block-editor';
import classNames from 'classnames';
import {cloneArray, getImage} from "../utility";

const blockIcon = createElement('svg', {width: 20, height: 20},
    createElement('path', {
        d: 'M14.9333333,10.7733333 L14.9333333,2.45333333 C14.9333333,1.6872 14.3128,1.06666667 13.5466667,1.06666667 L5.22666667,1.06666667 C4.46053333,1.06666667 3.84,1.6872 3.84,2.45333333 L3.84,10.7733333 C3.84,11.5394667 4.46053333,12.16 5.22666667,12.16 L13.5466667,12.16 C14.3128,12.16 14.9333333,11.5394667 14.9333333,10.7733333 Z M7.30666667,8 L8.71413333,9.87893333 L10.7733333,7.30666667 L13.5466667,10.7733333 L5.22666667,10.7733333 L7.30666667,8 Z M1.06666667,3.84 L1.06666667,13.5466667 C1.06666667,14.3128 1.6872,14.9333333 2.45333333,14.9333333 L12.16,14.9333333 L12.16,13.5466667 L2.45333333,13.5466667 L2.45333333,3.84 L1.06666667,3.84 Z'
    })
);


const attributes = {
    blockId: {
        type: 'string'
    },
    sliderHasHeadline: {
        type: 'boolean',
        default: true,
    },
    headlineType: {
        type: 'string',
        default: 'h5'
    },
    slidesPerView: {
        type: 'number',
        default: 3,
    },
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
            this.props.setAttributes({ content: data });
        }

        render() {

            let {attributes, className, setAttributes, clientId} = this.props;

            const repeaterSlides = attributes.sliderItems.map((item, index) => {

                const onChangeHeadline = (value) => {

                    // Iterate through sliderItems and only change value of selected item
                    attributes.sliderItems.map((innerItem, innerIndex) => {
                        if(innerIndex === index) {
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
                        if(innerIndex === index) {
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
                        if(innerIndex === index) {
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
                        window.updateSliderBlockInstances();
                    }, 300)
                };

                const removeElement = (index) => {
                    // let arrayPop = attributes.sliderItems.pop(); // Remove last Array Element
                    attributes.sliderItems.splice(index, 1) // Removes item from position

                    setAttributes({
                        sliderItems: [...attributes.sliderItems] // Clone Array Otherwise there is not reload
                    });

                    setTimeout(() => {
                        window.updateSliderBlockInstances();
                    }, 300)
                };

                return (
                    <div key={index} className={'swiper-slide slider-block__slide'}>
                        <div className="slider-block__slide-inner custom-border">
                            <Button icon={'plus'}
                                    isSmall={true}
                                    className={'button button--icon-only'}
                                    // label={__('Add Item after', 'sage')}
                                    onClick={() => {addElementAfter(index)}}
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
                            <div className={classNames('slider-block__image-wrapper', 'ratio ratio-1x1')}>
                                <img alt={getImage(item.slideImage, 'alt')}
                                     src={getImage(item.slideImage, 'medium', index)}
                                     className={'slider-block__image'}
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
                            <div className='slider-block__text-wrapper'>
                                {attributes.sliderHasHeadline &&
                                    <RichText
                                        tagName={attributes.headlineType}
                                        placeholder={__('The Headline...', 'sage')}
                                        keepPlaceholderOnFocus={true}
                                        value={item.headline}
                                        onChange={onChangeHeadline}
                                        className="slider-block__headline"
                                    />
                                }
                                <RichText
                                    tagName="p"
                                    placeholder={'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'}
                                    keepPlaceholderOnFocus={true}
                                    value={item.text}
                                    onChange={onChangeText}
                                    className="slider-block__text"
                                />
                            </div>
                        </div>
                    </div>
                )
            });

            const onChangeSliderHasHeadline = (value) => {
                setAttributes({sliderHasHeadline: value});
            };

            const onChangeHeadlineType = (value) => {
                setAttributes({headlineType: value});
            };

            const onChangeSlidesPerView = (value) => {
                setAttributes({slidesPerView: value});

                setTimeout(() => {
                    window.updateSliderBlockInstances();
                }, 300)
            };

            const slideNext = () => {
                window.sliderBlockInstances[attributes.blockId].slideNext(300);
            };

            const slidePrev = () => {
                window.sliderBlockInstances[attributes.blockId].slidePrev(300);
            };

            attributes.blockId = clientId;

            return (
                <>
                    <InspectorControls>
                        <div className="inspector-controls-container">
                            <hr/>
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
                            <hr/>
                            <ToggleControl
                                label={__('Has a Headline', 'sage')}
                                // help={ attributes.withHeadline ? 'Image is left' : 'Image is right' }
                                checked={attributes.sliderHasHeadline}
                                onChange={onChangeSliderHasHeadline}
                            />
                            {attributes.sliderHasHeadline &&
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
                            <p>{__('Slides per View', 'sage')}</p>
                            <RangeControl
                                value={attributes.slidesPerView}
                                min={1}
                                initialPosition={3}
                                max={4}
                                onChange={onChangeSlidesPerView}
                            />
                        </div>
                    </InspectorControls>
                    <div className={classNames(className, 'slider-block', 'custom-spacing')}
                         data-slides-per-view={attributes.slidesPerView}
                         data-slider-id={attributes.blockId}
                    >
                        <div className="swiper-container slider-block__container">
                            <div className="swiper-wrapper slider-block__slides-wrapper">
                                {repeaterSlides}
                            </div>
                            <div className="swiper-pagination" />
                            <div className="swiper-button-prev">
                                <i className="icon-arrow-left" />
                            </div>
                            <div className="swiper-button-next">
                                <i className="icon-arrow-right" />
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    },

    save: ({className, attributes}) => {

        const repeaterSlides = attributes.sliderItems.map((item , index) => {

            return (
                <div key={index} className={'swiper-slide slider-block__slide'}>
                    <div className="slider-block__slide-inner custom-border">
                        <div className={classNames('slider-block__image-wrapper', 'ratio ratio-1x1')}>
                            <img alt={getImage(item.slideImage, 'alt')}
                                 src={getImage(item.slideImage, 'medium', index)}
                                 className={'slider-block__image'}
                            />
                        </div>
                        <div className={'slider-block__text-wrapper'}>
                            {attributes.sliderHasHeadline &&
                                <RichText.Content tagName={attributes.headlineType} className="slider-block__headline" value={item.headline}/>
                            }
                            <RichText.Content tagName="p" className="slider-block__text" value={item.text}/>
                        </div>
                    </div>
                </div>
            )
        });

        return (
            <div className={classNames(className, 'slider-block', 'custom-spacing')}
                 data-slides-per-view={attributes.slidesPerView}
                 data-slider-id={attributes.blockId}
            >
                <div className="swiper-container slider-block__container">
                    <div className="swiper-wrapper slider-block__slides-wrapper">
                        {repeaterSlides}
                    </div>
                    <div className="swiper-pagination" />
                    <div className="swiper-button-prev">
                        <i className="icon-arrow-left" />
                    </div>
                    <div className="swiper-button-next">
                        <i className="icon-arrow-right" />
                    </div>
                </div>
            </div>
        )
    },
});
