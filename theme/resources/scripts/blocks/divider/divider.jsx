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
import {RangeControl, ColorPalette, Dashicon} from '@wordpress/components';
import {
    InspectorControls,
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps
} from '@wordpress/block-editor';
import {separator as dividerIcon} from '@wordpress/icons';

/**
 * Internal dependencies
 */
import {editorThemeColors, getColorObject, MobileSwitch, MobileSwitchInner} from "../utility";

/**
 * Block attributes
 */
const attributes = {
    color: {
        type: 'string',
        default: '#EEE'
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
                        <p>{__('Change Opacity', 'sage')}</p>
                        <RangeControl
                            value={attributes.opacity}
                            min={0}
                            max={1}
                            step={0.05}
                            onChange={(value) => setAttributes({opacity: value})}
                            allowReset={true}
                            resetFallbackValue={1}
                        />
                        <hr/>
                        <MobileSwitch headline={__('Spacing', 'sage')}>
                            <MobileSwitchInner type={'desktop'}>
                                <RangeControl
                                    value={attributes.spacingDesktop}
                                    min={0}
                                    max={140}
                                    step={10}
                                    onChange={(value) => {
                                        setAttributes({spacingDesktop: value});

                                        if (attributes.spacingMobile * 2 === attributes.spacingDesktop) {
                                            setAttributes({spacingMobile: value / 2});
                                        }
                                    }}
                                />
                            </MobileSwitchInner>
                            <MobileSwitchInner type={'mobile'}>
                                <RangeControl
                                    value={attributes.spacingMobile}
                                    min={0}
                                    max={attributes.spacingDesktop}
                                    step={10}
                                    onChange={(value) => setAttributes({spacingMobile: value})}
                                    allowReset={true}
                                    resetFallbackValue={attributes.spacingDesktop / 2}
                                />
                            </MobileSwitchInner>
                        </MobileSwitch>
                        <hr/>
                        <p>{__('Change Thickness', 'sage')}</p>
                        <RangeControl
                            value={attributes.thickness}
                            min={1}
                            max={3}
                            step={1}
                            onChange={(value) => setAttributes({thickness: value})}
                            allowReset={true}
                            resetFallbackValue={1}
                        />
                        <hr/>
                        <p>{__('Change Width in %', 'sage')}</p>
                        <RangeControl
                            value={attributes.width}
                            min={10}
                            max={100}
                            step={1}
                            onChange={(value) => setAttributes({width: value})}
                            allowReset={true}
                            resetFallbackValue={100}
                        />
                        <hr/>
                        <p>{__('Change Color', 'sage')}</p>
                        <ColorPalette
                            colors={editorThemeColors}
                            value={attributes.color}
                            onChange={(value) => setAttributes({color: value})}
                            disableCustomColors={true}
                            // clearable={false}
                        />
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

