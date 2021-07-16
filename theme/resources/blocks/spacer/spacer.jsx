import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {Button, RangeControl, FocalPointPicker, SelectControl, ToolbarGroup, ToolbarDropdownMenu, ResizableBox, ToggleControl} from '@wordpress/components';
import {MediaUpload, InspectorControls, BlockControls, useBlockProps} from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import classNames from 'classnames';
import {getImage, focalPositionInPixel} from '../utility';
import {spacer} from '../icons';

registerBlockType('custom/spacer', {
    title: __('Spacer', 'sage'),
    icon: spacer,
    category: 'custom',
    attributes: {
        desktopHeight: {
            type: 'number',
            default: 50
        },
        customMobileHeight: {
            type: 'boolean',
            default: false
        },
        mobileHeight: {
            type: 'number',
            default: 25
        },
    },
    edit: ({className, attributes, setAttributes}) => {

        const [isResizing, setIsResizing] = useState(false);
        let minSpacerHeight = 20;
        let maxSpacerHeight = 600;

        const onChangeDesktopHeight = (value) => {
            setAttributes({desktopHeight: value});

            if (!attributes.customMobileHeight) {
                setAttributes({mobileHeight: value / 2});
            }
        };

        const onChangeCustomMobileHeight = (value) => {
            setAttributes({customMobileHeight: value});
        };

        const onChangeMobileHeight = (value) => {
            setAttributes({mobileHeight: value});
        };

        const handleOnResizeStart = () => {
            setIsResizing(true);
        }

        const handleOnResizeStop = (event, direction, elt, delta) => {
            setIsResizing(false);

            let newHeight = attributes.desktopHeight + delta.height;
            setAttributes({desktopHeight: newHeight});

            if (!attributes.customMobileHeight) {
                setAttributes({mobileHeight: newHeight / 2});
            }
        }

        return (
            <>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <hr/>
                        <p>{__('Desktop Height', 'sage')}</p>
                        <RangeControl
                            value={attributes.desktopHeight}
                            min={minSpacerHeight}
                            max={maxSpacerHeight}
                            step={5}
                            onChange={onChangeDesktopHeight}
                        />
                        <hr/>
                        <ToggleControl
                            label={__('Custom Mobile Height', 'sage')}
                            checked={attributes.customMobileHeight}
                            onChange={onChangeCustomMobileHeight}
                        />
                        <hr/>
                        <p>{__('Mobile Height', 'sage')}</p>
                        <RangeControl
                            disabled={!attributes.customMobileHeight}
                            value={attributes.customMobileHeight ? attributes.mobileHeight : attributes.desktopHeight / 2}
                            min={minSpacerHeight}
                            max={attributes.desktopHeight}
                            step={5}
                            onChange={onChangeMobileHeight}
                        />
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
                    __experimentalShowTooltip={ true }
                    __experimentalTooltipProps={ {
                        axis: 'y',
                        position: 'bottom',
                        isVisible: isResizing,
                    } }
                />
            </>
        );
    },
    save: ({attributes}) => {

        const blockProps = useBlockProps.save();

        return (
            <>
                <div className={classNames(blockProps.className, 'spacer-block')}
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

