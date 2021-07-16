import {__} from '@wordpress/i18n';
import {getColorObjectByColorValue} from '@wordpress/block-editor';
import {select, dispatch} from "@wordpress/data";
import {Button} from '@wordpress/components';
import classNames from 'classnames';

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
 * @returns {string|*|string}
 */
export const getImage = (image, size = 'full', placeholderId = false) => {
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
         * Old Image Definitions
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
                return image.description ? image.description : ''
            case 'width-small':
                return image.sizes && image.sizes.small ? image.sizes.small.width : '';
            case 'height-small':
                return image.sizes && image.sizes.small ? image.sizes.small.height : '';
            case 'width-large':
                return image.sizes && image.sizes.large ? image.sizes.large.width : image.sizes.full.width;
            case 'height-large':
                return image.sizes && image.sizes.large ? image.sizes.large.height : image.sizes.full.height;
            default:
                return x_large;
        }
    } else {
        switch (size) {
            case 'alt':
                return 'Lorem Picsum';
            case 'description':
                return 'Lorem Picsum'
            case 'width':
                return '1800'
            case 'height':
                return '1200'
            default:
                if(placeholderId) {
                    return `https://picsum.photos/id/${placeholderId}/1800/1200`;
                } else {
                    return 'https://picsum.photos/1800/1200';
                }
        }
    }
};

/**
 * Query CSS Variables
 * @param variableString
 * @returns {string}
 */
