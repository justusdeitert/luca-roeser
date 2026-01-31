/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
    ToggleControl,
    Button,
    RangeControl,
    FocalPointPicker,
    PanelBody,
    SelectControl,
    ToolbarGroup,
    ToolbarDropdownMenu,
    __experimentalRadio as Radio,
    __experimentalRadioGroup as RadioGroup,
    __experimentalAlignmentMatrixControl as AlignmentMatrixControl,
    Icon
} from '@wordpress/components';
import {
    MediaUpload,
    ColorPalette,
    InspectorControls,
    BlockControls,
    useBlockProps,
} from '@wordpress/block-editor';
import { useEffect } from "@wordpress/element";
import {
    video as videoIcon,
    image as imageIcon,
    aspectRatio as aspectRatioIcon,
    resizeCornerNE as sizeIcon,
    moveTo as moveIcon,
    styles as positionIcon,
    upload as uploadIcon,
    settings as settingsIcon,
    color as colorIcon,
    cover as coverIcon, trash as trashIcon
} from '@wordpress/icons';

/**
 * Internal dependencies
 */
import {
    getImage,
    focalPositionInPixel,
    MobileSwitch,
    MobileSwitchInner,
    SettingsHeading,
    ResetWrapperControl,
    editorThemeColors,
    returnBackgroundColorStyle,
    returnBackgroundColorClass, getRandomInt
} from '../utility';

/**
 * Block attributes
 */
const attributes = {
    horizontalAlign: {
        type: 'string',
        default: 'left'
    },

    /**
     * Files
     */
    posterImage: {
        type: 'object',
        default: ''
    },
    mp4Video: {
        type: 'object',
        default: ''
    },
    webmVideo: {
        type: 'object',
        default: ''
    },

    /**
     * Sizing
     */
    videoRatio: {
        type: 'string',
        default: false,
    },
    videoSizeUnit: {
        type: 'string',
        default: '%'
    },
    videoSizePixelDesktop: {
        type: 'number',
        default: 300
    },
    videoSizePixelMobile: {
        type: 'number',
        default: 300
    },
    videoSizePercent: {
        type: 'number',
        default: 100
    },
    backgroundColor: {
        type: 'string',
        default: ''
    },
    objectFit: {
        type: 'string',
        default: 'contain'
    },
    autoPlayInView: {
        type: 'boolean',
        default: false
    },

    /**
     * More settings
     */
    autoPlay: {
        type: 'boolean',
        default: false
    },
    loop: {
        type: 'boolean',
        default: false
    },
    mute: {
        type: 'boolean',
        default: true
    },
    browserControls: {
        type: 'boolean',
        default: true
    },
    playsInline: {
        type: 'boolean',
        default: false
    },


};

/**
 * Used to rerender video component when special attributes change
 * @type {number}
 */
let videoId = getRandomInt(1000);

