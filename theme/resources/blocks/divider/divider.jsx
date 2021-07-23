import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {ToggleControl} from '@wordpress/components';
import {Component} from '@wordpress/element';
import {RangeControl, ColorPalette} from '@wordpress/components';
import {InspectorControls} from '@wordpress/block-editor';
import classNames from 'classnames';
import {editorThemeColors, MobileSwitch, MobileSwitchInner} from "../utility";
import {dividerIcon} from "../icons";

registerBlockType('custom/divider', {
    title: __('Divider', 'sage'),
    icon: dividerIcon,
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
        width: {
            type: 'number',
            default: 100
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

                if (attributes.spacingMobile * 2 === attributes.spacingDesktop) {
                    setAttributes({spacingMobile: value / 2});
                }
            };

            const onChangeSpacingMobile = (value) => {
                setAttributes({spacingMobile: value});
            };

            const onChangeThickness = (value) => {
                setAttributes({thickness: value});
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
                                allowReset={true}
                                resetFallbackValue={1}
                            />
                            <hr/>
                            <MobileSwitch headline={__('Spacing', 'sage')}>
                                <MobileSwitchInner type={'desktop'}>
                                    <RangeControl
                                        value={attributes.spacingDesktop}
                                        min={0}
                                        max={140}
                                        step={10}
                                        onChange={onChangeSpacingDesktop}
                                    />
                                </MobileSwitchInner>
                                <MobileSwitchInner type={'mobile'}>
                                    <RangeControl
                                        value={attributes.spacingMobile}
                                        min={0}
                                        max={attributes.spacingDesktop}
                                        step={10}
                                        onChange={onChangeSpacingMobile}
                                        allowReset={true}
                                        resetFallbackValue={attributes.spacingDesktop / 2}
                                    />
                                </MobileSwitchInner>
                            </MobileSwitch>
                            <hr/>
                            <p>{__('Change Thickness', 'sage')}</p>
                            <RangeControl
                                value={attributes.thickness}
                                min={1}
                                max={3}
                                step={1}
                                onChange={onChangeThickness}
                                allowReset={true}
                                resetFallbackValue={1}
                            />
                            <hr/>
                            <p>{__('Change Width in %', 'sage')}</p>
                            <RangeControl
                                value={attributes.width}
                                min={10}
                                max={100}
                                step={1}
                                onChange={onChangeWidth}
                                allowReset={true}
                                resetFallbackValue={100}
                            />
                            <hr/>
                            <p>{__('Change Color', 'sage')}</p>
                            <ColorPalette
                                colors={editorThemeColors}
                                value={attributes.color}
                                onChange={onChangeColor}
                                disableCustomColors={true}
                                // clearable={false}
                            />
                        </div>
                    </InspectorControls>
                    <div className={classNames(className, 'divider-block')} style={{
                        padding: `${attributes.spacingDesktop / 16}rem 0`,
                        '--desktop-divider-spacing': `${attributes.spacingDesktop / 16}rem`,
                        '--mobile-divider-spacing': `${attributes.spacingMobile / 16}rem`
                    }}>
                        <hr className='divider-block__hr'
                            style={{
                                height: `${attributes.thickness}px`,
                                maxWidth: `${attributes.width}%`,
                                opacity: attributes.opacity,
                                backgroundColor: attributes.color,
                            }}
                        />
                    </div>
                </>
            );
        }
    },
    save: ({className, attributes}) => {
        return (
            <div className={classNames(className, 'divider-block')} style={{
                '--desktop-divider-spacing': `${attributes.spacingDesktop / 16}rem`,
                '--mobile-divider-spacing': `${attributes.spacingMobile / 16}rem`
            }} >
                <hr className='divider-block__hr'
                    style={{
                        height: `${attributes.thickness}px`,
                        maxWidth: `${attributes.width}%`,
                        opacity: attributes.opacity,
                        backgroundColor: attributes.color,
                    }}
                />
            </div>
        );
    },
});

