import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {RangeControl, ToggleControl, ColorPalette, SelectControl} from '@wordpress/components';
import {InnerBlocks, InspectorControls, useBlockProps, __experimentalUseInnerBlocksProps as useInnerBlocksProps} from '@wordpress/block-editor';
import classNames from 'classnames';
import {editorThemeColors, getColorObject, updateInnerBlocks, loremIpsum} from "../utility";
import {accordionIcon} from "../icons";

const attributes = {
    clientId: {
        type: 'string',
        default: '',
    },
    showIcon: {
        type: 'boolean',
        default: true,
    },
    accordionSpacing: {
        type: 'number',
        default: 16,
    },
    accordionHeadlineSize: {
        type: 'number',
        default: 'small',
    },
    accordionBackgroundColor: {
        type: 'string',
        default: ''
    },
};

registerBlockType('custom/accordion', {
    apiVersion: 2,
    title: __('Accordion', 'sage'),
    icon: accordionIcon,
    category: 'custom',
    attributes,
    // multiple: false,
    edit: ({setAttributes, attributes, className, clientId}) => {

        attributes.clientId = clientId;

        const onChangeShowIcon = (value) => {
            setAttributes({showIcon: value});
        };

        const onChangeAccordionSpacing = (value) => {
            setAttributes({accordionSpacing: value});
        };

        const onChangeAccordionHeadlineSize = (value) => {
            setAttributes({accordionHeadlineSize: value});
            updateInnerBlocks(clientId);
        };

        const onChangeAccordionBackgroundColor = (value) => {
            setAttributes({accordionBackgroundColor: value});
        };

        const TEMPLATE = [
            ['custom/accordion-inner', {}, [
                ['core/paragraph', {placeholder: loremIpsum, content: loremIpsum}]
            ]],
            ['custom/accordion-inner', {}, [
                ['core/paragraph', {placeholder: loremIpsum, content: loremIpsum}]
            ]],
            ['custom/accordion-inner', {}, [
                ['core/paragraph', {placeholder: loremIpsum, content: loremIpsum}],
            ]],
        ];

        const blockProps = useBlockProps({
            className: classNames(
                className,
                'accordion-block',
                'custom-shadow',
                'custom-border-radius',
                'custom-spacing',
                getColorObject(attributes.accordionBackgroundColor) && `has-${getColorObject(attributes.accordionBackgroundColor).slug}-background-color`,
                attributes.showIcon && 'has-icon'
            ),
            style: {'--accordion-spacing': `${attributes.accordionSpacing / 16}rem`}
        });

        const innerBlocksProps = useInnerBlocksProps(blockProps, {
            allowedBlocks: ['custom/accordion-inner'],
            // orientation: 'horizontal', // default: 'vertical'
            template: TEMPLATE,
        });

        return (
            <>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <hr/>
                        <ToggleControl
                            label={__('Show Icon', 'sage')}
                            checked={attributes.showIcon}
                            onChange={onChangeShowIcon}
                        />
                        <hr/>
                        <p>{__('Accordion Spacing', 'sage')}</p>
                        <RangeControl
                            value={attributes.accordionSpacing}
                            min={8}
                            initialPosition={16}
                            max={32}
                            onChange={onChangeAccordionSpacing}
                        />
                        <hr/>
                        <SelectControl
                            label={__('Custom Font Size', 'sage')}
                            value={attributes.accordionHeadlineSize}
                            options={[
                                {label: __('None', 'sage'), value: ''},
                                {label: __('Tiny (H6)', 'sage'), value: 'tiny'},
                                {label: __('Small (H5)', 'sage'), value: 'small'},
                                {label: __('Normal (H4)', 'sage'), value: 'normal'},
                                {label: __('Medium (H3)', 'sage'), value: 'medium'},
                                {label: __('Large (H2)', 'sage'), value: 'large'},
                                {label: __('Huge (H1)', 'sage'), value: 'huge'},
                            ]}
                            onChange={onChangeAccordionHeadlineSize}
                        />
                        <hr/>
                        <p>{__('Accordion Background Color', 'sage')}</p>
                        <ColorPalette
                            colors={[...editorThemeColors]}
                            value={attributes.accordionBackgroundColor}
                            onChange={onChangeAccordionBackgroundColor}
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
                'custom-shadow',
                'custom-border-radius',
                'custom-spacing',
                getColorObject(attributes.accordionBackgroundColor) && `has-${getColorObject(attributes.accordionBackgroundColor).slug}-background-color`,
                attributes.showIcon && 'has-icon'
            ),
            id: `block-${attributes.clientId}`,
            style: {'--accordion-spacing': `${attributes.accordionSpacing / 16}rem`}
        });

        return (
            <>
                <div {...blockProps}>
                    <InnerBlocks.Content />
                </div>
            </>
        );
    }
});
