import {__} from '@wordpress/i18n';
import {getColorObjectByColorValue} from '@wordpress/block-editor';
import {select, dispatch, useSelect} from "@wordpress/data";
import {useState, cloneElement} from "@wordpress/element";
import {Button, Dashicon, Icon} from '@wordpress/components';
import classnames from 'classnames';
import {
    // resizeCornerNE as sizeIcon,
    mobile as mobileIcon,
    tablet as tabletIcon,
    desktop as desktopIcon,
} from "@wordpress/icons";
import {
    undo as undoIcon
} from "./custom-icons";

/**
 * @param array
 * @returns {*}
 */
export const cloneArray = (array) => {
    if (Array.isArray(array)) {
        return array.slice(0)
    }
};

/**
 * @param max
 * @returns {number}
 */
export const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};

/**
 * Helper function to print out Images in correct sizes
 * @param image
 * @param size
 * @param placeholderWidth
 * @param placeholderId
 * @returns {string|*|string}
 */
export const getImage = (image, size = 'full', placeholderWidth = 1800, placeholderId = false) => {
    if (image) {
        let original = image.url;
        let thumbnail = image.sizes && image.sizes.thumbnail ? image.sizes.thumbnail.url : original;
        let placeholder = image.sizes && image.sizes.placeholder ? image.sizes.placeholder.url : thumbnail;
        let very_tiny = image.sizes && image.sizes.very_tiny ? image.sizes.very_tiny.url : placeholder;
        let tiny = image.sizes && image.sizes.tiny ? image.sizes.tiny.url : very_tiny;
        let small = image.sizes && image.sizes.small ? image.sizes.small.url : tiny;
        let medium = image.sizes && image.sizes.medium ? image.sizes.medium.url : small;
        let large = image.sizes && image.sizes.large ? image.sizes.large.url : medium;
        let x_large = image.sizes && image.sizes.x_large ? image.sizes.x_large.url : large;

        /**
         * Old Image Definitions / Don't delete these..
         */
        // let original = image.url;
        // let full = image.sizes && image.sizes.full ? image.sizes.full.url : original;
        // let large = image.sizes && image.sizes.large ? image.sizes.large.url : full;
        // let medium = image.sizes && image.sizes.medium ? image.sizes.medium.url : large;
        // let small = image.sizes && image.sizes.small ? image.sizes.small.url : medium;
        // let tiny = image.sizes && image.sizes.tiny ? image.sizes.tiny.url : small;
        // let placeholder = image.sizes && image.sizes.placeholder ? image.sizes.placeholder.url : tiny;
        // let thumbnail = image.sizes && image.sizes.thumbnail ? image.sizes.thumbnail.url : placeholder;

        switch (size) {
            case 'original':
                return original;
            case 'x_large':
                return x_large;
            case 'large':
                return large;
            case 'medium':
                return medium;
            case 'small':
                return small;
            case 'tiny':
                return tiny;
            case 'very_tiny':
                return very_tiny;
            case 'placeholder':
                return placeholder;
            case 'thumbnail':
                return thumbnail;
            case 'alt':
                return image.alt ? image.alt : '';
            case 'description':
                return image.description ? image.description : '';
            case 'width':
                return image.width ? image.width : '';
            case 'height':
                return image.height ? image.height : '';
            default:
                return x_large;
        }
    } else {
        let placeholderHeight = Math.round(placeholderWidth / 3 * 2);

        switch (size) {
            case 'alt':
                return 'Lorem Picsum';
            case 'description':
                return 'Lorem Picsum';
            case 'width':
                return `${placeholderWidth}`;
            case 'height':
                return `${placeholderWidth / 3 * 2}`;
            default:
                if(placeholderId) {
                    return `https://picsum.photos/id/${placeholderId}/${placeholderWidth}/${placeholderHeight}`;
                } else {
                    return `https://picsum.photos/${placeholderWidth}/${placeholderHeight}`;
                }
        }
    }
};

/**
 * Query CSS Variables
 * @param variableString
 * @returns {string}
 */
export const getCssVariable = (variableString) => {
    let style = getComputedStyle(document.body);
    let value = style.getPropertyValue(variableString);
    return  value.replaceAll(' ', '');
}

/**
 * Define Breakpoints
 */
export const bootstrapBreakpoints = {
    xs: getCssVariable('--breakpoint-xs'),
    sm: getCssVariable('--breakpoint-sm'),
    md: getCssVariable('--breakpoint-md'),
    lg: getCssVariable('--breakpoint-lg'),
    xl: getCssVariable('--breakpoint-xl'),
    xxl: getCssVariable('--breakpoint-xxl'),
}

/**
 * Helper Function to get array object by name key
 * @param array
 * @param slug
 * @returns {*}
 */
