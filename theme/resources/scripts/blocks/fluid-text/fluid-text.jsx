import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {InspectorControls, RichText, AlignmentToolbar, BlockControls, ColorPalette} from '@wordpress/block-editor';
import {SelectControl, ToolbarGroup, RangeControl, __experimentalUnitControl as UnitControl, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup} from '@wordpress/components';
import classNames from 'classnames';
import {fluidTextIcon} from '../icons';
import {removeBlock, MobileSwitch, MobileSwitchInner, editorThemeColors, getColorObject} from "../utility";
import { createBlock, getDefaultBlockName } from '@wordpress/blocks';

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
    fluidTextColor: {
        type: 'string',
        default: ''
    },
    fluidTextStyle: {
        type: 'string',
        default: ''
    },
    fluidTextLineHeight: {
        type: 'number',
        default: false
    },
    fluidTextFontWeight: {
        type: 'string',
        default: ''
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

        attributes.clientId = clientId;

        let additionalStyles = {};
        if (attributes.fluidTextLineHeight) {
            additionalStyles.lineHeight = attributes.fluidTextLineHeight
        }

        return (
            <>
                <BlockControls>
                    <ToolbarGroup>
                        <AlignmentToolbar
                            value={attributes.textAlign}
                            onChange={(value) => setAttributes({textAlign: value})}
                        />
                    </ToolbarGroup>
                </BlockControls>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        {/*<UnitControl value={'10px'} units={units}/>*/}
                        {/*<SelectControl
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
                            onChange={(value) => setAttributes({fluidTextElement: value})}
                        />*/}
                        {/*<hr/>*/}
                        <p>{__('Select Text Type', 'sage')}</p>
                        <RadioGroup
                            checked={attributes.fluidTextElement}
                            onChange={(value) => setAttributes({fluidTextElement: value})}
                            defaultChecked={"relative"}
                        >
                            <Radio value="p">{__('P', 'sage')}</Radio>
                            <Radio value="h1">{__('H1', 'sage')}</Radio>
                            <Radio value="h2">{__('H2', 'sage')}</Radio>
                            <Radio value="h3">{__('H3', 'sage')}</Radio>
                            <Radio value="h4">{__('H4', 'sage')}</Radio>
                            <Radio value="h5">{__('H5', 'sage')}</Radio>
                            <Radio value="h6">{__('H6', 'sage')}</Radio>
                        </RadioGroup>
                        <hr/>
                        <p>{__('Custom Style', 'sage')}</p>
                        <RadioGroup
                            checked={attributes.fluidTextStyle}
                            onChange={(value) => setAttributes({fluidTextStyle: value})}
                            defaultChecked={"relative"}
                        >
                            <Radio value=''>{__('None', 'sage')}</Radio>
                            <Radio value='shadow'>{__('Shadow', 'sage')}</Radio>
                        </RadioGroup>
                        <hr/>
                        <MobileSwitch headline={__('Font Size', 'sage')}>
                            <MobileSwitchInner type={'desktop'}>
                                {/*<p>{__('Max Font Size', 'sage')}</p>*/}
                                <RangeControl
                                    value={attributes.fontSizeDesktop}
                                    min={attributes.fontSizeMobile}
                                    max={120}
                                    step={1}
                                    onChange={(value) => setAttributes({fontSizeDesktop: value})}
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
                                    onChange={(value) => setAttributes({fontSizeMobile: value})}
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
                        <hr/>
                        <p>{__('Line Height', 'sage')}</p>
                        <RangeControl
                            value={attributes.fluidTextLineHeight}
                            min={0.7}
                            max={2}
                            step={0.1}
                            allowReset={true}
                            resetFallbackValue={false}
                            onChange={(value) => setAttributes({fluidTextLineHeight: value})}
                        />
                        <hr/>
                        <p>{__('Font Weight', 'sage')}</p>
                        <RadioGroup
                            checked={attributes.fluidTextFontWeight}
                            onChange={(value) => setAttributes({fluidTextFontWeight: value})}
                            defaultChecked={''}
                        >
                            <Radio value=''>{__('Initial', 'sage')}</Radio>
                            <Radio value='light'>{__('Light', 'sage')}</Radio>
                            <Radio value='normal'>{__('Normal', 'sage')}</Radio>
                            <Radio value='bold'>{__('Bold', 'sage')}</Radio>
                        </RadioGroup>
                        <hr/>
                        <p>{__('Color', 'sage')}</p>
                        <ColorPalette
                            colors={editorThemeColors}
                            value={attributes.fluidTextColor}
                            onChange={(value) => setAttributes({fluidTextColor: value})}
                            disableCustomColors={true}
                        />
                    </div>
                </InspectorControls>
                <RichText
                    tagName={attributes.fluidTextElement}
                    className={classNames(
                        'fluid-text-block',
                        `has-text-align-${attributes.textAlign}`,
                        `fluid-text-${attributes.clientId}`,
                        getColorObject(attributes.fluidTextColor) && `has-${getColorObject(attributes.fluidTextColor).slug}-color`,
                        attributes.fluidTextStyle && `has-style-${attributes.fluidTextStyle}`,
                        attributes.fluidTextFontWeight && `fw-${attributes.fluidTextFontWeight}`,
                    )}
                    style={{
                        '--fluid-text-size-desktop': `${attributes.fontSizeDesktop}px`,
                        '--fluid-text-size-mobile': `${attributes.fontSizeMobile}px`,
                        '--fluid-text-desktop-mobile': `${attributes.fontSizeDesktop - attributes.fontSizeMobile}`,
                        ...additionalStyles
                    }}
                    placeholder={'Lorem Ipsum'}
                    onRemove={() => removeBlock(clientId)}
                    value={attributes.fluidText}
                    // allowedFormats={['core/bold', 'core/italic']}
                    onChange={(value) => setAttributes({fluidText: value})}
                    onReplace={() => {
                        // TODO: Set up new Paragraph Block and Line Break!!
                        // console.log('onReplace');
                    }}
                    onSplit={() => {
                        // console.log('onSplit')
                    }}
                />
            </>

        );
    },
    save: ({attributes, className}) => {

        let additionalStyles = {};
        if (attributes.fluidTextLineHeight) {
            additionalStyles.lineHeight = attributes.fluidTextLineHeight
        }

        return (
            <>
                <RichText.Content
                    tagName={attributes.fluidTextElement}
                    className={classNames(
                        'fluid-text-block',
                        `has-text-align-${attributes.textAlign}`,
                        `fluid-text-${attributes.clientId}`,
                        getColorObject(attributes.fluidTextColor) && `has-${getColorObject(attributes.fluidTextColor).slug}-color`,
                        attributes.fluidTextStyle && `has-style-${attributes.fluidTextStyle}`,
                        attributes.fluidTextFontWeight && `fw-${attributes.fluidTextFontWeight}`,
                    )}
                    value={attributes.fluidText}
                    style={{
                        '--fluid-text-size-desktop': `${attributes.fontSizeDesktop}px`,
                        '--fluid-text-size-mobile': `${attributes.fontSizeMobile}px`,
                        '--fluid-text-desktop-mobile': `${attributes.fontSizeDesktop - attributes.fontSizeMobile}`,
                        ...additionalStyles
                    }}
                />
            </>
        );
    },
});
