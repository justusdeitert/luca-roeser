import {__} from '@wordpress/i18n';
import {registerBlockType,} from '@wordpress/blocks';
import {Button} from '@wordpress/components';
import {createElement, Component} from '@wordpress/element';
import {TextControl, RangeControl} from '@wordpress/components';
import {Icon, Tooltip} from '@wordpress/components';
import {MediaUpload, InspectorControls} from '@wordpress/block-editor';
import classNames from "classnames";
import {getImage} from '../utility';
import {mapIcon} from '../icons';

const attributes = {
    markerImageURL: {
        type: 'string',
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
    },
    zoom: {
        type: 'number',
        default: 16,
    },
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
            if(window.refreshGap) {
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

            let {attributes, className, setAttributes } = this.props;

            const onSelectMarkerImage = (image) => {
                setAttributes({markerImage: image});
            };

            const removeMarkerImage = () => {
                setAttributes({markerImage: false});
            };

            const onChangeAddress = (address) => {
                setAttributes({address: address});
            };

            const onChangeZoom = (value) => {
                setAttributes({zoom: value});
            };

            const onChangeGoogleMapsLink = (value) => {
                setAttributes({googleMapsLink: value});
            };

            return (
                <div className={classNames(className, 'map-block', 'custom-border custom-border-radius custom-shadow custom-spacing')}>
                    <InspectorControls>
                        <div className="inspector-controls-container">
                            <hr/>
                            <MediaUpload
                                onSelect={onSelectMarkerImage}
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
                                <Tooltip text={__('Remove Marker Image', 'sage')}>
                                    <Icon icon="trash" size={32} onClick={removeMarkerImage} style={{marginLeft: '10px', cursor: 'pointer'}} />
                                </Tooltip>
                            }
                            <hr/>
                            <TextControl
                                label={__('Address', 'sage')}
                                value={attributes.address}
                                onChange={onChangeAddress}
                            />
                            <hr/>
                            <TextControl
                                label={__('Google Maps Link', 'sage')}
                                value={attributes.googleMapsLink}
                                onChange={onChangeGoogleMapsLink}
                            />
                            <hr />
                            <p>{__('Adjust Zoom Level', 'sage')}</p>
                            <RangeControl
                                value={attributes.zoom}
                                min={6}
                                max={22}
                                onChange={onChangeZoom}
                            />
                        </div>
                    </InspectorControls>
                    <div className="map-block__wrapper">
                        <div className="map-block__map"
                             data-marker-url={attributes.markerImage ? getImage(attributes.markerImage, 'original') : ''}
                             data-marker-address={attributes.address}
                             data-zoom-level={attributes.zoom}
                        />
                        {attributes.googleMapsLink &&
                            <a href={attributes.googleMapsLink} className="map-block__route-link" target="_blank" rel="noopener noreferrer">
                                <span>Zu Google Maps</span>
                                <i class={'icon-arrow-right-circle'}></i>
                            </a>
                        }
                    </div>
                </div>
            )
        }
    },
    save: ({className, attributes}) => {
        return (
            <div className={classNames(className, 'map-block', 'custom-border custom-border-radius custom-shadow custom-spacing')}>
                <div className="map-block__wrapper">
                    <div className="map-block__map"
                         data-marker-url={attributes.markerImage ? getImage(attributes.markerImage, 'original') : ''}
                         data-marker-address={attributes.address}
                         data-zoom-level={attributes.zoom}
                    />
                    {attributes.googleMapsLink &&
                        <a href={attributes.googleMapsLink} className="map-block__route-link" target="_blank" rel="noopener noreferrer">
                            <span>Zu Google Maps</span>
                            <i className={'icon-arrow-right-circle'}></i>
                        </a>
                    }
                </div>
            </div>
        );
    }
});
