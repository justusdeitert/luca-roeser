import {compose, ifCondition} from '@wordpress/compose';
import {registerFormatType, toggleFormat} from '@wordpress/rich-text';
import {RichTextToolbarButton} from '@wordpress/block-editor';
import {withSelect} from '@wordpress/data';
import {__} from '@wordpress/i18n';

// Light Span Format for Heading!
// ---------------------->
const NonBreakingSpaceButton = (props) => {
    return <RichTextToolbarButton
        icon='editor-code'
        title='Non Breaking Space'
        onClick={() => {
            props.onChange(toggleFormat(
                props.value,
                {type: 'custom/non-breaking-space'}
            ));
        }}
        isActive={props.isActive}
    />;
};

const ConditionalNonBreakingSpaceButton = compose(
    withSelect(function (select) {
        return {
            selectedBlock: select('core/block-editor').getSelectedBlock()
        }
    }),
    ifCondition(function (props) {
        return (
            props.selectedBlock &&
            props.selectedBlock.name === 'core/heading' ||
            props.selectedBlock.name === 'core/paragraph' ||
            props.selectedBlock.name === 'core/list'
        );
    })
)(NonBreakingSpaceButton);

registerFormatType(
    'custom/non-breaking-space', {
        title: __('Non Breaking Space', 'sage'),
        tagName: 'span',
        className: 'non-breaking-space',
        edit: ConditionalNonBreakingSpaceButton,
    }
);
