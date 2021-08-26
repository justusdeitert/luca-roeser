/**
 * External dependencies
 */
import classNames from "classnames";

/**
 * Wordpress dependencies
 */
import {__} from '@wordpress/i18n';
import {registerBlockType,} from '@wordpress/blocks';
import {Button} from '@wordpress/components';
import {createElement, Component, useEffect, useRef} from '@wordpress/element';
import {TextControl, RangeControl, ColorPalette} from '@wordpress/components';
import {Icon, Tooltip} from '@wordpress/components';
import {MediaUpload, InspectorControls} from '@wordpress/block-editor';
import {
    color as colorIcon,
    mapMarker as mapIcon,
    plusCircle as plusCircleIcon,
    link as linkIcon,
    pin as pinIcon,
    trash as trashIcon
} from '@wordpress/icons';

/**
 * Internal dependencies
 */
import {
    editorThemeColors,
    getColorObject,
    getImage,
    SettingsHeading,
    ResetWrapperControl, returnColorStyle
} from '../utility';

/**
 * Block attributes
 */
const attributes = {
    clientId: {
        type: 'string'
    },
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
    }
};

registerBlockType('custom/map', {
    title: __('Map', 'sage'),
    icon: mapIcon,
    category: 'custom',
    description: __('Add a block that displays a google map with custom settings.', 'sage'),
    supports: {
        // align: true,
        align: ['full'],
    },
    attributes,
    edit: ({setAttributes, attributes, className, clientId}) => {

        /**
         * Init map instance
         */
        if (!window.googleMapInstances[clientId]) {
            window.initMaps();
        }

        /**
         * React useEffect hook to update map instance
         */
        const isInitialMount = useRef(true);
        useEffect(() => {
            if (isInitialMount.current) {
                isInitialMount.current = false;
            } else {
                // Your useEffect code here to be run only on update
                const timer = setTimeout(() => {
                    window.initMaps();
                }, 300);

                // only fire every 300 milliseconds
                return () => clearTimeout(timer);
            }
        }, [attributes]) // only fire when attributes change

        attributes.clientId = clientId;

        return (
            <div
                className={classNames(
                    className,
                    'map-block',
                    'custom-border',
                    'custom-border-radius',
                    'custom-shadow'
                )}
                style={{
                    '--map-background-color': returnColorStyle(
                        attributes.backgroundColor,
                        'rgb(var(--custom-light-color))'
                    )
                }}
            >
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <hr style={{marginTop: 0}}/>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <MediaUpload
                                onSelect={(value) => setAttributes({markerImage: value})}
                                allowedTypes={[
                                    'image/svg+xml',
                                    'image/png',
                                ]}
                                render={({open}) => (
                                    <Button className={'button'} onClick={open}>
                                        {!attributes.markerImage ? __('Upload Marker', 'sage') : __('Update Marker', 'sage')}
                                    </Button>
                                )}
                            />
                            {attributes.markerImage && <>
                                {/*<Tooltip text={__('Remove Marker Image', 'sage')}>*/}
                                    <Button
                                        icon={trashIcon}
                                        label={__('Remove Marker Image', 'sage')}
                                        size={24}
                                        onClick={() => setAttributes({markerImage: false})}
                                        style={{marginLeft: '10px', cursor: 'pointer'}}
                                    />
                                {/*</Tooltip>*/}
                            </>}
                        </div>
                        <hr/>
                        <SettingsHeading headline={'Address'} icon={pinIcon}/>
                        <TextControl
                            value={attributes.address}
                            onChange={(value) => setAttributes({address: value})}
                        />
                        <hr/>
                        <SettingsHeading headline={'Google Maps Link'} icon={linkIcon}/>
                        <TextControl
                            value={attributes.googleMapsLink}
                            onChange={(value) => setAttributes({googleMapsLink: value})}
                        />
                        <hr/>
                        <SettingsHeading headline={'Zoom level'} icon={plusCircleIcon}/>
                        <ResetWrapperControl onClick={() => setAttributes({zoom: 16})}>
                            <RangeControl
                                value={attributes.zoom}
                                min={6}
                                max={22}
                                onChange={(value) => setAttributes({zoom: value})}
                            />
                        </ResetWrapperControl>
                        <hr/>
                        <SettingsHeading headline={'Background color'} icon={colorIcon}/>
                        <ColorPalette
                            colors={editorThemeColors}
                            value={attributes.backgroundColor}
                            onChange={(value) => setAttributes({backgroundColor: value})}
                            // disableCustomColors={true}
                        />
                    </div>
                </InspectorControls>
                <div
                    className={classNames(
                        className,
                        'map-block',
                        'custom-border',
                        'custom-border-radius',
                        'custom-shadow',
                    )}>
                    <div className="map-block__wrapper">
                        <div className="map-block__map"
                             data-marker-url={attributes.markerImage ? getImage(attributes.markerImage, 'original') : ''}
                             data-marker-address={attributes.address}
                             data-zoom-level={attributes.zoom}
                             data-map-id={attributes.clientId}
                        />
                        {attributes.googleMapsLink && <>
                            <a
                                href={attributes.googleMapsLink}
                                className={classNames("map-block__route-link")}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span>Zu Google Maps</span>
                                <i className={'icon-arrow-right-circle'}/>
                            </a>
                        </>}
                    </div>
                </div>
            </div>
        )
    },
    save: ({attributes}) => {
        return (
            <div
                className={classNames(
                    'map-block',
                    'custom-border',
                    'custom-border-radius',
                    'custom-shadow'
                )}
                style={{
                    '--map-background-color': returnColorStyle(
                        attributes.backgroundColor,
                        'rgb(var(--custom-light-color))'
                    )
                }}
            >
                <div className="map-block__wrapper">
                    <div className="map-block__map"
                         data-marker-url={attributes.markerImage ? getImage(attributes.markerImage, 'original') : ''}
                         data-marker-address={attributes.address}
                         data-zoom-level={attributes.zoom}
                         data-map-id={attributes.clientId}
                    />
                    {attributes.googleMapsLink && <>
                        <a
                            href={attributes.googleMapsLink}
                            className={classNames("map-block__route-link")}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>Zu Google Maps</span>
                            <i className={'icon-arrow-right-circle'}/>
                        </a>
                    </>}
                </div>
            </div>
        );
    }
});
