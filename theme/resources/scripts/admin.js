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

/**
 * Custom Font Colors Select
 */
window.generalColors = false;

window.getGeneralThemeColors = () => {
    let iFrame = document.querySelector('#customize-preview iframe');
    let iFrameDocument = iFrame.contentWindow.document;

    if (iFrameDocument.body) {
        let style = getComputedStyle(iFrameDocument.body);
        let getProperty = (property) => style.getPropertyValue(property);

        window.generalColors = {
            primary: getProperty('--custom-primary-color'),
            secondary: getProperty('--custom-secondary-color'),
            tertiary: getProperty('--custom-tertiary-color'),
            quaternary: getProperty('--custom-quaternary-color'),
            light: getProperty('--custom-light-color'),
            'light-100': getProperty('--custom-light-100-color'),
            'light-200': getProperty('--custom-light-200-color'),
            'light-300': getProperty('--custom-light-300-color'),
            // 'light-400': getProperty('--custom-light-400-color'),
            // 'light-500': getProperty('--custom-light-500-color'),
            // 'light-600': getProperty('--custom-light-500-color'),
            dark: getProperty('--custom-dark-color'),
            'dark-100': getProperty('--custom-dark-100-color'),
            'dark-200': getProperty('--custom-dark-200-color'),
            'dark-300': getProperty('--custom-dark-300-color'),
            'dark-light-100': getProperty('--custom-dark-light-100-color'),
            'dark-light-200': getProperty('--custom-dark-light-200-color'),
            'dark-light-300': getProperty('--custom-dark-light-300-color'),
            // 'dark-400': getProperty('--custom-dark-400-color'),
            // 'dark-500': getProperty('--custom-dark-500-color'),
            // 'dark-600': getProperty('--custom-dark-600-color'),
            success: getProperty('--custom-success-color'),
            danger: getProperty('--custom-danger-color'),
            warning: getProperty('--custom-warning-color'),
            info: getProperty('--custom-info-color'),
        }

        /**
         * Apply styles to Customizer dom
         * @type {Element}
         */
        let root = document.querySelector(':root');
        Object.entries(window.generalColors).forEach(generalColor => {
            root.style.setProperty(`--custom-${generalColor[0]}-color`, generalColor[1]);
        });
    }

}

setInterval(() => {
    window.getGeneralThemeColors();
}, 1000);
