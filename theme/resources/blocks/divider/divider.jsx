import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {ToggleControl} from '@wordpress/components';
import {createElement, Component} from '@wordpress/element';
import {RangeControl, ColorPalette} from '@wordpress/components';
import {InspectorControls} from '@wordpress/block-editor';

import classNames from 'classnames';
import {editorThemeColors} from "../utility";

// import {} from "../config";

const blockIcon = createElement('svg', {width: 20, height: 20},
    createElement('path', {
        d: 'M18.3333333,8.75 L18.3333333,10.4166667 L1.66666667,10.4166667 L1.66666667,8.75 L18.3333333,8.75 Z'
    })
);

registerBlockType('custom/divider', {
    title: __('Divider', 'sage'),
    icon: blockIcon,
    category: 'custom',
    supports: {
        align: ['full'],
    },
    attributes: {
        color: {
            type: 'string',
            default: '#EEE'
        },
        opacity: {
            type: 'number',
            default: 1
        },
        spacingDesktop: {
            type: 'number',
            default: 40
        },
        spacingMobile: {
            type: 'number',
            default: 20
        },
        thickness: {
            type: 'number',
            default: 1
        },
        hasFullWidth: {
            type: 'boolean',
            default: true
        },
        width: {
            type: 'number',
            default: 50
        },
    },
    // Access React Lifecycle Methods within gutenberg block
    // https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
    // https://dev.to/martinkr/create-a-wordpress-s-gutenberg-block-with-all-react-lifecycle-methods-in-5-minutes-213p
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
            // window.setTriangleBlockHeight();
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
            this.props.setAttributes({ content: data });
        }

        render() {

            let {attributes, className, setAttributes} = this.props;

            const onChangeOpacity = (value) => {
                setAttributes({opacity: value});
            };

            const onChangeSpacingDesktop = (value) => {
                setAttributes({spacingDesktop: value});
            };

            const onChangeSpacingMobile = (value) => {
                setAttributes({spacingMobile: value});
            };

            const onChangeThickness = (value) => {
                setAttributes({thickness: value});
            };

            const onChangeHasFullWidth = (value) => {
                setAttributes({hasFullWidth: value});
            };

            const onChangeWidth = (value) => {
                setAttributes({width: value});
            };

            const onChangeColor = (value) => {
                setAttributes({color: value});
            };

            return (
                <>
                    <InspectorControls>
                        <div className="inspector-controls-container">
                            <hr/>
                            <p>{__('Change Opacity', 'sage')}</p>
                            <RangeControl
                                value={attributes.opacity}
                                min={0}
                                max={1}
                                step={0.05}
                                onChange={onChangeOpacity}
                            />
                            <hr/>
                            <p>{__('Change Spacing (Desktop)', 'sage')}</p>
                            <RangeControl
                                value={attributes.spacingDesktop}
                                min={0}
                                max={140}
                                step={20}
                                onChange={onChangeSpacingDesktop}
                            />
                            <hr/>
                            <p>{__('Change Spacing (Mobile)', 'sage')}</p>
                            <RangeControl
                                value={attributes.spacingMobile}
                                min={0}
                                max={100}
                                step={20}
                                onChange={onChangeSpacingMobile}
                            />
                            <hr/>
                            <p>{__('Change Thickness', 'sage')}</p>
                            <RangeControl
                                value={attributes.thickness}
                                min={1}
                                max={3}
                                step={1}
                                onChange={onChangeThickness}
                            />
                            <hr/>
                            <ToggleControl
                                label={__('Full Width', 'sage')}
                                // help={ attributes.switchContent ? 'Image is left' : 'Image is right' }
                                checked={attributes.hasFullWidth}
                                onChange={onChangeHasFullWidth}
                            />
                            {!attributes.hasFullWidth &&
                                <>
                                    <hr/>
                                    <p>{__('Change Width in %', 'sage')}</p>
                                    <RangeControl
                                        value={attributes.width}
                                        min={10}
                                        max={100}
                                        step={1}
                                        onChange={onChangeWidth}
                                    />
                                </>
                            }
                            <hr/>
                            <p>{__('Change Color', 'sage')}</p>
                            <ColorPalette
                                colors={editorThemeColors}
                                value={attributes.color}
                                onChange={onChangeColor}
                                // clearable={false}
                            />
                        </div>
                    </InspectorControls>
                    <div className={classNames(className, 'divider-block')} style={{padding: `${attributes.spacingDesktop / 16}rem 0`}}>
                        <hr className='divider-block__hr'
                            style={{
                                height: `${attributes.thickness}px`,
                                maxWidth: attributes.hasFullWidth ? 'initial' : `${attributes.width}%`,
                                opacity: attributes.opacity,
                                backgroundColor: attributes.color
                            }}
                        />
                    </div>
                </>
            );
        }
    },
    save: ({className, attributes}) => {
        return (
            <div className={classNames(className, 'divider-block')} style={{padding: `${attributes.spacingDesktop / 16}rem 0`}} >
                <hr className='divider-block__hr'
                    style={{
                        height: `${attributes.thickness}px`,
                        maxWidth: attributes.hasFullWidth ? 'initial' : `${attributes.width}%`,
                        opacity: attributes.opacity,
                        backgroundColor: attributes.color
                    }}
                />
            </div>
        );
    },
});

