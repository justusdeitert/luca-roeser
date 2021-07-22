import {__} from '@wordpress/i18n';
import {registerBlockType,} from '@wordpress/blocks';
import {Button} from '@wordpress/components';
import {Component} from '@wordpress/element';
import {ToggleControl, ColorPalette, RangeControl, SelectControl, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup} from '@wordpress/components';
import {MediaUpload, InspectorControls, InnerBlocks, getColorObjectByColorValue} from '@wordpress/block-editor';
import classNames from 'classnames';
import {editorThemeColors, getImage, ALLOWEDBLOCKS, removeArrayItems} from '../utility';
import {textImageIcon} from '../icons';
import {loremIpsum} from "lorem-ipsum";

const attributes = {
    contentImages: {
        type: 'array',
        default: ['']
    },
    switchContent: {
        type: 'boolean',
        default: false
    },
    columnRange: {
        type: 'number',
        default: 7
    },
    imageCount: {
        type: 'number',
        default: 1
    },
    imagesBackgroundColor: {
        type: 'string',
        default: ''
    },
    imagesRatio: {
        type: 'string',
        default: '3x2',
    },
    hasGallery: {
        type: 'boolean',
        default: true
    }
};

registerBlockType('custom/text-image', {
    title: __('Text Image', 'sage'),
    icon: textImageIcon,
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

            let {attributes, className, setAttributes } = this.props;

            const TEMPLATE = [
                ['core/heading', {content: 'The Title...'}],
                ['core/paragraph', {content: loremIpsum({count: 3})}],
            ];

            const onSelectImage = (object) => {
                setAttributes({contentImages: object});
            };

            const onChangeColumnRange = (value) => {
                setAttributes({columnRange: value});
            };

            const onChangeImageCount = (value) => {
                setAttributes({imageCount: value});
            };

            const onChangeSwitchContent = (value) => {
                setAttributes({switchContent: value});
            };

            const onChangeImagesBackgroundColor = (value) => {
                setAttributes({imagesBackgroundColor: value});
            };

            const onChangeImagesRatio = (value) => {
                setAttributes({imagesRatio: value});
            };

            const onChangeHasGallery = (value) => {
                setAttributes({hasGallery: value});
            };

            const imagesBackgroundColor = getColorObjectByColorValue(editorThemeColors, attributes.imagesBackgroundColor);

            const imageColumn = (
                <div className={classNames('text-image-block__image-column', `col-12 col-md-6 col-xl-${attributes.columnRange}`)}>
                    <div style={{position: 'relative', display: 'inline-block', width: '100%'}}>
                        <MediaUpload
                            onSelect={onSelectImage}
                            multiple={true}
                            allowedTypes={[
                                'image/jpeg',
                                'image/jpg',
                                'image/png',
                                'image/gif'
                            ]}
                            render={({open}) => (
                                <Button
                                    className={'button'}
                                    icon={'format-gallery'}
                                    onClick={open}
                                    style={{
                                        position: 'absolute',
                                        left: '20px',
                                        top: '20px',
                                        zIndex: '30'
                                    }}
                                    text={!attributes.contentImages ? __('Upload Images', 'sage') : __('Change Images', 'sage')}
                                />
                            )}
                        />
                        <div className={classNames('text-image-block__images-wrapper')} data-image-count={attributes.imageCount}>
                            {
                                attributes.contentImages.map((contentImage, index) => {
                                    if (index < attributes.imageCount) {
                                        return (
                                            <div key={index} className={'text-image-block__image-wrapper'}>
                                                <div className={classNames("custom-border custom-border-radius custom-shadow", imagesBackgroundColor && `has-${imagesBackgroundColor.slug}-background-color`)}>
                                                    <div className={`ratio ratio-${attributes.imagesRatio}`}>
                                                        <img className={classNames('custom-border-radius')}
                                                             alt={getImage(contentImage, 'alt')}
                                                             srcSet={`${getImage(contentImage, 'tiny', 800)} 768w, ${getImage(contentImage, 'small', 800)} 1360w`}
                                                             src={getImage(contentImage, 'tiny', 800)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            );

            const textColumn = (
                <div className={classNames(`text-image-block__text-column`, `col-12 col-md-6 col-xl-${12 - attributes.columnRange}`)}>
                    <div className={classNames("text-image-block__text-column-inner")}>
                        <InnerBlocks template={TEMPLATE} allowedBlocks={removeArrayItems(ALLOWEDBLOCKS, ['custom/text-image'])}/>
                    </div>
                </div>
            );

            let maxImagesCount = () => {
                if(attributes.contentImages.length <= 4) {
                    return attributes.contentImages.length;
                } else {
                    return 4;
                }
            }

            return (
                <div className={classNames(className, 'text-image-block', 'custom-spacing', 'no-gallery')}>
                    <InspectorControls>
                        <div className="inspector-controls-container">
                            <hr/>
                            <ToggleControl
                                label={__('Switch content order', 'sage')}
                                checked={attributes.switchContent}
                                onChange={onChangeSwitchContent}
                            />
                            <hr/>
                            <p>{__('Adjust Column Range', 'sage')}</p>
                            <RangeControl
                                value={attributes.columnRange}
                                min={4}
                                initialPosition={7}
                                max={8}
                                onChange={onChangeColumnRange}
                            />
                            {(maxImagesCount() > 1) &&
                            <>
                                <hr/>
                                <p>{__('Adjust visible Images', 'sage')}</p>
                                <RangeControl
                                    value={attributes.imageCount}
                                    min={1}
                                    initialPosition={1}
                                    max={maxImagesCount()}
                                    step={1}
                                    onChange={onChangeImageCount}
                                />
                            </>
                            }

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
                            <hr/>
                            <ToggleControl
                                label={__('Has Gallery', 'sage')}
                                checked={attributes.hasGallery}
                                onChange={onChangeHasGallery}
                            />
                            <hr/>
                            <p>{__('Background Color', 'sage')}</p>
                            <ColorPalette
                                colors={editorThemeColors}
                                value={attributes.imagesBackgroundColor}
                                onChange={onChangeImagesBackgroundColor}
                                // clearable={false}
                            />
                        </div>
                    </InspectorControls>
                    <div className="text-image-block__row row">
                        {!attributes.switchContent ? imageColumn : textColumn}
                        {!attributes.switchContent ? textColumn : imageColumn}
                    </div>
                </div>
            );
        }
    },
    save: ({className, attributes}) => {

        const imagesBackgroundColor = getColorObjectByColorValue(editorThemeColors, attributes.imagesBackgroundColor);

        const imageColumn = (
            <div className={classNames(`text-image-block__images-column`, `col-12 col-md-6 col-xl-${attributes.columnRange}`)}>
                <div className={classNames('text-image-block__images-wrapper')} data-image-count={attributes.imageCount}>
                    {
                        attributes.contentImages.map((contentImage, index) => {
                            if (attributes.hasGallery) {
                                return (
                                    <a key={index} href={getImage(contentImage, 'x_large')}
                                       data-lg-size={`${getImage(contentImage, 'width-large')}-${getImage(contentImage, 'height-large')}`}
                                    >
                                        <div className={classNames("custom-border custom-border-radius custom-shadow", imagesBackgroundColor && `has-${imagesBackgroundColor.slug}-background-color`)}>
                                            <div className={`ratio ratio-${attributes.imagesRatio}`}>
                                                <img className={classNames('custom-border-radius')}
                                                     alt={getImage(contentImage, 'alt')}
                                                     srcSet={`${getImage(contentImage, 'tiny', 800)} 768w, ${getImage(contentImage, 'small', 800)} 1360w`}
                                                     src={getImage(contentImage, 'tiny', 800)}
                                                />
                                            </div>
                                        </div>
                                    </a>
                                )
                            } else {
                                if (index < attributes.imageCount) {
                                    return (
                                        <div key={index} className={'text-image-block__image-wrapper'}>
                                            <div className={classNames("custom-border custom-border-radius custom-shadow", imagesBackgroundColor && `has-${imagesBackgroundColor.slug}-background-color`)}>
                                                <div className={`ratio ratio-${attributes.imagesRatio}`}>
                                                    <img className={classNames('custom-border-radius')}
                                                         alt={getImage(contentImage, 'alt')}
                                                         srcSet={`${getImage(contentImage, 'tiny', 800)} 768w, ${getImage(contentImage, 'small', 800)} 1360w`}
                                                         src={getImage(contentImage, 'tiny', 800)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            }
                        })
                    }
                </div>
            </div>
        );

        const textColumn = (
            <div className={classNames(`text-image-block__text-column`, `col-12 col-md-6 col-xl-${12 - attributes.columnRange}`)}>
                <div className={classNames("text-image-block__text-column-inner")}>
                    <InnerBlocks.Content/>
                </div>
            </div>
        );

        return (
            <div className={classNames(className, 'text-image-block', 'custom-spacing', !attributes.hasGallery && 'no-gallery')}>
                <div className="text-image-block__row row">
                    {!attributes.switchContent ? imageColumn : textColumn}
                    {!attributes.switchContent ? textColumn : imageColumn}
                </div>
            </div>
        );
    },
});
