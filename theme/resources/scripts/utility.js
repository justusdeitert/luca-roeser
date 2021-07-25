/**
 * Query CSS Variables
 * @param variableString
 * @returns {string}
 */
export const getCssVariable = (variableString) => {
    let style = getComputedStyle(document.body)
    let styleString = style.getPropertyValue(variableString);

    // Removing spaces from string
    return styleString.replace(' ', '');
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
 *
 * @param obj
 * @returns {boolean}
 */
export const objectIsEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

export const isGutenbergEditor = () => {
    return document.querySelector('body').classList.contains('wp-admin')
        && !!document.querySelector('.block-editor');
};
