import {__} from '@wordpress/i18n';
import {registerBlockType   } from '@wordpress/blocks';
import {InspectorControls, RichText, BlockControls, MediaUpload, BlockVerticalAlignmentToolbar, InnerBlocks} from '@wordpress/block-editor';
import {SelectControl, ToolbarGroup, RangeControl, Button, ToolbarDropdownMenu, ToggleControl} from '@wordpress/components';
import classNames from 'classnames';
import {iconText} from '../icons';
import {getImage} from "../utility";

const attributes = {
    clientId: {
        type: 'string',
        default: ''
    },
    iconTextAlignment: {
        type: 'string',
        default: 'left'
    },
    verticalAlign: {
        type: 'string',
        default: 'center'
    },
    iconBorderRadius: {
        type: 'number',
        default: 0
    },
    textMargin: {
        type: 'number',
        default: 16
    },
    bottomMargin: {
        type: 'number',
        default: 16
    },
    iconObject: {
        type: 'object',
        default: ''
    },
    // iconText: {
    //     type: 'string',
    //     default: ''
    // },
    // iconTextElement: {
    //     type: 'string',
    //     default: 'p'
    // },
    iconSize: {
        type: 'number',
        default: 40
    },
    imageTopOnMobile: {
        type: 'boolean',
        default: true
    }
}

const ALLOWEDBLOCKS = [
    'core/paragraph',
    'core/heading',
];

registerBlockType('custom/icon-text', {
    title: __('Icon Text', 'sage'),
    category: 'custom',
    icon: iconText,
    attributes,
    edit: ({setAttributes, attributes, className, clientId}) => {

        // const onChangeFluidText = (value) => {
        //     setAttributes({iconText: value});
        // };

        // const onChangeFluidTextElement = (value) => {
        //     setAttributes({iconTextElement: value});
        // };

        const onChangeVerticalAlign = (value) => {
            setAttributes({verticalAlign: value});
        };

        const onSelectIconObject = (value) => {
            setAttributes({iconObject: value});
        };

        const onChangeIconSize = (value) => {
            setAttributes({iconSize: value});
        }

        const onChangeIconBorderRadius = (value) => {
            setAttributes({iconBorderRadius: value});
        }

        const onChangeTextMargin = (value) => {
            setAttributes({textMargin: value});
        }

        const onChangeBottomMargin = (value) => {
            setAttributes({bottomMargin: value});
        }

        const onClickAlignment = (value) => {
            setAttributes({iconTextAlignment: value});
        }

        const onChangeImageTopOnMobile = (value) => {
            setAttributes({imageTopOnMobile: value});
        }

        const getAlignmentIcon = () => {
            return 'align-' + attributes.iconTextAlignment;
        }

        attributes.clientId = clientId;

        return (
            <>
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarDropdownMenu
                            icon={getAlignmentIcon()}
                            label={__('Select a position', 'sage')}
                            controls={[
                                {
                                    title: 'Left',
                                    icon: 'align-left',
                                    onClick: () => onClickAlignment('left'),
                                },
                                {
                                    title: 'Center',
                                    icon: 'align-center',
                                    onClick: () => onClickAlignment('center'),
                                },
                                {
                                    title: 'Right',
                                    icon: 'align-right',
                                    onClick: () => onClickAlignment('right'),
                                },
                            ]}
                        />
                        <BlockVerticalAlignmentToolbar
                            value={attributes.verticalAlign}
                            onChange={onChangeVerticalAlign}
                        />
                    </ToolbarGroup>
                </BlockControls>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <p>{__('Choose your Icon', 'sage')}</p>
                        <MediaUpload
                            onSelect={onSelectIconObject}
                            allowedTypes={['image']}
                            render={({open}) => (
                                <Button variant="primary" className={'button'} onClick={open}>
                                    {!attributes.iconObject ? __('Upload Image', 'sage') : __('Change Image', 'sage')}
                                </Button>
                            )}
                        />
                        <hr/>
                        <p>{__('Icon Border Radius', 'sage')}</p>
                        <RangeControl
                            value={attributes.iconBorderRadius}
                            min={0}
                            max={attributes.iconSize}
                            step={1}
                            onChange={onChangeIconBorderRadius}
                        />
                        <hr/>
                        <p>{__('Icon Size', 'sage')}</p>
                        <RangeControl
                            value={attributes.iconSize}
                            min={20}
                            max={200}
                            step={1}
                            onChange={onChangeIconSize}
                        />
                        <hr/>
                        <p>{__('Text Margin', 'sage')}</p>
                        <RangeControl
                            value={attributes.textMargin}
                            min={5}
                            max={120}
                            step={1}
                            onChange={onChangeTextMargin}
                        />
                        <hr/>
                        <p>{__('Bottom Margin', 'sage')}</p>
                        <RangeControl
                            value={attributes.bottomMargin}
                            min={5}
                            max={120}
                            step={1}
                            onChange={onChangeBottomMargin}
                        />
                        <hr/>
                        <ToggleControl
                            label={__('Image Top on Mobile', 'sage')}
                            // help={ attributes.withHeadline ? 'Image is left' : 'Image is right' }
                            checked={attributes.imageTopOnMobile}
                            onChange={onChangeImageTopOnMobile}
                        />
                    </div>
                </InspectorControls>
                <div className={classNames(className, 'icon-text-block', attributes.imageTopOnMobile && 'image-top-on-mobile')}>
                    <div className={classNames('icon-text-block__inner', `justify-content-${attributes.iconTextAlignment}`, `align-items-${attributes.verticalAlign}`)}
                         style={{marginBottom: `${attributes.bottomMargin}px`}}
                    >
                        <img
                            src={getImage(attributes.iconObject)}
                            style={{
                                height: `${attributes.iconSize}px`,
                                borderRadius: `${attributes.iconBorderRadius}px`
                            }}
                            alt={getImage(attributes.iconObject, 'alt')}
                        />
                        <div className="icon-text-block__text" style={{marginLeft: `${attributes.textMargin}px`}}>
                            <InnerBlocks templateLock={false} allowedBlocks={ALLOWEDBLOCKS}/>
                        </div>
                    </div>
                </div>
            </>

        );
    },
    save: ({attributes, className}) => {
        return (
            <>
                <div className={classNames(className, 'icon-text-block', attributes.imageTopOnMobile && 'image-top-on-mobile')}>
                    <div className={classNames('icon-text-block__inner', `justify-content-${attributes.iconTextAlignment}`, `align-items-${attributes.verticalAlign}`)}
                         style={{marginBottom: `${attributes.bottomMargin}px`}}
                    >
                        {attributes.iconObject &&
                            <img
                                src={getImage(attributes.iconObject)}
                                style={{
                                    height: `${attributes.iconSize}px`,
                                    borderRadius: `${attributes.iconBorderRadius}px`
                                }}
                                alt={getImage(attributes.iconObject, 'alt')}
                            />
                        }
                        <div className="icon-text-block__text" style={{marginLeft: `${attributes.textMargin}px`}}>
                            <InnerBlocks.Content/>
                        </div>
                    </div>
                </div>
            </>
        );
    },
});
