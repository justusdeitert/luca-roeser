/**
 * Admin Script does only work for editor right now
 */
console.log('admin.js');

import CodeMirror from 'codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed';

let editor = CodeMirror.fromTextArea(document.getElementById('wpcf7-form'), {
    mode: 'htmlmixed',
    lineNumbers: true,
    theme: 'material',
});

// editor.setSize('auto', 'auto');

editor.save()
