import {__} from '@wordpress/i18n';
import {registerBlockType, createBlock} from '@wordpress/blocks';
import {SelectControl, RangeControl, ToggleControl} from '@wordpress/components';
import {InnerBlocks, InspectorControls, ColorPalette} from '@wordpress/block-editor';
import classNames from 'classnames';
import {buttonIcon} from '../icons';
import {editorThemeColors, getColorObject} from "../utility";
import * as clipPaths from "../clip-path-svgs"

const attributes = {
    clientId: {
        type: 'string',
        default: ''
    },
    sectionBackgroundColor: {
        type: 'string',
        default: ''
    },
    sectionClipPath: {
        type: 'string',
        default: 'none',
    },
    sectionBorderRadius: {
        type: 'number',
        default: 0,
    },
    hasInnerWidth: {
        type: 'boolean',
        default: false,
    },
    innerWidth: {
        type: 'number',
        default: 800,
    },
};

const ALLOWEDBLOCKS = [
    'core/paragraph',
    'core/heading',
    'core/list',
    'core/shortcode',
    'core/spacer',
    'core/group',
    'custom/button',
    'custom/icon-text',
    'custom/row',
    'custom/divider',
    'custom/image'
];

registerBlockType('custom/section', {
    title: __('Section', 'sage'),
    category: 'custom',
    icon: buttonIcon,
    attributes,
    supports: {
        anchor: true,
        html: false,
        align: ['wide', 'full'],
    },
    /**
     * This is Copied from the core/group block element from gutenberg
     * @link https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/group/index.js
     * @param blocks
     * @returns {*}
     * @private
     */
    transforms: {
        from: [
            {
                type: 'block',
                isMultiBlock: true,
                blocks: ['*'],
                __experimentalConvert(blocks) {
                    // Avoid transforming a single `core/group` Block
                    if (
                        blocks.length === 1 &&
                        blocks[0].name === 'custom/section'
                    ) {
                        return;
                    }

                    const alignments = ['wide', 'full'];

                    // Determine the widest setting of all the blocks to be grouped
                    const widestAlignment = blocks.reduce(
                        (accumulator, block) => {
                            const {align} = block.attributes;
                            return alignments.indexOf(align) >
                            alignments.indexOf(accumulator)
                                ? align
                                : accumulator;
                        },
                        undefined
                    );

                    // Clone the Blocks to be Grouped
                    // Failing to create new block references causes the original blocks
                    // to be replaced in the switchToBlockType call thereby meaning they
                    // are removed both from their original location and within the
                    // new group block.
                    const groupInnerBlocks = blocks.map((block) => {
                        return createBlock(
                            block.name,
                            block.attributes,
                            block.innerBlocks
                        );
                    });

                    return createBlock(
                        'custom/section',
                        {
                            align: widestAlignment,
                        },
                        groupInnerBlocks
                    );
                },
            },
        ],
    },
    edit: ({setAttributes, attributes, className, clientId}) => {

        const onChangeSectionBackgroundColor = (value) => {
            setAttributes({sectionBackgroundColor: value});
        };

        const onChangeSectionClipPath = (value) => {
            setAttributes({sectionClipPath: value});
        };

        const onChangeSectionBorderRadius = (value) => {
            setAttributes({sectionBorderRadius: value});
        };

        const onChangeHasInnerWidth = (value) => {
            setAttributes({hasInnerWidth: value});
        };

        const onChangeInnerWidth = (value) => {
            setAttributes({innerWidth: value});
        };


        attributes.clientId = clientId;

        console.log(attributes.innerWidth);

        return (
            <>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <p>{__('Background Color', 'sage')}</p>
                        <ColorPalette
                            colors={[...editorThemeColors]}
                            value={attributes.sectionBackgroundColor}
                            onChange={onChangeSectionBackgroundColor}
                        />
                        <hr/>
                        <SelectControl
                            label={__('Section Clip Path', 'sage')}
                            value={attributes.sectionClipPath}
                            options={[
                                {label: __('None', 'sage'), value: 'none'},
                                {label: __('Slope', 'sage'), value: 'slope'},
                                {label: __('Curves 01', 'sage'), value: 'curves_01'},
                                {label: __('Curves 02', 'sage'), value: 'curves_02'},
                                {label: __('Waves 01', 'sage'), value: 'waves_01'},
                                {label: __('Waves 02', 'sage'), value: 'waves_02'},
                                {label: __('Waves 03', 'sage'), value: 'waves_03'},
                                {label: __('Lines 01', 'sage'), value: 'lines_01'},
                                {label: __('Lines 02', 'sage'), value: 'lines_02'},
                                {label: __('Lines 03', 'sage'), value: 'lines_03'},
                            ]}
                            onChange={onChangeSectionClipPath}
                        />
                        <hr/>
                        <p>{__('Border Radius', 'sage')}</p>
                        <RangeControl
                            value={attributes.sectionBorderRadius}
                            min={0}
                            max={180}
                            step={1}
                            onChange={onChangeSectionBorderRadius}
                        />
                        <hr/>
                        <ToggleControl
                            label={__('Has Inner Width', 'sage')}
                            // help={ attributes.switchContent ? 'Image is left' : 'Image is right' }
                            checked={attributes.hasInnerWidth}
                            onChange={onChangeHasInnerWidth}
                        />
                        {attributes.hasInnerWidth &&
                            <>
                                <hr/>
                                <p>{__('Inner Width', 'sage')}</p>
                                <RangeControl
                                    value={attributes.innerWidth}
                                    min={100}
                                    max={1200}
                                    step={10}
                                    onChange={onChangeInnerWidth}
                                />
                            </>
                        }
                    </div>
                </InspectorControls>
                <section className={classNames(className, 'section-block', getColorObject(attributes.sectionBackgroundColor) && `has-${getColorObject(attributes.sectionBackgroundColor).slug}-background-color`, 'custom-border-radius')}
                         style={{
                             clipPath: attributes.sectionClipPath !== 'none' ? `url(#clip-path-${attributes.clientId})` : 'none',
                             borderRadius: `${attributes.sectionBorderRadius}px`,
                         }}
                >
                    {attributes.sectionClipPath !== 'none' && clipPaths[attributes.sectionClipPath](`clip-path-${attributes.clientId}`)}
                    {attributes.hasInnerWidth ?
                        <div className="section-block__inner" style={{maxWidth: `${attributes.innerWidth}px`}}>
                            <InnerBlocks templateLock={false} allowedBlocks={ALLOWEDBLOCKS}/>
                        </div>
                        :
                        <div className="section-block__inner">
                            <InnerBlocks templateLock={false} allowedBlocks={ALLOWEDBLOCKS}/>
                        </div>
                    }
                </section>
            </>
        );
    },
    save: ({attributes, className}) => {
        return (
            <section className={classNames(className, 'section-block', getColorObject(attributes.sectionBackgroundColor) && `has-${getColorObject(attributes.sectionBackgroundColor).slug}-background-color`, 'custom-border-radius')}
                     style={{
                         clipPath: attributes.sectionClipPath !== 'none' ? `url(#clip-path-${attributes.clientId})` : 'none',
                         borderRadius: `${attributes.sectionBorderRadius}px`,
                     }}
            >
                {attributes.sectionClipPath !== 'none' && clipPaths[attributes.sectionClipPath](`clip-path-${attributes.clientId}`)}
                {attributes.hasInnerWidth ?
                    <div className="section-block__inner" style={{maxWidth: `${attributes.innerWidth}px`}}>
                        <InnerBlocks.Content/>
                    </div>
                    :
                    <div className="section-block__inner">
                        <InnerBlocks.Content/>
                    </div>
                }
            </section>
        );
    },
});
