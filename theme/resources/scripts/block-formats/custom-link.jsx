import {registerFormatType, toggleFormat, applyFormat} from '@wordpress/rich-text';
import {InspectorControls, RichTextToolbarButton, URLInput, BlockControls} from '@wordpress/block-editor';
import {Button, ToggleControl, ToolbarGroup, ToolbarButton, Tooltip} from '@wordpress/components';
import {withState} from '@wordpress/compose';
import {__} from '@wordpress/i18n';
import classNames from 'classnames';

registerFormatType('custom/link', {
    title: 'Custom Link',
    tagName: 'a',
    className: 'custom-link',
    attributes: {
        href: 'href',
        target: 'target',
        relation: 'rel'
    },
    edit: ({isActive, value, onChange}) => {

        // const {isActive, value, onChange} = props;
        const type = 'custom/link';

        let attributes;

        if (value.activeFormats && !!value.activeFormats[0]) {
            attributes = value.activeFormats[0].attributes;
        }

        const checkRelation = () => {
            return attributes && attributes.hasOwnProperty('relation');
        };

        const CustomTextareaControl = withState({
            url: attributes ? attributes.href : '#',
            targetToggle: !(attributes && attributes.target === '_self'),
            relationNoOpener: !!(checkRelation() ? attributes.relation.includes('noopener') : false),
            relationNoReferrer: !!(checkRelation() ? attributes.relation.includes('noreferrer') : false),
            relationNoFollow: !!(checkRelation() ? attributes.relation.includes('nofollow') : false),
        })(({url, targetToggle, relationNoOpener, relationNoReferrer, relationNoFollow, setState}) => {

            const attributes = {
                href: url,
                target: targetToggle ? '_blank' : '_self',
                relation: classNames(relationNoOpener && 'noopener', relationNoReferrer && 'noreferrer', relationNoFollow && 'nofollow')
            }

            if(!relationNoOpener && !relationNoReferrer && !relationNoFollow) {
                delete attributes.relation;
            }

            return (
                <div>
                    <hr/>
                    <URLInput
                        label="Enter link URL"
                        value={url}
                        autoFocus={false}
                        onChange={(url) => setState({url})}
                        className={'custom-link__url-input'}
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
                    <Button className={'button link-wrapper__save-button'} onClick={() => {
                        onChange(
                            applyFormat(value, {
                                type,
                                attributes,
                            })
                        );
                    }}>
                        <span>Save Link</span>
                    </Button>
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
                        {/*<Tooltip text="Custom Link">*/}
                            <ToolbarButton
                                icon="external"
                                title="Custom Link"
                                isActive={isActive}
                                onClick={() => {
                                    onChange(
                                        toggleFormat(value, {
                                            type,
                                            attributes: {
                                                href: '#',
                                                target: '_self',
                                                // relation: false,
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
                    title="Custom Link"
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
