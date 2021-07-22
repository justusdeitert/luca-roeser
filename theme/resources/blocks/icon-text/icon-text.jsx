import {__} from '@wordpress/i18n';
import {registerBlockType   } from '@wordpress/blocks';
import {InspectorControls, RichText, BlockControls, MediaUpload, BlockVerticalAlignmentToolbar, InnerBlocks} from '@wordpress/block-editor';
import {SelectControl, ToolbarGroup, RangeControl, Button, ToolbarDropdownMenu, ToggleControl, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup} from '@wordpress/components';
import classNames from 'classnames';
import {iconTextIcon} from '../icons';
import {getImage, MobileSwitch, MobileSwitchInner} from "../utility";

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
    bottomTextMargin: {
        type: 'number',
        default: 16
    },
    // bottomMargin: {
    //     type: 'number',
    //     default: 16
    // },
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
    iconSizeDesktop: {
        type: 'number',
        default: 40
    },
    iconSizeMobile: {
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
    icon: iconTextIcon,
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

        const onChangeIconSizeDesktop = (value) => {
            setAttributes({iconSizeDesktop: value});

            if (attributes.iconSizeMobile === attributes.iconSizeDesktop) {
                setAttributes({iconSizeMobile: value});
            }
        }

        const onChangeIconSizeMobile = (value) => {
            setAttributes({iconSizeMobile: value});
        }

        const onChangeIconBorderRadius = (value) => {
            setAttributes({iconBorderRadius: value});
        }

        const onChangeBottomTextMargin = (value) => {
            setAttributes({bottomTextMargin: value});
        }

        // const onChangeBottomMargin = (value) => {
        //     setAttributes({bottomMargin: value});
        // }

        const onClickAlignment = (value) => {
            setAttributes({iconTextAlignment: value});
        }

        const onChangeImageTopOnMobile = (value) => {
            setAttributes({imageTopOnMobile: value});
        }

        attributes.clientId = clientId;

        return (
            <>
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarDropdownMenu
                            icon={`align-${attributes.iconTextAlignment}`}
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
                            max={100}
                            step={1}
                            onChange={onChangeIconBorderRadius}
                            allowReset={true}
                            resetFallbackValue={0}
                        />
                        <hr/>
                        <MobileSwitch headline={__('Icon Size', 'sage')}>
                            <MobileSwitchInner type={'desktop'}>
                                <RangeControl
                                    value={attributes.iconSizeDesktop}
                                    min={20}
                                    max={200}
                                    step={1}
                                    onChange={onChangeIconSizeDesktop}
                                />
                            </MobileSwitchInner>
                            <MobileSwitchInner type={'mobile'}>
                                <RangeControl
                                    value={attributes.iconSizeMobile}
                                    min={20}
                                    max={attributes.iconSizeDesktop}
                                    step={1}
                                    onChange={onChangeIconSizeMobile}
                                    allowReset={true}
                                    resetFallbackValue={attributes.iconSizeDesktop}
                                />
                            </MobileSwitchInner>
                        </MobileSwitch>
                        <hr/>
                        <p>{__('Bottom Text Margin', 'sage')}</p>
                        <RangeControl
                            value={attributes.bottomTextMargin}
                            min={0}
                            max={120}
                            step={1}
                            onChange={onChangeBottomTextMargin}
                        />
                        {/*<hr/>
                        <p>{__('Bottom Margin', 'sage')}</p>
                        <RangeControl
                            value={attributes.bottomMargin}
                            min={5}
                            max={120}
                            step={1}
                            onChange={onChangeBottomMargin}
                        />*/}
                        <hr/>
                        <ToggleControl
                            label={__('Icon top on mobile', 'sage')}
                            help={__('Lets the icon sit above the text on mobile', 'sage')}
                            checked={attributes.imageTopOnMobile}
                            onChange={onChangeImageTopOnMobile}
                        />
                    </div>
                </InspectorControls>
                <div className={classNames(className, 'icon-text-block', attributes.imageTopOnMobile && 'image-top-on-mobile')}>
                    <div className={classNames('icon-text-block__inner', `justify-content-${attributes.iconTextAlignment}`, `align-items-${attributes.verticalAlign}`)}
                         style={{marginBottom: `${attributes.bottomTextMargin}px`}}
                    >
                        <img
                            src={getImage(attributes.iconObject)}
                            style={{
                                // height: `${attributes.iconSizeDesktop}px`,
                                borderRadius: `${attributes.iconBorderRadius}px`,
                                '--icon-text-height-desktop': `${attributes.iconSizeDesktop}px`,
                                '--icon-text-height-mobile': `${attributes.iconSizeMobile}px`,
                                '--icon-text-min-max-height': `${attributes.iconSizeDesktop - attributes.iconSizeMobile}`,
                            }}
                            alt={getImage(attributes.iconObject, 'alt')}
                        />
                        <div className="icon-text-block__text">
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
                         style={{marginBottom: `${attributes.bottomTextMargin}px`}}
                    >
                        {attributes.iconObject &&
                            <img
                                src={getImage(attributes.iconObject)}
                                style={{
                                    // height: `${attributes.iconSizeDesktop}px`,
                                    borderRadius: `${attributes.iconBorderRadius}px`,
                                    '--icon-text-height-desktop': `${attributes.iconSizeDesktop}px`,
                                    '--icon-text-height-mobile': `${attributes.iconSizeMobile}px`,
                                    '--icon-text-min-max-height': `${attributes.iconSizeDesktop - attributes.iconSizeMobile}`,
                                }}
                                alt={getImage(attributes.iconObject, 'alt')}
                            />
                        }
                        <div className="icon-text-block__text">
                            <InnerBlocks.Content/>
                        </div>
                    </div>
                </div>
            </>
        );
    },
});
