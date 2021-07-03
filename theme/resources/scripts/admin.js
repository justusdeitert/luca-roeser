/**
 * Admin Script does only work for editor right now
 */

import CodeMirror from 'codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed';

let contactFormTextArea = document.getElementById('wpcf7-form');
if (contactFormTextArea) {
    let editor = CodeMirror.fromTextArea(contactFormTextArea, {
        mode: 'htmlmixed',
        theme: 'material',
        lineNumbers: true,
    });

    editor.save()
}

let acfCodeField = document.querySelectorAll('.acf-code-field textarea');
if (acfCodeField) {
    acfCodeField.forEach(codeField => {
        let editor = CodeMirror.fromTextArea(codeField, {
            mode: 'htmlmixed',
            theme: 'material',
            lineNumbers: true,
        });

        editor.save()
    })
}
