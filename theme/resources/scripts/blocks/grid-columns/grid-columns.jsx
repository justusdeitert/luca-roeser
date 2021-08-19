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
    Dashicon,
    __experimentalRadio as Radio,
    __experimentalRadioGroup as RadioGroup
} from '@wordpress/components';
import {
    InnerBlocks,
    InspectorControls,
    ColorPalette,
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {columnsIcon} from '../icons';
import {
    editorThemeColors,
    updateInnerBlocks,
    isDefined,
    MobileSwitch,
    MobileSwitchInner
} from "../utility";

/**
 * Block attributes
 */
const attributes = {
    clientId: {
        type: 'string',
        default: ''
    },
    columnSizeDesktop: {
        type: 'number',
        default: 2
    },
    columnSizeTablet: {
        type: 'number',
        default: 2
    },
    columnSizeMobile: {
        type: 'number',
        default: 1
    },
    columnsTablet: {
        type: 'number',
        default: 2
    },
    columnsMobile: {
        type: 'number',
        default: 2
    },
    generalBackgroundColor: {
        type: 'string',
        default: ''
    },
    hasCustomPadding: {
        type: 'boolean',
        default: false,
    },
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

registerBlockType('custom/grid-columns', {
    apiVersion: 2,
    title: __('Grid Columns', 'sage'),
    category: 'custom',
    icon: columnsIcon,
    attributes,
    supports: {
        anchor: true,
        html: false,
        align: ['wide', 'full'],
        // color: true // Enables background and text
    },
    edit: ({setAttributes, attributes, className, clientId}) => {

        attributes.clientId = clientId;

        const TEMPLATE = [
            ['custom/grid-columns-inner', {}, [
                ['core/paragraph', {placeholder: 'Lorem Ipsum...'}]
            ]],
            ['custom/grid-columns-inner', {}, [
                ['core/paragraph', {placeholder: 'Lorem Ipsum...'}]
            ]]
        ];

        const blockProps = useBlockProps({
            className: classNames(className, 'grid-columns-block'),
            style: {
                ...isDefined(attributes.customGutter) && {
                    '--custom-gutter-desktop': `${attributes.customGutter / 16}em`,
                    '--custom-gutter-mobile': `${attributes.customGutter / 16}em`
                },
                ...isDefined(attributes.verticalPadding) && {
                    '--inner-vertical-padding': `${attributes.verticalPadding / 16}em`,
                },
                ...isDefined(attributes.horizontalPadding) && {
                    '--inner-horizontal-padding': `${attributes.horizontalPadding / 16}em`,
                },
            }
        });

        const innerBlocksProps = useInnerBlocksProps(blockProps, {
            allowedBlocks: ['custom/grid-columns-inner'],
            orientation: 'horizontal',
            template: TEMPLATE,
            templateLock: 'insert'
        });

        return (
            <>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <MobileSwitch headline={__('Columns', 'sage')} showItem={'tablet'}>
                            <MobileSwitchInner type={'tablet'}>
                                <RadioGroup
                                    onChange={(value) => {
                                        setAttributes({columnsTablet: value});
                                    }}
                                    checked={attributes.columnsTablet}
                                    defaultChecked={2}
                                >
                                    <Radio value={1}>1</Radio>
                                    <Radio value={2}>2</Radio>
                                </RadioGroup>
                            </MobileSwitchInner>
                            <MobileSwitchInner type={'mobile'}>
                                <RadioGroup
                                    onChange={(value) => {
                                        setAttributes({columnsMobile: value});
                                    }}
                                    checked={attributes.columnsMobile}
                                    defaultChecked={1}
                                >
                                    <Radio value={1}>1</Radio>
                                    <Radio value={2}>2</Radio>
                                </RadioGroup>
                            </MobileSwitchInner>
                        </MobileSwitch>
                        <hr/>
                        <MobileSwitch headline={__('Column Size', 'sage')}>
                            <MobileSwitchInner type={'desktop'}>
                                <RadioGroup
                                    onChange={(value) => {
                                        setAttributes({columnSizeDesktop: value});
                                    }}
                                    checked={attributes.columnSizeDesktop}
                                    defaultChecked={6}
                                >
                                    <Radio value={3}>3</Radio>
                                    <Radio value={4}>4</Radio>
                                    <Radio value={6}>6</Radio>
                                    <Radio value={8}>6</Radio>
                                    <Radio value={9}>9</Radio>
                                </RadioGroup>
                            </MobileSwitchInner>
                            <MobileSwitchInner type={'tablet'}>
                                <RadioGroup
                                    onChange={(value) => {
                                        setAttributes({columnSizeTablet: value});
                                    }}
                                    checked={attributes.columnSizeTablet}
                                    defaultChecked={6}
                                >
                                    <Radio value={3}>3</Radio>
                                    <Radio value={4}>4</Radio>
                                    <Radio value={6}>6</Radio>
                                    <Radio value={8}>6</Radio>
                                    <Radio value={9}>9</Radio>
                                </RadioGroup>
                            </MobileSwitchInner>
                            <MobileSwitchInner type={'mobile'}>
                                <RadioGroup
                                    onChange={(value) => {
                                        setAttributes({columnSizeMobile: value});
                                    }}
                                    checked={attributes.columnSizeMobile}
                                    defaultChecked={6}
                                >
                                    <Radio value={3}>3</Radio>
                                    <Radio value={4}>4</Radio>
                                    <Radio value={6}>6</Radio>
                                    <Radio value={8}>6</Radio>
                                    <Radio value={9}>9</Radio>
                                </RadioGroup>
                            </MobileSwitchInner>
                        </MobileSwitch>
                        <hr/>
                        <div style={{display: 'flex'}}>
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
                        <div style={{display: 'flex'}}>
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
                        <div style={{display: 'flex'}}>
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
                    <div
                        className={classNames('grid-columns-block__row', 'row')}
                        data-columns={attributes.columnSizeDesktop}
                    >
                        {innerBlocksProps.children}
                    </div>
                </div>
            </>
        );
    },
    save: ({attributes}) => {

        const blockProps = useBlockProps.save({
            className: classNames('grid-columns-block'),
            style: {
                ...isDefined(attributes.customGutter) && {
                    '--custom-gutter-desktop': `${attributes.customGutter / 16}em`,
                    '--custom-gutter-mobile': `${attributes.customGutter / 16}em`
                },
                ...isDefined(attributes.verticalPadding) && {
                    '--inner-vertical-padding': `${attributes.verticalPadding / 16}em`,
                },
                ...isDefined(attributes.horizontalPadding) && {
                    '--inner-horizontal-padding': `${attributes.horizontalPadding / 16}em`,
                },
            }
        });

        return (
            <div {...blockProps}>
                <div
                    className={classNames('grid-columns-block__row', 'row')}
                    data-columns={attributes.columnSizeDesktop}
                >
                    <InnerBlocks.Content/>
                </div>
            </div>
        );
    },
});