registerBlockType('custom/video', {
    apiVersion: 2,
    title: __('Video', 'sage'),
    icon: videoIcon,
    description: __('Embed a video from your media library or upload a new one.', 'sage'),
    category: 'custom',
    supports: {
        anchor: true,
    },
    attributes,
    edit: ({className, attributes, setAttributes}) => {

        /**
         * Rerender video component when special attributes change
         */
        useEffect(() => {
            videoId = getRandomInt(1000);
        }, [
            attributes.posterImage,
            attributes.mp4Video,
            attributes.webmVideo,
            attributes.autoPlay
        ]) // only fire when attributes change

        const isPixel = attributes.videoSizeUnit === 'px';
        const isFluid = attributes.videoSizePixelDesktop !== attributes.videoSizePixelMobile

        const blockProps = useBlockProps({
            className: classnames(className, 'video-block'),
            style: {
                border: '1px dashed var(--wp-admin-theme-color)',
            }
        });

        const innerBlockProps = {
            className: classnames(
                'video-block__inner',
                (isPixel && isFluid) && 'fluid-width',
                `align-${attributes.horizontalAlign}`,
                attributes.videoRatio && `ratio ratio-${attributes.videoRatio}`,
            ),
            style: {
                ...(isPixel) ? {
                    ...(isFluid) ? {
                        '--width-desktop': `${attributes.videoSizePixelDesktop}px`,
                        '--width-mobile': `${attributes.videoSizePixelMobile}px`,
                        '--width-difference': `${attributes.videoSizePixelDesktop - attributes.videoSizePixelMobile}`,
                    } : {
                        '--width': `${attributes.videoSizePixelDesktop}px`,
                    }
                } : {
                    '--width': `${attributes.videoSizePercent}%`,
                }
            }
        }

        // console.log(attributes.mp4Video);
        // console.log(attributes.backgroundColor);
        // console.log(typeof attributes.backgroundColor);
        // console.log(!attributes.backgroundColor);

        return (
            <>
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarDropdownMenu
                            icon={`align-${attributes.horizontalAlign}`}
                            label={__('Select a position', 'sage')}
                            controls={[
                                {
                                    title: 'Left',
                                    icon: 'align-left',
                                    onClick: () => setAttributes({horizontalAlign: 'left'}),
                                },
                                {
                                    title: 'Center',
                                    icon: 'align-center',
                                    onClick: () => setAttributes({horizontalAlign: 'center'}),
                                },
                                {
                                    title: 'Right',
                                    icon: 'align-right',
                                    onClick: () => setAttributes({horizontalAlign: 'right'}),
                                },
                            ]}
                        />
                    </ToolbarGroup>
                </BlockControls>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <hr style={{marginTop: 0}}/>
                        <SettingsHeading headline={'Upload'} icon={uploadIcon}/>
                        <MediaUpload
                            onSelect={(value) => setAttributes({posterImage: value})}
                            allowedTypes={['image/jpeg', 'image/jpg', 'image/png']}
                            render={({open}) => (
                                <Button
                                    className={attributes.posterImage ? 'is-primary' : 'is-secondary'}
                                    style={{marginBottom: '5px', marginRight: '5px'}}
                                    onClick={open}
                                    icon={imageIcon}
                                    text={__('Poster', 'sage')}
                                />
                            )}
                        />
                        {attributes.posterImage && <>
                            <Button
                                className={'button'}
                                onClick={() => setAttributes({posterImage: false})}
                                icon={trashIcon}
                                style={{marginLeft: '10px'}}
                            />
                        </>}
                        <MediaUpload
                            onSelect={(value) => setAttributes({mp4Video: value})}
                            allowedTypes={['video/mp4']}
                            render={({open}) => (
                                <Button
                                    className={attributes.mp4Video ? 'is-primary' : 'is-secondary'}
                                    style={{marginBottom: '5px', marginRight: '5px'}}
                                    onClick={open}
                                    icon={videoIcon}
                                    text={__('MP4', 'sage')}
                                />
                            )}
                        />
                        <MediaUpload
                            onSelect={(value) => setAttributes({webmVideo: value})}
                            allowedTypes={['video/webm']}
                            render={({open}) => (
                                <Button
                                    className={attributes.webmVideo ? 'is-primary' : 'is-secondary'}
                                    style={{marginBottom: '5px', marginRight: '5px'}}
                                    onClick={open}
                                    icon={videoIcon}
                                    text={__('WebM', 'sage')}
                                />
                            )}
                        />
                        <hr/>
                        <SettingsHeading headline={'Ratio'} icon={aspectRatioIcon}/>
                        <RadioGroup {...{
                            onChange: (value) => setAttributes({videoRatio: value}),
                            checked: attributes.videoRatio,
                            defaultChecked: false
                        }}>
                            <Radio value={false}>{__('Initial', 'sage')}</Radio>
                            <Radio value="1x1">{__('1x1', 'sage')}</Radio>
                            <Radio value="4x3">{__('4x3', 'sage')}</Radio>
                            <Radio value="3x2">{__('3x2', 'sage')}</Radio>
                            <Radio value="16x9">{__('16x9', 'sage')}</Radio>
                            <Radio value="21x9">{__('21x9', 'sage')}</Radio>
                        </RadioGroup>
                        <hr/>
                        {attributes.videoSizeUnit === 'px' ? <>
                            <MobileSwitch headline={__('Size', 'sage')} icon={sizeIcon}>
                                <MobileSwitchInner type={'desktop'}>
                                    <ResetWrapperControl onClick={() => {
                                        setAttributes({videoSizePixelDesktop: 300})
                                        setAttributes({videoSizePixelMobile: 300})
                                    }}>
                                        <RangeControl
                                            value={attributes.videoSizePixelDesktop}
                                            min={20}
                                            max={1000}
                                            step={1}
                                            onChange={(value) => {
                                                if (attributes.videoSizePixelMobile === attributes.videoSizePixelDesktop) {
                                                    setAttributes({videoSizePixelMobile: value})
                                                }

                                                setAttributes({videoSizePixelDesktop: value})
                                            }}
                                        />
                                    </ResetWrapperControl>
                                </MobileSwitchInner>
                                <MobileSwitchInner type={'mobile'}>
                                    <ResetWrapperControl onClick={() => {
                                        setAttributes({videoSizePixelDesktop: 300})
                                        setAttributes({videoSizePixelMobile: 300})
                                    }}>
                                        <RangeControl
                                            value={attributes.videoSizePixelMobile}
                                            min={5}
                                            max={attributes.videoSizePixelDesktop}
                                            step={1}
                                            onChange={(value) => {
                                                setAttributes({videoSizePixelMobile: value})
                                            }}
                                        />
                                    </ResetWrapperControl>
                                </MobileSwitchInner>
                            </MobileSwitch>
                        </> : <>
                            <SettingsHeading headline={'Size'} icon={sizeIcon}/>
                            <ResetWrapperControl onClick={() => setAttributes({videoSizePercent: 100})}>
                                <RangeControl
                                    value={attributes.videoSizePercent}
                                    min={5}
                                    max={100}
                                    step={1}
                                    onChange={(value) => setAttributes({videoSizePercent: value})}
                                />
                            </ResetWrapperControl>
                        </>}
                        <RadioGroup {...{
                            onChange: (value) => setAttributes({videoSizeUnit: value}),
                            checked: attributes.videoSizeUnit,
                            defaultChecked: 'px'
                        }}>
                            <Radio value="px">{__('px', 'sage')}</Radio>
                            <Radio value="%">{__('%', 'sage')}</Radio>
                        </RadioGroup>
                        <hr/>
                        <SettingsHeading headline={'Background color'} icon={colorIcon}/>
                        <ColorPalette
                            colors={editorThemeColors}
                            value={attributes.backgroundColor}
                            onChange={(value) => setAttributes({backgroundColor: value})}
                            // disableCustomColors={true}
                        />
                        <hr/>
                        <SettingsHeading headline={'Fitting'} icon={coverIcon}/>
                        <RadioGroup {...{
                            onChange: (value) => setAttributes({objectFit: value}),
                            checked: attributes.objectFit,
                            defaultChecked: 'contain'
                        }}>
                            <Radio value="contain">{__('Contain', 'sage')}</Radio>
                            <Radio value="cover">{__('Cover', 'sage')}</Radio>
                        </RadioGroup>
                        <hr/>
                        <ToggleControl
                            label={__('Autoplay on page load', 'sage')}
                            checked={attributes.autoPlay}
                            help={__('For autoplay to work properly the video must be muted.', 'sage')}
                            onChange={(value) => {
                                setAttributes({autoPlay: value})
                                if (value === true) setAttributes({mute: true});
                            }}
                        />
                        <hr/>
                        <ToggleControl
                            label={__('Autoplay when in viewport', 'sage')}
                            help={__('Autoplay video when it comes in viewport.', 'sage')}
                            checked={attributes.autoPlayInView}
                            onChange={(value) => {
                                setAttributes({autoPlayInView: value});
                                if (value === true) setAttributes({mute: true});
                            }}
                        />
                        <hr/>
                        <ToggleControl
                            label={__('Loop', 'sage')}
                            help={__('Plays the video again when finished.', 'sage')}
                            checked={attributes.loop}
                            onChange={(value) => setAttributes({loop: value})}
                        />
                        <hr/>
                        <ToggleControl
                            label={__('Mute', 'sage')}
                            help={__('Mute should be enabled when autoplay mode is on.', 'sage')}
                            checked={attributes.mute}
                            onChange={(value) => setAttributes({mute: value})}
                        />
                        <hr/>
                        <ToggleControl
                            label={__('Browser Controls', 'sage')}
                            help={__('Shows the default browser video controls.', 'sage')}
                            checked={attributes.browserControls}
                            onChange={(value) => setAttributes({browserControls: value})}
                        />
                        <hr/>
                        <ToggleControl
                            label={__('Play inline', 'sage')}
                            help={__('Mobile browsers, will not open  this video in fullscreen by default.', 'sage')}
                            // help={__('Mobile browsers, will play the video right where it is instead of the default, which is to open it up fullscreen while it plays.', 'sage')}
                            checked={attributes.playsInline}
                            onChange={(value) => setAttributes({playsInline: value})}
                        />
                    </div>
                    {/*<PanelBody title={__('More Settings', 'sage')} initialOpen={false} icon={settingsIcon}></PanelBody>*/}
                </InspectorControls>
                <div {...blockProps}>
                    <div {...innerBlockProps}>
                        {(attributes.mp4Video || attributes.webmVideo) && <>
                            <video {...{
                                key: videoId, // used to update video component completely
                                className: classnames(
                                    'video-block__video',
                                    attributes.autoPlayInView && 'play-in-view',
                                    returnBackgroundColorClass(attributes.backgroundColor),
                                ),
                                playsInline: attributes.playsInline,
                                controls: attributes.browserControls,
                                muted: attributes.mute,
                                autoPlay: attributes.autoPlay,
                                loop: attributes.loop,
                                ...attributes.posterImage && {
                                    poster: getImage(attributes.posterImage, 'full')
                                },
                                style: {
                                    ...returnBackgroundColorStyle(attributes.backgroundColor, 'rgb(var(--custom-dark-color))'),
                                    objectFit: attributes.objectFit
                                }
                            }}>
                                {attributes.mp4Video && <>
                                    <source src={attributes.mp4Video.url} type="video/mp4"/>
                                </>}
                                {attributes.webmVideo && <>
                                    <source src={attributes.webmVideo.url} type="video/webm"/>
                                </>}
                                <p>Your browser does not support the video tag.</p>
                            </video>
                        </>}
                    </div>
                </div>
            </>
        );
    },
    save: ({attributes}) => {

        const isPixel = attributes.videoSizeUnit === 'px';
        const isFluid = attributes.videoSizePixelDesktop !== attributes.videoSizePixelMobile;

        const blockProps = useBlockProps.save({
            className: classnames('video-block'),
            style: {
                ...(isPixel) ? {
                    ...(isFluid) ? {
                        '--width-desktop': `${attributes.videoSizePixelDesktop}px`,
                        '--width-mobile': `${attributes.videoSizePixelMobile}px`,
                        '--width-difference': `${attributes.videoSizePixelDesktop - attributes.videoSizePixelMobile}`,
                    } : {
                        '--width': `${attributes.videoSizePixelDesktop}px`,
                    }
                } : {
                    '--width': `${attributes.videoSizePercent}%`,
                }
            }
        });

        return (
            <>
                <div {...blockProps}>
                    <div className={classnames(
                        'video-block__inner',
                        (isPixel && isFluid) && 'fluid-width',
                        `align-${attributes.horizontalAlign}`,
                        attributes.videoRatio && `ratio ratio-${attributes.videoRatio}`,
                    )}>
                        <video {...{
                            className: classnames(
                                'video-block__video',
                                attributes.autoPlayInView && 'play-in-view',
                                returnBackgroundColorClass(attributes.backgroundColor),
                            ),
                            playsInline: attributes.playsInline,
                            controls: attributes.browserControls,
                            muted: attributes.mute,
                            autoPlay: attributes.autoPlay,
                            loop: attributes.loop,
                            ...attributes.posterImage && {
                                poster: getImage(attributes.posterImage, 'full')
                            },
                            style: {
                                ...returnBackgroundColorStyle(attributes.backgroundColor, 'rgb(var(--custom-dark-color))'),
                                objectFit: attributes.objectFit
                            }
                        }}>
                            {attributes.mp4Video && <>
                                <source src={attributes.mp4Video.url} type="video/mp4"/>
                            </>}
                            {attributes.webmVideo && <>
                                <source src={attributes.webmVideo.url} type="video/webm"/>
                            </>}
                            <p>Your browser does not support the video tag.</p>
                        </video>
                    </div>
                </div>
            </>
        );
    },
});

