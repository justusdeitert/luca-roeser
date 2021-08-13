import {__} from '@wordpress/i18n';
import {registerBlockType,} from '@wordpress/blocks';
import {Button} from '@wordpress/components';
import {createElement, Component} from '@wordpress/element';
import {TextControl, RangeControl, ColorPalette} from '@wordpress/components';
import {Icon, Tooltip} from '@wordpress/components';
import {MediaUpload, InspectorControls} from '@wordpress/block-editor';
import classNames from "classnames";
import {editorThemeColors, getColorObject, getImage} from '../utility';
import {mapIcon} from '../icons';

const attributes = {
    markerImageURL: {
        type: 'string',
        default: ''
    },
    markerImage: {
        type: 'object',
        default: ''
    },
    address: {
        type: 'string',
        default: 'Lindener Marktplatz 2, 30449 Hannover',
    },
    googleMapsLink: {
        type: 'string',
        default: ''
    },
    zoom: {
        type: 'number',
        default: 16,
    },
    backgroundColor: {
        type: 'string',
        default: ''
    }
};

registerBlockType('custom/map', {
    title: __('Map', 'sage'),
    icon: mapIcon,
    category: 'custom',
    supports: {
        // align: true,
        align: ['full'],
    },
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
            // console.log(this.props.name, ": componentDidMount()");

            /**
             * If Maps API Loaded init Maps on Component Mount
             */
            window.initMaps();
        }

        componentDidUpdate() {
            // console.log(this.props.name, ": componentDidUpdate()");
            // Dont Use Component Did update for building Glide Instance because it gets fired to often!!...

            /**
             * Is Updated with refresh Gap to not Call the API to often..
             */
            if (window.refreshGap) {
                window.initMaps();
                window.refreshGap = false;
            }

            setTimeout(() => {
                window.refreshGap = true;
            }, 600)
        }

        componentWillUnmount() {
            // console.log(this.props.name, ": componentWillUnmount()");
        }

        // update attributes when content is updated
        onChangeContent(data) {
            // set attribute the react way
            this.props.setAttributes({content: data});
        }

        // edit: function (props) {
        // Creates a <p class='wp-block-cgb-block-react-lifecycle-block'></p>.
        render() {

            let {attributes, className, setAttributes} = this.props;

            return (
                <>
                    <InspectorControls>
                        <div className="inspector-controls-container">
                            <hr/>
                            <MediaUpload
                                onSelect={(value) => setAttributes({markerImage: value})}
                                allowedTypes={[
                                    'image/svg+xml',
                                    'image/png',
                                ]}
                                render={({open}) => (
                                    <Button className={'button'} onClick={open}>
                                        {!attributes.markerImage ? __('Upload Map Marker', 'sage') : __('Update Map Marker', 'sage')}
                                    </Button>
                                )}
                            />
                            {attributes.markerImage &&
                            <>
                                <Tooltip text={__('Remove Marker Image', 'sage')}>
                                    <Icon
                                        icon="trash"
                                        size={32}
                                        onClick={() => setAttributes({markerImage: false})}
                                        style={{marginLeft: '10px', cursor: 'pointer'}}
                                    />
                                </Tooltip>
                            </>
                            }
                            <hr/>
                            <TextControl
                                label={__('Address', 'sage')}
                                value={attributes.address}
                                onChange={(value) => setAttributes({address: value})}
                            />
                            <hr/>
                            <TextControl
                                label={__('Google Maps Link', 'sage')}
                                value={attributes.googleMapsLink}
                                onChange={(value) => setAttributes({googleMapsLink: value})}
                            />
                            <hr/>
                            <p>{__('Adjust Zoom Level', 'sage')}</p>
                            <RangeControl
                                value={attributes.zoom}
                                min={6}
                                max={22}
                                onChange={(value) => setAttributes({zoom: value})}
                            />
                            <hr/>
                            <p>{__('Background Color', 'sage')}</p>
                            <ColorPalette
                                colors={editorThemeColors}
                                value={attributes.backgroundColor}
                                onChange={(value) => setAttributes({backgroundColor: value})}
                                disableCustomColors={true}
                            />
                        </div>
                    </InspectorControls>
                    <div className={classNames(className, 'map-block', 'custom-border custom-border-radius custom-shadow custom-spacing', getColorObject(attributes.backgroundColor) && `has-${getColorObject(attributes.backgroundColor).slug}-background-color`)}>
                        <div className="map-block__wrapper">
                            <div className="map-block__map"
                                 data-marker-url={attributes.markerImage ? getImage(attributes.markerImage, 'original') : ''}
                                 data-marker-address={attributes.address}
                                 data-zoom-level={attributes.zoom}
                            />
                            {attributes.googleMapsLink &&
                            <>
                                <a
                                    href={attributes.googleMapsLink}
                                    className={classNames("map-block__route-link")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={getColorObject(attributes.backgroundColor) && {backgroundColor: `rgb(var(--custom-${getColorObject(attributes.backgroundColor).slug}-color))`}}
                                >
                                    <span>Zu Google Maps</span>
                                    <i className={'icon-arrow-right-circle'}></i>
                                </a>
                            </>
                            }
                        </div>
                    </div>
                </>
            )
        }
    },
    save: ({className, attributes}) => {
        return (
            <div className={classNames(className, 'map-block', 'custom-border custom-border-radius custom-shadow custom-spacing', getColorObject(attributes.backgroundColor) && `has-${getColorObject(attributes.backgroundColor).slug}-background-color`)}>
                <div className="map-block__wrapper">
                    <div className="map-block__map"
                         data-marker-url={attributes.markerImage ? getImage(attributes.markerImage, 'original') : ''}
                         data-marker-address={attributes.address}
                         data-zoom-level={attributes.zoom}
                    />
                    {attributes.googleMapsLink &&
                    <>
                        <a
                            href={attributes.googleMapsLink}
                            className={classNames("map-block__route-link")}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={getColorObject(attributes.backgroundColor) && {backgroundColor: `rgb(var(--custom-${getColorObject(attributes.backgroundColor).slug}-color))`}}
                        >
                            <span>Zu Google Maps</span>
                            <i className={'icon-arrow-right-circle'}></i>
                        </a>
                    </>
                    }
                </div>
            </div>
        );
    }
});
