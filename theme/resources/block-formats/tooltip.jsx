// import {, PlainText} from '@wordpress/editor';
import {registerFormatType, toggleFormat, applyFormat} from '@wordpress/rich-text';
import {InspectorControls, RichTextToolbarButton} from '@wordpress/block-editor';
import {TextareaControl, Button} from '@wordpress/components';
// import {withSelect, withState} from '@wordpress/data';
import {withState} from '@wordpress/compose';
import {__} from '@wordpress/i18n';

const customToolTip = (props) => {

    const {isActive, value, onChange} = props;
    const type = 'custom/tooltip';

    let attributes;

    if(value.activeFormats) {
        if(!!value.activeFormats[0]) {
            attributes = value.activeFormats[0].attributes;
        }
    }

    const CustomTextareaControl = withState({
        text: attributes ? attributes.title : 'Lorem Ipsum..',
    })(({text, setState}) => (
        <div>
            <hr />
            <TextareaControl
                label="Enter the Tooltip Text"
                value={text}
                onChange={(text) => setState({text})}
            />
            <Button className={'button tooltip-wrapper__save-button'} onClick={() => {
                onChange(
                    applyFormat(value, {
                        type,
                        attributes: {
                            title: text
                        }
                    })
                );
            }}><span>Save Tooltip</span></Button>
        </div>
    ));

    return (
        <div>
            {isActive &&
                <InspectorControls>
                    <div className="inspector-controls-container">
                        <CustomTextareaControl />
                    </div>
                </InspectorControls>
            }

            <RichTextToolbarButton
                icon="admin-comments"
                title="Tooltip"
                isActive={isActive}
                onClick={() => {
                    onChange(
                        toggleFormat(value, {
                            type,
                            attributes: {
                                title: 'Lorem Ipsum'
                            }
                        })
                    );
                }}
            />
        </div>
    )
};

registerFormatType('custom/tooltip', {
    title: 'Tooltip',
    tagName: 'span',
    attributes: {
        title: 'data-title'
    },
    className: 'tooltip-wrapper',
    edit: customToolTip
});
