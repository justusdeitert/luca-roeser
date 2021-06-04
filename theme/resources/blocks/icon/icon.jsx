import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {Button, Tooltip} from '@wordpress/components';
import {createElement, Component} from '@wordpress/element';
import {
    RangeControl,
    RadioControl
} from '@wordpress/components';

import {
    RichText,
    MediaUpload,
    InspectorControls
} from '@wordpress/block-editor';

import classNames from 'classnames';

const blockIcon = createElement('svg', {width: 20, height: 20},
    createElement('path', {
        d: 'M18.3333333,8.75 L18.3333333,10.4166667 L1.66666667,10.4166667 L1.66666667,8.75 L18.3333333,8.75 Z'
    })
);

const attributes = {
    icon: {
        type: 'object',
    },
}

registerBlockType('custom/icon', {
    title: __('Icon', 'sage'),
    icon: blockIcon,
    category: 'custom',
    // parent: [
    //     'core/group',
    //     'custom/single-column'
    // ],
    // multiple: false, // Use this block just once per post
    attributes,
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

            // const onChangeTriangleSize = (value) => {
            //     setAttributes({triangleSize: value});
            // };
            //
            // const onChangeOpacity = (value) => {
            //     setAttributes({opacity: value});
            // };

            const onChangeVisibilityClass = (value) => {
                setAttributes({visibilityClass: value});
            };

            return (
                <div className={classNames(className, 'icon-block')}>
                    {/*<InspectorControls>
                        <div className="inspector-controls-container">
                            <hr/>
                            <p>{__('Change Visibility', 'sage')}</p>
                            <RadioControl
                                // label={__('Triangle Position', 'sage')}
                                selected={attributes.visibilityClass}
                                options={
                                    [
                                        {label: __('Show Everywhere', 'sage'), value: ''},
                                        {label: __('Show Mobile Only', 'sage'), value: 'show-mobile-only'},
                                        {label: __('Show Desktop Only', 'sage'), value: 'show-desktop-only'},
                                    ]
                                }
                                onChange={onChangeVisibilityClass}
                            />
                        </div>
                    </InspectorControls>*/}
                    <hr className={classNames('divider-block__hr')} />
                </div>
            );
        }
    },
    save: ({className, attributes}) => {

        return (
            <div className={classNames(className, 'icon-block')}>
                <hr className={classNames('divider-block__hr')} />
            </div>
        );
    },
});

