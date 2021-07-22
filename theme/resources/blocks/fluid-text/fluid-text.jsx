import {__} from '@wordpress/i18n';
import {registerBlockType   } from '@wordpress/blocks';
import {InspectorControls, RichText, AlignmentToolbar, BlockControls} from '@wordpress/block-editor';
import {SelectControl, ToolbarGroup, RangeControl, __experimentalUnitControl as UnitControl} from '@wordpress/components';
import classNames from 'classnames';
import {fluidTextIcon} from '../icons';
import {removeBlock, MobileSwitch, MobileSwitchInner} from "../utility";

const attributes = {
    clientId: {
        type: 'string',
        default: ''
    },
    // className: {
    //     type: 'string',
    //     default: ''
    // },
    textAlign: {
        type: 'string',
        default: 'left'
    },
    fluidText: {
        type: 'string',
        default: 'Lorem Ipsum'
    },
    fluidTextElement: {
        type: 'string',
        default: 'p'
    },
    fontSizeMobile: {
        type: 'number',
        default: 16
    },
    fontSizeDesktop: {
        type: 'number',
        default: 50
    },
    // minWindowSize: {
    //     type: 'number',
    //     default: 320
    // },
    // maxWindowSize: {
    //     type: 'number',
    //     default: 1400
    // }
}

registerBlockType('custom/fluid-text', {
    title: __('Fluid Text', 'sage'),
    category: 'custom',
    icon: fluidTextIcon,
    attributes,
    edit: ({setAttributes, attributes, className, clientId}) => {

        const onChangeFluidText = (value) => {
            setAttributes({fluidText: value});
        };

        const onChangeFluidTextElement = (value) => {
            setAttributes({fluidTextElement: value});
        };

        const onChangeTextAlign = (value) => {
            setAttributes({textAlign: value});
        };

        const onChangeFontSizeMobile = (value) => {
            setAttributes({fontSizeMobile: value});
        };

        // const onChangeMinWindowSize = (value) => {
        //     setAttributes({minWindowSize: value});
        // };

        const onChangeFontSizeDesktop = (value) => {
            setAttributes({fontSizeDesktop: value});
        };

        // const onChangeMaxWindowSize = (value) => {
        //     setAttributes({maxWindowSize: value});
        // };

        attributes.clientId = clientId;

        return (
            <>
                <BlockControls>
                    <ToolbarGroup>
                        <AlignmentToolbar
                            value={attributes.textAlign}
                            onChange={onChangeTextAlign}
                        />
                    </ToolbarGroup>
                </BlockControls>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        {/*<UnitControl value={'10px'} units={units}/>*/}
                        <SelectControl
                            label={__('Select Text Type', 'sage')}
                            value={attributes.fluidTextElement}
                            options={[
                                {label: __('P', 'sage'), value: 'p'},
                                {label: __('H1', 'sage'), value: 'h1'},
                                {label: __('H2', 'sage'), value: 'h2'},
                                {label: __('H3', 'sage'), value: 'h3'},
                                {label: __('H4', 'sage'), value: 'h4'},
                                {label: __('H5', 'sage'), value: 'h5'},
                                {label: __('H6', 'sage'), value: 'h6'},
                            ]}
                            onChange={onChangeFluidTextElement}
                        />
                        <hr/>
                        <MobileSwitch headline={__('Font Size', 'sage')}>
                            <MobileSwitchInner type={'desktop'}>
                                {/*<p>{__('Max Font Size', 'sage')}</p>*/}
                                <RangeControl
                                    value={attributes.fontSizeDesktop}
                                    min={attributes.fontSizeMobile}
                                    max={120}
                                    step={1}
                                    onChange={onChangeFontSizeDesktop}
                                />
                                {/*<p>{__('Max Window Size', 'sage')}</p>
                                <RangeControl
                                    value={attributes.maxWindowSize}
                                    min={attributes.minWindowSize}
                                    max={1400}
                                    step={10}
                                    onChange={onChangeMaxWindowSize}
                                />*/}
                            </MobileSwitchInner>
                            <MobileSwitchInner type={'mobile'}>
                                {/*<p>{__('Min Font Size', 'sage')}</p>*/}
                                <RangeControl
                                    value={attributes.fontSizeMobile}
                                    min={12}
                                    max={60}
                                    step={1}
                                    onChange={onChangeFontSizeMobile}
                                />
                                {/*<p>{__('Min Window Size', 'sage')}</p>
                                <RangeControl
                                    value={attributes.minWindowSize}
                                    min={320}
                                    max={1400}
                                    step={10}
                                    onChange={onChangeMinWindowSize}
                                />*/}
                            </MobileSwitchInner>
                        </MobileSwitch>
                    </div>
                </InspectorControls>
                {/*<style>{`
                    .fluid-text-${attributes.clientId} {
                         font-size: ${attributes.fontSizeMobile}px !important;
                    }

                    @media only screen and (min-width: ${attributes.minWindowSize}px) {
                        .fluid-text-${attributes.clientId} {
                            font-size: calc(${attributes.fontSizeMobile}px + ${attributes.fontSizeDesktop - attributes.fontSizeMobile} * ((100vw - ${attributes.minWindowSize}px) / ${attributes.maxWindowSize - attributes.minWindowSize})) !important;
                        }
                    }

                    @media only screen and (min-width: ${attributes.maxWindowSize}px) {
                        .fluid-text-${attributes.clientId} {
                              font-size: ${attributes.fontSizeDesktop}px !important;
                        }
                    }
                `}</style>*/}
                <RichText
                    tagName={attributes.fluidTextElement}
                    className={classNames('fluid-text-block', `has-text-align-${attributes.textAlign}`, `fluid-text-${attributes.clientId}`)}
                    style={{
                        '--fluid-text-size-desktop': `${attributes.fontSizeDesktop}px`,
                        '--fluid-text-size-mobile': `${attributes.fontSizeMobile}px`,
                        '--fluid-text-desktop-mobile': `${attributes.fontSizeDesktop - attributes.fontSizeMobile}`,
                    }}
                    placeholder={'Lorem Ipsum'}
                    onRemove={() => removeBlock(clientId)}
                    value={attributes.fluidText}
                    // allowedFormats={['core/bold', 'core/italic']}
                    onChange={onChangeFluidText}
                />
            </>

        );
    },
    save: ({attributes, className}) => {
        return (
            <>
                <RichText.Content
                    tagName={attributes.fluidTextElement}
                    className={classNames('fluid-text-block', `has-text-align-${attributes.textAlign}`, `fluid-text-${attributes.clientId}`)}
                    value={attributes.fluidText}
                    style={{
                        '--fluid-text-size-desktop': `${attributes.fontSizeDesktop}px`,
                        '--fluid-text-size-mobile': `${attributes.fontSizeMobile}px`,
                        '--fluid-text-desktop-mobile': `${attributes.fontSizeDesktop - attributes.fontSizeMobile}`,
                    }}
                />
            </>
        );
    },
});
