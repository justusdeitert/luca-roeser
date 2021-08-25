/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Wordpress dependencies
 */
import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {ToggleControl} from '@wordpress/components';
import {Component} from '@wordpress/element';
import {RangeControl, ColorPalette, Dashicon, Icon} from '@wordpress/components';
import {
    InspectorControls,
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    __experimentalColorGradientControl as ColorGradientControl,
} from '@wordpress/block-editor';
import {
    aspectRatio as aspectRatioIcon,
    separator as dividerIcon,
    color as colorIcon,
    resizeCornerNE as resizeIcon
} from '@wordpress/icons';

/**
 * Internal dependencies
 */
import {
    editorThemeColors,
    getColorObject,
    MobileSwitch,
    MobileSwitchInner,
    SettingsHeading,
    ResetWrapperControl
} from "../utility";
import {
    height as heightIcon,
    width as widthicon
} from '../custom-icons'

/**
 * Block attributes
 */
const attributes = {
    color: {
        type: 'string',
        default: '#EEE'
    },
    gradient: {
        type: 'string',
        default: 'linear-gradient(135deg,rgba(6,147,227,1) 0%,rgb(155,81,224) 100%)'
    },
    opacity: {
        type: 'number',
        default: 1
    },
    spacingDesktop: {
        type: 'number',
        default: 40
    },
    spacingMobile: {
        type: 'number',
        default: 20
    },
    thickness: {
        type: 'number',
        default: 1
    },
    width: {
        type: 'number',
        default: 100
    },
};

/**
 * Register block
 */
