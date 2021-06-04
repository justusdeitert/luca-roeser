import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {createElement} from '@wordpress/element';
import {RangeControl, Button} from '@wordpress/components';

import {
    RichText,
    MediaUpload,
    InspectorControls,
    InnerBlocks
} from '@wordpress/block-editor';

import classNames from 'classnames';
import {getImage} from "../utility";

const blockIcon = createElement('svg', {width: 20, height: 20},
    createElement('path', {
        d: 'M19.1666667,12 L19.1666667,2 C19.1666667,1.07916667 18.4208333,0.333333333 17.5,0.333333333 L2.5,0.333333333 C1.57916667,0.333333333 0.833333333,1.07916667 0.833333333,2 L0.833333333,12 C0.833333333,12.9208333 1.57916667,13.6666667 2.5,13.6666667 L17.5,13.6666667 C18.4208333,13.6666667 19.1666667,12.9208333 19.1666667,12 Z M7.08333333,7.41666667 L9.16666667,9.92083333 L12.0833333,6.16666667 L15.8333333,11.1666667 L4.16666667,11.1666667 L7.08333333,7.41666667 Z'
    })
);

const attributes = {
    headerImage: {
        type: 'object',
    },
    icon: {
        type: 'object',
    },
    title: {
        type: 'string',
        default: ''
    },
    subTitle: {
        type: 'string',
        default: ''
    },
    blur: {
        type: 'number',
        default: 0,
    },
    headerHeight: {
        type: 'number',
        default: 450,
    },
    headerFontSize: {
        type: 'number',
        default: 16,
    }
}

