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
    RangeControl,
    ToggleControl,
    ColorPalette,
    SelectControl,
    __experimentalRadio as Radio,
    __experimentalRadioGroup as RadioGroup
} from '@wordpress/components';
import {
    InnerBlocks,
    InspectorControls,
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps
} from '@wordpress/block-editor';
import {
    color as colorIcon,
    resizeCornerNE as resizeIcon,
    box as boxIcon,
    formatCapitalize as fontSizeIcon
} from "@wordpress/icons";

/**
 * Internal dependencies
 */
import {
    editorThemeColors,
    getColorObject,
    updateInnerBlocks,
    loremIpsum,
    parentAttributes,
    SettingsHeading,
    ResetWrapperControl,
    returnBackgroundColorClass,
    returnBackgroundColorStyle
} from "../utility";
import {accordion as accordionIcon} from "../custom-icons";

/**
 * Block attributes
 */
const attributes = {
    clientId: {
        type: 'string',
        default: '',
    },
    showIcon: {
        type: 'boolean',
        default: false,
    },
    accordionSpacing: {
        type: 'number',
        default: 16,
    },
    accordionHeadlineSize: {
        type: 'string',
        default: 'small',
    },
    accordionBackgroundColor: {
        type: 'string',
        default: ''
    },
    accordionOpenIndex: {
        type: 'number',
        default: false,
    }
};

registerBlockType('custom/accordion', {
    apiVersion: 2,
    title: __('Accordion', 'sage'),
    icon: accordionIcon,
    category: 'custom',
    description: __('Accordions are useful when you want to toggle between hiding and showing large amount of content.', 'sage'),
    attributes,
    // multiple: false,
    edit: ({setAttributes, attributes, className, clientId}) => {

        attributes.clientId = clientId;

        const TEMPLATE = [
            ['custom/accordion-inner', {}, [
                // ['core/paragraph', {placeholder: loremIpsum, content: loremIpsum}]
                ['core/paragraph']
            ]],
            ['custom/accordion-inner', {}, [
                ['core/paragraph']
            ]],
            ['custom/accordion-inner', {}, [
                ['core/paragraph'],
            ]],
        ];

        const blockProps = useBlockProps({
            className: classNames(
                className,
                'accordion-block',
                returnBackgroundColorClass(attributes.accordionBackgroundColor),
                attributes.showIcon && 'has-icon'
            ),
            style: {
                '--accordion-spacing': `${attributes.accordionSpacing / 16}rem`,
                ...returnBackgroundColorStyle(attributes.accordionBackgroundColor),
            }
        });

        const innerBlocksProps = useInnerBlocksProps(blockProps, {
            allowedBlocks: ['custom/accordion-inner'],
            // orientation: 'horizontal', // default: 'vertical'
            template: TEMPLATE,
        });

        /**
         * This Function sure can be implemented in an smarter way
         * TODO: Make functionality for accordion item be Open
         */
        // let accordionElement = document.querySelector(`#block-${clientId}`);
        //
        // let accordionItems = accordionElement.querySelector('.accordion-block__item');
        // accordionItems.forEach((item) => {
        //     item.addEventListener('click', () => {
        //        // ------->
        //     });
        // });

        return (
            <>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <hr style={{marginTop: 0}}/>
                        <ToggleControl
                            label={__('Show Icon', 'sage')}
                            checked={attributes.showIcon}
                            onChange={(value) => setAttributes({showIcon: value})}
                        />
                        <hr/>
                        <SettingsHeading headline={'Spacing'} icon={resizeIcon}/>
                        <ResetWrapperControl onClick={() => setAttributes({accordionSpacing: 16})}>
                            <RangeControl
                                value={attributes.accordionSpacing}
                                min={8}
                                initialPosition={16}
                                max={32}
                                onChange={(value) => setAttributes({accordionSpacing: value})}
                            />
                        </ResetWrapperControl>
                        <hr/>
                        <SettingsHeading headline={'Headline size'} icon={fontSizeIcon}/>
                        <RadioGroup {...{
                            onChange: (value) => {
                                setAttributes({accordionHeadlineSize: value});
                                updateInnerBlocks(clientId);
                            },
                            checked: attributes.accordionHeadlineSize,
                            // defaultChecked: 'small'
                        }}>
                            <Radio value={false}>{__('None', 'sage')}</Radio>
                            <Radio value="tiny">{__('Tiny', 'sage')}</Radio>
                            <Radio value="small">{__('Small', 'sage')}</Radio>
                            <Radio value="normal">{__('Normal', 'sage')}</Radio>
                            <Radio value="medium">{__('Medium', 'sage')}</Radio>
                            <Radio value="large">{__('Large', 'sage')}</Radio>
                            <Radio value="huge">{__('Huge', 'sage')}</Radio>
                        </RadioGroup>
                        <hr/>
                        <SettingsHeading headline={'Background Color'} icon={colorIcon}/>
                        <ColorPalette
                            colors={editorThemeColors}
                            value={attributes.accordionBackgroundColor}
                            onChange={(value) => setAttributes({accordionBackgroundColor: value})}
                            // disableCustomColors={true}
                        />
                    </div>
                </InspectorControls>
                <div {...innerBlocksProps}>
                    {innerBlocksProps.children}
                </div>
            </>
        );
    },
    save: ({attributes}) => {

        // Need to use for passing classes to save function
        const blockProps = useBlockProps.save({
            className: classNames(
                'accordion-block',
                returnBackgroundColorClass(attributes.accordionBackgroundColor),
                attributes.showIcon && 'has-icon'
            ),
            id: `block-${attributes.clientId}`,
            style: {
                '--accordion-spacing': `${attributes.accordionSpacing / 16}rem`,
                ...returnBackgroundColorStyle(attributes.accordionBackgroundColor),
            }
        });

        return (
            <>
                <div {...blockProps}>
                    <InnerBlocks.Content/>
                </div>
            </>
        );
    }
});
