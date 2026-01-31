/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Wordpress dependencies
 */
import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {
    InnerBlocks,
    RichText,
    InspectorControls,
    ColorPalette,
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {
    ALLOWED_BLOCKS,
    editorThemeColors,
    getColorObject,
    parentAttributes,
    SelectClipPath,
    removeArrayItems,
    getBlockIndex
} from '../utility';
import {accordionItem as accordionInnerIcon} from '../custom-icons';

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
        // default: '',
    },
    headerTextSize: {
        type: 'string',
        default: 'small',
    },
    isOpen: {
        type: 'boolean',
        default: false,
    },
};

registerBlockType('custom/accordion-inner', {
    apiVersion: 2,
    title: __('Accordion Inner', 'sage'),
    category: 'custom',
    description: __('Single accordion item. Place any content you like.', 'sage'),
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

        const blockProps = useBlockProps({
            className: classNames(className, 'accordion-block__item'),
            style: {marginTop: 0, marginBottom: 0}
        });

        attributes.clientId = clientId;
        attributes.parentId = parentAttributes(attributes.clientId).clientId;
        attributes.headerTextSize = parentAttributes(attributes.clientId).accordionHeadlineSize;

        return (
            <>
                <div {...blockProps}>
                    <div
                        className={classNames("accordion-block__item-header custom-border", !attributes.isOpen && 'collapsed')}
                        id={`heading-${attributes.clientId}`}
                        aria-expanded="false"
                        data-bs-toggle="collapse"
                        aria-controls={`collapse-${attributes.clientId}`}
                        data-bs-target={`#collapse-${attributes.clientId}`}
                    >
                        <div className="accordion-block__item-header-inner">
                            <RichText
                                tagName="p"
                                placeholder={'Lorem Ipsum ...'}
                                className={`has-font-size-${attributes.headerTextSize}`}
                                value={attributes.headerText}
                                allowedFormats={['core/bold', 'core/italic']}
                                onChange={(value) => setAttributes({headerText: value})}
                            />
                        </div>
                    </div>
                    <div id={`collapse-${attributes.clientId}`}
                         className={classNames("accordion-block__collapse collapse", attributes.isOpen && 'show')}
                         aria-labelledby={`heading-${attributes.clientId}`}
                         data-bs-parent={`#block-${attributes.parentId}`}
                    >
                        <div className="accordion-block__item-body custom-border">
                            <InnerBlocks
                                templateLock={false}
                                allowedBlocks={removeArrayItems(ALLOWED_BLOCKS, ['custom/accordion'])}
                                renderAppender={InnerBlocks.DefaultBlockAppender}
                            />
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
                <div
                    className={classNames("accordion-block__item-header custom-border", !attributes.isOpen && 'collapsed')}
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
                     className={classNames("accordion-block__collapse collapse", attributes.isOpen && 'show')}
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
