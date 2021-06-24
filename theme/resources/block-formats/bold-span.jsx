import {compose, ifCondition} from '@wordpress/compose';
import {registerFormatType, toggleFormat} from '@wordpress/rich-text';
import {RichTextToolbarButton} from '@wordpress/block-editor';
import {withSelect} from '@wordpress/data';
import {__} from '@wordpress/i18n';

// Light Span Format for Heading!
// ---------------------->
const FormatLightSpanButton = (props) => {
    return <RichTextToolbarButton
        icon='editor-code'
        title='Bold Span'
        onClick={() => {
            props.onChange(toggleFormat(
                props.value,
                {type: 'custom/bold-span'}
            ));
        }}
        isActive={props.isActive}
    />;
};

const ConditionalLightSpanButton = compose(
    withSelect(function (select) {
        return {
            selectedBlock: select('core/block-editor').getSelectedBlock()
        }
    }),
    // ifCondition(function (props) {
    //     return (
    //         props.selectedBlock &&
    //         props.selectedBlock.name === 'core/heading'
    //     );
    // })
)(FormatLightSpanButton);


registerFormatType(
    'custom/bold-span', {
        title: __('Bold Span', 'sage'),
        tagName: 'span',
        className: 'bold-span',
        edit: ConditionalLightSpanButton,
    }
);
