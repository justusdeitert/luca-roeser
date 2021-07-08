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
        let tiny = image.sizes && image.sizes.tiny ? image.sizes.tiny.url : placeholder;
        let small = image.sizes && image.sizes.small ? image.sizes.small.url : tiny;
        let medium = image.sizes && image.sizes.medium ? image.sizes.medium.url : small;
        let large = image.sizes && image.sizes.large ? image.sizes.large.url : medium;
        let xlarge = image.sizes && image.sizes.xlarge ? image.sizes.xlarge.url : large;

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
            case 'xlarge':
                return xlarge;
            case 'large':
                return large;
            case 'medium':
                return medium;
            case 'small':
                return small;
            case 'tiny':
                return tiny;
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
                return xlarge;
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
export const editorMainColors = [
    {name: 'Primary', slug: 'primary', color: `rgb(${getCssVariable('--custom-primary-color')}`},
    {name: 'Secondary', slug: 'secondary', color: `rgb(${getCssVariable('--custom-secondary-color')}`},
    {name: 'Tertiary', slug: 'tertiary', color: `rgb(${getCssVariable('--custom-tertiary-color')}`},
    {name: 'Light', slug: 'light', color: `rgb(${getCssVariable('--custom-light-color')}`},
    {name: 'Dark', slug: 'dark', color: `rgb(${getCssVariable('--custom-dark-color')}`},
];

export const editorStandardColors = [
    {name: 'Font', slug: 'font', color: `rgb(${getCssVariable('--custom-font-color')}`},
    {name: 'Link', slug: 'link', color: `rgb(${getCssVariable('--custom-link-color')}`},
    {name: 'Background', slug: 'light', color: `rgb(${getCssVariable('--custom-background-color')}`},
];

export const editorGrayColors = [
    {name: 'Gray 100', slug: 'gray-100', color: `rgb(${getCssVariable('--custom-gray-100-color')})`},
    {name: 'Gray 200', slug: 'gray-200', color: `rgb(${getCssVariable('--custom-gray-200-color')})`},
    {name: 'Gray 300', slug: 'gray-300', color: `rgb(${getCssVariable('--custom-gray-300-color')})`},
    {name: 'Gray 400', slug: 'gray-400', color: `rgb(${getCssVariable('--custom-gray-400-color')})`},
    {name: 'Gray 500', slug: 'gray-500', color: `rgb(${getCssVariable('--custom-gray-500-color')})`},
    {name: 'Gray 600', slug: 'gray-600', color: `rgb(${getCssVariable('--custom-gray-600-color')})`},
    {name: 'Gray 700', slug: 'gray-700', color: `rgb(${getCssVariable('--custom-gray-700-color')})`},
    {name: 'Gray 800', slug: 'gray-800', color: `rgb(${getCssVariable('--custom-gray-800-color')})`},
    {name: 'Gray 900', slug: 'gray-900', color: `rgb(${getCssVariable('--custom-gray-900-color')})`},
]

export const editorThemeColors = [...editorMainColors, ...editorGrayColors]

export const fontAwesomeArray = [
    {class: 'fa-check', unicode: '\\f00c'},
    {class: 'fa-angle-up', unicode: '\\f106'},
    {class: 'fa-angle-right', unicode: '\\f105'},
    {class: 'fa-angle-down', unicode: '\\f107'},
    {class: 'fa-angle-left', unicode: '\\f104'},
    {class: 'fa-arrow-up', unicode: '\\f062'},
    {class: 'fa-arrow-right', unicode: '\\f061'},
    {class: 'fa-arrow-down', unicode: '\\f063'},
    {class: 'fa-arrow-left', unicode: '\\f060'},
    {class: 'fa-arrow-circle-up', unicode: '\\f0aa'},
    {class: 'fa-arrow-circle-right', unicode: '\\f0a9'},
    {class: 'fa-arrow-circle-down', unicode: '\\f0ab'},
    {class: 'fa-arrow-circle-left', unicode: '\\f0a8'},
    {class: 'fa-user-alt', unicode: '\\f406'},
    {class: 'fa-user-friends', unicode: '\\f500'},
    {class: 'fa-user-plus', unicode: '\\f234'},
    {class: 'fa-user-check', unicode: '\\f4fc'},
    {class: 'fa-smile', unicode: '\\f118'},
    {class: 'fa-meh', unicode: '\\f11a'},
    {class: 'fa-frown', unicode: '\\f119'},
    {class: 'fa-plus', unicode: '\\f067'},
    {class: 'fa-minus', unicode: '\\f068'},
    {class: 'fa-play', unicode: '\\f04b'},
    {class: 'fa-mobile-alt', unicode: '\\f3cd'},
    {class: 'fa-phone-alt', unicode: '\\f879'},
    {class: 'fa-microphone', unicode: '\\f130'},
    {class: 'fa-envelope', unicode: '\\f0e0'},
    {class: 'fa-headphones', unicode: '\\f025'},
    {class: 'fa-reply', unicode: '\\f3e5'},
    {class: 'fa-paper-plane', unicode: '\\f1d8'},
    {class: 'fa-at', unicode: '\\f1fa'},
    {class: 'fa-map-marker-alt', unicode: '\\f3c5'},
    {class: 'fa-map-marked-alt', unicode: '\\f5a0'},
    {class: 'fa-directions', unicode: '\\f5eb'},
    {class: 'fa-globe', unicode: '\\f0ac'},
    {class: 'fa-calculator', unicode: '\\f1ec'},
    {class: 'fa-file-signature', unicode: '\\f573'},
    {class: 'fa-file-invoice-dollar', unicode: '\\f571'},
    {class: 'fa-shield-alt', unicode: '\\f3ed'}
];

export const focalPositionInPixel = (value) => {

    if (typeof value === 'string') {
        value = value.replace('.', '');
        value = parseInt(value) / 100
    }

    value = (-0.5 + value) * 1000;
    value = Math.round(value);

    return `${value}px`;
}
