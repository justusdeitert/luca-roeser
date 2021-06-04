import {__} from '@wordpress/i18n';
import {registerBlockType, createBlock} from '@wordpress/blocks';
import {createElement, Component} from '@wordpress/element';
import {
    Button,
    Tooltip,
    RangeControl,
    RadioControl,
    ToggleControl
} from '@wordpress/components';

import {
    RichText,
    MediaUpload,
    InspectorControls,
    URLInput
} from '@wordpress/block-editor';

import classNames from 'classnames';

import {fontAwesomeArray, getImage} from '../utility';

const blockIcon = createElement('svg', {width: 20, height: 20},
    createElement('path', {
        d: 'M15,11 L15,13 L7,13 L7,11 L15,11 Z M3.5,8 C4.88071187,8 6,9.11928813 6,10.5 C6,11.8807119 4.88071187,13 3.5,13 C2.11928813,13 1,11.8807119 1,10.5 C1,9.11928813 2.11928813,8 3.5,8 Z M19,8 L19,10 L7,10 L7,8 L19,8 Z'
    })
);

registerBlockType('custom/icon', {
    title: __('Icon', 'sage'),
    icon: blockIcon,
    category: 'custom',
    // multiple: false, // Use this block just once per post
    attributes: {
        iconImage: {
            type: 'object'
        },
        iconSize: {
            type: 'number',
        },
        fontAwesomeClass: {
            type: 'string',
            default: 'check'
        },
        fontAwesomeUnicode: {
            type: 'string',
            default: '\\f00c'
        },
        iconList: {
            type: 'string'
        },
        blockID: {
            type: 'string'
        },
        centerList: {
            type: 'boolean',
            default: false,
        }
    },
    edit: ({className, attributes, setAttributes, clientId}) => {

        // const onChangeIconList = (value) => {
        //     setAttributes({iconList: value});
        // };

        console.log(clientId);

        const onClickFontAwesome = (value) => {
            // console.log('console.', value);
            setAttributes({
                fontAwesomeClass: value.class,
                fontAwesomeUnicode: value.unicode,
                blockID: wp.data.select('core/block-editor').getSelectedBlockClientId() // Save block ID to refer in styles!
            });
        };

        const onClickRemoveFontAwesome = () => {
            setAttributes({
                fontAwesomeClass: '',
                fontAwesomeUnicode: '',
            });
        };

        const onSelectIconImage = (imageObject) => {
            setAttributes({iconImage: imageObject});
        };

        // const onChangeCenterList = (value) => {
        //     setAttributes({centerList: value});
        // };

        const repeaterIcons = fontAwesomeArray.map((item, index) => {
            return (
                <div key={'icon-' + index} className="inspector-controls-container__icon-wrapper" onClick={() => onClickFontAwesome(item)}>
                    <i className={classNames('fas', item.class)} />
                </div>
            )
        });

        return (
            <>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <hr/>
                        <p>Choose your Icon</p>
                        <MediaUpload
                            onSelect={onSelectIconImage}
                            allowedTypes={[
                                'image/svg+xml',
                            ]}
                            // value={attributes.mediaID}
                            render={({open}) => (
                                <Button variant="primary" className={'button'} onClick={open}>
                                    {!attributes.iconImage ? __('Upload Icon', 'sage') : __('Change Icon', 'sage')}
                                </Button>
                            )}
                        />
                        <hr/>
                        <p>Choose your Icon</p>
                        <div className="inspector-controls-container__icons">
                            {repeaterIcons}
                            <div className="remove-button-wrapper" style={{width: '100%'}}>
                                <button className="button button-small" style={{marginTop: '10px'}} onClick={onClickRemoveFontAwesome}>{__('Remove Icon', 'sage')}</button>
                            </div>
                        </div>
                    </div>
                </InspectorControls>
                <i className={classNames(className, 'icon-block')}
                   style={{
                       backgroundImage: `url(${getImage(attributes.iconImage, 'original')})`
                   }}
                />
                <style>{`
                    .image-header-block [data-block="${clientId}"] {
                        position: absolute;
                    }
                `}</style>
            </>
        );
    },
    save: ({className, attributes}) => {
        return (
            <i className={classNames(className, 'icon-block')}
               style={{
                   backgroundImage: `url(${getImage(attributes.iconImage, 'original')})`
               }}
            />
        );
    },
});

