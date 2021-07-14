import {__} from '@wordpress/i18n';
import {registerBlockType, createBlock} from '@wordpress/blocks';
import {SelectControl, RangeControl} from '@wordpress/components';
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

        attributes.clientId = clientId;

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
                            value={attributes.headerClipPath}
                            options={[
                                {label: __('None', 'sage'), value: 'none'},
                                {label: __('Slope', 'sage'), value: 'slope'},
                                {label: __('Curves', 'sage'), value: 'curves'},
                                {label: __('Curves 02', 'sage'), value: 'curves_02'},
                                {label: __('Waves', 'sage'), value: 'waves'},

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
                    </div>
                </InspectorControls>
                <section className={classNames(className, 'section-block', getColorObject(attributes.sectionBackgroundColor) && `has-${getColorObject(attributes.sectionBackgroundColor).slug}-background-color`, 'custom-border-radius')}
                         style={{
                             clipPath: attributes.sectionClipPath !== 'none' ? `url(#clip-path-${attributes.clientId})` : 'none',
                             borderRadius: `${attributes.sectionBorderRadius}px`,
                         }}
                >
                    {attributes.sectionClipPath !== 'none' && clipPaths[attributes.sectionClipPath](`clip-path-${attributes.clientId}`)}
                    <div className="section-block__inner">
                        <InnerBlocks templateLock={false} allowedBlocks={ALLOWEDBLOCKS}/>
                    </div>
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
                <div className="section-block__inner">
                    <InnerBlocks.Content/>
                </div>
            </section>
        );
    },
});
