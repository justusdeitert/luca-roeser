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
 *
 * @param obj
 * @returns {boolean}
 */
export const objectIsEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}