export const getColorObjectFromSlug = (slug,  object = editorThemeColors) => {
    return object.find(object => object.slug === slug);
}

/**
 * @param color
 * @returns {*}
 */
export const getColorObject = (color) => {
    return getColorObjectByColorValue(editorThemeColors, color);
}

/**
 * Editor Colors
 */
export const editorStandardColors = [
    {name: 'Primary', slug: 'primary', color: `rgb(${getCssVariable('--custom-primary-color')})`},
    {name: 'Secondary', slug: 'secondary', color: `rgb(${getCssVariable('--custom-secondary-color')})`},
    {name: 'Tertiary', slug: 'tertiary', color: `rgb(${getCssVariable('--custom-tertiary-color')})`},
    {name: 'Light', slug: 'light', color: `rgb(${getCssVariable('--custom-light-color')})`},
    {name: 'Dark', slug: 'dark', color: `rgb(${getCssVariable('--custom-dark-color')})`},
    {name: 'Success', slug: 'success', color: `rgb(${getCssVariable('--custom-success-color')})`},
    {name: 'Danger', slug: 'danger', color: `rgb(${getCssVariable('--custom-danger-color')})`},
    {name: 'Warning', slug: 'warning', color: `rgb(${getCssVariable('--custom-warning-color')})`},
    {name: 'Info', slug: 'info', color: `rgb(${getCssVariable('--custom-info-color')})`},
]

export const editorLightColors = [
    {name: 'Light 100', slug: 'light-100', color: `rgb(${getCssVariable('--custom-light-100-color')})`},
    {name: 'Light 200', slug: 'light-200', color: `rgb(${getCssVariable('--custom-light-200-color')})`},
    {name: 'Light 300', slug: 'light-300', color: `rgb(${getCssVariable('--custom-light-300-color')})`},
    // {name: 'Light 400', slug: 'light-400', color: `rgb(${getCssVariable('--custom-light-400-color')})`},
    // {name: 'Light 500', slug: 'light-500', color: `rgb(${getCssVariable('--custom-light-500-color')})`},
    // {name: 'Light 600', slug: 'light-600', color: `rgb(${getCssVariable('--custom-light-600-color')})`},
]

export const editorDarkColors = [
    {name: 'Dark 100', slug: 'dark-100', color: `rgb(${getCssVariable('--custom-dark-100-color')})`},
    {name: 'Dark 200', slug: 'dark-200', color: `rgb(${getCssVariable('--custom-dark-200-color')})`},
    {name: 'Dark 300', slug: 'dark-300', color: `rgb(${getCssVariable('--custom-dark-300-color')})`},
    // {name: 'Dark 400', slug: 'dark-400', color: `rgb(${getCssVariable('--custom-dark-400-color')})`},
    // {name: 'Dark 500', slug: 'dark-500', color: `rgb(${getCssVariable('--custom-dark-500-color')})`},
    // {name: 'Dark 600', slug: 'dark-600', color: `rgb(${getCssVariable('--custom-dark-600-color')})`},
]

export const editorDarkLightColors = [
    {name: 'Dark/Light 100', slug: 'dark-light-100', color: `rgb(${getCssVariable('--custom-dark-light-100-color')})`},
    {name: 'Dark/Light 200', slug: 'dark-light-200', color: `rgb(${getCssVariable('--custom-dark-light-200-color')})`},
    {name: 'Dark/Light 300', slug: 'dark-light-300', color: `rgb(${getCssVariable('--custom-dark-light-300-color')})`},
    {name: 'Dark/Light 400', slug: 'dark-light-400', color: `rgb(${getCssVariable('--custom-dark-light-400-color')})`},
    // {name: 'Dark/Light 400', slug: 'dark-light-400', color: `rgb(${getCssVariable('--custom-dark-light-400-color')})`},
    // {name: 'Dark/Light 500', slug: 'dark-light-500', color: `rgb(${getCssVariable('--custom-dark-light-500-color')})`},
    // {name: 'Dark/Light 600', slug: 'dark-light-600', color: `rgb(${getCssVariable('--custom-dark-light-600-color')})`},
]

export const editorThemeColors = [
    getColorObjectFromSlug('primary', editorStandardColors),
    getColorObjectFromSlug('secondary', editorStandardColors),
    getColorObjectFromSlug('tertiary',  editorStandardColors),
    getColorObjectFromSlug('success', editorStandardColors),
    getColorObjectFromSlug('danger', editorStandardColors),
    getColorObjectFromSlug('warning',  editorStandardColors),
    getColorObjectFromSlug('info', editorStandardColors),
    getColorObjectFromSlug('light', editorStandardColors),
    ...editorLightColors,
    getColorObjectFromSlug('dark', editorStandardColors),
    ...editorDarkColors,
    ...editorDarkLightColors,
];

