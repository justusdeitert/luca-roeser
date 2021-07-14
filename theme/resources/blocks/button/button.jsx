import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {SelectControl, ToolbarGroup, ToolbarDropdownMenu} from '@wordpress/components';
import {BlockControls, InspectorControls, RichText} from '@wordpress/block-editor';
import classNames from 'classnames';
import {imageIcon} from '../icons';

registerBlockType('custom/button', {
    title: __('Button', 'sage'),
    icon: imageIcon,
    category: 'custom',
    // multiple: false, // Use this block just once per post
    attributes: {
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
    },
    edit: ({className, attributes, setAttributes}) => {

        const onChangeButtonText = (value) => {
            setAttributes({buttonText: value});
        };

        // const onChangeButtonAlignment = (value) => {
        //     setAttributes({buttonAlignment: value});
        // };
        //
        // const onChangeTextAlign = (value) => {
        //     setAttributes({textAlign: value});
        // };

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
                        tagName="a"
                        className={classNames('btn', `btn-${attributes.buttonStyle}`, attributes.buttonSize && `btn-${attributes.buttonSize}`)}
                        role="button"
                        placeholder={__('Button Text', 'sage')}
                        keepPlaceholderOnFocus={true}
                        // allowedFormats={['core/bold', 'core/italic']}
                        allowedFormats={false}
                        value={attributes.buttonText}
                        onChange={onChangeButtonText}
                    />
                </div>
            </>
        );
    },
    save: ({className, attributes}) => {
        return (
            <>
                <div className={classNames(className, 'button-block', `justify-content-${attributes.buttonAlignment}`)}>
                    <RichText.Content
                        tagName="a"
                        className={classNames('btn', `btn-${attributes.buttonStyle}`, attributes.buttonSize && `btn-${attributes.buttonSize}`)}
                        role="button"
                        value={attributes.buttonText}
                    />
                </div>
            </>
        );
    },
});

