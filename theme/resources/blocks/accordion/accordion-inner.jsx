import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks, RichText, InspectorControls, ColorPalette, useBlockProps, __experimentalUseInnerBlocksProps as useInnerBlocksProps} from '@wordpress/block-editor';
import classNames from 'classnames';
import {ALLOWEDBLOCKS, editorThemeColors, getColorObject, parentAttributes, SelectClipPath, removeArrayItems} from '../utility';
import {accordionInnerIcon} from '../icons';

const attributes = {
    clientId: {
        type: 'string',
        default: ''
    },
    parentId: {
        type: 'string',
        default: ''
    },
    headerText: {
        type: 'string',
        default: 'Lorem Ipsum',
    },
    headerTextSize: {
        type: 'string',
        default: 'small',
    },
};

registerBlockType('custom/accordion-inner', {
    apiVersion: 2,
    title: __('Accordion Inner', 'sage'),
    category: 'custom',
    icon: accordionInnerIcon,
    attributes,
    parent: ['custom/accordion'],
    // supports: {
    //     inserter: false,
    //     className: false,
    //     reusable: false,
    //     html: false,
    // },
    edit: ({setAttributes, attributes, className, clientId}) => {

        const onChangeHeaderText = (value) => {
            setAttributes({headerText: value});
        };

        const blockProps = useBlockProps({
            className: classNames(className, 'accordion-block__item'),
            style: {marginTop: 0, marginBottom: 0}
        });

        attributes.clientId = clientId;
        attributes.parentId = parentAttributes(attributes.clientId).clientId;
        attributes.headerTextSize = parentAttributes(attributes.clientId).accordionHeadlineSize;

        return (
            <>
                <div { ...blockProps }>
                    <div className="accordion-block__item-header custom-border"
                         id={`heading-${attributes.clientId}`}
                         aria-expanded="false"
                         data-bs-toggle="collapse"
                         aria-controls={`collapse-${attributes.clientId}`}
                         data-bs-target={`#collapse-${attributes.clientId}`}
                    >
                        <div className="accordion-block__item-header-inner">
                            <RichText
                                tagName="p"
                                className={`has-font-size-${attributes.headerTextSize}`}
                                value={attributes.headerText}
                                allowedFormats={['core/bold', 'core/italic']}
                                onChange={onChangeHeaderText}
                            />
                        </div>
                    </div>
                    <div id={`collapse-${attributes.clientId}`}
                         className="accordion-block__collapse collapse"
                         aria-labelledby={`heading-${attributes.clientId}`}
                         data-bs-parent={`#block-${attributes.parentId}`}
                    >
                        <div className="accordion-block__item-body custom-border">
                            <InnerBlocks templateLock={false} allowedBlocks={removeArrayItems(ALLOWEDBLOCKS, ['custom/accordion'])} renderAppender={InnerBlocks.DefaultBlockAppender} />
                        </div>
                    </div>
                </div>
            </>
        );
    },
    save: ({attributes}) => {

        // Need to use for passing classes to save function
        const blockProps = useBlockProps.save({
            className: classNames('accordion-block__item'),
        });

        return (
            <div {...blockProps}>
                <div className="accordion-block__item-header custom-border"
                     id={`heading-${attributes.clientId}`}
                     aria-expanded="false"
                     data-bs-toggle="collapse"
                     aria-controls={`collapse-${attributes.clientId}`}
                     data-bs-target={`#collapse-${attributes.clientId}`}
                >
                    <div className="accordion-block__item-header-inner">
                        <RichText.Content
                            className={`has-font-size-${attributes.headerTextSize}`}
                            tagName="p"
                            value={attributes.headerText}
                        />
                    </div>
                </div>
                <div id={`collapse-${attributes.clientId}`}
                     className="accordion-block__collapse collapse"
                     aria-labelledby={`heading-${attributes.clientId}`}
                     data-bs-parent={`#block-${attributes.parentId}`}
                >
                    <div className="accordion-block__item-body custom-border">
                        <InnerBlocks.Content/>
                    </div>
                </div>
            </div>
        );
    },
});
