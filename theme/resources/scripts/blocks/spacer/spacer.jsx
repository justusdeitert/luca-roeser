/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Wordpress dependencies
 */
import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {
    Button,
    RangeControl,
    FocalPointPicker,
    SelectControl,
    ToolbarGroup,
    ToolbarDropdownMenu,
    ResizableBox,
    ToggleControl
} from '@wordpress/components';
import {MediaUpload, InspectorControls, BlockControls, useBlockProps} from '@wordpress/block-editor';
import {useState, useEffect} from '@wordpress/element';
import {resizeCornerNE as spacerIcon} from '@wordpress/icons';

/**
 * Internal dependencies
 */
import {MobileSwitch, MobileSwitchInner} from '../utility';

registerBlockType('custom/spacer', {
    title: __('Spacer', 'sage'),
    icon: spacerIcon,
    description: __('Add white space between blocks and customize its height.', 'sage'),
    category: 'custom',
    attributes: {
        desktopHeight: {
            type: 'number',
            default: 50
        },
        mobileHeight: {
            type: 'number',
            default: 25
        },
    },
    edit: ({attributes, setAttributes}) => {

        const [isResizing, setIsResizing] = useState(false);
        let minSpacerHeight = 20;
        let maxSpacerHeight = 600;

        const handleOnResizeStart = () => {
            setIsResizing(true);
        }

        const handleOnResizeStop = (event, direction, elt, delta) => {
            setIsResizing(false);

            let newHeight = attributes.desktopHeight + delta.height;
            setAttributes({desktopHeight: newHeight});

            if (attributes.mobileHeight * 2 === attributes.desktopHeight) {
                setAttributes({mobileHeight: newHeight / 2});
            }
        }

        return (
            <>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <hr style={{marginTop: 0}}/>
                        <MobileSwitch headline={__('Height', 'sage')}>
                            <MobileSwitchInner type={'desktop'}>
                                <RangeControl
                                    value={attributes.desktopHeight}
                                    min={minSpacerHeight}
                                    max={maxSpacerHeight}
                                    step={5}
                                    onChange={(value) => {
                                        setAttributes({desktopHeight: value});

                                        if (attributes.mobileHeight * 2 === attributes.desktopHeight) {
                                            setAttributes({mobileHeight: value / 2});
                                        }
                                    }}
                                />
                            </MobileSwitchInner>
                            <MobileSwitchInner type={'mobile'}>
                                <RangeControl
                                    // disabled={!attributes.customMobileHeight}
                                    value={attributes.mobileHeight}
                                    min={minSpacerHeight}
                                    max={attributes.desktopHeight}
                                    step={5}
                                    onChange={(value) => setAttributes({mobileHeight: value})}
                                    allowReset={true}
                                    resetFallbackValue={attributes.desktopHeight / 2}
                                />
                            </MobileSwitchInner>
                        </MobileSwitch>
                    </div>
                </InspectorControls>
                <ResizableBox
                    style={{border: '1px dashed var(--wp-admin-theme-color)'}}
                    size={{
                        height: attributes.desktopHeight
                    }}
                    minHeight={minSpacerHeight}
                    maxHeight={maxSpacerHeight}
                    enable={{
                        top: false,
                        right: false,
                        bottom: true,
                        left: false,
                        topRight: false,
                        bottomRight: false,
                        bottomLeft: false,
                        topLeft: false,
                    }}
                    onResizeStart={handleOnResizeStart}
                    onResizeStop={handleOnResizeStop}
                    __experimentalShowTooltip={true}
                    __experimentalTooltipProps={{
                        axis: 'y',
                        position: 'bottom',
                        isVisible: isResizing,
                    }}
                />
            </>
        );
    },
    save: ({attributes}) => {
        return (
            <>
                <div className={classNames('spacer-block')}
                     style={{
                         '--spacer-height-desktop': `${attributes.desktopHeight}px`,
                         '--spacer-height-mobile': `${attributes.mobileHeight}px`,
                         '--spacer-min-max-height': `${attributes.desktopHeight - attributes.mobileHeight}`,
                     }}
                />
            </>
        );
    },
});

