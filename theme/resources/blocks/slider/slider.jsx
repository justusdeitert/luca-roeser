import {__} from '@wordpress/i18n';
import {registerBlockType,} from '@wordpress/blocks';
import {Button} from '@wordpress/components';
import {ToggleControl, RadioControl, Tooltip} from '@wordpress/components';
import {createElement, Component} from '@wordpress/element';
import {RichText, MediaUpload, InspectorControls} from '@wordpress/block-editor';

const blockIcon = createElement('svg', {width: 20, height: 20},
    createElement('path', {
        d: 'M14.9333333,10.7733333 L14.9333333,2.45333333 C14.9333333,1.6872 14.3128,1.06666667 13.5466667,1.06666667 L5.22666667,1.06666667 C4.46053333,1.06666667 3.84,1.6872 3.84,2.45333333 L3.84,10.7733333 C3.84,11.5394667 4.46053333,12.16 5.22666667,12.16 L13.5466667,12.16 C14.3128,12.16 14.9333333,11.5394667 14.9333333,10.7733333 Z M7.30666667,8 L8.71413333,9.87893333 L10.7733333,7.30666667 L13.5466667,10.7733333 L5.22666667,10.7733333 L7.30666667,8 Z M1.06666667,3.84 L1.06666667,13.5466667 C1.06666667,14.3128 1.6872,14.9333333 2.45333333,14.9333333 L12.16,14.9333333 L12.16,13.5466667 L2.45333333,13.5466667 L2.45333333,3.84 L1.06666667,3.84 Z'
    })
);

import {cloneArray, getRandomInt, getImage} from "../utility";

const attributes = {
    sliderItems: {
        type: 'array',
        default: [
            {title: '', text: '', slideImage: ['']},
            {title: '', text: '', slideImage: ['']},
            {title: '', text: '', slideImage: ['']},
        ],
    }
}