export const focalPositionInPixel = (value, unit = 'px') => {

    if (typeof value === 'string') {
        value = value.replace('.', '');
        value = parseInt(value) / 100
    }

    let increment = 1000;

    if (unit === '%') {
        increment = 300;
    }

    value = (-0.5 + value) * increment;
    value = Math.round(value);

    return `${value + unit}`;
}

export const ALLOWED_BLOCKS = [

    /**
     * Core blocks
     */
    'core/paragraph',
    'core/heading',
    'core/list',
    'core/shortcode',
    'core/columns',
    'core/group',

    /**
     * Needs some work
     */
    'core/video',

    /**
     * Custom blocks
     */
    'custom/map',
    'custom/button',
    'custom/icon-text',
    'custom/row',
    'custom/divider',
    'custom/image',
    'custom/spacer',
    'custom/accordion',
    'custom/fluid-text',
    'custom/slider',
    'custom/wrapper',
    'custom/grid',

    // Deprecated blocks
    'custom/text-image',
    'custom/grid-list',
]

export const parentAttributes = (clientId) => {

    const parentAttributes = useSelect((select) => {
        const parentClientIds = select('core/block-editor').getBlockParents(clientId, true);
        const parentAttributes = select('core/block-editor').getBlockAttributes(parentClientIds[0]);
        return parentAttributes;
    });

    if (parentAttributes) {
        return parentAttributes;
    } else {
        return false;
    }
}

export const updateInnerBlocks = (clientId) => {

    let parentBlock = select('core/block-editor').getBlock(clientId);
    parentBlock.innerBlocks.forEach((innerBlock) => {
        dispatch('core/block-editor').updateBlock(innerBlock.clientId, innerBlock)
    });
}

/**
 * Select Clip Paths for Gutenberg InspectorControls
 * @param clipPathsModules
 * @param clickFunction
 * @param value
 * @returns {JSX.Element}
 * @constructor
 */
export const SelectClipPath = ({clipPathsModules, clickFunction, value = 'none'}) => {

    let clipPathArray = Object.entries(clipPathsModules);

    let ClipPathEntries = clipPathArray.map((element, index) => {
        return (
            <div key={index} className={'clip-paths__wrapper'}>

                {element[1](`clip-path-${index}`)}

                <div className={classnames(`clip-paths__element`, value === element[0] && 'is-active')}
                     style={{
                         cursor: 'pointer',
                         clipPath: `url(#clip-path-${index})`,
                     }}
                     onClick={() => clickFunction(element[0])}
                />
            </div>
        )
    });

    return (
        <>
            <div className={'clip-paths'}>
                {ClipPathEntries}
                <div className="clip-paths__remove-button-wrapper">
                    <Button className="is-secondary is-small clip-paths__remove-button" onClick={() => {clickFunction('none')}}>
                        {__('Clear', 'sage')}
                    </Button>
                </div>
            </div>
        </>
    );
}

export const removeArrayItems = (array, itemsToRemove) => {
    return array.filter(element => {
        return !itemsToRemove.includes(element);
    });
}

export const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.';

export const removeBlock = (clientId) => {
    dispatch('core/block-editor').removeBlock(clientId);
}

/**
 * Settings headline layout with custom icon
 * @param headline
 * @param icon
 * @returns {JSX.Element}
 * @constructor
 */
export const SettingsHeading = ({headline, icon}) => {
    return (
        <div style={{display: 'flex', marginBottom: '10px', alignItems: 'center'}}>
            <Icon icon={icon} size={24} style={{marginRight: '5px'}}/>
            <p style={{margin: 0}}>{__(headline, 'sage')}</p>
        </div>
    )
}

export const ResetWrapperControl = ({children, onClick}) => {
    return (
        <div style={{width: '100%', paddingRight: '45px', position: 'relative'}}>
            {children}
            <Button
                icon={undoIcon}
                label={__('Reset', 'sage')}
                style={{height: '30px', position: 'absolute', right: 0, top: 0}}
                onClick={onClick}
            />
        </div>
    )
}

/**
 * Local storage for mobile switch
 */
if (!localStorage.getItem('activeSwitch')) {
    localStorage.setItem('activeSwitch', 'desktop');
}