registerBlockType('custom/divider', {
    title: __('Divider', 'sage'),
    icon: dividerIcon,
    category: 'custom',
    description: __('Create a break between content or sections with a horizontal divider.', 'sage'),
    supports: {
        align: ['full'],
    },
    attributes,
    edit: ({setAttributes, attributes, className}) => {

        const blockProps = useBlockProps({
            className: classNames(
                className,
                'divider-block',
            ),
            style: {
                border: '1px dashed var(--wp-admin-theme-color)',
                paddingTop: '20px',
                paddingBottom: '20px',
                '--divider-spacing-desktop': `${attributes.spacingDesktop}px`,
                '--divider-spacing-mobile': `${attributes.spacingMobile}px`,
                '--divider-spacing-desktop-mobile': `${attributes.spacingDesktop - attributes.spacingMobile}`
            }
        });

        return (
            <>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <hr style={{marginTop: 0}}/>
                        {/*<p>{__('Opacity', 'sage')}</p>*/}
                        <SettingsHeading headline={'Opacity'} icon={'visibility'}/>
                        <ResetWrapperControl onClick={() => setAttributes({opacity: 1})}>
                            <RangeControl
                                value={attributes.opacity}
                                min={0}
                                max={1}
                                step={0.05}
                                onChange={(value) => setAttributes({opacity: value})}
                                // allowReset={true}
                                // resetFallbackValue={1}
                            />
                        </ResetWrapperControl>
                        <hr/>
                        <MobileSwitch headline={__('Spacing', 'sage')} icon={heightIcon}>
                            <MobileSwitchInner type={'desktop'}>
                                <ResetWrapperControl onClick={() => {
                                    setAttributes({spacingDesktop: 40});
                                    setAttributes({spacingMobile: 20});
                                }}>
                                    <RangeControl
                                        value={attributes.spacingDesktop}
                                        min={0}
                                        max={140}
                                        step={10}
                                        onChange={(value) => {
                                            setAttributes({spacingDesktop: value});

                                            // Set mobile spacing as well
                                            if (attributes.spacingMobile * 2 === attributes.spacingDesktop) {
                                                setAttributes({spacingMobile: value / 2});
                                            }
                                        }}
                                    />
                                </ResetWrapperControl>
                            </MobileSwitchInner>
                            <MobileSwitchInner type={'mobile'}>
                                <ResetWrapperControl onClick={() => {
                                    setAttributes({spacingDesktop: 40});
                                    setAttributes({spacingMobile: 20});
                                }}>
                                    <RangeControl
                                        value={attributes.spacingMobile}
                                        min={0}
                                        max={attributes.spacingDesktop}
                                        step={10}
                                        onChange={(value) => setAttributes({spacingMobile: value})}
                                    />
                                </ResetWrapperControl>
                            </MobileSwitchInner>
                        </MobileSwitch>
                        <hr/>
                        {/*<p>{__('Change Thickness', 'sage')}</p>*/}
                        <SettingsHeading headline={'Thickness'} icon={resizeIcon}/>
                        <ResetWrapperControl onClick={() => setAttributes({thickness: 1})}>
                            <RangeControl
                                value={attributes.thickness}
                                min={1}
                                max={10}
                                step={1}
                                onChange={(value) => setAttributes({thickness: value})}
                            />
                        </ResetWrapperControl>
                        <hr/>
                        {/*<p>{__('Change Width in %', 'sage')}</p>*/}
                        <SettingsHeading headline={'Width'} icon={widthicon}/>
                        <ResetWrapperControl onClick={() => setAttributes({width: 100})}>
                            <RangeControl
                                value={attributes.width}
                                min={10}
                                max={100}
                                step={1}
                                onChange={(value) => setAttributes({width: value})}
                            />
                        </ResetWrapperControl>
                        <hr/>
                        {/*<p>{__('Color', 'sage')}</p>*/}
                        <SettingsHeading headline={'Color'} icon={colorIcon}/>
                        <ColorPalette
                            colors={editorThemeColors}
                            value={attributes.color}
                            onChange={(value) => setAttributes({color: value})}
                            // disableCustomColors={true}
                            // clearable={false}
                        />
                        {/*<ColorGradientControl
                            colorValue={attributes.color}
                            gradientValue={attributes.gradient}
                            colors={editorThemeColors}
                            gradients={[
                                {
                                    name: 'Vivid cyan blue to vivid purple',
                                    gradient:
                                        'linear-gradient(135deg,rgba(6,147,227,1) 0%,rgb(155,81,224) 100%)',
                                    slug: 'vivid-cyan-blue-to-vivid-purple',
                                },
                                {
                                    name: 'Light green cyan to vivid green cyan',
                                    gradient:
                                        'linear-gradient(135deg,rgb(122,220,180) 0%,rgb(0,208,130) 100%)',
                                    slug: 'light-green-cyan-to-vivid-green-cyan',
                                },
                                {
                                    name: 'Luminous vivid amber to luminous vivid orange',
                                    gradient:
                                        'linear-gradient(135deg,rgba(252,185,0,1) 0%,rgba(255,105,0,1) 100%)',
                                    slug: 'luminous-vivid-amber-to-luminous-vivid-orange',
                                },
                            ]}
                            label={__('Color', 'sage')}
                            onColorChange={(value) => setAttributes({color: value})}
                            onGradientChange={(value) => setAttributes({gradient: value})}
                        />*/}
                    </div>
                </InspectorControls>
                <div {...blockProps}>
                    <hr className='divider-block__hr'
                        style={{
                            height: `${attributes.thickness}px`,
                            maxWidth: `${attributes.width}%`,
                            opacity: attributes.opacity,
                            backgroundColor: attributes.color,
                        }}
                    />
                </div>
            </>
        );
    },
    save: ({attributes}) => {

        const blockProps = useBlockProps.save({
            className: classNames('divider-block'),
            style: {
                '--divider-spacing-desktop': `${attributes.spacingDesktop}px`,
                '--divider-spacing-mobile': `${attributes.spacingMobile}px`,
                '--divider-spacing-desktop-mobile': `${attributes.spacingDesktop - attributes.spacingMobile}`
            }
        });

        return (
            <div {...blockProps}>
                <hr className='divider-block__hr'
                    style={{
                        height: `${attributes.thickness}px`,
                        maxWidth: `${attributes.width}%`,
                        opacity: attributes.opacity,
                        backgroundColor: attributes.color,
                    }}
                />
            </div>
        );
    },
});