const getCssVariable = (variableString) => {
    let style = getComputedStyle(document.body)
    return style.getPropertyValue(variableString)
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
 * This is needed because by default if the image is smaller some image sizes are not
 */

// export const editorStandardColors = [
//     {name: 'Font', slug: 'font', color: `rgb(${getCssVariable('--custom-font-color')}`},
//     {name: 'Link', slug: 'link', color: `rgb(${getCssVariable('--custom-link-color')}`},
//     {name: 'Background', slug: 'light', color: `rgb(${getCssVariable('--custom-background-color')}`},
// ];

export const editorLightColors = [
    {name: 'Light 100', slug: 'light-100', color: `rgb(${getCssVariable('--custom-light-100-color')})`},
    {name: 'Light 200', slug: 'light-200', color: `rgb(${getCssVariable('--custom-light-200-color')})`},
    {name: 'Light 300', slug: 'light-300', color: `rgb(${getCssVariable('--custom-light-300-color')})`},
    {name: 'Light 400', slug: 'light-400', color: `rgb(${getCssVariable('--custom-light-400-color')})`},
    {name: 'Light 500', slug: 'light-500', color: `rgb(${getCssVariable('--custom-light-500-color')})`},
    {name: 'Light 600', slug: 'light-600', color: `rgb(${getCssVariable('--custom-light-600-color')})`},
]

export const editorDarkColors = [
    {name: 'Dark 100', slug: 'dark-100', color: `rgb(${getCssVariable('--custom-dark-100-color')})`},
    {name: 'Dark 200', slug: 'dark-200', color: `rgb(${getCssVariable('--custom-dark-200-color')})`},
    {name: 'Dark 300', slug: 'dark-300', color: `rgb(${getCssVariable('--custom-dark-300-color')})`},
    {name: 'Dark 400', slug: 'dark-400', color: `rgb(${getCssVariable('--custom-dark-400-color')})`},
    {name: 'Dark 500', slug: 'dark-500', color: `rgb(${getCssVariable('--custom-dark-500-color')})`},
    {name: 'Dark 600', slug: 'dark-600', color: `rgb(${getCssVariable('--custom-dark-600-color')})`},
]

export const editorDarkLightColors = [
    {name: 'Dark/Light 100', slug: 'dark-light-100', color: `rgb(${getCssVariable('--custom-dark-light-100-color')})`},
    {name: 'Dark/Light 200', slug: 'dark-light-200', color: `rgb(${getCssVariable('--custom-dark-light-200-color')})`},
    {name: 'Dark/Light 300', slug: 'dark-light-300', color: `rgb(${getCssVariable('--custom-dark-light-300-color')})`},
    {name: 'Dark/Light 400', slug: 'dark-light-400', color: `rgb(${getCssVariable('--custom-dark-light-400-color')})`},
    {name: 'Dark/Light 500', slug: 'dark-light-500', color: `rgb(${getCssVariable('--custom-dark-light-500-color')})`},
    {name: 'Dark/Light 600', slug: 'dark-light-600', color: `rgb(${getCssVariable('--custom-dark-light-600-color')})`},
]

export const editorColors = [
    {name: 'Primary', slug: 'primary', color: `rgb(${getCssVariable('--custom-primary-color')})`},
    {name: 'Secondary', slug: 'secondary', color: `rgb(${getCssVariable('--custom-secondary-color')})`},
    {name: 'Tertiary', slug: 'tertiary', color: `rgb(${getCssVariable('--custom-tertiary-color')})`},
    {name: 'Light', slug: 'light', color: `rgb(${getCssVariable('--custom-light-color')})`},
    ...editorLightColors,
    {name: 'Dark', slug: 'dark', color: `rgb(${getCssVariable('--custom-dark-color')})`},
    ...editorDarkColors,
    ...editorDarkLightColors

];

// export const editorGrayColors = [
//     {name: 'Gray 100', slug: 'gray-100', color: `rgb(${getCssVariable('--custom-gray-100-color')})`},
//     {name: 'Gray 200', slug: 'gray-200', color: `rgb(${getCssVariable('--custom-gray-200-color')})`},
//     {name: 'Gray 300', slug: 'gray-300', color: `rgb(${getCssVariable('--custom-gray-300-color')})`},
//     {name: 'Gray 400', slug: 'gray-400', color: `rgb(${getCssVariable('--custom-gray-400-color')})`},
//     {name: 'Gray 500', slug: 'gray-500', color: `rgb(${getCssVariable('--custom-gray-500-color')})`},
//     {name: 'Gray 600', slug: 'gray-600', color: `rgb(${getCssVariable('--custom-gray-600-color')})`},
//     {name: 'Gray 700', slug: 'gray-700', color: `rgb(${getCssVariable('--custom-gray-700-color')})`},
//     {name: 'Gray 800', slug: 'gray-800', color: `rgb(${getCssVariable('--custom-gray-800-color')})`},
//     {name: 'Gray 900', slug: 'gray-900', color: `rgb(${getCssVariable('--custom-gray-900-color')})`},
// ]

export const editorThemeColors = [...editorColors]

// export const fontAwesomeArray = [
//     {class: 'fa-check', unicode: '\\f00c'},
//     {class: 'fa-angle-up', unicode: '\\f106'},
//     {class: 'fa-angle-right', unicode: '\\f105'},
//     {class: 'fa-angle-down', unicode: '\\f107'},
//     {class: 'fa-angle-left', unicode: '\\f104'},
//     {class: 'fa-arrow-up', unicode: '\\f062'},
//     {class: 'fa-arrow-right', unicode: '\\f061'},
//     {class: 'fa-arrow-down', unicode: '\\f063'},
//     {class: 'fa-arrow-left', unicode: '\\f060'},
//     {class: 'fa-arrow-circle-up', unicode: '\\f0aa'},
//     {class: 'fa-arrow-circle-right', unicode: '\\f0a9'},
//     {class: 'fa-arrow-circle-down', unicode: '\\f0ab'},
//     {class: 'fa-arrow-circle-left', unicode: '\\f0a8'},
//     {class: 'fa-user-alt', unicode: '\\f406'},
//     {class: 'fa-user-friends', unicode: '\\f500'},
//     {class: 'fa-user-plus', unicode: '\\f234'},
//     {class: 'fa-user-check', unicode: '\\f4fc'},
//     {class: 'fa-smile', unicode: '\\f118'},
//     {class: 'fa-meh', unicode: '\\f11a'},
//     {class: 'fa-frown', unicode: '\\f119'},
//     {class: 'fa-plus', unicode: '\\f067'},
//     {class: 'fa-minus', unicode: '\\f068'},
//     {class: 'fa-play', unicode: '\\f04b'},
//     {class: 'fa-mobile-alt', unicode: '\\f3cd'},
//     {class: 'fa-phone-alt', unicode: '\\f879'},
//     {class: 'fa-microphone', unicode: '\\f130'},
//     {class: 'fa-envelope', unicode: '\\f0e0'},
//     {class: 'fa-headphones', unicode: '\\f025'},
//     {class: 'fa-reply', unicode: '\\f3e5'},
//     {class: 'fa-paper-plane', unicode: '\\f1d8'},
//     {class: 'fa-at', unicode: '\\f1fa'},
//     {class: 'fa-map-marker-alt', unicode: '\\f3c5'},
//     {class: 'fa-map-marked-alt', unicode: '\\f5a0'},
//     {class: 'fa-directions', unicode: '\\f5eb'},
//     {class: 'fa-globe', unicode: '\\f0ac'},
//     {class: 'fa-calculator', unicode: '\\f1ec'},
//     {class: 'fa-file-signature', unicode: '\\f573'},
//     {class: 'fa-file-invoice-dollar', unicode: '\\f571'},
//     {class: 'fa-shield-alt', unicode: '\\f3ed'}
// ];

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

export const getColorObject = (color) => {
    return getColorObjectByColorValue(editorThemeColors, color)
}

export const ALLOWEDBLOCKS = [
    'core/paragraph',
    'core/heading',
    'core/list',
    'core/shortcode',
    'core/group',
    'custom/button',
    'custom/icon-text',
    'custom/row',
    'custom/divider',
    'custom/image',
    'custom/grid-list',
    'custom/spacer',
]

export const parentAttributes = (clientId) => {
    const parentClientId = select('core/block-editor').getBlockHierarchyRootClientId(clientId);
    const parentAttributes = select('core/block-editor').getBlockAttributes(parentClientId);
    return parentAttributes;
}


export const updateInnerBlocks = (clientId) => {
    var parentBlock = select('core/editor').getBlock(clientId)
    parentBlock.innerBlocks.forEach((innerBlock) => {
        dispatch('core/editor').updateBlock(innerBlock.clientId, innerBlock)
    })
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

                <div className={classNames(`clip-paths__element`, value === element[0] && 'is-active')}
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
                <div className="clip-paths__remove-button-wrapper">
                    <Button className="button button-sm clip-paths__remove-button" onClick={() => {clickFunction('none')}}>
                        {__('Remove Clip Path', 'sage')}
                    </Button>
                </div>
                {ClipPathEntries}
            </div>
        </>
    );
}
