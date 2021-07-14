import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {SelectControl, ToolbarGroup, ToolbarDropdownMenu, ToolbarButton, Popover, Dropdown} from '@wordpress/components';
import {BlockControls, InspectorControls, RichText, __experimentalLinkControl as LinkControl} from '@wordpress/block-editor';
import {useState} from '@wordpress/element';
import classNames from 'classnames';
import {buttonIcon} from '../icons';

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
        default: ''
    },
    buttonLink: {
        type: 'object',
        default: {
            opensInNewTab: false,
            nofollow: false
        }
    },
};

registerBlockType('custom/button', {
    title: __('Button', 'sage'),
    icon: buttonIcon,
    category: 'custom',
    // multiple: false, // Use this block just once per post
    attributes,
    edit: ({className, attributes, setAttributes}) => {

        const onChangeButtonText = (value) => {
            setAttributes({buttonText: value});
        };

        const onChangeButtonStyle = (value) => {
            setAttributes({buttonStyle: value});
        };

        const onChangeButtonSize = (value) => {
            setAttributes({buttonSize: value});
        };

        const onClickAlignment = (value) => {
            setAttributes({buttonAlignment: value});
        }

        const getAlignmentIcon = () => {
            return 'align-' + attributes.buttonAlignment;
        }

        const onChangeButtonLink = (value) => {
            setAttributes({buttonLink: value});
        };

        // const [isVisible, setIsVisible] = useState(false);
        // const toggleVisible = () => {
        //     setIsVisible((state) => !state);
        // };

        return (
            <>
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarDropdownMenu
                            icon={getAlignmentIcon()}
                            label={__('Select a position', 'sage')}
                            controls={[
                                {
                                    title: 'Left',
                                    icon: 'align-left',
                                    onClick: () => onClickAlignment('left'),
                                },
                                {
                                    title: 'Right',
                                    icon: 'align-right',
                                    onClick: () => onClickAlignment('right'),
                                },
                                {
                                    title: 'Center',
                                    icon: 'align-center',
                                    onClick: () => onClickAlignment('center'),
                                },
                            ]}
                        />
                        {/*<ToolbarButton
                            icon="admin-links"
                            label="Edit Link"
                            onClick={toggleVisible}
                        />*/}
                        <Dropdown
                            // className="my-container-class-name"
                            // contentClassName="my-popover-content-classname"
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
                                        onChange={onChangeButtonLink}
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
                        <hr/>
                        <SelectControl
                            label={__('Button Style', 'sage')}
                            value={attributes.buttonStyle}
                            options={[
                                {label: __('Primary', 'sage'), value: 'primary'},
                                {label: __('Secondary', 'sage'), value: 'secondary'},
                                {label: __('Tertiary', 'sage'), value: 'tertiary'},
                                {label: __('Success', 'sage'), value: 'success'},
                                {label: __('Danger', 'sage'), value: 'danger'},
                                {label: __('Warning', 'sage'), value: 'warning'},
                                {label: __('Info', 'sage'), value: 'info'},
                                {label: __('Light', 'sage'), value: 'light'},
                                {label: __('Dark', 'sage'), value: 'dark'},
                                {label: __('lLink', 'sage'), value: 'link'},
                            ]}
                            onChange={onChangeButtonStyle}
                        />
                        <hr/>
                        <SelectControl
                            label={__('Button Size', 'sage')}
                            value={attributes.buttonSize}
                            options={[
                                {label: __('Normal', 'sage'), value: false},
                                {label: __('Small', 'sage'), value: 'sm'},
                                {label: __('Large', 'sage'), value: 'lg'},
                            ]}
                            onChange={onChangeButtonSize}
                        />
                    </div>
                </InspectorControls>
                <div className={classNames(className, 'button-block', `justify-content-${attributes.buttonAlignment}`)}>
                    <RichText
                        tagName="div"
                        className={classNames('btn', `btn-${attributes.buttonStyle}`, attributes.buttonSize && `btn-${attributes.buttonSize}`)}
                        role="button"
                        placeholder={__('Button Text', 'sage')}
                        // allowedFormats={['core/bold', 'core/italic']}
                        allowedFormats={[]}
                        value={attributes.buttonText}
                        onChange={onChangeButtonText}
                    />
                    {/*{isVisible &&
                        <Popover>
                            <div style={{padding: "16px"}}>
                                <LinkControl
                                    value={attributes.buttonLink}
                                    onChange={onChangeButtonLink}
                                    withCreateSuggestion={true}
                                    settings={[
                                        {
                                            id: 'opensInNewTab',
                                            title: __('Open in new tab', 'sage'),
                                        },
                                        {
                                            id: 'customDifferentSetting',
                                            title: 'Has this custom setting?'
                                        }
                                    ]}
                                />
                            </div>
                        </Popover>
                    }*/}
                </div>
            </>
        );
    },
    save: ({className, attributes}) => {
        return (
            <>
                <div className={classNames(className, 'button-block', `justify-content-${attributes.buttonAlignment}`)}>
                    <a href={attributes.buttonLink.url}
                       target={attributes.buttonLink.opensInNewTab ? '_blank' : '_self'}
                       rel={attributes.buttonLink.nofollow ? 'noopener nofollow' : 'noopener'}
                       role="button"
                       className={classNames('btn', `btn-${attributes.buttonStyle}`, attributes.buttonSize && `btn-${attributes.buttonSize}`)}
                    >{attributes.buttonText}</a>
                </div>
            </>
        );
    },
});

