import {registerFormatType, toggleFormat, applyFormat} from '@wordpress/rich-text';
import {
    InspectorControls,
    RichTextToolbarButton,
    URLInput,
    BlockControls,
    ColorPalette,
    getColorObjectByColorValue,
} from '@wordpress/block-editor';
import {Button, ToggleControl, ToolbarGroup, ToolbarButton, Tooltip} from '@wordpress/components';
import {withState} from '@wordpress/compose';
import {__} from '@wordpress/i18n';
import classNames from 'classnames';
import {editorColors, fontAwesomeArray} from "../wp-blocks/config";

registerFormatType('custom/button', {
    title: 'Custom Button',
    tagName: 'a',
    className: 'custom-button',
    attributes: {
        href: 'href',
        target: 'target',
        relation: 'rel',
        class: 'class',
        icon: 'data-icon',
        color: 'data-color',
        size: 'data-size',
    },
    edit: ({isActive, value, onChange}) => {

        // const {isActive, value, onChange} = props;
        const type = 'custom/button';

        let attributes;

        if (value.activeFormats && !!value.activeFormats[0]) {
            attributes = value.activeFormats[0].attributes;
        }

        const checkRelation = () => {
            return attributes && attributes.hasOwnProperty('relation');
        };

        // const checkClass = () => {
        //     return attributes && attributes.hasOwnProperty('relation');
        // };

        const CustomTextareaControl = withState({
            url: attributes ? attributes.href : '#',
            targetToggle: !(attributes && attributes.target === '_self'),
            relationNoOpener: !!(checkRelation() ? attributes.relation.includes('noopener') : false),
            relationNoReferrer: !!(checkRelation() ? attributes.relation.includes('noreferrer') : false),
            relationNoFollow: !!(checkRelation() ? attributes.relation.includes('nofollow') : false),
            color: attributes ? attributes.color : '#F4984F',
            icon: attributes ? attributes.icon : 'fas fa-check',
            buttonSize: attributes ? attributes.size : 'btn-lg',
            // hasIcon: attributes ? attributes.hasIcon : false,
        })(({url, targetToggle, relationNoOpener, relationNoReferrer, relationNoFollow, color, icon, buttonSize, setState}) => {

            const buttonColorObject = getColorObjectByColorValue(editorColors, color);

            let attributes = {
                href: url,
                target: targetToggle ? '_blank' : '_self',
                relation: classNames(relationNoOpener && 'noopener', relationNoReferrer && 'noreferrer', relationNoFollow && 'nofollow'),
                class: classNames('btn', buttonColorObject && `btn-${buttonColorObject.slug}`, icon, buttonSize),
                icon: icon,
                color: color,
                size: buttonSize ? 'btn-lg': '',
            }

            if(!relationNoOpener && !relationNoReferrer && !relationNoFollow) {
                delete attributes.relation;
            }

            const onClickFontAwesome = (icon) => {
                attributes.icon = classNames('fas', icon.class)
                attributes.class = classNames('btn', buttonColorObject && `btn-${buttonColorObject.slug}`, 'fas', icon.class, attributes.size)

                onChange(
                    applyFormat(value, {
                        type,
                        attributes,
                    })
                );
            };

            const onClickRemoveFontAwesome = () => {
                attributes.icon = ''
                attributes.class = classNames('btn', buttonColorObject && `btn-${buttonColorObject.slug}`, attributes.size)

                onChange(
                    applyFormat(value, {
                        type,
                        attributes,
                    })
                );
            };

            const setColor = (color) => {

                const buttonColorObject = getColorObjectByColorValue(editorColors, color);

                attributes.color = color;
                attributes.class = classNames('btn', buttonColorObject && `btn-${buttonColorObject.slug}`, attributes.icon && attributes.icon, attributes.size)

                onChange(
                    applyFormat(value, {
                        type,
                        attributes,
                    })
                );
            };

            const repeaterIcons = fontAwesomeArray.map((icon, index) => {
                return (
                    <div key={'icon-' + index} className="inspector-controls-container__icon-wrapper" onClick={() => onClickFontAwesome(icon)}>
                        <i className={classNames('fas', icon.class)} />
                    </div>
                )
            });

            return (
                <div>
                    <hr/>
                    <URLInput
                        label="Enter Button URL"
                        value={url}
                        autoFocus={false}
                        onChange={(url) => setState({url})}
                        className={'custom-button__url-input'}
                    />
                    <ToggleControl
                        label={__('Open in new tab', 'sage')}
                        checked={targetToggle}
                        onChange={(targetToggle) => setState({targetToggle})}
                    />
                    <hr/>
                    <ToggleControl
                        label={__('noopener', 'sage')}
                        checked={relationNoOpener}
                        onChange={(relationNoOpener) => setState({relationNoOpener})}
                    />
                    <ToggleControl
                        label={__('noreferrer', 'sage')}
                        checked={relationNoReferrer}
                        onChange={(relationNoReferrer) => setState({relationNoReferrer})}
                    />
                    <ToggleControl
                        label={__('nofollow', 'sage')}
                        checked={relationNoFollow}
                        onChange={(relationNoFollow) => setState({relationNoFollow})}
                    />
                    <hr />
                    <ToggleControl
                        label={__('Button Size', 'sage')}
                        checked={buttonSize}
                        onChange={(buttonSize) => setState({buttonSize})}
                    />
                    <hr />
                    <Button className={'button button-wrapper__save-button'} onClick={() => {
                        onChange(
                            applyFormat(value, {
                                type,
                                attributes,
                            })
                        );
                    }}><span>Save Link</span></Button>
                    <hr />
                    <p>{__('Select button color', 'sage')}</p>
                    <ColorPalette
                        colors={editorColors}
                        value={attributes.class}
                        // onChange={(color) => setState({color})}
                        onChange={(color) => setColor(color)}
                        clearable={false}
                        disableCustomColors={true}
                    />
                    <hr/>
                    <p>Choose your Icon</p>
                    <div className="inspector-controls-container__icons">
                        {repeaterIcons}
                        <div className="remove-button-wrapper" style={{width: '100%'}}>
                            <button className="button button-small" style={{marginTop: '10px'}} onClick={onClickRemoveFontAwesome}>{__('Remove Icon', 'sage')}</button>
                        </div>
                    </div>
                </div>
            )
        });

        return (
            <>
                {isActive &&
                    <InspectorControls>
                        <div className="inspector-controls-container">
                            <CustomTextareaControl/>
                        </div>
                    </InspectorControls>
                }

                <BlockControls>
                    <ToolbarGroup>
                        {/*<Tooltip text="Custom Button">*/}
                            <ToolbarButton
                                icon="button"
                                title="Custom Button"
                                isActive={isActive}
                                onClick={() => {
                                    onChange(
                                        toggleFormat(value, {
                                            type,
                                            attributes: {
                                                href: '#',
                                                target: '_self',
                                                class: 'btn btn-orange',
                                                color: '#F4984F',
                                                icon: 'fas fa-check',
                                                size: '',
                                            },
                                        })
                                    );
                                }}
                            />
                        {/*</Tooltip>*/}
                    </ToolbarGroup>
                </BlockControls>

                {/*<RichTextToolbarButton
                    icon="admin-links"
                    title="Custom Button"
                    isActive={isActive}
                    onClick={() => {
                        onChange(
                            toggleFormat(value, {
                                type,
                                attributes: {
                                    href: '',
                                    target: '_self',
                                    relation: ''
                                }
                            })
                        );
                    }}
                />*/}
            </>
        )
    }
});
