import {__} from '@wordpress/i18n';
import {registerBlockType,} from '@wordpress/blocks';
import {Button} from '@wordpress/components';
import {createElement, Component} from '@wordpress/element';
import {ToggleControl, TextControl, RangeControl} from '@wordpress/components';
import {Icon} from '@wordpress/components';
import {routeIcon} from "../icons";

import {
    RichText,
    MediaUpload,
    MediaUploadCheck,
    InspectorControls
} from '@wordpress/block-editor';

// import classNames from "classnames";

const blockIcon = createElement('svg', {width: 20, height: 20},
    createElement('path', {
        d: 'M6,0.666666667 C2.77916667,0.666666667 0.166666667,3.27916667 0.166666667,6.5 C0.166666667,10.875 6,17.3333333 6,17.3333333 C6,17.3333333 11.8333333,10.875 11.8333333,6.5 C11.8333333,3.27916667 9.22083333,0.666666667 6,0.666666667 Z M6,8.58333333 C4.85,8.58333333 3.91666667,7.65 3.91666667,6.5 C3.91666667,5.35 4.85,4.41666667 6,4.41666667 C7.15,4.41666667 8.08333333,5.35 8.08333333,6.5 C8.08333333,7.65 7.15,8.58333333 6,8.58333333 Z'
    })
);

const attributes = {
    markerImageURL: {
        type: 'string',
    },
    address: {
        type: 'string',
        default: 'Lindener Marktplatz 2, 30449 Hannover',
    },
    googleMapsLink: {
        type: 'string',
    },
    headlineIsActive: {
        type: 'boolean',
        default: true,
    },
    zoom: {
        type: 'number',
        default: 16,
    },
};

registerBlockType('custom/map', {
    title: __('Map', 'sage'),
    icon: blockIcon,
    category: 'custom',
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

            // If Maps API Loaded init Maps on Component Mount
            // -------->
            window.mapsApiLoaded && window.initMaps();
        }

        componentDidUpdate() {
            // console.log(this.props.name, ": componentDidUpdate()");
            // Dont Use Component Did update for building Glide Instance because it gets fired to often!!...
            // window.mapsApiLoaded && window.initMaps();

            if(window.refreshGap) {
                window.mapsApiLoaded && window.initMaps();
                window.refreshGap = false;
                // console.log('window.refreshGap');
            }

            setTimeout(() => {
                window.refreshGap = true;
                // console.log('window.refreshGap = true;');
            }, 400)
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

            const onSelectImage = (image) => {
                setAttributes({
                    markerImageURL: image.sizes.full.url,
                    // markerImageID: image.id,
                });
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

            const imageButtonStyle = {
                padding: 0,
            };

            return (
                <div className={className}>
                    <div className='map-block'>
                        <InspectorControls>
                            <div className="inspector-controls-container">
                                <hr/>
                                <MediaUpload
                                    onSelect={onSelectImage}
                                    allowedTypes="image"
                                    // value={attributes.mediaID}
                                    render={({open}) => (
                                        <Button className={'button button-small map-block__marker-image-button'} style={attributes.markerImageURL && imageButtonStyle} onClick={open}>
                                            {!attributes.markerImageURL ?
                                                __('Upload Map Marker', 'sage')
                                                :
                                                <img src={attributes.markerImageURL}/>
                                            }
                                        </Button>
                                    )}
                                />
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
                            <div className="map-block__map" data-marker-url={attributes.markerImageURL} data-marker-address={attributes.address} data-zoom-level={attributes.zoom} />
                            {attributes.googleMapsLink &&
                                <a href={attributes.googleMapsLink} className="map-block__route-link" target="_blank" rel="noopener noreferrer">
                                    <span>Zu Google Maps</span>
                                    <Icon icon={routeIcon} className={'map-block__route-link-icon'}/>
                                </a>
                            }
                        </div>
                    </div>
                </div>
            )
        }
    },
    save: ({className, attributes}) => {
        return (
            <div className={className}>
                <div className="map-block">
                    <div className="map-block__wrapper">
                        <div className="map-block__map" data-marker-url={attributes.markerImageURL} data-marker-address={attributes.address} data-zoom-level={attributes.zoom} />
                        {attributes.googleMapsLink &&
                            <a href={attributes.googleMapsLink} className="map-block__route-link" target="_blank" rel="noopener noreferrer">
                                <span>Zu Google Maps</span>
                                <Icon icon={routeIcon} className={'map-block__route-link-icon'}/>
                            </a>
                        }
                    </div>
                </div>
            </div>
        );
    },
    deprecated: [
        {
            attributes,
            save: ({className, attributes}) => {

                return (
                    <div className={className}>
                        <div className="map-block">
                            <div className="map-block__wrapper">
                                <div className="map-block__map" data-marker-url={attributes.markerImageURL} data-marker-address={attributes.address} data-zoom-level={attributes.zoom} />
                                {attributes.googleMapsLink &&
                                <a href={attributes.googleMapsLink} className="map-block__route-link" target="_blank" rel="noopener noreferrer">
                                    <span>Zu Google Maps</span>
                                    <i className="icon icon--route" />
                                </a>
                                }
                            </div>
                        </div>
                    </div>
                );
            },
        },
    ],
});
