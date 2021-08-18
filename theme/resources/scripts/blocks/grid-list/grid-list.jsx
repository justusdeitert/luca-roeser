import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {RangeControl, ToggleControl, Dashicon, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup} from '@wordpress/components';
import {InnerBlocks, InspectorControls, ColorPalette, useBlockProps, __experimentalUseInnerBlocksProps as useInnerBlocksProps} from '@wordpress/block-editor';
import classNames from 'classnames';
import {gridListIcon} from '../icons';
import {editorThemeColors, updateInnerBlocks, isDefined} from "../utility";
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
    // customPadding: {
    //     type: 'number',
    //     default: 0
    // },
    horizontalPadding: {
        type: 'number',
        default: false,
    },
    verticalPadding: {
        type: 'number',
        default: false,
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

        const blockProps = useBlockProps({
            className: classNames(className, 'grid-list-block'),
            style: {
                ...isDefined(attributes.customGutter) && {
                    '--custom-gutter-desktop': `${attributes.customGutter / 16}em`,
                    '--custom-gutter-mobile':  `${attributes.customGutter / 16}em`
                },
                ...isDefined(attributes.verticalPadding) && {
                    '--inner-vertical-padding' : `${attributes.verticalPadding / 16}em`,
                },
                ...isDefined(attributes.horizontalPadding) && {
                    '--inner-horizontal-padding' : `${attributes.horizontalPadding / 16}em`,
                },
            }
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
                        {/*<hr/>
                        <p>{__('Grid Columns', 'sage')}</p>
                        <RangeControl
                            value={attributes.columns}
                            min={1}
                            max={6}
                            step={1}
                            onChange={(value) => setAttributes({columns: value})}
                        />*/}
                        <hr/>
                        <p>{__('Grid Columns', 'sage')}</p>
                        <RadioGroup
                            onChange={(value) => {
                                setAttributes({columns: value});
                            }}
                            checked={attributes.columns}
                            defaultChecked={3}
                        >
                            <Radio value={1}>1</Radio>
                            <Radio value={2}>2</Radio>
                            <Radio value={3}>3</Radio>
                            <Radio value={4}>4</Radio>

                            {(attributes.align === 'full') && <>
                                <Radio value={5}>5</Radio>
                                <Radio value={6}>6</Radio>
                            </>}
                        </RadioGroup>
                        <hr/>
                        <div style={{display:'flex'}}>
                            <p>{__('Gutter', 'sage')}</p>
                            <Dashicon icon="grid-view" style={{marginLeft: 'auto'}}/>
                        </div>
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
                        <div style={{display:'flex'}}>
                            <p>{__('Horizontal padding', 'sage')}</p>
                            <Dashicon icon="image-flip-horizontal" style={{marginLeft: 'auto'}}/>
                        </div>
                        <RangeControl
                            value={attributes.horizontalPadding}
                            min={0}
                            max={100}
                            step={1}
                            onChange={(value) => {
                                setAttributes({horizontalPadding: value})
                            }}
                            allowReset={true}
                            resetFallbackValue={false}
                        />
                        <hr/>
                        <div style={{display:'flex'}}>
                            <p>{__('Vertical padding', 'sage')}</p>
                            <Dashicon icon="image-flip-vertical" style={{marginLeft: 'auto'}}/>
                        </div>
                        <RangeControl
                            value={attributes.verticalPadding}
                            min={0}
                            max={100}
                            step={1}
                            onChange={(value) => {
                                setAttributes({verticalPadding: value})
                            }}
                            allowReset={true}
                            resetFallbackValue={false}
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
                    <div className={classNames('' +
                        'grid-list-block__row',
                        'row',
                        attributes.twoColumnsMobile && 'two-columns-mobile'
                    )} data-columns={attributes.columns}>
                        {innerBlocksProps.children}
                    </div>
                </div>
            </>
        );
    },
    save: ({attributes}) => {

        const blockProps = useBlockProps.save({
            className: classNames('grid-list-block'),
            style: {
                ...isDefined(attributes.customGutter) && {
                    '--custom-gutter-desktop': `${attributes.customGutter / 16}em`,
                    '--custom-gutter-mobile':  `${attributes.customGutter / 16}em`
                },
                ...isDefined(attributes.verticalPadding) && {
                    '--inner-vertical-padding' : `${attributes.verticalPadding / 16}em`,
                },
                ...isDefined(attributes.horizontalPadding) && {
                    '--inner-horizontal-padding' : `${attributes.horizontalPadding / 16}em`,
                },
            }
        });

        return (
            <div {...blockProps}>
                <div className={classNames(
                    'grid-list-block__row',
                    'row',
                    attributes.twoColumnsMobile && 'two-columns-mobile'
                )} data-columns={attributes.columns}>
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    },
});
