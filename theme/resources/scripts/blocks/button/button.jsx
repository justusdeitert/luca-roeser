/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {
    SelectControl,
    ToolbarGroup,
    ToolbarDropdownMenu,
    ToolbarButton,
    Popover,
    Dropdown,
    __experimentalRadio as Radio,
    __experimentalRadioGroup as RadioGroup,
    RangeControl
} from '@wordpress/components';
import {
    BlockControls,
    InspectorControls,
    RichText,
    __experimentalLinkControl as LinkControl,
    useBlockProps,
    ColorPalette
} from '@wordpress/block-editor';
import {
    button as buttonIcon,
    color as colorIcon,
    resizeCornerNE as resizeIcon,
    button as borderRadiusIcon
} from '@wordpress/icons';

/**
 * Internal dependencies
 */
// import {buttonIcon} from '../custom-icons';
import {
    editorStandardColors,
    getColorObjectFromSlug,
    getColorObject,
    removeBlock,
    SettingsHeading,
    ResetWrapperControl
} from "../utility";

const attributes = {
    buttonAlignment: {
        type: 'string',
        default: 'left'
    },
    buttonText: {
        type: 'string',
        default: 'Lorem Ipsum'
    },
    buttonStyle: {
        type: 'string',
        default: 'primary'
    },
    buttonSize: {
        type: 'string',
        default: false
    },
    buttonLink: {
        type: 'object',
        default: {
            opensInNewTab: false,
            nofollow: false
        }
    },
    customBorderRadius: {
        type: 'number',
        default: false
    },
};

registerBlockType('custom/button', {
    apiVersion: 2,
    title: __('Button', 'sage'),
    icon: buttonIcon,
    description: __('Prompt visitors to take action with a button.', 'sage'),
    category: 'custom',
    // multiple: false, // Use this block just once per post
    attributes,
    edit: ({className, attributes, setAttributes, clientId}) => {

        let customStyles = {
            marginLeft: 0,
            marginRight: 0
        };

        if (attributes.customBorderRadius) {
            customStyles.borderRadius = attributes.customBorderRadius;
        }

        const blockProps = useBlockProps({
            className: classNames(
                `button-block`,
                `justify-content-${attributes.buttonAlignment}`
            ),
            style: {
                border: '1px dashed var(--wp-admin-theme-color)',
            }
        });

        let iconClass = (icon) => {
            if (icon === 'start') return 'left';
            if (icon === 'end') return 'right';
            return icon;
        }

        return (
            <>
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarDropdownMenu
                            icon={'align-' + iconClass(attributes.buttonAlignment)}
                            label={__('Select a position', 'sage')}
                            controls={[
                                {
                                    title: 'Left',
                                    icon: 'align-left',
                                    onClick: () => setAttributes({buttonAlignment: 'start'}),
                                },
                                {
                                    title: 'Center',
                                    icon: 'align-center',
                                    onClick: () => setAttributes({buttonAlignment: 'center'}),
                                },
                                {
                                    title: 'Right',
                                    icon: 'align-right',
                                    onClick: () => setAttributes({buttonAlignment: 'end'}),
                                },
                            ]}
                        />
                        <Dropdown
                            position="bottom right"
                            renderToggle={({isOpen, onToggle}) => (
                                <ToolbarButton
                                    icon="admin-links"
                                    label="Edit Link"
                                    onClick={onToggle}
                                    aria-expanded={isOpen}
                                />
                            )}
                            renderContent={() => (
                                <div style={{padding: "16px"}}>
                                    <LinkControl
                                        value={attributes.buttonLink}
                                        onChange={(value) => setAttributes({buttonLink: value})}
                                        withCreateSuggestion={true}
                                        settings={[
                                            {
                                                id: 'opensInNewTab',
                                                title: __('Open in new tab', 'sage'),
                                            },
                                            {
                                                id: 'nofollow',
                                                title: __('Search engines should ignore this link (nofollow)', 'sage')
                                            },
                                        ]}
                                    />
                                </div>
                            )}
                        />
                    </ToolbarGroup>
                </BlockControls>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <hr style={{marginTop: 0}}/>
                        <SettingsHeading headline={'Color'} icon={colorIcon}/>
                        <ColorPalette
                            colors={editorStandardColors}
                            value={getColorObjectFromSlug(attributes.buttonStyle).color}
                            onChange={(value) => setAttributes({buttonStyle: getColorObject(value).slug})}
                            clearable={false}
                            disableCustomColors={true}
                        />
                        <hr/>
                        {/*<p>{__('Button Size', 'sage')}</p>*/}
                        <SettingsHeading headline={'Size'} icon={resizeIcon}/>
                        <RadioGroup
                            checked={attributes.buttonSize}
                            onChange={(value) => setAttributes({buttonSize: value})}
                            defaultChecked={false}
                        >
                            <Radio value="sm">{__('Small', 'sage')}</Radio>
                            <Radio value={false}>{__('Normal', 'sage')}</Radio>
                            <Radio value="lg">{__('Large', 'sage')}</Radio>
                        </RadioGroup>
                        <hr/>
                        {/*<p>{__('Border Radius', 'sage')}</p>*/}
                        <SettingsHeading headline={'Border radius'} icon={borderRadiusIcon}/>
                        <ResetWrapperControl onClick={() => setAttributes({customBorderRadius: false})}>
                            <RangeControl
                                value={attributes.customBorderRadius}
                                min={0}
                                max={50}
                                step={1}
                                onChange={(value) => setAttributes({customBorderRadius: value})}
                            />
                        </ResetWrapperControl>
                    </div>
                </InspectorControls>
                <div {...blockProps}>
                    <RichText
                        className={classNames(
                            'btn',
                            `btn-${attributes.buttonStyle}`,
                            attributes.buttonSize && `btn-${attributes.buttonSize}`
                        )}
                        style={customStyles}
                        tagName="div"
                        role="button"
                        placeholder={__('Button Text', 'sage')}
                        allowedFormats={[]}
                        value={attributes.buttonText}
                        onChange={(value) => setAttributes({buttonText: value})}
                        onRemove={() => removeBlock(clientId)}
                    />
                </div>
            </>
        );
    },
    save: ({attributes}) => {

        const blockProps = useBlockProps.save({
            className: classNames(
                'btn',
                `btn-${attributes.buttonStyle}`,
                attributes.buttonSize && `btn-${attributes.buttonSize}`
            ),
        });

        return (
            <>
                <div className={classNames("button-block", `justify-content-${attributes.buttonAlignment}`)}>
                    <a {...blockProps}
                       href={attributes.buttonLink.url}
                       target={attributes.buttonLink.opensInNewTab ? '_blank' : '_self'}
                       rel={attributes.buttonLink.nofollow ? 'noopener nofollow' : 'noopener'}
                       role="button"
                    >{attributes.buttonText}</a>
                </div>
            </>
        );
    },
});

