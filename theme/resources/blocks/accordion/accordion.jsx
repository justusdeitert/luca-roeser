import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {createElement} from '@wordpress/element';
import {RangeControl, ToggleControl, Button, IconButton, Popover} from '@wordpress/components';
import {MediaUpload, InspectorControls, RichText} from '@wordpress/block-editor';
import {Component} from '@wordpress/element';
import {withState} from '@wordpress/compose';
import classNames from 'classnames';
// import {getImage, cloneArray} from "../utility";
// import {loremIpsum} from "lorem-ipsum";

const blockIcon = createElement('svg', {width: 20, height: 20},
    createElement('path', {
        d: 'M19.1666667,12 L19.1666667,2 C19.1666667,1.07916667 18.4208333,0.333333333 17.5,0.333333333 L2.5,0.333333333 C1.57916667,0.333333333 0.833333333,1.07916667 0.833333333,2 L0.833333333,12 C0.833333333,12.9208333 1.57916667,13.6666667 2.5,13.6666667 L17.5,13.6666667 C18.4208333,13.6666667 19.1666667,12.9208333 19.1666667,12 Z M7.08333333,7.41666667 L9.16666667,9.92083333 L12.0833333,6.16666667 L15.8333333,11.1666667 L4.16666667,11.1666667 L7.08333333,7.41666667 Z'
    })
);

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'

const attributes = {
    accordion: {
        type: 'array',
        default: [
            {
                isOpen: false,
                header: 'Lorem Ipsum',
                body: loremIpsum,
            },
            {
                isOpen: false,
                header: 'Lorem Ipsum',
                body: loremIpsum,
            },
            {
                isOpen: false,
                header: 'Lorem Ipsum',
                body: loremIpsum,
            },
        ],
    },
    clientId: {
        type: 'string',
    },
};

