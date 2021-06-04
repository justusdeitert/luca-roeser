import {__} from '@wordpress/i18n';
import {registerBlockType,} from '@wordpress/blocks';
import {Button} from '@wordpress/components';
import {createElement} from '@wordpress/element';
import {ToggleControl, ColorPalette, Notice, RangeControl, SelectControl} from '@wordpress/components';

import {
    RichText,
    MediaUpload,
    BlockControls,
    InspectorControls,
    InnerBlocks,
    getColorObjectByColorValue
} from '@wordpress/block-editor';

import classNames from 'classnames';
import {editorColors, getImage} from '../utility';

const blockIcon = createElement('svg', {width: 20, height: 20},
    createElement('path', {
        d: 'M15.9896811,4 L15.9896811,15.9145 L14.3195216,15.9145 L14.3195216,4 L15.9896811,4 Z M19.33,4 L19.33,15.9145 L17.6598405,15.9145 L17.6598405,4 L19.33,4 Z M11.8560364,4 C12.28,4 12.6328088,4.32631429 12.6845785,4.74466593 L12.6911162,4.85103571 L12.6911162,15.0634643 C12.6911162,15.4955286 12.3709199,15.8550786 11.9604119,15.9078374 L11.8560364,15.9145 L1.83507973,15.9145 C1.41111617,15.9145 1.05830734,15.5881857 1.00653772,15.1698341 L1,15.0634643 L1,4.85103571 C1,4.41897143 1.32019625,4.05942143 1.73070426,4.00666264 L1.83507973,4 L11.8560364,4 Z M8.3361754,10.6210579 L6.24847608,13.3613929 L4.75785877,11.5316661 L2.67015945,14.2124286 L11.0209567,14.2124286 L8.3361754,10.6210579 Z'
    })
);

