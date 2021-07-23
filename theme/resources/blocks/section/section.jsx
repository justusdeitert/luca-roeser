import {__} from '@wordpress/i18n';
import {registerBlockType, createBlock} from '@wordpress/blocks';
import {SelectControl, RangeControl, ToggleControl, Button} from '@wordpress/components';
import {InnerBlocks, InspectorControls, ColorPalette, useBlockProps} from '@wordpress/block-editor';
import classNames from 'classnames';
import {sectionIcon} from '../icons';
import {editorThemeColors, getColorObject, SelectClipPath, ALLOWEDBLOCKS, removeArrayItems} from "../utility";
import * as clipPaths from "../clip-paths"

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
    // hasInnerWidth: {
    //     type: 'boolean',
    //     default: false,
    // },
    innerWidth: {
        type: 'number',
        default: 0,
    },
};

registerBlockType('custom/section', {
    title: __('Section', 'sage'),
    category: 'custom',
    icon: sectionIcon,
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
            if (value !== attributes.sectionClipPath) {
                setAttributes({sectionClipPath: value});
            } else {
                setAttributes({sectionClipPath: 'none'});
            }
        };

        const onChangeSectionBorderRadius = (value) => {
            setAttributes({sectionBorderRadius: value});
        };

        // const onChangeHasInnerWidth = (value) => {
        //     setAttributes({hasInnerWidth: value});
        // };

        const onChangeInnerWidth = (value) => {
            setAttributes({innerWidth: value});
        };

        attributes.clientId = clientId;

        const blockProps = useBlockProps({
            style: {
                border: !attributes.sectionBackgroundColor ? '1px dashed var(--wp-admin-theme-color)' : 'none',
                padding: !attributes.sectionBackgroundColor ? '10px' : '0'
            }
        });

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
                        <p>{__('Section Clip Path', 'sage')}</p>
                        <SelectClipPath
                            clipPathsModules={clipPaths}
                            clickFunction={onChangeSectionClipPath}
                            value={attributes.sectionClipPath}
                        />
                        {attributes.sectionClipPath === 'none' &&
                        <>
                            <hr/>
                            <p>{__('Border Radius', 'sage')}</p>
                            <RangeControl
                                value={attributes.sectionBorderRadius}
                                min={0}
                                max={180}
                                step={1}
                                onChange={onChangeSectionBorderRadius}
                                allowReset={true}
                                resetFallbackValue={0}
                            />
                        </>
                        }
                        {/*<hr/>*/}
                        {/*<ToggleControl*/}
                        {/*    label={__('Has Inner Width', 'sage')}*/}
                        {/*    checked={attributes.hasInnerWidth}*/}
                        {/*    onChange={onChangeHasInnerWidth}*/}
                        {/*/>*/}
                        <>
                            <hr/>
                            <p>{__('Inner Width', 'sage')}</p>
                            <RangeControl
                                value={attributes.innerWidth}
                                min={200}
                                max={1200}
                                step={10}
                                onChange={onChangeInnerWidth}
                                allowReset={true}
                                resetFallbackValue={0}
                            />
                        </>
                    </div>
                </InspectorControls>
                <div {...blockProps}>
                    <section className={classNames(className, 'section-block', getColorObject(attributes.sectionBackgroundColor) && `has-${getColorObject(attributes.sectionBackgroundColor).slug}-background-color has-background`, 'custom-border-radius')}
                             style={{
                                 clipPath: clipPaths[attributes.sectionClipPath] ? `url(#clip-path-${attributes.clientId})` : 'none',
                                 borderRadius: attributes.sectionClipPath === 'none' ? `${attributes.sectionBorderRadius}px` : 'none',
                             }}
                    >

                        {clipPaths[attributes.sectionClipPath] &&
                            clipPaths[attributes.sectionClipPath](`clip-path-${attributes.clientId}`)
                        }

                        {attributes.innerWidth ?
                            <div className="section-block__inner" style={{maxWidth: `${attributes.innerWidth}px`}}>
                                <InnerBlocks templateLock={false} allowedBlocks={removeArrayItems(ALLOWEDBLOCKS, ['custom/section'])}/>
                            </div>
                            :
                            <div className="section-block__inner">
                                <InnerBlocks templateLock={false} allowedBlocks={removeArrayItems(ALLOWEDBLOCKS, ['custom/section'])}/>
                            </div>
                        }
                    </section>
                </div>
            </>
        );
    },
    save: ({attributes, className}) => {
        return (
            <section className={classNames(className, 'section-block', getColorObject(attributes.sectionBackgroundColor) && `has-${getColorObject(attributes.sectionBackgroundColor).slug}-background-color has-background`, 'custom-border-radius')}
                     style={{
                         clipPath: attributes.sectionClipPath !== 'none' ? `url(#clip-path-${attributes.clientId})` : 'none',
                         borderRadius: attributes.sectionClipPath === 'none' ? `${attributes.sectionBorderRadius}px` : 'none',
                     }}
            >

                {clipPaths[attributes.sectionClipPath] &&
                    clipPaths[attributes.sectionClipPath](`clip-path-${attributes.clientId}`)
                }

                {attributes.innerWidth ?
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