registerBlockType('custom/accordion', {
    title: __('Accordion', 'sage'),
    icon: blockIcon,
    category: 'custom',
    attributes,
    multiple: false,
    edit: class extends Component {

        //standard constructor for a component
        constructor() {
            super(...arguments);
            // console.log(this.props.name, ": constructor()");

            // example how to bind `this` to the current component for our callbacks
            this.onChangeContent = this.onChangeContent.bind(this);

            // some place for your state
            this.state = {};
        }

        componentDidMount() {
            // console.log(this.props.name, ": componentDidMount()");
        }

        componentDidUpdate() {
            // console.log(this.props.name, ": componentDidUpdate()");
        }

        componentWillUnmount() {
            // console.log(this.props.name, ": componentWillUnmount()");
        }

        // update attributes when content is updated
        onChangeContent(data) {

            // set attribute the react way
            this.props.setAttributes({content: data});
        }

        render() {
            let {attributes, className, setAttributes, clientId} = this.props;

            setAttributes({
                clientId: clientId, // Clone Array to fire reload in Editor
            });

            const accordionRepeater = attributes.accordion.map((item, index) => {

                const onChangeAccordionBody = (value) => {

                    // Iterate through slides and only change value of selected item
                    attributes.accordion.map((innerItem, innerIndex) => {
                        if(innerIndex === index) {
                            innerItem.body = value;
                        }
                    });

                    setAttributes({
                        accordion: cloneArray(attributes.accordion), // Clone Array to fire reload in Editor
                    });
                };

                const onChangeAccordionHeader = (value) => {

                    // Iterate through slides and only change value of selected item
                    attributes.accordion.map((innerItem, innerIndex) => {
                        if(innerIndex === index) {
                            innerItem.header = value;
                        }
                    });

                    setAttributes({
                        accordion: cloneArray(attributes.accordion), // Clone Array to fire reload in Editor
                    });
                };

                const addAccordionItemAfter = (index) => {

                    let newItem = {
                        isOpen: false,
                        header: 'Lorem Ipsum',
                        body: loremIpsum,
                    };

                    attributes.accordion.splice(index + 1, 0, newItem); // Adds the new Item at position

                    setAttributes({
                        accordion: [...attributes.accordion], // Replace With cool spread operator!!
                    });
                };

                const removeAccordionItem = (index) => {
                    attributes.accordion.splice(index, 1); // Removes item from position

                    setAttributes({
                        accordion: [...attributes.accordion], // Clone Array Otherwise there is not reload
                    });
                };

                const RemoveButtonPopover = withState({
                    isVisible: false,
                })(({isVisible, setState}) => {
                    const toggleVisible = () => {
                        setState((state) => ({isVisible: !state.isVisible}));
                    };
                    return (
                        <IconButton className="icon-button icon-button--minus" label={__('Remove Item', 'sage')} icon={'minus'} onClick={toggleVisible}>
                            {isVisible && (
                                <Popover>
                                    <div className="popover__inner">
                                        {__('Really want to remove this Item?', 'sage')}
                                        <Button className="popover__inner-button" onClick={() => {removeAccordionItem(index)}}>{__('Yes', 'sage')}</Button>
                                    </div>
                                </Popover>
                            )}
                        </IconButton>
                    );
                });

                return (
                    <div className="accordion-block__item" key={`card-${index}`}>
                        <div className="accordion-block__item-header" id={`heading-${attributes.clientId}-${index}`}>
                            <RemoveButtonPopover />
                            <div className="accordion-block__item-header-inner" data-toggle="collapse" data-target={`#collapse-${attributes.clientId}-${index}`} aria-expanded="false" aria-controls={`collapse-${attributes.clientId}-${index}`}>
                                <RichText
                                    tagName="p"
                                    placeholder={'Lorem Ipsum'}
                                    keepPlaceholderOnFocus={true}
                                    value={item.header}
                                    allowedFormats={['core/bold', 'core/italic']}
                                    onChange={onChangeAccordionHeader}
                                />
                                <div className="accordion-block__item-header-inner-icon" />
                            </div>
                            <IconButton className="icon-button icon-button--plus" icon={'plus'} label={__('Add Item after', 'sage')} onClick={() => {addAccordionItemAfter(index)}} />
                        </div>
                        <div id={`collapse-${attributes.clientId}-${index}`} className="collapse" aria-labelledby={`heading-${attributes.clientId}-${index}`} data-parent={`#accordion-${attributes.clientId}`}>
                            <div className="accordion-block__item-body">
                                <RichText
                                    tagName="p"
                                    placeholder={loremIpsum}
                                    keepPlaceholderOnFocus={true}
                                    value={item.body}
                                    // allowedFormats={['core/bold', 'core/italic', 'core/link']}
                                    onChange={onChangeAccordionBody}
                                />
                            </div>
                        </div>
                    </div>
                )
            });

            return (
                <>
                    <div id={`accordion-${attributes.clientId}`} className={classNames(className, 'accordion-block')}>
                        {accordionRepeater}
                    </div>
                </>
            );
        }
    },
    save: ({className, attributes}) => {

        const accordionRepeater = attributes.accordion.map((item, index) => {
            return (
                <div className="accordion-block__item" key={`card-${index}`}>
                    <div className="accordion-block__item-header" id={`heading-${attributes.clientId}-${index}`}>
                        <div className="accordion-block__item-header-inner" data-toggle="collapse" data-target={`#collapse-${attributes.clientId}-${index}`} aria-expanded="false" aria-controls={`collapse-${attributes.clientId}-${index}`}>
                            <RichText.Content
                                tagName="p"
                                value={item.header}
                            />
                            <div className="accordion-block__item-header-inner-icon" />
                        </div>
                    </div>
                    <div id={`collapse-${attributes.clientId}-${index}`} className="collapse" aria-labelledby={`heading-${attributes.clientId}-${index}`} data-parent={`#accordion-${attributes.clientId}`}>
                        <div className="accordion-block__item-body">
                            <RichText.Content
                                tagName="p"
                                value={item.body}
                            />
                        </div>
                    </div>
                </div>
            )
        });

        return (
            <div id={`accordion-${attributes.clientId}`} className={classNames(className, 'accordion-block')}>
                {accordionRepeater}
            </div>
        );
    },
    deprecated: [
        {
            attributes,
            // Upload Staging 27.10.2020
            save: ({className, attributes}) => {

                const accordionRepeater = attributes.accordion.map((item, index) => {
                    return (
                        <div className="accordion-block__item" key={`card-${index}`}>
                            <div className="accordion-block__item-header" id={`heading-${index}`}>
                                <div className="accordion-block__item-header-inner" data-toggle="collapse" data-target={`#collapse-${index}`} aria-expanded="false" aria-controls={`collapse-${index}`}>
                                    <RichText.Content
                                        tagName="p"
                                        value={item.header}
                                    />
                                    <div className="accordion-block__item-header-inner-icon" />
                                </div>
                            </div>
                            <div id={`collapse-${index}`} className="collapse" aria-labelledby={`heading-${index}`} data-parent=".accordion-block">
                                <div className="accordion-block__item-body">
                                    <RichText.Content
                                        tagName="p"
                                        value={item.body}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                });

                return (
                    <div className={classNames(className, 'accordion-block')}>
                        {accordionRepeater}
                    </div>
                );
            },
        },
    ],
});
