export const attributes = {

    /**
     * Default Attributes
     * @link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/#align
     */
    align: {
        type: 'string',
        default: 'full'
    },
    clientId: {
        type: 'string',
        default: ''
    },

    /**
     * Section Properties
     */
    fullHeight: {
        type: 'boolean',
        default: false,
    },
    minHeightDesktop: {
        type: 'number',
        default: false,
    },
    minHeightMobile: {
        type: 'number',
        default: false,
    },
    sectionBackgroundColor: {
        type: 'string',
        default: ''
    },
    sectionBorderRadius: {
        type: 'number',
        default: false,
    },
    fullWidth: {
        type: 'boolean',
        default: false,
    },
    innerWidth: {
        type: 'number',
        default: false,
    },
    verticalPadding: {
        type: 'number',
        default: false,
    },
    verticalAlign: {
        type: 'string',
        default: 'center'
    },
    // horizontalPadding: {
    //     type: 'number',
    //     default: false,
    // },

    /**
     * Shape Settings
     */
    sectionShape: {
        type: 'string',
        default: 'none',
    },
    sectionShapeHeight: {
        type: 'number',
        default: 60,
    },
    sectionShapeTopClass: {
        type: 'string',
        default: 'none',
    },
    sectionShapeBottomClass: {
        type: 'string',
        default: 'normal',
    },
    sectionTopShapeBgColor: {
        type: 'string',
        default: '',
    },
    sectionBottomShapeBgColor: {
        type: 'string',
        default: '',
    },
};
