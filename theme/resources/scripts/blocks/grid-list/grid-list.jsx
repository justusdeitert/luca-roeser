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
        default: 0
    },
    customGutter: {
        type: 'number',
        default: false,
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

        let blockStyles = {
            '--grid-list-inner-spacing' : `${attributes.customPadding / 16}em`
        };

        if(attributes.customGutter !== false && attributes.customGutter !== undefined) {
            blockStyles['--custom-gutter-desktop'] = `${attributes.customGutter / 16}em`
            blockStyles['--custom-gutter-mobile'] = `${attributes.customGutter / 16}em`
        }

        const blockProps = useBlockProps({
            className: classNames(className, 'grid-list-block', `grid-list-${attributes.clientId}`),
            style: blockStyles
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
                            onChange={(value) => setAttributes({columns: value})}
                        />
                        <hr/>
                        <p>{__('Gutter', 'sage')}</p>
                        <RangeControl
                            value={attributes.customGutter}
                            min={0}
                            // initialPosition={false}
                            max={80}
                            step={1}
                            allowReset={true}
                            resetFallbackValue={false}
                            onChange={(value) => {
                                setAttributes({customGutter: value});
                            }}
                        />
                        <hr/>
                        <p>{__('Padding', 'sage')}</p>
                        <RangeControl
                            value={attributes.customPadding}
                            min={0}
                            max={100}
                            step={1}
                            allowReset={true}
                            resetFallbackValue={0}
                            onChange={(value) => setAttributes({customPadding: value})}
                        />
                        <hr/>
                        <ToggleControl
                            label={__('Mobile Two Columns', 'sage')}
                            help={__('Select if you want two columns on the smallest screen resolution', 'sage')}
                            checked={attributes.twoColumnsMobile}
                            onChange={(value) => setAttributes({twoColumnsMobile: value})}
                        />
                        <hr/>
                        <p>{__('General Background Color', 'sage')}</p>
                        <ColorPalette
                            colors={editorThemeColors}
                            value={attributes.generalBackgroundColor}
                            onChange={(value) => {
                                setAttributes({generalBackgroundColor: value});
                                setAttributes({customPadding: 16});
                                updateInnerBlocks(clientId);
                            }}
                        />
                    </div>
                </InspectorControls>
                <div {...innerBlocksProps}>
                    <div className={classNames('grid-list-block__row', 'row', attributes.twoColumnsMobile && 'two-columns-mobile')} data-columns={attributes.columns}>
                        {innerBlocksProps.children}
                    </div>
                </div>
            </>
        );
    },
    save: ({attributes}) => {

        let blockStyles = {
            '--grid-list-inner-spacing' : `${attributes.customPadding / 16}em`
        };

        if(attributes.customGutter !== false && attributes.customGutter !== undefined) {
            blockStyles['--custom-gutter-desktop'] = `${attributes.customGutter / 16}em`
            blockStyles['--custom-gutter-mobile'] = `${attributes.customGutter / 16}em`
        }

        // Need to use for passing classes to save function
        const blockProps = useBlockProps.save({
            className: `grid-list-${attributes.clientId}`,
            style: blockStyles
        });

        return (
            <div {...blockProps}>
                <div className={classNames('grid-list-block__row', 'row', attributes.twoColumnsMobile && 'two-columns-mobile')} data-columns={attributes.columns}>
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    },
});
