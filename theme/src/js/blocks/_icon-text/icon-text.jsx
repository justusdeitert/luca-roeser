import {__} from '@wordpress/i18n';
import {registerBlockType   } from '@wordpress/blocks';
import {InspectorControls, RichText, BlockControls, MediaUpload, BlockVerticalAlignmentToolbar, InnerBlocks} from '@wordpress/block-editor';
import {SelectControl, ToolbarGroup, RangeControl, Button, ToolbarDropdownMenu, ToggleControl, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup} from '@wordpress/components';
import classNames from 'classnames';
import {iconTextIcon} from '../custom-icons';
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

const ALLOWED_BLOCKS = [
    'core/paragraph',
    'core/heading',
];

registerBlockType('custom/icon-text', {
    title: __('Icon Text', 'sage'),
    category: 'custom',
    description: __('Displays an icon and text combination.', 'sage'),
    icon: iconTextIcon,
    attributes,
    edit: ({setAttributes, attributes, className, clientId}) => {

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
                                    onClick: () => setAttributes({iconTextAlignment: 'left'}),
                                },
                                {
                                    title: 'Center',
                                    icon: 'align-center',
                                    onClick: () => setAttributes({iconTextAlignment: 'center'}),
                                },
                                {
                                    title: 'Right',
                                    icon: 'align-right',
                                    onClick: () => setAttributes({iconTextAlignment: 'right'}),
                                },
                            ]}
                        />
                        <BlockVerticalAlignmentToolbar
                            value={attributes.verticalAlign}
                            onChange={(value) => {
                                if (value === 'top') {value = 'start';}
                                if (value === 'bottom') {value = 'end';}
                                setAttributes({verticalAlign: value});
                            }}
                        />
                    </ToolbarGroup>
                </BlockControls>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <hr style={{marginTop: 0}}/>
                        <p>{__('Choose your Icon', 'sage')}</p>
                        <MediaUpload
                            onSelect={(value) => setAttributes({iconObject: value})}
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
                            max={200}
                            step={1}
                            onChange={(value) => setAttributes({iconBorderRadius: value})}
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
                                    onChange={(value) => {
                                        setAttributes({iconSizeDesktop: value});

                                        if (attributes.iconSizeMobile === attributes.iconSizeDesktop) {
                                            setAttributes({iconSizeMobile: value});
                                        }
                                    }}
                                />
                            </MobileSwitchInner>
                            <MobileSwitchInner type={'mobile'}>
                                <RangeControl
                                    value={attributes.iconSizeMobile}
                                    min={20}
                                    max={attributes.iconSizeDesktop}
                                    step={1}
                                    onChange={(value) => setAttributes({iconSizeMobile: value})}
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
                            onChange={(value) => setAttributes({bottomTextMargin: value})}
                            allowReset={true}
                            resetFallbackValue={16}
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
                            onChange={(value) => setAttributes({imageTopOnMobile: value})}
                        />
                    </div>
                </InspectorControls>
                <div className={classNames(className, 'icon-text-block', attributes.imageTopOnMobile && 'image-top-on-mobile')}>
                    <div className={classNames('icon-text-block__inner', `justify-content-${attributes.iconTextAlignment}`, `align-items-${attributes.verticalAlign}`)}
                         style={{marginBottom: `${attributes.bottomTextMargin}px`}}
                    >
                        <img
                            src={getImage(attributes.iconObject)}
                            className={'fluid-min-height'}
                            style={{
                                // height: `${attributes.iconSizeDesktop}px`,
                                borderRadius: `${attributes.iconBorderRadius}px`,
                                '--min-height-desktop': `${attributes.iconSizeDesktop}px`,
                                '--min-height-mobile': `${attributes.iconSizeMobile}px`,
                                '--min-height-difference': `${attributes.iconSizeDesktop - attributes.iconSizeMobile}`,
                            }}
                            alt={getImage(attributes.iconObject, 'alt')}
                        />
                        <div className="icon-text-block__text">
                            <InnerBlocks templateLock={false} allowedBlocks={ALLOWED_BLOCKS}/>
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
                                className={'fluid-min-height'}
                                style={{
                                    // height: `${attributes.iconSizeDesktop}px`,
                                    borderRadius: `${attributes.iconBorderRadius}px`,
                                    '--min-height-desktop': `${attributes.iconSizeDesktop}px`,
                                    '--min-height-mobile': `${attributes.iconSizeMobile}px`,
                                    '--min-height-difference': `${attributes.iconSizeDesktop - attributes.iconSizeMobile}`,
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
