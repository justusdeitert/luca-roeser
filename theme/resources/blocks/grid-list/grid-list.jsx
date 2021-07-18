import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {RangeControl, ToggleControl} from '@wordpress/components';
import {InnerBlocks, InspectorControls, ColorPalette, useBlockProps, __experimentalUseInnerBlocksProps as useInnerBlocksProps} from '@wordpress/block-editor';
import classNames from 'classnames';
import {gridListIcon} from '../icons';
import {editorThemeColors, updateInnerBlocks} from "../utility";
// import * as clipPaths from "../clip-paths"

const attributes = {
    clientId: {
        type: 'string',
        default: ''
    },
    columns: {
        type: 'number',
        default: 3
    },
    twoColumnsMobile: {
        type: 'boolean',
        default: false,
    },
    customSpacing: {
        type: 'boolean',
        default: false,
    },
    spaceBetweenX: {
        type: 'number',
        default: 32
    },
    spaceBetweenY: {
        type: 'number',
        default: 32
    },
    generalBackgroundColor: {
        type: 'string',
        default: ''
    },
    hasCustomPadding: {
        type: 'boolean',
        default: false,
    },
    customPadding: {
        type: 'number',
        default: 32
    },
};

registerBlockType('custom/grid-list', {
    apiVersion: 2,
    title: __('Grid List', 'sage'),
    category: 'custom',
    icon: gridListIcon,
    attributes,
    supports: {
        anchor: true,
        html: false,
        align: ['wide', 'full'],
    },
    edit: ({setAttributes, attributes, className, clientId}) => {

        const onChangeColumns = (value) => {
            setAttributes({columns: value});
        };

        const onChangeTwoColumnsMobile = (value) => {
            setAttributes({twoColumnsMobile: value});
        };

        const onChangeCustomSpacing = (value) => {
            setAttributes({customSpacing: value});
        };

        const onChangeSpaceBetweenX = (value) => {
            setAttributes({spaceBetweenX: value});
        };

        const onChangeSpaceBetweenY = (value) => {
            setAttributes({spaceBetweenY: value});
        };

        const onChangeGeneralBackgroundColor = (value) => {
            setAttributes({generalBackgroundColor: value});
            updateInnerBlocks(clientId);
        };

        const onChangeHasCustomPadding = (value) => {
            setAttributes({hasCustomPadding: value});
        };

        const onChangeCustomPadding = (value) => {
            setAttributes({customPadding: value});
        };

        attributes.clientId = clientId;

        const TEMPLATE = [
            ['custom/grid-list-inner', {}, [
                ['core/paragraph', {placeholder: 'Lorem Ipsum...'}]
            ]],
            ['custom/grid-list-inner', {}, [
                ['core/paragraph', {placeholder: 'Lorem Ipsum...'}]
            ]],
            ['custom/grid-list-inner', {}, [
                ['core/paragraph', {placeholder: 'Lorem Ipsum...'}]
            ]],
        ];

        const blockProps = useBlockProps({
            className: classNames(className, 'grid-list-block', `grid-list-${attributes.clientId}`),
        });

        const innerBlocksProps = useInnerBlocksProps(blockProps, {
            allowedBlocks: ['custom/grid-list-inner'],
            orientation: 'horizontal',
            template: TEMPLATE,
        });

        return (
            <>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <hr/>
                        <p>{__('Grid Columns', 'sage')}</p>
                        <RangeControl
                            value={attributes.columns}
                            min={1}
                            max={6}
                            step={1}
                            onChange={onChangeColumns}
                        />
                        <hr/>
                        <ToggleControl
                            label={__('Mobile Two Columns', 'sage')}
                            help={__('Select if you want two columns on the smallest screen resolution', 'sage')}
                            checked={attributes.twoColumnsMobile}
                            onChange={onChangeTwoColumnsMobile}
                        />
                        <hr/>
                        <ToggleControl
                            label={__('Custom Spacing', 'sage')}
                            checked={attributes.customSpacing}
                            onChange={onChangeCustomSpacing}
                        />
                        {attributes.customSpacing &&
                            <>
                                <hr/>
                                <p>{__('Space Between X', 'sage')}</p>
                                <RangeControl
                                    value={attributes.spaceBetweenX}
                                    min={0}
                                    max={160}
                                    step={1}
                                    onChange={onChangeSpaceBetweenX}
                                />
                                <hr/>
                                <p>{__('Space Between Y', 'sage')}</p>
                                <RangeControl
                                    value={attributes.spaceBetweenY}
                                    min={0}
                                    max={160}
                                    step={1}
                                    onChange={onChangeSpaceBetweenY}
                                />
                            </>
                        }
                        <hr/>
                        <ToggleControl
                            label={__('Has Custom Padding', 'sage')}
                            checked={attributes.hasCustomPadding}
                            onChange={onChangeHasCustomPadding}
                        />
                        {attributes.hasCustomPadding &&
                        <>
                            <hr/>
                            <p>{__('Custom Padding', 'sage')}</p>
                            <RangeControl
                                value={attributes.customPadding}
                                min={0}
                                max={100}
                                step={1}
                                onChange={onChangeCustomPadding}
                            />
                        </>
                        }
                        <hr/>
                        <p>{__('General Background Color', 'sage')}</p>
                        <ColorPalette
                            colors={[...editorThemeColors]}
                            value={attributes.generalBackgroundColor}
                            onChange={onChangeGeneralBackgroundColor}
                        />
                    </div>
                </InspectorControls>
                <div {...innerBlocksProps}>
                    <style>
                        {attributes.customSpacing && `
                            .grid-list-${attributes.clientId} .grid-list-block__row {
                                margin-top: -${attributes.spaceBetweenY / 16}rem;
                                margin-right: -${attributes.spaceBetweenX / 32}rem;
                                margin-left: -${attributes.spaceBetweenX / 32}rem;
                            }

                            .grid-list-${attributes.clientId} .grid-list-block__col {
                                margin-top: ${attributes.spaceBetweenY / 16}rem;
                                padding-right: ${attributes.spaceBetweenX / 32}rem;
                                padding-left: ${attributes.spaceBetweenX / 32}rem;
                            }
                        `}
                        {`
                            .grid-list-${attributes.clientId} .grid-list-block__inner {
                                ${attributes.hasCustomPadding ? `padding: ${attributes.customPadding / 16}rem` : ''}
                            }
                        `}
                    </style>
                    <div className={classNames("grid-list-block__row", attributes.twoColumnsMobile && 'two-columns-mobile')} data-columns={attributes.columns}>
                        {innerBlocksProps.children}
                    </div>
                </div>
            </>
        );
    },
    save: ({attributes}) => {

        // Need to use for passing classes to save function
        const blockProps = useBlockProps.save({
            className: `grid-list-${attributes.clientId}`
        });

        return (
            <div {...blockProps}>
                    <style>
                        {attributes.customSpacing && `
                            .grid-list-${attributes.clientId} .grid-list-block__row {
                                margin-top: -${attributes.spaceBetweenY / 16}rem;
                                margin-right: -${attributes.spaceBetweenX / 32}rem;
                                margin-left: -${attributes.spaceBetweenX / 32}rem;
                            }

                            .grid-list-${attributes.clientId} .grid-list-block__col {
                                margin-top: ${attributes.spaceBetweenY / 16}rem;
                                padding-right: ${attributes.spaceBetweenX / 32}rem;
                                padding-left: ${attributes.spaceBetweenX / 32}rem;
                            }
                        `}
                        {`
                            .grid-list-${attributes.clientId} .grid-list-block__inner {
                                ${attributes.hasCustomPadding ? `padding: ${attributes.customPadding / 16}rem` : ''}
                            }
                        `}
                    </style>
                <div className={classNames("grid-list-block__row", attributes.twoColumnsMobile && 'two-columns-mobile')} data-columns={attributes.columns}>
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    },
});
