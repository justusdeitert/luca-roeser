import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {RangeControl, PanelBody, SelectControl} from '@wordpress/components';
import {InnerBlocks, InspectorControls, ColorPalette} from '@wordpress/block-editor';
import {createElement, Component} from '@wordpress/element';
import classNames from 'classnames';

const blockIcon = createElement('svg', {width: 20, height: 20},
    createElement('path', {
        d: 'M10.5,15 L17,15 L17,5 L10.5,5 L10.5,15 Z M3,15 L9.5,15 L9.5,5 L3,5 L3,15 Z'
    })
);

const attributes = {
    columns: {
        type: 'number',
        default: 2
    }
}

registerBlockType('custom/slider', {
    title: __('Slider', 'sage'),
    category: 'custom',
    icon: blockIcon,
    attributes,
    supports: {
        anchor: true,
        html: false,
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
            console.log(this.props.name, ": componentDidMount()");
            window.initSlider();
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

            const TEMPLATE = [
                ['custom/slider-item', {}, [
                    // ['core/paragraph', {placeholder: 'Image Details'}]
                ]],
                ['custom/slider-item', {}, [
                    // ['core/paragraph', {placeholder: 'Image Details'}]
                ]]
            ];

            // const onChangeColumn = (value) => {
            //     setAttributes({
            //         columns: value
            //     });
            // };

            return (
                <div className={classNames(className, 'slider-block')}>
                    {/*<InspectorControls>
                        <div className="inspector-controls-container">
                            <p>{__('Adjust Columns', 'sage')}</p>
                            <RangeControl
                                value={attributes.columns}
                                min={2}
                                initialPosition={2}
                                max={4}
                                onChange={onChangeColumn}
                            />
                        </div>
                    </InspectorControls>*/}
                    <InnerBlocks templateLock={false} template={TEMPLATE} allowedBlocks={['custom/slider-item']}/>
                </div>
            );
        }
    },
    save: ({attributes, className}) => {
        return (
            <div className={classNames(className, 'slider-block')}>
                <InnerBlocks.Content/>
            </div>
        );
    },
});
