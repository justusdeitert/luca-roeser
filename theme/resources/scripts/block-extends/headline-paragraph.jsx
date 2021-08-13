/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import {__} from '@wordpress/i18n';
import {addFilter} from '@wordpress/hooks';
// import {Fragment} from '@wordpress/element';
import {InspectorControls} from '@wordpress/block-editor';
import {createHigherOrderComponent} from '@wordpress/compose';
import {SelectControl, PanelBody, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup} from '@wordpress/components';

// restrict to specific block names
const allowedBlocks = [
    'core/paragraph',
    'core/heading',
    'core/list',
];

/**
 * Add custom attribute for mobile visibility.
 *
 * @param {Object} settings Settings for the block.
 * @return {Object} settings Modified settings.
 */
function addAttributes(settings) {

    // check if object exists for old Gutenberg version compatibility
    // add allowedBlocks restriction
    if (typeof settings.attributes !== 'undefined' && allowedBlocks.includes(settings.name)) {

        settings.attributes = Object.assign(settings.attributes, {
            customStyle: {
                type: 'string',
                default: '',
            },
            customFontSize: {
                type: 'string',
                default: '',
            },
            customFontWeight: {
                type: 'string',
                default: '',
            }
        });

    }

    return settings;
}

/**
 * Add mobile visibility controls on Advanced Block Panel.
 *
 * @param {function} BlockEdit Block edit component.
 * @return {function} BlockEdit Modified block edit component.
 */
const withAdvancedControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {

        const {
            name,
            attributes,
            setAttributes,
        } = props;

        // Do nothing if it's another block than our defined ones.
        if (!allowedBlocks.includes(name)) {
            return (
                <BlockEdit {...props} />
            );
        }

        const styleClass = (style) => {
            return (style !== '') ? `has-style-${style}` : '';
        };

        const fontSizeClass = (fontSize) => {
            return (fontSize !== '') ? `has-font-size-${fontSize}` : '';
        };

        const fontWeightClass = (fontWeight) => {
            return (fontWeight !== '') ? `fw-${fontWeight}` : '';
        };

        const onChangeCustomStyle = (value) => {
            setAttributes({
                customStyle: value,
                className: classnames(
                    styleClass(value),
                    fontSizeClass(attributes.customFontSize),
                    fontWeightClass(attributes.customFontWeight)
                )
            })
        };

        const onChangeCustomFontSize = (value) => {
            setAttributes({
                customFontSize: value,
                className: classnames(
                    fontSizeClass(value),
                    styleClass(attributes.customStyle),
                    fontWeightClass(attributes.customFontWeight)
                )
            })
        };

        const onChangeCustomFontWeight = (value) => {
            setAttributes({
                customFontSize: value,
                className: classnames(
                    fontWeightClass(value),
                    fontSizeClass(attributes.customFontSize),
                    styleClass(attributes.customStyle)
                )
            })
        };

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title={__('Styles', 'sage')} initialOpen={false}>
                        <p>{__('Custom Style', 'sage')}</p>
                        <RadioGroup
                            checked={attributes.customStyle}
                            onChange={onChangeCustomStyle}
                            defaultChecked={"relative"}
                        >
                            <Radio value=''>{__('None', 'sage')}</Radio>
                            <Radio value='shadow'>{__('Shadow', 'sage')}</Radio>
                            <Radio value='no-list'>{__('No List', 'sage')}</Radio>
                        </RadioGroup>
                        <hr/>
                        <p>{__('Custom Font Size', 'sage')}</p>
                        <RadioGroup
                            checked={attributes.customFontSize}
                            onChange={onChangeCustomFontSize}
                            defaultChecked={"relative"}
                        >
                            <Radio value=''>{__('None', 'sage')}</Radio>
                            <Radio value='tiny'>{__('Tiny', 'sage')}</Radio>
                            <Radio value='small'>{__('Small', 'sage')}</Radio>
                            <Radio value='normal'>{__('Normal', 'sage')}</Radio>
                            <Radio value='medium'>{__('Medium', 'sage')}</Radio>
                            <Radio value='large'>{__('Large', 'sage')}</Radio>
                            <Radio value='huge'>{__('Huge', 'sage')}</Radio>
                        </RadioGroup>
                        <hr/>
                        <p>{__('Custom Font Weight', 'sage')}</p>
                        <RadioGroup
                            checked={attributes.customFontWeight}
                            onChange={onChangeCustomFontWeight}
                            defaultChecked={"relative"}
                        >
                            <Radio value=''>{__('Initial', 'sage')}</Radio>
                            <Radio value='light'>{__('Light', 'sage')}</Radio>
                            <Radio value='normal'>{__('Normal', 'sage')}</Radio>
                            <Radio value='bold'>{__('Bold', 'sage')}</Radio>
                        </RadioGroup>
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}, 'withAdvancedControls');

/**
 * Add filters
 */
addFilter(
    'blocks.registerBlockType',
    'sage/custom-attributes',
    addAttributes
);

addFilter(
    'editor.BlockEdit',
    'sage/custom-advanced-control',
    withAdvancedControls
);
