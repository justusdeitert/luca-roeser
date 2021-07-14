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
import {SelectControl, PanelBody} from '@wordpress/components';

// restrict to specific block names
const allowedBlocks = [
    'core/paragraph',
    'core/heading',
    // 'custom/fluid-text',
];

/**
 * Add custom attribute for mobile visibility.
 *
 * @param {Object} settings Settings for the block.
 *
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
            }
        });

    }

    return settings;
}

/**
 * Add mobile visibility controls on Advanced Block Panel.
 *
 * @param {function} BlockEdit Block edit component.
 *
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

        const fontSizeClass = (fontSize) => {
            return (fontSize !== '') ? `has-font-size-${fontSize}` : '';
        };

        const styleClass = (style) => {
            return (style !== '') ? `has-style-${style}` : '';
        };

        const onChangeCustomStyle = (value) => {
            setAttributes({customStyle: value, className: classnames(styleClass(value), fontSizeClass(attributes.customFontSize))})
        };

        const onChangeCustomFontSize = (value) => {
            setAttributes({customFontSize: value, className: classnames(fontSizeClass(value), styleClass(attributes.customStyle))})
        };

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title={__('Styles', 'sage')} initialOpen={false}>
                        <hr/>
                        <SelectControl
                            label={__('Custom Style', 'sage')}
                            value={attributes.customStyle}
                            options={[
                                {label: __('None', 'sage'), value: ''},
                                {label: __('Shadow', 'sage'), value: 'shadow'},
                            ]}
                            onChange={onChangeCustomStyle}
                        />
                        <hr/>
                        <SelectControl
                            label={__('Custom Font Size', 'sage')}
                            value={attributes.customFontSize}
                            options={[
                                {label: __('None', 'sage'), value: ''},
                                {label: __('Tiny (H6)', 'sage'), value: 'tiny'},
                                {label: __('Small (H5)', 'sage'), value: 'small'},
                                {label: __('Normal (H4)', 'sage'), value: 'normal'},
                                {label: __('Medium (H3)', 'sage'), value: 'medium'},
                                {label: __('Large (H2)', 'sage'), value: 'large'},
                                {label: __('Huge (H1)', 'sage'), value: 'huge'},
                            ]}
                            onChange={onChangeCustomFontSize}
                        />
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}, 'withAdvancedControls');

/**
 * Add custom element class in save element.
 *
 * @param {Object} extraProps     Block element.
 * @param {Object} blockType      Blocks object.
 * @param {Object} attributes     Blocks attributes.
 *
 * @return {Object} extraProps Modified block element.
 */
// function applyExtraClass(extraProps, blockType, attributes) {
//
//     // check if attribute exists for old Gutenberg version compatibility
//     // add class only when visibleOnMobile = false
//     // add allowedBlocks restriction
//     if (attributes.customStyle !== '' && allowedBlocks.includes(blockType.name)) {
//         extraProps.className = classnames(extraProps.className, `has-style-${attributes.customStyle}`);
//     }
//
//     return extraProps;
// }

/**
 * add filters
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

// addFilter(
//     'blocks.getSaveContent.extraProps',
//     'sage/applyExtraClass',
//     applyExtraClass
// );
