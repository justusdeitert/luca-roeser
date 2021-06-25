import {__} from '@wordpress/i18n';
import {registerBlockType,} from '@wordpress/blocks';
import {Button} from '@wordpress/components';
import {createElement, Component} from '@wordpress/element';
import {ToggleControl, ColorPalette, RangeControl, SelectControl} from '@wordpress/components';

import {
    MediaUpload,
    InspectorControls,
    InnerBlocks,
    getColorObjectByColorValue
} from '@wordpress/block-editor';

import classNames from 'classnames';
import {editorThemeColors, getImage} from '../utility';
import {loremIpsum} from "lorem-ipsum";

const blockIcon = createElement('svg', {width: 20, height: 20},
    createElement('path', {
        d: 'M15.9896811,4 L15.9896811,15.9145 L14.3195216,15.9145 L14.3195216,4 L15.9896811,4 Z M19.33,4 L19.33,15.9145 L17.6598405,15.9145 L17.6598405,4 L19.33,4 Z M11.8560364,4 C12.28,4 12.6328088,4.32631429 12.6845785,4.74466593 L12.6911162,4.85103571 L12.6911162,15.0634643 C12.6911162,15.4955286 12.3709199,15.8550786 11.9604119,15.9078374 L11.8560364,15.9145 L1.83507973,15.9145 C1.41111617,15.9145 1.05830734,15.5881857 1.00653772,15.1698341 L1,15.0634643 L1,4.85103571 C1,4.41897143 1.32019625,4.05942143 1.73070426,4.00666264 L1.83507973,4 L11.8560364,4 Z M8.3361754,10.6210579 L6.24847608,13.3613929 L4.75785877,11.5316661 L2.67015945,14.2124286 L11.0209567,14.2124286 L8.3361754,10.6210579 Z'
    })
);

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
};

const ALLOWED_BLOCKS = [
    'core/paragraph',
    'core/heading',
    'core/list',
    'core/shortcode',
    'core/spacer',
    'custom/button',
    'custom/icon-text',
    'custom/row',
    'custom/divider'
];

registerBlockType('custom/text-image', {
    title: __('Text Image', 'sage'),
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
                                <Button className={'button'}
                                        icon={'format-gallery'}
                                        onClick={open}
                                        style={{
                                            position: 'absolute',
                                            left: '20px',
                                            top: '20px',
                                            zIndex: '10'
                                        }}
                                        text={!attributes.contentImages ? __('Upload Images', 'sage') : __('Change Images', 'sage')}
                                />
                            )}
                        />
                        <div className={classNames('text-image-block__image-wrapper')} data-image-count={attributes.imageCount}>
                            {
                                attributes.contentImages.map((contentImage, index) => {
                                    return (
                                        <a key={index} href={getImage(contentImage, 'large')}
                                           data-lg-size={`${getImage(contentImage, 'height-large')}-${getImage(contentImage, 'width-large')}`}
                                           onClick={event => event.preventDefault()}
                                        >
                                            <div className={classNames("custom-border custom-border-radius custom-shadow", imagesBackgroundColor && `has-${imagesBackgroundColor.slug}-background-color`)}>
                                                <div className={`ratio ratio-${attributes.imagesRatio}`}>
                                                    <img className={classNames('custom-border-radius')}
                                                         alt={getImage(contentImage, 'alt')}
                                                         src={getImage(contentImage, 'small')}
                                                    />
                                                </div>
                                            </div>
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            );

            const textColumn = (
                <div className={classNames(`text-image-block__text-column`, `col-12 col-md-6 col-xl-${12 - attributes.columnRange}`)}>
                    <div className={classNames("text-image-block__text-column-inner")}>
                        <InnerBlocks template={TEMPLATE} allowedBlocks={ALLOWED_BLOCKS}/>
                    </div>
                </div>
            );

            return (
                <div className={classNames(className, 'text-image-block', 'custom-spacing')}>
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
                            <hr/>
                            <p>{__('Adjust visible Images', 'sage')}</p>
                            <RangeControl
                                value={attributes.imageCount}
                                min={1}
                                initialPosition={1}
                                max={4}
                                step={1}
                                onChange={onChangeImageCount}
                            />
                            <hr/>
                            <p>{__('Images Ratio', 'sage')}</p>
                            <SelectControl
                                value={attributes.imagesRatio}
                                options={[
                                    {label: __('1x1'), value: '1x1'},
                                    {label: __('4x3'), value: '4x3'},
                                    {label: __('3x2'), value: '3x2'},
                                    {label: __('16x9'), value: '16x9'},
                                    {label: __('21x9'), value: '21x9'},
                                ]}
                                onChange={onChangeImagesRatio}
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
            <div className={classNames(`text-image-block__image-column`, `col-12 col-md-6 col-xl-${attributes.columnRange}`)}>
                <div className={classNames("text-image-block__image-wrapper")} data-image-count={attributes.imageCount}>
                    {
                        attributes.contentImages.map((contentImage, index) => {
                            return (
                                <a key={index} href={getImage(contentImage, 'large')}
                                   data-lg-size={`${getImage(contentImage, 'width-large')}-${getImage(contentImage, 'height-large')}`}
                                >
                                    <div className={classNames("custom-border custom-border-radius custom-shadow", imagesBackgroundColor && `has-${imagesBackgroundColor.slug}-background-color`)}>
                                        <div className={`ratio ratio-${attributes.imagesRatio}`}>
                                            <img className={classNames('custom-border-radius')}
                                                 alt={getImage(contentImage, 'alt')}
                                                 src={getImage(contentImage, 'small')}
                                            />
                                        </div>
                                     </div>
                                </a>
                            )
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
            <div className={classNames(className, 'text-image-block', 'custom-spacing')}>
                <div className="text-image-block__row row">
                    {!attributes.switchContent ? imageColumn : textColumn}
                    {!attributes.switchContent ? textColumn : imageColumn}
                </div>
            </div>
        );
    },
});
