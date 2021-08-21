import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks, useBlockProps, __experimentalUseInnerBlocksProps as useInnerBlocksProps} from '@wordpress/block-editor';
import classNames from 'classnames';
import {useEffect} from '@wordpress/element';
import {
    ALLOWED_BLOCKS,
    getColorObject,
    parentAttributes,
    removeArrayItems,
} from '../utility';
import {accordionInnerIcon} from '../custom-icons';

const attributes = {
    clientId: {
        type: 'string',
        default: ''
    },
    parentId: {
        type: 'string',
        default: ''
    },
    parentBackgroundColor: {
        type: 'string',
        default: ''
    },
};

registerBlockType('custom/slider-inner', {
    apiVersion: 2,
    title: __('Slider Inner', 'sage'),
    category: 'custom',
    icon: accordionInnerIcon,
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
        attributes.parentBackgroundColor = parentAttributes(attributes.clientId).slidesBackgroundColor;

        /**
         * Check for block updates and deletion
         */
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
            className: classNames(
                'slider-block__slide-inner',
                'custom-border',
                'custom-border-radius',
                getColorObject(attributes.parentBackgroundColor) && `has-background has-${getColorObject(attributes.parentBackgroundColor).slug}-background-color`
            ),
            style: {
                marginTop: 0,
                marginBottom: 0,
                border: !attributes.parentBackgroundColor && '1px dashed var(--wp-admin-theme-color)',
            }
        });

        const innerBlocksProps = useInnerBlocksProps(blockProps, {
            templateLock: false,
            allowedBlocks: removeArrayItems(ALLOWED_BLOCKS, ['custom/slider']),
            renderAppender: InnerBlocks.DefaultBlockAppender
        });


        return (
            <>
                <div className={classNames('swiper-slide', 'slider-block__slide')}>
                    <div {...innerBlocksProps}>
                        {/*<InnerBlocks
                            templateLock={false}
                            allowedBlocks={removeArrayItems(ALLOWED_BLOCKS, ['custom/slider'])}
                            renderAppender={InnerBlocks.DefaultBlockAppender}
                        />*/}
                        {innerBlocksProps.children}
                    </div>
                </div>
            </>
        );
    },
    save: ({attributes}) => {

        // Need to use for passing classes to save function
        const blockProps = useBlockProps.save({
            className: classNames(
                'slider-block__slide-inner',
                'custom-border',
                'custom-border-radius',
                getColorObject(attributes.parentBackgroundColor) && `has-background has-${getColorObject(attributes.parentBackgroundColor).slug}-background-color`
            ),
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