const attributes = {
    contentImage: {
        type: 'object',
    },
    // backgroundColor: {
    //     type: 'string',
    // },
    notice: {
        type: 'boolean',
        default: false
    },
    switchContent: {
        type: 'boolean',
        default: false
    },
    columnRange: {
        type: 'number',
        default: 7
    },
    imageRatio: {
        type: 'string',
        default: ''
    },
    spaceBetweenContent: {
        type: 'boolean',
        default: false
    },
    textColumnBackgroundColor: {
        type: 'string',
        default: ''
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
    transforms: [], // TODO: Find a way that Custom Blocks don't transform to core/group block
    attributes,
    edit: ({className, attributes, setAttributes}) => {

        // const TEMPLATE = [
        //     ['custom/column', {}, []]
        // ];

        const imageNotice = () => (
            <Notice status="error">
                <p>An error occurred: <code>Image width must we more then 1024px</code>.</p>
            </Notice>
        );

        const onSelectImage = (object) => {
            if(object.width > 1024) {
                setAttributes({
                    contentImage: object,
                    notice: false
                });
            } else {
                setAttributes({
                    notice: true
                });
            }
        };

        const onChangeColumnRange = (value) => {
            setAttributes({
                columnRange: value
            });
        };

        const onChangeSwitchContent = (value) => {
            setAttributes({switchContent: value});
        };

        const onChangeImageRatio = (value) => {
            setAttributes({imageRatio: value});
        };

        const onChangeSpaceBetweenContent = (value) => {
            setAttributes({spaceBetweenContent: value});
        };

        const onChangeTextColumnBackgroundColor = (value) => {
            setAttributes({textColumnBackgroundColor: value});
        };

        // TODO: Needs to be simplyfied...
        const textColumnClass = () => {
            if(!attributes.switchContent && attributes.spaceBetweenContent) {
                return classNames(`col-12 col-md-6 col-xl-${12 - attributes.columnRange - 1} offset-xl-1`)
            } else {
                return classNames(`col-12 col-md-6 col-xl-${12 - attributes.columnRange}`)
            }
        };

        const imageColumnClass = () => {

            if(attributes.switchContent && attributes.spaceBetweenContent) {
                return classNames(`col-12 col-md-6 col-xl-${attributes.columnRange - 1} offset-xl-1`);
            } else {
                return classNames(`col-12 col-md-6 col-xl-${attributes.columnRange}`)
            }
        };

        const imageColumn = (
            <div className={classNames('text-image-block__image-column', imageColumnClass(), attributes.imageRatio)}>
                <div className={classNames("text-image-block__image-wrapper")}>
                    <MediaUpload
                        onSelect={onSelectImage}
                        allowedTypes={[
                            'image/jpeg',
                            'image/jpg',
                            'image/png',
                            'image/gif'
                        ]}
                        render={({open}) => (
                            <Button className={'button text-image-block__image-wrapper-button'} onClick={open}>
                                {!attributes.contentImage ? __('Upload Image', 'sage') : __('Change Image', 'sage')}
                            </Button>
                        )}
                    />
                    <img className="text-image-block__image" src={attributes.contentImage ? attributes.contentImage.sizes.medium.url : 'https://picsum.photos/1200/800'} alt={attributes.contentImage && attributes.contentImage.alt} />
                </div>
            </div>
        );

        const textColumnBackgroundColor = getColorObjectByColorValue(editorColors, attributes.textColumnBackgroundColor);

        const backgroundColorClass = () => {
            if(textColumnBackgroundColor && textColumnBackgroundColor.slug !== 'white') {
                return 'has-colored-background'
            }
        };

        const textColumn = (
            <div className={classNames(`text-image-block__text-column`, textColumnClass())}>
                <div className={classNames("text-image-block__text-column-inner", backgroundColorClass(), textColumnBackgroundColor && `has-${textColumnBackgroundColor.slug}-background-color`)}>
                    {/*<InnerBlocks templateLock='insert' template={TEMPLATE} allowedBlocks={['custom/column']}/>*/}
                    <InnerBlocks allowedBlocks={ALLOWED_BLOCKS}/>
                </div>
            </div>
        );

        return (
            <div className={classNames(className, 'text-image-block')}>
                {attributes.notice && imageNotice()}
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <hr/>
                        <ToggleControl
                            label={__('Switch content order', 'sage')}
                            // help={ attributes.switchContent ? 'Image is left' : 'Image is right' }
                            checked={attributes.switchContent}
                            onChange={onChangeSwitchContent}
                        />
                        <hr />
                        <ToggleControl
                            label={__('Space between content', 'sage')}
                            // help={ attributes.switchContent ? 'Image is left' : 'Image is right' }
                            checked={attributes.spaceBetweenContent}
                            onChange={onChangeSpaceBetweenContent}
                        />
                        <hr />
                        <p>{__('Adjust Column Range', 'sage')}</p>
                        <RangeControl
                            value={attributes.columnRange}
                            min={4}
                            initialPosition={7}
                            max={8}
                            onChange={onChangeColumnRange}
                        />
                        <hr />
                        <SelectControl
                            label={__('Image Aspect Ratio', 'sage')}
                            value={attributes.imageRatio}
                            options={[
                                {label: 'Cover & Text Height', value: 'cover'},
                                {label: '1:1', value: 'ratio-1-1'},
                                {label: '4:3', value: 'ratio-4-3'},
                                {label: '3:2', value: 'ratio-3-2'},
                                {label: '16:9', value: 'ratio-16-9'},
                            ]}
                            onChange={onChangeImageRatio}
                        />
                        <hr />
                        <p>{__('Background Color', 'sage')}</p>
                        <ColorPalette
                            colors={editorColors}
                            value={attributes.textColumnBackgroundColor}
                            onChange={onChangeTextColumnBackgroundColor}
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
    },
    save: ({className, attributes}) => {

        const textColumnBackgroundColor = getColorObjectByColorValue(editorColors, attributes.textColumnBackgroundColor);

        const backgroundColorClass = () => {
            if(textColumnBackgroundColor && textColumnBackgroundColor.slug !== 'white') {
                return 'has-colored-background'
            }
        };

        const textColumnClass = () => {
            if(!attributes.switchContent && attributes.spaceBetweenContent) {
                return classNames(`col-12 col-md-6 col-xl-${12 - attributes.columnRange - 1} offset-xl-1`)
            } else {
                return classNames(`col-12 col-md-6 col-xl-${12 - attributes.columnRange}`)
            }
        };

        const imageColumnClass = () => {
            if(attributes.switchContent && attributes.spaceBetweenContent) {
                return classNames(`col-12 col-md-6 col-xl-${attributes.columnRange - 1} offset-xl-1`);
            } else {
                return classNames(`col-12 col-md-6 col-xl-${attributes.columnRange}`)
            }
        };

        const imageColumn = (
            <div className={classNames(`text-image-block__image-column`,imageColumnClass(), attributes.imageRatio)}>
                <div className={classNames("text-image-block__image-wrapper")}>
                    <img className='text-image-block__image lazy'
                         data-src={getImage(attributes.contentImage, 'medium')}
                         data-srcset={`${getImage(attributes.contentImage, 'tiny')} 480w, ${getImage(attributes.contentImage, 'small')} 768w, ${getImage(attributes.contentImage, 'medium')} 1024w`}
                         data-sizes="100w"
                         src={getImage(attributes.contentImage, 'placeholder')}
                         alt={getImage(attributes.contentImage, 'alt')}
                         width={getImage(attributes.contentImage, 'width')}
                         height={getImage(attributes.contentImage, 'height')}
                    />
                </div>
            </div>
        );

        const textColumn = (
            <div className={classNames(`text-image-block__text-column`, textColumnClass())}>
                <div className={classNames("text-image-block__text-column-inner", backgroundColorClass(), textColumnBackgroundColor && `has-${textColumnBackgroundColor.slug}-background-color`)}>
                    <InnerBlocks.Content/>
                </div>
            </div>
        );

        return (
            <div className={classNames(className, 'text-image-block')}>
                <div className="text-image-block__row row">
                    {!attributes.switchContent ? imageColumn : textColumn}
                    {!attributes.switchContent ? textColumn : imageColumn}
                </div>
            </div>
        );
    },
    deprecated: [
        {
            attributes,

            // Upload 05.02.2020
            save: ({className, attributes}) => {

                const textColumnBackgroundColor = getColorObjectByColorValue(editorColors, attributes.textColumnBackgroundColor);

                const backgroundColorClass = () => {
                    if(textColumnBackgroundColor && textColumnBackgroundColor.slug !== 'white') {
                        return 'has-colored-background'
                    }
                };

                const textColumnClass = () => {
                    if(!attributes.switchContent && attributes.spaceBetweenContent) {
                        return classNames(`col-12 col-md-6 col-xl-${12 - attributes.columnRange - 1} offset-xl-1`)
                    } else {
                        return classNames(`col-12 col-md-6 col-xl-${12 - attributes.columnRange}`)
                    }
                };

                const imageColumnClass = () => {
                    if(attributes.switchContent && attributes.spaceBetweenContent) {
                        return classNames(`col-12 col-md-6 col-xl-${attributes.columnRange - 1} offset-xl-1`);
                    } else {
                        return classNames(`col-12 col-md-6 col-xl-${attributes.columnRange}`)
                    }
                };

                const imageColumn = (
                    <div className={classNames(`text-image-block__image-column`,imageColumnClass(), attributes.imageRatio)}>
                        <div className={classNames("text-image-block__image-wrapper")}>
                            <img className='text-image-block__image lazy'
                                 data-src={getImage(attributes.contentImage, 'medium')}
                                 data-srcset={`${getImage(attributes.contentImage, 'tiny')} 480w, ${getImage(attributes.contentImage, 'small')} 768w, ${getImage(attributes.contentImage, 'medium')} 1024w`}
                                 data-sizes="100w"
                                 src={getImage(attributes.contentImage, 'placeholder')}
                                 alt={getImage(attributes.contentImage, 'alt')}
                            />
                        </div>
                    </div>
                );

                const textColumn = (
                    <div className={classNames(`text-image-block__text-column`, textColumnClass())}>
                        <div className={classNames("text-image-block__text-column-inner", backgroundColorClass(), textColumnBackgroundColor && `has-${textColumnBackgroundColor.slug}-background-color`)}>
                            <InnerBlocks.Content/>
                        </div>
                    </div>
                );

                return (
                    <div className={classNames(className, 'text-image-block')}>
                        <div className="text-image-block__row row">
                            {!attributes.switchContent ? imageColumn : textColumn}
                            {!attributes.switchContent ? textColumn : imageColumn}
                        </div>
                    </div>
                );
            },
        }
    ]
});
