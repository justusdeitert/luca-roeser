import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks, RichText, InspectorControls, ColorPalette, useBlockProps, __experimentalUseInnerBlocksProps as useInnerBlocksProps} from '@wordpress/block-editor';
import classNames from 'classnames';
import {createElement, Component, useEffect} from '@wordpress/element';
import {ALLOWEDBLOCKS, editorThemeColors, getColorObject, parentAttributes, SelectClipPath, removeArrayItems} from '../utility';
import {accordionInner} from '../icons';

const attributes = {
    clientId: {
        type: 'string',
        default: ''
    },
    parentId: {
        type: 'string',
        default: ''
    },
};

registerBlockType('custom/slider-inner', {
    apiVersion: 2,
    title: __('Slider Inner', 'sage'),
    category: 'custom',
    icon: accordionInner,
    attributes,
    parent: ['custom/slider'],
    // supports: {
    //     inserter: false,
    //     className: false,
    //     reusable: false,
    //     html: false,
    // },
    edit: ({setAttributes, attributes, className, clientId}) => {

        attributes.clientId = clientId;
        attributes.parentId = parentAttributes(attributes.clientId).clientId;

        useEffect(() => {
            /**
             * On block initialisation
             */
            let slideInstance = window.sliderBlockInstances[attributes.parentId];
            if (slideInstance) {
                let sliderActiveIndex = slideInstance.activeIndex + 1;
                window.updateSliderBlockInstances();
                // New query because slider has ben reinitialized
                window.sliderBlockInstances[attributes.parentId].slideTo(sliderActiveIndex, 0)
            }

            /**
             * On Block Remove
             */
            return () => {
                let slideInstance = window.sliderBlockInstances[attributes.parentId];
                if (slideInstance) {
                    let sliderActiveIndex = slideInstance.activeIndex - 1;
                    window.updateSliderBlockInstances();
                    // New query because slider has ben reinitialized
                    window.sliderBlockInstances[attributes.parentId].slideTo(sliderActiveIndex, 0)
                }
            };
        }, []);

        const blockProps = useBlockProps({
            className: classNames('slider-block__slide-inner', 'custom-border', 'custom-border-radius', 'custom-shadow'),
            style: {
                marginTop: 0,
                marginBottom: 0,
                border: '1px dashed var(--wp-admin-theme-color)',
            }
        });

        return (
            <>
                <div className={classNames('swiper-slide', 'slider-block__slide')}>
                    <div {...blockProps}>
                        <InnerBlocks
                            templateLock={false}
                            allowedBlocks={removeArrayItems(ALLOWEDBLOCKS, ['custom/slider'])}
                            renderAppender={InnerBlocks.DefaultBlockAppender}
                        />
                    </div>
                </div>
            </>
        );
    },
    save: ({attributes}) => {

        // Need to use for passing classes to save function
        const blockProps = useBlockProps.save({
            className: classNames('slider-block__slide-inner', 'custom-border', 'custom-border-radius', 'custom-shadow'),
        });

        return (
            <div className={classNames('swiper-slide', 'slider-block__slide')}>
                <div {...blockProps}>
                    <InnerBlocks.Content/>
                </div>
            </div>
        );
    },
});