/**
 * Implements Mobile Switch & Children
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const MobileSwitch = (props) => {

    let {showItem} = props;
    let [activeTab, setActiveTab] = useState(showItem ? showItem : localStorage.getItem('activeSwitch'));
    let [switchAvailable, setSwitchAvailable] = useState(false);
    let availableSwitchOptions = [];

    /**
     * Check for switchState & add available switch options
     */
    props.children.forEach(element => {
        if (!switchAvailable) {
            if (activeTab === element.props.type) {
                setSwitchAvailable(true);
            }
        }
        availableSwitchOptions.push(element.props.type)
    });

    let Buttons = props.children.map((element, index) => {

        // if switch is not available
        !switchAvailable && (activeTab = availableSwitchOptions[0]);

        let buttonProps = {
            key: index,
            isSmall: true,
            style: {
                marginLeft: '5px'
            },
            onClick: () => {
                setActiveTab(element.props.type)
                localStorage.setItem('activeSwitch', element.props.type);

                /**
                 * TODO: Finish adding active classes to current screen size for buttons
                 * Set mobile switch for all element on page / DOES ONLY WORK FOR CONTENT YET
                 * @type {NodeListOf<Element>}
                 */
                // let mobileSwitchInner = document.querySelectorAll('.mobile-switch__inner');
                // mobileSwitchInner.forEach(mobileSwitch => {
                //     if(mobileSwitch.dataset.switchType === element.props.type) {
                //         mobileSwitch.classList.add('is-active');
                //     } else {
                //         mobileSwitch.classList.remove('is-active');
                //     }
                // });
            },
            isPressed: activeTab === element.props.type
        }

        switch (element.props.type) {
            case 'desktop':
                return <Button {...buttonProps} className={'mobile-switch__button'} icon={desktopIcon} />
            case 'tablet':
                return <Button {...buttonProps} className={'mobile-switch__button'} icon={tabletIcon} />
            case 'mobile':
                return <Button {...buttonProps} className={'mobile-switch__button'} icon={mobileIcon} />
            default:
                return false
        }

    });

    let Children = props.children.map((element, index) => {

        // if switch is not available
        !switchAvailable && (activeTab = availableSwitchOptions[0]);

        if (element.type.name === 'MobileSwitchInner') {
            return cloneElement(element, {
                key: index,
                isActive: (activeTab === element.props.type)
            });
        }
    });

    return (
        <div className={'mobile-switch'}>
            <div className="mobile-switch__headline-wrapper" style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                {props.icon && <>
                    <Icon icon={props.icon} size={24} style={{marginRight: '5px'}}/>
                </>}
                {props.headline && <>
                    <p style={{margin: 0}} className={'mobile-switch__headline'}>{props.headline}</p>
                </>}
                <div className="mobile-switch__buttons-wrapper" style={{marginLeft: 'auto', display: 'flex'}}>
                    {Buttons}
                </div>
            </div>
            {Children}
        </div>
    )
}

export const MobileSwitchInner = (props) => {

    return (
        <div className={classnames('mobile-switch__inner', props.isActive && 'is-active')} data-switch-type={props.type}>
            {props.children}
        </div>
    )
}

/**
 * Select Clip Paths for Gutenberg InspectorControls
 * @param clipPathsModules
 * @param clickFunction
 * @param value
 * @returns {JSX.Element}
 * @constructor
 */
export const SelectSectionShapes = ({sectionShapes, clickFunction, value = 'none'}) => {

    let sectionShapesArray = Object.entries(sectionShapes);

    let ClipPathEntries = sectionShapesArray.map((element, index) => {
        return (
            <div key={index} className={classnames('section-shapes__wrapper', value === element[0] && 'is-active')}>
                {element[1]('top', 'normal', '#FFF')}
                <div
                    key={index}
                    style={{cursor: 'pointer'}}
                    className={classnames('section-shapes__element')}
                    onClick={() => clickFunction(element[0])}
                />
                {element[1]('bottom', 'normal', '#FFF')}
            </div>
        )
    });

    return (
        <>
            <div className={'section-shapes'}>
                {ClipPathEntries}
                <div className="section-shapes__remove-button-wrapper">
                    <Button className="is-secondary is-small section-shapes__remove-button" onClick={() => {clickFunction('none')}}>
                        {__('Clear', 'sage')}
                    </Button>
                </div>
            </div>
        </>
    );
}

export const isDefined = (value) => {
    return value !== false && value !== undefined;
}

/**
 * This returns the color class in case color is found
 * @param color
 * @returns {string}
 */
export const returnBackgroundColorClass = (color) => {
    if (getColorObject(color)) {
        return `has-${getColorObject(color).slug}-background-color has-background`;
    }
}

/**
 * Returns background style
 * @param color
 * @param defaultColor
 * @returns {{backgroundColor: boolean}|{backgroundColor}}
 */
export const returnBackgroundColorStyle = (color, defaultColor = false) => {
    if (color === undefined && defaultColor) {
        return {backgroundColor: defaultColor}
    }

    if (getColorObject(color) === undefined) {
        return {backgroundColor: color}
    }
}
