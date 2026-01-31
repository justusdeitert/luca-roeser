import {compose, ifCondition} from '@wordpress/compose';
import {registerFormatType, toggleFormat} from '@wordpress/rich-text';
import {RichTextToolbarButton} from '@wordpress/block-editor';
import {withSelect} from '@wordpress/data';
import {__} from '@wordpress/i18n';

// Small Span Format
// ---------------------->
const FormatSmallSpanButton = (props) => {
    return <RichTextToolbarButton
        icon='editor-bold'
        title='Text Shadow'
        onClick={() => {
            props.onChange(toggleFormat(
                props.value,
                {type: 'custom/text-shadow'}
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
                props.selectedBlock.name === 'core/heading' ||
                props.selectedBlock.name === 'core/paragraph' ||
                props.selectedBlock.name === 'custom/icon-list' ||
                props.selectedBlock.name === 'core/list'
            )
        );
    })
)(FormatSmallSpanButton);

registerFormatType(
    'custom/text-shadow', {
        title: __('Text Shadow', 'sage'),
        tagName: 'span',
        className: 'text-shadow',
        edit: ConditionalSmallSpanButton,
    }
);
