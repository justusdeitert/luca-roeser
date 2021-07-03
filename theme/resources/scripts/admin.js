/**
 * Admin Script does only work for editor right now
 */

import CodeMirror from 'codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed';

let textArea = document.getElementById('wpcf7-form');

if (textArea) {
    let editor = CodeMirror.fromTextArea(document.getElementById('wpcf7-form'), {
        mode: 'htmlmixed',
        theme: 'material',
        lineNumbers: true,
    });

    editor.save()
}
