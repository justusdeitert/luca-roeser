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
 * This is needed because by default if the image is smaller some image sizes are not
 */
export const editorColors = [
    {name: 'Dark', slug: 'dark', color: '#0D0D0D'},
    {name: 'Grey', slug: 'grey', color: '#D0D0D0'},
    {name: 'White', slug: 'white', color: '#FFF'},
    {name: 'Light', slug: 'light', color: '#EBEBEB'},
    {name: 'Light Green', slug: 'light-green', color: '#B7EFC1'},
    {name: 'Orange', slug: 'orange', color: '#F4984F'},
    {name: 'Blue', slug: 'blue', color: '#1493A8'},
];

/**
 * Helper function to print out Images in correct sizes
 * @param image
 * @param size
 * @returns {string|*|string}
 */
export const getImage = (image, size = 'full') => {
    if (image) {
        let original = image.url;
        let full = image.sizes && image.sizes.full ? image.sizes.full.url : original;
        let large = image.sizes && image.sizes.large ? image.sizes.large.url : full;
        let medium = image.sizes && image.sizes.medium ? image.sizes.medium.url : large;
        let small = image.sizes && image.sizes.small ? image.sizes.small.url : medium;
        let tiny = image.sizes && image.sizes.tiny ? image.sizes.tiny.url : small;
        let x_small = image.sizes && image.sizes.x_small ? image.sizes.x_small.url : small;
        let placeholder = image.sizes && image.sizes.placeholder ? image.sizes.placeholder.url : tiny;
        let thumbnail = image.sizes && image.sizes.thumbnail ? image.sizes.thumbnail.url : placeholder;

        switch (size) {
            case 'original':
                return original;
            case 'full':
                return full;
            case 'large':
                return large;
            case 'medium':
                return medium;
            case 'small':
                return small;
            case 'tiny':
                return tiny;
            case 'x_small':
                return x_small;
            case 'placeholder':
                return placeholder;
            case 'thumbnail':
                return thumbnail;
            case 'alt':
                return image.alt ? image.alt : '';
            case 'description':
                return image.description ? image.description : ''
            case 'width':
                return image.sizes && image.sizes.small ? image.sizes.small.width : '';
            case 'height':
                return image.sizes && image.sizes.small ? image.sizes.small.height : '';
            default:
                return original;
        }
    } else {
        switch (size) {
            case 'alt':
                return 'Lorem Picsum';
            case 'description':
                return 'Lorem Picsum'
            case 'width':
                return '1200'
            case 'height':
                return '800'
            default:
                return 'https://picsum.photos/1200/800';
        }
    }
};

/**
 * Query Bootstrap Variables
 * @param breakpoint
 * @returns {number}
 */
const getCssVariable = (breakpoint) => {
    return parseInt(getComputedStyle(document.documentElement).getPropertyValue(breakpoint))
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