registerBlockType('custom/slider', {
    title: __('Gallery Carousel', 'sage'),
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

            const repeater = attributes.sliderItems.map((item, index) => {

                const onChangeTitle = (value) => {

                    // Iterate through sliderItems and only change value of selected item
                    attributes.sliderItems.map((innerItem, innerIndex) => {
                        if(innerIndex === index) {
                            innerItem.title = value;
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

                    let newItem = {title: __('The Title...', 'sage'), slideImage: `https://picsum.photos/id/${getRandomInt(100)}/1200/800`};

                    attributes.sliderItems.splice(index + 1, 0, newItem) // Adds the new Item at position

                    setAttributes({
                        sliderItems: [...attributes.sliderItems] // Replace With cool spread operator!!
                    });

                    // TODO: Reinitiate Slider!!
                    // If that's dont in compoentDidUpdate it gets fired to often...
                    // setTimeout(() => {
                    //     window.initGalleryCarouselGlideInstances(index, attributes.blockID);
                    // }, 100)
                };

                const removeElement = (index) => {
                    // let arrayPop = attributes.sliderItems.pop(); // Remove last Array Element

                    attributes.sliderItems.splice(index, 1) // Removes item from position

                    setAttributes({
                        sliderItems: [...attributes.sliderItems] // Clone Array Otherwise there is not reload
                    });

                    // If that's dont in compoentDidUpdate it gets fired to often...
                    // setTimeout(() => {
                    //     window.initGalleryCarouselGlideInstances(index - 1, attributes.blockID); // Parameter is first slide
                    // }, 100)
                };

                return (
                    <div key={index} className={'item glide__slide'}>
                        <div className='slider-block__image-wrapper'>
                            <img src={getImage(item.slideImage)} />

                            <MediaUpload
                                onSelect={onSelectImage}
                                allowedTypes="image"
                                // value={item.imageID}
                                render={({open}) => (
                                    <div>
                                        <Button className={'button button-large'} onClick={open}>{__('Change Image', 'sage')}</Button>
                                    </div>
                                )}
                            />

                            <Tooltip text={__('Add Element', 'sage')}>
                                <Button isTertiary onClick={() => addElementAfter(index)}>Add Item</Button>
                            </Tooltip>

                            <Tooltip text={__('Remove Element', 'sage')}>
                                <Button isTertiary onClick={() => removeElement(index)}>Remove Item</Button>
                            </Tooltip>
                        </div>

                        <div className='slider-block__text-wrapper'>
                            <RichText
                                tagName="h5"
                                placeholder={__('The Title...', 'sage')}
                                keepPlaceholderOnFocus={true}
                                allowedFormats={[]}
                                value={item.title}
                                onChange={onChangeTitle}
                                className="slider-block__title"
                            />
                            <RichText
                                tagName="p"
                                placeholder={'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.'}
                                keepPlaceholderOnFocus={true}
                                allowedFormats={[]}
                                value={item.text}
                                onChange={onChangeText}
                                className="slider-block__text"
                            />
                        </div>

                    </div>
                )
            });

            const onChangeHeadlineIsActive = (value) => {
                setAttributes({headlineIsActive: value});
            };

            const onChangeHeadline = (text) => {
                setAttributes({headline: text});
            };

            const onChangeRadioField = (value) => {
                setAttributes({columnsRadioField: value});

                // setTimeout(() => {
                //     window.initGalleryCarouselGlideInstances();
                // }, 100)
            };

            // Set Block ID to use in Save Method
            setAttributes({
                blockID: clientId
            });

            return (
                <div className={className}>
                    <InspectorControls>
                        <hr/>
                        <ToggleControl
                            label={__('Headline', 'sage')}
                            // help={ attributes.withHeadline ? 'Image is left' : 'Image is right' }
                            checked={attributes.headlineIsActive}
                            onChange={onChangeHeadlineIsActive}
                        />
                        <hr/>
                        <RadioControl
                            label={__('Columns', 'sage')}
                            selected={attributes.columnsRadioField}
                            options={
                                [
                                    {label: __('Three', 'sage'), value: 'three'},
                                    {label: __('Four', 'sage'), value: 'four'},
                                ]
                            }
                            onChange={onChangeRadioField}
                        />
                    </InspectorControls>
                    <div className="slider-block">
                        <div className="container">
                            <div className="slider-block__headline-wrapper">
                                {attributes.headlineIsActive && <RichText
                                    tagName="h4"
                                    placeholder={__('The Title...', 'sage')}
                                    keepPlaceholderOnFocus={true}
                                    allowedFormats={[]}
                                    value={attributes.headline}
                                    onChange={onChangeHeadline}
                                    className="slider-block__headline"
                                />}
                                <div className="slider-block__carousel-icons">
                                    <i className="icon icon--arrow-left glide-prev"></i>
                                    <i className="icon icon--arrow-right glide-next"></i>
                                </div>
                            </div>

                            <div className={'glide glide--slider' + ' ' + attributes.columnsRadioField + ' ' + attributes.blockID}>
                                <div className={'glide__track'} data-glide-el="track">
                                    <div className="slider-block__slides glide__slides">
                                        {repeater}
                                    </div>
                                </div>
                            </div>
                            {/*<div className="slider-block__button-wrapper">
                                <Button className={'button button-large'} onClick={addButtonOnClick}>{__('Add Item', 'sage')}</Button>
                                <Button className={'button button-large'} style={{marginLeft: 10}} onClick={removeButtonOnClick}>{__('Remove Item', 'sage')}</Button>
                            </div>*/}
                        </div>
                    </div>
                </div>
            )
        }
    },

    save: ({className, attributes}) => {

        const repeater = attributes.sliderItems.map((item , index) => {

            return (
                <div key={index} className={'item glide__slide'}>
                    <div className='slider-block__image-wrapper'>
                        {/*<a href={item.slideImage} className="js-smartPhoto" data-caption={item.imageALT} data-id={item.imageID} data-group={post_id}>
                            <img src={item.slideImage} alt={item.imageALT}/>
                        </a>*/}
                        <a href={image_large}
                           className="js-smartPhoto"
                           data-caption={item.imageALT}
                           data-id={item.imageID}
                           data-group={post_id}
                           itemProp="associatedMedia"
                           itemScope
                           itemType="http://schema.org/ImageObject">
                            <img className="text-image-block__image"
                                 src={image_medium}
                                 srcSet={`${image_small} 768w, ${image_medium} 1024w`}
                                 alt={item.imageALT}
                                 itemProp="contentUrl" />
                        </a>
                    </div>
                    <div className={'slider-block__text-wrapper'}>
                        <RichText.Content tagName="h5" className="slider-block__title" value={item.title}/>
                        <RichText.Content tagName="p" className="slider-block__text" value={item.text}/>
                    </div>
                </div>
            )
        });

        return (
            <div className={className}>
                <div className="slider-block">
                    <div className="container">
                        <div className="slider-block__headline-wrapper">
                            {attributes.headlineIsActive && <RichText.Content tagName="h4" className="slider-block__headline" value={attributes.headline}/>}
                            <div className="slider-block__carousel-icons">
                                <i className="icon icon--arrow-left glide-prev"></i>
                                <i className="icon icon--arrow-right glide-next"></i>
                            </div>
                        </div>
                        <div className={'glide glide--slider' + ' ' + attributes.columnsRadioField}>
                            <div className="glide__track" data-glide-el="track">
                                <div className="slider-block__slides glide__slides">
                                    {repeater}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
});
