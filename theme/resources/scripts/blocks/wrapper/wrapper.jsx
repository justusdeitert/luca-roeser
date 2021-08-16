import {__} from '@wordpress/i18n';
import {registerBlockType, createBlock} from '@wordpress/blocks';
import {SelectControl, RangeControl, ToggleControl, ToolbarGroup, ToolbarDropdownMenu, Button, PanelBody, __experimentalRadio as Radio, __experimentalRadioGroup as RadioGroup, __experimentalBoxControl as BoxControl} from '@wordpress/components';
import {InnerBlocks, InspectorControls, ColorPalette, BlockControls, useBlockProps, __experimentalUseInnerBlocksProps as useInnerBlocksProps} from '@wordpress/block-editor';
import classnames from 'classnames';

import {sectionIcon} from '../icons';

import {editorThemeColors, getColorObject, ALLOWEDBLOCKS, removeArrayItems, SelectSectionShapes, getCssVariable} from "../utility";
import classNames from "classnames";
// import * as wrapperShapes from "../wrapper-shapes"
// import {select, dispatch, useSelect} from "@wordpress/data";

const attributes = {

    /**
     * Default Attributes
     */
    clientId: {
        type: 'string',
        default: ''
    },

    /**
     * Section Properties
     */
    wrapperBackgroundColor: {
        type: 'string',
        default: ''
    },
    wrapperBorderRadius: {
        type: 'number',
        default: false,
    },
    wrapperHeight: {
        type: 'number',
        default: false,
    },
    wrapperWidth: {
        type: 'number',
        default: false,
    },
    horizontalAlign: {
        type: 'string',
        default: 'left'
    },
};

registerBlockType('custom/wrapper', {
    apiVersion: 2,
    title: __('Wrapper', 'sage'),
    category: 'custom',
    icon: sectionIcon,
    attributes,
    supports: {
        anchor: true,
        html: false
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
                        blocks[0].name === 'custom/wrapper'
                    ) {
                        return;
                    }

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
                        'custom/wrapper',
                        {},
                        groupInnerBlocks
                    );
                },
            },
        ],
    },
    edit: ({setAttributes, attributes, className, clientId}) => {

        attributes.clientId = clientId;

        const blockProps = useBlockProps({
            className: classnames(
                className,
                'wrapper-block',
                getColorObject(attributes.wrapperBackgroundColor) && `has-${getColorObject(attributes.wrapperBackgroundColor).slug}-background-color has-background`,
            ),
            style: {
                border: '1px dashed var(--wp-admin-theme-color)'
            }
        });

        const innerBlocksProps = useInnerBlocksProps(blockProps, {
            allowedBlocks: removeArrayItems(ALLOWEDBLOCKS, ['custom/section']),
            templateLock: false,
            renderAppender: InnerBlocks.DefaultBlockAppender
        });

        return (
            <>
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarDropdownMenu
                            icon={`align-${attributes.horizontalAlign}`}
                            label={__('Select a position', 'sage')}
                            controls={[
                                {
                                    title: 'Left',
                                    icon: 'align-left',
                                    onClick: () => setAttributes({horizontalAlign: 'left'}),
                                },
                                {
                                    title: 'Center',
                                    icon: 'align-center',
                                    onClick: () => setAttributes({horizontalAlign: 'center'}),
                                },
                                {
                                    title: 'Right',
                                    icon: 'align-right',
                                    onClick: () => setAttributes({horizontalAlign: 'right'}),
                                },
                            ]}
                        />
                    </ToolbarGroup>
                </BlockControls>
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <h1>Empty!</h1>
                    </div>
                </InspectorControls>
                <div {...innerBlocksProps}>
                    <div className={classnames('wrapper-block__inner', `align-${attributes.horizontalAlign}`,)}>
                        {innerBlocksProps.children}
                    </div>
                </div>
            </>
        );
    },
    save: ({attributes}) => {

        const blockProps = useBlockProps.save({
            className: classnames(
                'wrapper-block',
                `align-${attributes.horizontalAlign}`,
                getColorObject(attributes.wrapperBackgroundColor) && `has-${getColorObject(attributes.wrapperBackgroundColor).slug}-background-color has-background`,
            )
        });

        return (
            <div {...blockProps}>
                <InnerBlocks.Content/>
            </div>
        );
    },
});
