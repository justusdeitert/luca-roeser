import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {createElement, Component} from '@wordpress/element';
import {RangeControl, ToggleControl, Button, Popover} from '@wordpress/components';
import {MediaUpload, InspectorControls, RichText} from '@wordpress/block-editor';
import {PanelColorSettings} from '@wordpress/editor';
import {withState} from '@wordpress/compose';
import classNames from 'classnames';
import {cloneArray} from "../utility";

const blockIcon = createElement('svg', {width: 20, height: 20},
    createElement('path', {
        d: 'M19.1666667,12 L19.1666667,2 C19.1666667,1.07916667 18.4208333,0.333333333 17.5,0.333333333 L2.5,0.333333333 C1.57916667,0.333333333 0.833333333,1.07916667 0.833333333,2 L0.833333333,12 C0.833333333,12.9208333 1.57916667,13.6666667 2.5,13.6666667 L17.5,13.6666667 C18.4208333,13.6666667 19.1666667,12.9208333 19.1666667,12 Z M7.08333333,7.41666667 L9.16666667,9.92083333 L12.0833333,6.16666667 L15.8333333,11.1666667 L4.16666667,11.1666667 L7.08333333,7.41666667 Z'
    })
);

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'

const attributes = {
    blockId: {
        type: 'string',
    },
    showIcon: {
        type: 'boolean',
        default: true,
    },
    accordionSpacing: {
        type: 'number',
        default: 10,
    },
    accordionHeadlineSize: {
        type: 'number',
        default: 16,
    },
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

            /**
             * Open Accordion Item on Mount
             * @type {Element}
             */
            let accordionItem = document.querySelector('.accordion-block__item.open-on-mount');
            if (accordionItem) {
                accordionItem.querySelector('.accordion-block__item-header').classList.remove('collapsed');
                accordionItem.querySelector('.accordion-block__collapse').classList.add('show');
            }
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

            // Save blockId
            attributes.blockId = clientId;

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

                const onChangeAccordionIsOpen = (value) => {

                    // Iterate through slides and only change value of selected item
                    attributes.accordion.map((innerItem, innerIndex) => {
                        if (innerIndex === index) {
                            innerItem.isOpen = !value.target.classList.contains('collapsed');
                        } else {
                            innerItem.isOpen = false;
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
                        <Button icon={'minus'}
                                isSmall={true}
                                label={__('Remove Item', 'sage')}
                                className={'icon-only'}
                                onClick={toggleVisible}
                                // style={{marginRight: '10px'}}
                        >
                            {isVisible && (
                                <Popover>
                                    <div className="popover__inner"
                                         style={{
                                             width: '200px',
                                             display: 'flex',
                                             padding: '5px',
                                             zIndex: '100'
                                         }}
                                    >
                                        {__('Really want to remove this Item?', 'sage')}
                                        <Button className="popover__inner-button" onClick={() => {removeAccordionItem(index)}}>{__('Yes', 'sage')}</Button>
                                    </div>
                                </Popover>
                            )}
                        </Button>
                    );
                });

                let uniqueIndex = `${attributes.blockId}-${index}`

                return (
                    <div className={classNames("accordion-block__item", item.isOpen && 'open-on-mount')} key={`card-${index}`}>
                        <Button icon={'plus'}
                                className={'button button--icon-only'}
                                isSmall={true}
                                label={__('Add Item after', 'sage')}
                                onClick={() => {addAccordionItemAfter(index)}}
                                style={{
                                    position: 'absolute',
                                    bottom: '-20px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    zIndex: 10
                                }}
                        />

                        <div className="accordion-block__item-header-wrapper" style={{display: 'flex', width: '100%', alignItems: 'center'}}>{/*Only in Editor*/}
                            <RemoveButtonPopover />
                            <div className={classNames('accordion-block__item-header', 'custom-border', 'collapsed')}
                                 id={`heading-${uniqueIndex}`}
                                 data-bs-toggle="collapse"
                                 data-bs-target={`#collapse-${uniqueIndex}`}
                                 aria-expanded="true"
                                 aria-controls={`collapse-${uniqueIndex}`}
                                 onClick={onChangeAccordionIsOpen}
                                 style={{
                                     padding: `${attributes.accordionSpacing / 16}rem`,
                                     fontSize: `${attributes.accordionHeadlineSize / 16}rem`,
                                 }}
                            >
                                <RichText
                                    tagName="p"
                                    placeholder={'Lorem Ipsum'}
                                    keepPlaceholderOnFocus={true}
                                    value={item.header}
                                    allowedFormats={['core/bold', 'core/italic']}
                                    onChange={onChangeAccordionHeader}
                                />
                                {attributes.showIcon &&
                                <i className={'icon-chevron-down'}></i>
                                }
                            </div>
                        </div>

                        <div id={`collapse-${uniqueIndex}`}
                             className={classNames("accordion-block__collapse",  "collapse")}
                             aria-labelledby={`heading-${uniqueIndex}`}
                             data-bs-parent={`#accordion-${attributes.blockId}`}
                        >
                            <div className={classNames('accordion-block__item-body', 'custom-border')}
                                 style={{
                                     padding: `${attributes.accordionSpacing / 16}rem`,
                                 }}
                            >
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

            const onChangeShowIcon = (value) => {
                setAttributes({showIcon: value});
            };

            const onChangeAccordionSpacing = (value) => {
                setAttributes({accordionSpacing: value});
            };

            const onChangeAccordionHeadlineSize = (value) => {
                setAttributes({accordionHeadlineSize: value});
            };

            return (
                <>
                    <InspectorControls>
                        <div className="inspector-controls-container">
                            <hr/>
                            <ToggleControl
                                label={__('Show Icon', 'sage')}
                                // help={ attributes.withHeadline ? 'Image is left' : 'Image is right' }
                                checked={attributes.showIcon}
                                onChange={onChangeShowIcon}
                            />
                            <hr/>
                            <p>{__('Accordion Spacing', 'sage')}</p>
                            <RangeControl
                                value={attributes.accordionSpacing}
                                min={5}
                                initialPosition={10}
                                max={20}
                                onChange={onChangeAccordionSpacing}
                            />
                            <hr/>
                            <p>{__('Accordion Headline Size', 'sage')}</p>
                            <RangeControl
                                value={attributes.accordionHeadlineSize}
                                min={16}
                                initialPosition={16}
                                max={24}
                                onChange={onChangeAccordionHeadlineSize}
                            />
                        </div>
                    </InspectorControls>
                    <div id={`accordion-${attributes.blockId}`} className={classNames(className, 'accordion-block', 'custom-shadow', 'custom-border-radius', 'custom-spacing')}>
                        {accordionRepeater}
                    </div>
                </>
            );
        }
    },
    save: ({className, attributes}) => {

        const accordionRepeater = attributes.accordion.map((item, index) => {

            let uniqueIndex = `${attributes.blockId}-${index}`

            return (
                <div className="accordion-block__item" key={`card-${index}`}>
                    <div className="accordion-block__item-header-wrapper" id={`heading-${uniqueIndex}`}>
                        <div className={classNames('accordion-block__item-header', 'custom-border', !item.isOpen && 'collapsed')}
                             data-bs-toggle="collapse"
                             data-bs-target={`#collapse-${uniqueIndex}`}
                             aria-expanded="true"
                             aria-controls={`collapse-${uniqueIndex}`}
                             style={{
                                 padding: `${attributes.accordionSpacing / 16}rem`,
                                 fontSize: `${attributes.accordionHeadlineSize / 16}rem`,
                             }}
                        >
                            <RichText.Content
                                tagName="p"
                                value={item.header}
                            />
                            {attributes.showIcon &&
                            <i className={'icon-chevron-down'}></i>
                            }
                        </div>
                    </div>

                    <div id={`collapse-${uniqueIndex}`}
                         className={classNames("accordion-block__collapse",  "collapse", item.isOpen && "show")}
                         aria-labelledby={`heading-${uniqueIndex}`}
                         data-bs-parent={`#accordion-${attributes.blockId}`}
                    >
                        <div className={classNames('accordion-block__item-body', 'custom-border')}
                             style={{
                                 padding: `${attributes.accordionSpacing / 16}rem`,
                             }}
                        >
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
            <>
                <div id={`accordion-${attributes.blockId}`} className={classNames(className, 'accordion-block', 'custom-shadow', 'custom-border-radius', 'custom-spacing')}>
                    {accordionRepeater}
                </div>
            </>
        );
    }
});
