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
    Button,
    Dashicon,
    __experimentalRadio as Radio,
    __experimentalRadioGroup as RadioGroup,
    __experimentalUnitControl as UnitControl
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
import {gridListIcon} from '../icons';
import {editorThemeColors, updateInnerBlocks, isDefined, MobileSwitch, MobileSwitchInner} from "../utility";

const attributes = {
    clientId: {
        type: 'string',
        default: ''
    },
    columnsDesktop: {
        type: 'number',
        default: 3
    },
    columnsTablet: {
        type: 'number',
        default: 2
    },
    columnsMobile: {
        type: 'number',
        default: 1
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
    verticalPaddingDesktop: {
        type: 'number',
        default: false,
    },
    verticalPaddingMobile: {
        type: 'number',
        default: false,
    },
    customGutter: {
        type: 'number',
        default: false,
    },
    gridUnit: {
        type: 'string',
        default: 'px'
    }
};

registerBlockType('custom/grid-list', {
    apiVersion: 2,
    title: __('Grid List', 'sage'),
    category: 'custom',
    icon: gridListIcon,
    description: __('Add a block that displays content in multiple columns, then add whatever content blocks you’d like.', 'sage'),
    attributes,
    supports: {
        anchor: true,
        html: false,
        align: ['wide', 'full'],
        // color: true // Enables background and text
    },
    edit: ({setAttributes, attributes, className, clientId}) => {

        attributes.clientId = clientId;

        let hasPaddingY =
            isDefined(attributes.verticalPaddingDesktop) &&
            isDefined(attributes.verticalPaddingMobile);

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
                    '--custom-gutter-mobile': `${attributes.customGutter / 16}em`
                },
                ...hasPaddingY && {
                    '--mobile-padding-y': `${attributes.verticalPaddingMobile}px`,
                    '--desktop-padding-y': `${attributes.verticalPaddingDesktop}px`,
                    '--padding-y-difference': `${attributes.verticalPaddingDesktop - attributes.verticalPaddingMobile}`,
                },
                ...isDefined(attributes.horizontalPadding) && {
                    '--padding-x': `${attributes.horizontalPadding}px`,
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
                        <hr style={{marginTop: 0}}/>
                        <MobileSwitch headline={__('Columns', 'sage')} icon={'columns'}>
                            <MobileSwitchInner type={'desktop'}>
                                { /*Trying to new way of passing props to RadioGroup*/}
                                <RadioGroup {...{
                                    onChange: (value) => setAttributes({columnsDesktop: value}),
                                    checked: attributes.columnsDesktop,
                                    defaultChecked: 3
                                }}>
                                    <Radio value={1}>1</Radio>
                                    <Radio value={2}>2</Radio>
                                    <Radio value={3}>3</Radio>
                                    <Radio value={4}>4</Radio>

                                    {(attributes.align === 'full') && <>
                                        <Radio value={6}>6</Radio>
                                    </>}
                                </RadioGroup>
                            </MobileSwitchInner>
                            <MobileSwitchInner type={'tablet'}>
                                <RadioGroup {...{
                                    onChange: (value) => setAttributes({columnsTablet: value}),
                                    checked: attributes.columnsTablet,
                                    defaultChecked: 2
                                }}>
                                    <Radio value={1}>1</Radio>
                                    <Radio value={2}>2</Radio>
                                    <Radio value={3}>3</Radio>
                                    <Radio value={4}>4</Radio>
                                </RadioGroup>
                            </MobileSwitchInner>
                            <MobileSwitchInner type={'mobile'}>
                                <RadioGroup {...{
                                    onChange: (value) => setAttributes({columnsMobile: value}),
                                    checked: attributes.columnsMobile,
                                    defaultChecked: 1
                                }}>
                                    <Radio value={1}>1</Radio>
                                    <Radio value={2}>2</Radio>
                                    <Radio value={3}>3</Radio>
                                    <Radio value={4}>4</Radio>
                                </RadioGroup>
                            </MobileSwitchInner>
                        </MobileSwitch>
                        <hr/>
                        <div style={{display: 'flex'}}>
                            <Dashicon icon="grid-view" style={{marginRight: '5px'}}/>
                            <p style={{marginTop: '1px'}}>{__('Gutter', 'sage')}</p>
                        </div>
                        <RangeControl
                            value={attributes.customGutter}
                            min={0}
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
                            <Dashicon icon="image-flip-horizontal" style={{marginRight: '5px'}}/>
                            <p style={{marginTop: '1px'}}>{__('Horizontal padding', 'sage')}</p>
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
                        <MobileSwitch headline={__('Vertical padding', 'sage')} icon={'image-flip-vertical'}>
                            <MobileSwitchInner type={'desktop'}>
                                <div style={{
                                    width: '100%',
                                    paddingRight: '45px',
                                    position: 'relative'
                                }}>
                                    <RangeControl
                                        value={attributes.verticalPaddingDesktop}
                                        min={0}
                                        max={100}
                                        step={1}
                                        onChange={(value) => {
                                            if (attributes.verticalPaddingMobile === attributes.verticalPaddingDesktop) {
                                                setAttributes({verticalPaddingMobile: value})
                                            }
                                            setAttributes({verticalPaddingDesktop: value})
                                        }}
                                        className={'pixel-unit'}
                                    />
                                    <Button
                                        icon={'undo'}
                                        isSmall={true}
                                        label={__('Reset', 'sage')}
                                        style={{
                                            height: '30px',
                                            position: 'absolute',
                                            right: 0,
                                            top: 0
                                        }}
                                        onClick={() => {
                                            setAttributes({verticalPaddingMobile: false})
                                            setAttributes({verticalPaddingDesktop: false})
                                        }}
                                    />
                                </div>
                            </MobileSwitchInner>
                            <MobileSwitchInner type={'mobile'}>
                                <div style={{
                                    width: '100%',
                                    paddingRight: '45px',
                                    position: 'relative'
                                }}>
                                    <RangeControl
                                        value={attributes.verticalPaddingMobile}
                                        min={0}
                                        max={attributes.verticalPaddingDesktop}
                                        step={1}
                                        onChange={(value) => {
                                            setAttributes({verticalPaddingMobile: value})
                                        }}
                                        className={'pixel-unit'}
                                    />
                                    <Button
                                        icon={'undo'}
                                        isSmall={true}
                                        label={__('Reset', 'sage')}
                                        style={{
                                            height: '30px',
                                            position: 'absolute',
                                            right: 0,
                                            top: 0
                                        }}
                                        onClick={() => {
                                            setAttributes({verticalPaddingMobile: false})
                                            setAttributes({verticalPaddingDesktop: false})
                                        }}
                                    />
                                </div>
                            </MobileSwitchInner>
                        </MobileSwitch>
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
                    <div className={classNames(
                        'grid-list-block__row',
                        'row',
                    )} data-columns={attributes.columnsDesktop}>
                        {innerBlocksProps.children}
                    </div>
                </div>
            </>
        );
    },
    save: ({attributes}) => {

        let hasPaddingY =
            isDefined(attributes.verticalPaddingDesktop) &&
            isDefined(attributes.verticalPaddingMobile);

        const blockProps = useBlockProps.save({
            className: classNames('grid-list-block'),
            style: {
                ...isDefined(attributes.customGutter) && {
                    '--custom-gutter-desktop': `${attributes.customGutter / 16}em`,
                    '--custom-gutter-mobile': `${attributes.customGutter / 16}em`
                },
                ...hasPaddingY && {
                    '--mobile-padding-y': `${attributes.verticalPaddingMobile}px`,
                    '--desktop-padding-y': `${attributes.verticalPaddingDesktop}px`,
                    '--padding-y-difference': `${attributes.verticalPaddingDesktop - attributes.verticalPaddingMobile}`,
                },
                ...isDefined(attributes.horizontalPadding) && {
                    '--padding-x': `${attributes.horizontalPadding}px`,
                },
            }
        });

        return (
            <div {...blockProps}>
                <div className={classNames(
                    'grid-list-block__row',
                    'row',
                )} data-columns={attributes.columnsDesktop}>
                    <InnerBlocks.Content/>
                </div>
            </div>
        );
    },
});
