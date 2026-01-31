/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import {
    SelectControl,
    PanelBody,
    __experimentalRadio as Radio,
    __experimentalRadioGroup as RadioGroup,
    Button,
} from '@wordpress/components';
import { useEffect } from "@wordpress/element";
import {
    color as colorIcon,
    styles as stylesIcon,
    formatCapitalize as fontSizeIcon,
    formatBold as fontWeightIcon
} from "@wordpress/icons";

// Internal dependencies
import { SettingsHeading } from "../blocks/utility";

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
            hasShadow: {
                type: 'boolean',
                default: false,
            },
            isNoList: {
                type: 'boolean',
                default: false,
            },
            noMargin: {
                type: 'boolean',
                default: false,
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

        useEffect(() => {
            setAttributes({
                className: classnames(
                    attributes.hasShadow && `has-style-shadow`,
                    attributes.isNoList && `has-style-no-list`,
                    attributes.noMargin && `mb-0`,
                    attributes.customFontSize && `has-font-size-${attributes.customFontSize}`,
                    attributes.customFontWeight && `fw-${attributes.customFontWeight}`,
                )
            });
        }, [attributes]) // only fire when attributes change

        // Do nothing if it's another block than our defined ones.
        if (!allowedBlocks.includes(name)) {
            return (
                <BlockEdit {...props} />
            );
        }

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title={__('Custom styles', 'sage')} initialOpen={true} icon={stylesIcon}>
                        <SettingsHeading headline={'Additional styles'} icon={colorIcon}/>
                        <Button
                            className={attributes.hasShadow ? 'is-primary' : 'is-secondary'}
                            text={__('Shadow', 'sage')}
                            style={{margin: '0 5px 5px 0'}}
                            onClick={() => setAttributes({hasShadow: !attributes.hasShadow})}
                        />
                        <Button
                            className={attributes.isNoList ? 'is-primary' : 'is-secondary'}
                            text={__('No list', 'sage')}
                            // icon={listIcon}
                            style={{margin: '0 5px 5px 0'}}
                            onClick={() => setAttributes({isNoList: !attributes.isNoList})}
                        />
                        <Button
                            className={attributes.noMargin ? 'is-primary' : 'is-secondary'}
                            text={__('No margin', 'sage')}
                            style={{margin: '0 5px 5px 0'}}
                            onClick={() => setAttributes({noMargin: !attributes.noMargin})}
                        />
                        <hr/>
                        {/*<p>{__('Custom Font Size', 'sage')}</p>*/}
                        <SettingsHeading headline={'Custom font size'} icon={fontSizeIcon}/>
                        <RadioGroup
                            checked={attributes.customFontSize}
                            onChange={(value) => setAttributes({customFontSize: value})}
                            defaultChecked={"relative"}
                        >
                            <Radio value="">{__('None', 'sage')}</Radio>
                            <Radio value="tiny">{__('Tiny', 'sage')}</Radio>
                            <Radio value="small">{__('Small', 'sage')}</Radio>
                            <Radio value="normal">{__('Normal', 'sage')}</Radio>
                            <Radio value="medium">{__('Medium', 'sage')}</Radio>
                            <Radio value="large">{__('Large', 'sage')}</Radio>
                            <Radio value="huge">{__('Huge', 'sage')}</Radio>
                        </RadioGroup>
                        <hr/>
                        {/*<p>{__('Custom Font Weight', 'sage')}</p>*/}
                        <SettingsHeading headline={'Custom font weight'} icon={fontWeightIcon}/>
                        <RadioGroup
                            checked={attributes.customFontWeight}
                            onChange={(value) => setAttributes({customFontWeight: value})}
                            defaultChecked={"relative"}
                        >
                            <Radio value="">{__('Initial', 'sage')}</Radio>
                            <Radio value="light">{__('Light', 'sage')}</Radio>
                            <Radio value="normal">{__('Normal', 'sage')}</Radio>
                            <Radio value="bold">{__('Bold', 'sage')}</Radio>
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
