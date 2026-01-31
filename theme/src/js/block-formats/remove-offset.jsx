/*
import {compose, ifCondition} from '@wordpress/compose';
import {registerFormatType, toggleFormat} from '@wordpress/rich-text';
import {RichTextToolbarButton} from '@wordpress/block-editor';
import {withSelect} from '@wordpress/data';
import {__} from '@wordpress/i18n';

// Small Span Format
// ---------------------->
const FormatRemoveOffset = (props) => {
    return <RichTextToolbarButton
        icon='editor-code'
        title='Remove Bottom Offset'
        onClick={() => {
            props.onChange(toggleFormat(
                props.value,
                {type: 'custom/remove-bottom-offset'}
            ));
        }}
        isActive={props.isActive}
    />;
};

const ConditionalSmallSpanButton = compose(
    withSelect(function (select) {
        return {
            selectedBlock: select('core/block-editor').getSelectedBlock()
        }
    }),
    ifCondition(function (props) {
        return (
            props.selectedBlock && (
                // Only allow Format for these blocks!
                // ---------->
                props.selectedBlock.name === 'core/group'
            )
        );
    })
)(FormatRemoveOffset);

registerFormatType(
    'custom/remove-bottom-offset', {
        title: __('Remove Bottom Offset', 'sage'),
        tagName: 'span',
        className: 'small-span',
        edit: ConditionalSmallSpanButton,
    }
);
*/