registerBlockType('custom/image-header', {
    title: __('Image Header', 'sage'),
    icon: blockIcon,
    category: 'custom',
    supports: {
        // align: true,
        align: ['full', 'wide'],
    },
    multiple: false, // Use this block just once per post
    attributes,
    // example: {
    //     attributes: {
    //         title: __('The Title...'),
    //         subTitle: __('Lorem ipsum dolor sit amet.'),
    //     },
    // },
    edit: ({className, attributes, setAttributes}) => {

        const onSelectImage = (imageObject) => {
            setAttributes({headerImage: imageObject});
        };

        // const onSelectIcon = (iconObject) => {
        //     setAttributes({icon: iconObject});
        // };

        // const onChangeTitle = (value) => {
        //     setAttributes({title: value});
        // };

        // const onChangeSubTitle = (value) => {
        //     setAttributes({subTitle: value});
        // };

        const onChangeBlur = (value) => {
            setAttributes({blur: value});
        };

        const onChangeHeaderHeight = (value) => {
            setAttributes({headerHeight: value});
        };

        const onChangeHeaderFontSize = (value) => {
            setAttributes({headerFontSize: value});
        };

        const TEMPLATE = [
            ['core/heading', {placeholder: 'The Title...'}],
            ['core/heading', {placeholder: 'This is the Subtitle...'}],
        ];

        return (
            <div className={classNames(className, 'image-header-block')}
                 style={{
                     height: `${attributes.headerHeight}px`,
                     fontSize: `${attributes.headerFontSize}px`
                 }}
            >
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <hr />
                        <p>{__('Adjust Image Blur', 'sage')}</p>
                        <RangeControl
                            value={attributes.blur}
                            min={0}
                            max={16}
                            onChange={onChangeBlur}
                        />
                        <hr />
                        <p>{__('Adjust Header Height', 'sage')}</p>
                        <RangeControl
                            value={attributes.headerHeight}
                            min={280}
                            max={680}
                            step={10}
                            onChange={onChangeHeaderHeight}
                        />
                        <hr />
                        <p>{__('Adjust Header Font Size', 'sage')}</p>
                        <RangeControl
                            value={attributes.headerFontSize}
                            min={12}
                            max={26}
                            step={1}
                            onChange={onChangeHeaderFontSize}
                        />
                    </div>
                </InspectorControls>
                <img className={classNames('image-header-block__image', attributes.blur > 0 ? 'is-blurred' : '')}
                     style={{filter: `blur(${attributes.blur}px)`}}
                     src={getImage(attributes.headerImage, 'medium')}
                     alt={getImage(attributes.headerImage, 'alt')}
                     width={getImage(attributes.headerImage, 'width')}
                     height={getImage(attributes.headerImage, 'height')}
                />
                <div className="image-header-block__overlay"/>
                <div className="container image-header-block__container">
                    <div className="image-header-block__text-wrapper">
                    {/*<InnerBlocks allowedBlocks={[
                        'core/paragraph',
                        'core/heading',
                    ]}/>*/}
                        <InnerBlocks templateLock='all' template={TEMPLATE} allowedBlocks={['custom/column']}/>
                    {/*<div className="image-header-block__text-wrapper">
                        <div className="image-header-block__title-wrapper">
                            <RichText
                                tagName="h2"
                                placeholder={__('The Title...', 'sage')}
                                keepPlaceholderOnFocus={true}
                                value={attributes.title}
                                onChange={onChangeTitle}
                                className="image-header-block__title"
                            />
                            <MediaUpload
                                onSelect={onSelectIcon}
                                allowedTypes={[
                                    'image/svg+xml',
                                    'image/png',
                                ]}
                                // value={attributes.iconID}
                                render={({open}) => (
                                    !attributes.icon ?
                                        <Button className={'button'} onClick={open}>{__('Upload Icon', 'sage')}</Button> :
                                        <img src={getImage(attributes.icon)} style={{cursor: 'pointer'}} alt={__('Logo Icon','sage')} onClick={open}/>
                                )}
                            />
                        </div>
                        <RichText
                            tagName="h3"
                            placeholder={__('Lorem ipsum dolor sit amet.', 'sage')}
                            keepPlaceholderOnFocus={true}
                            allowedFormats={[]}
                            value={attributes.subTitle}
                            onChange={onChangeSubTitle}
                            className="image-header-block__subtitle"
                        />
                    </div>*/}
                    </div>
                </div>
                <MediaUpload
                    onSelect={onSelectImage}
                    allowedTypes={[
                        'image/jpeg',
                        'image/jpg',
                        'image/png',
                        'image/gif'
                    ]}
                    // value={attributes.mediaID}
                    render={({open}) => (
                        <Button variant="primary" className={'button button--image-upload'} onClick={open}>
                            {!attributes.headerImage ? __('Upload Image', 'sage') : __('Change Image', 'sage')}
                        </Button>
                    )}
                />
            </div>
        );
    },
    save: ({className, attributes}) => {
        return (
            <div className={classNames(className, 'image-header-block')}
                 style={{
                     height: `${attributes.headerHeight}px`,
                     fontSize: `${attributes.headerFontSize}px`
                 }}
            >

                <img className={classNames('image-header-block__image', attributes.blur > 0 ? 'is-blurred' : '')}
                     style={{filter: `blur(${attributes.blur}px)`}}
                     srcSet={`${getImage(attributes.headerImage, 'tiny')} 480w, ${getImage(attributes.headerImage, 'small')} 768w, ${getImage(attributes.headerImage, 'medium')} 1024w`}
                     sizes="100w"
                     src={getImage(attributes.headerImage, 'medium')}
                     alt={getImage(attributes.headerImage, 'alt')}
                />

                <div className="image-header-block__overlay"/>

                <div className="container image-header-block__container">
                    <div className="image-header-block__text-wrapper">
                        <InnerBlocks.Content/>
                    </div>
                    {/*<div className="image-header-block__text-wrapper">
                        <div className="image-header-block__title-wrapper">
                            <RichText.Content tagName="h2" className="image-header-block__title" value={attributes.title}/>
                            {attributes.iconID && <img src={attributes.iconURL} alt={__('Logo Icon', 'sage')}/>}
                        </div>
                        <RichText.Content tagName="h3" className="image-header-block__subtitle" value={attributes.subTitle}/>
                    </div>*/}
                </div>
            </div>
        );
    },
});

