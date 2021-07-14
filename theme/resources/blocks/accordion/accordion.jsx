import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {Component} from '@wordpress/element';
import {RangeControl, ToggleControl, Button, Popover, ColorPalette} from '@wordpress/components';
import {InspectorControls, RichText, getColorObjectByColorValue} from '@wordpress/block-editor';
import {withState} from '@wordpress/compose';
import classNames from 'classnames';
import {cloneArray, editorThemeColors} from "../utility";
import {accordionIcon} from "../icons";

// TODO: Use Lorem Ipsum NPM Library!!
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
        default: 20,
    },
    accordionBackgroundColor: {
        type: 'string'
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
    icon: accordionIcon,
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
                                className={'button'}
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
                    <div key={`card-${index}`} className={classNames("accordion-block__item", item.isOpen && 'open-on-mount')}>
                        <Button icon={'plus'}
                                className={'button'}
                                isSmall={true}
                                // label={__('Add Item after', 'sage')}
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

            const onChangeAccordionBackgroundColor = (value) => {
                setAttributes({accordionBackgroundColor: value});
            };

            const accordionBackgroundColor = getColorObjectByColorValue(editorThemeColors, attributes.accordionBackgroundColor);

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
                            <hr/>
                            <p>{__('Accordion Background Color', 'sage')}</p>
                            <ColorPalette
                                colors={[...editorThemeColors]}
                                value={attributes.accordionBackgroundColor}
                                onChange={onChangeAccordionBackgroundColor}
                            />
                        </div>
                    </InspectorControls>
                    <div id={`accordion-${attributes.blockId}`} className={classNames(className, 'accordion-block', 'custom-shadow', 'custom-border-radius', 'custom-spacing', accordionBackgroundColor && `has-${accordionBackgroundColor.slug}-background-color`)}>
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
                <div key={`card-${index}`} className="accordion-block__item">
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

        const accordionBackgroundColor = getColorObjectByColorValue(editorThemeColors, attributes.accordionBackgroundColor);

        return (
            <>
                <div id={`accordion-${attributes.blockId}`} className={classNames(className, 'accordion-block', 'custom-shadow', 'custom-border-radius', 'custom-spacing', accordionBackgroundColor && `has-${accordionBackgroundColor.slug}-background-color`)}>
                    {accordionRepeater}
                </div>
            </>
        );
    }
});
