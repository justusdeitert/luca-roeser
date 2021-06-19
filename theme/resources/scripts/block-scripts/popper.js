import {createPopper} from '@popperjs/core';


window.popperInstances = [];


let popperOptions = (popperArrow) => {

    /**
     * Calculate popperOverflowPadding
     * @type {Element}
     */
    let navbar = document.querySelector('.navbar__inner');
    let navbarWidth = navbar.clientWidth;
    let popperOverflowPadding = (window.innerWidth - navbarWidth) / 2;

    return {
        strategy: 'fixed',
        // placement: 'bottom',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 0],
                },
            },
            {
                name: 'preventOverflow',
                options: {
                    padding: popperOverflowPadding,
                },
            },
            {
                name: 'arrow',
                options: {
                    element: popperArrow,
                },
            },
        ],
    }
}

window.initPopperInstances = () => {

    let popperReferences = [
        '.navbar__burger-menu-icon-wrapper',
        '.navbar__business-hours',
        '.menu-item-has-children'
    ];

    popperReferences.forEach(popperReferenceString => {
        let references = document.querySelectorAll(popperReferenceString);

        references.forEach(reference => {
            let popper = reference.querySelector('.popper-wrapper');

            /**
             * Create Popper Arrows
             * @type {Element}
             */
            let subMenu = reference.querySelector('.sub-menu');
            subMenu.innerHTML += '<span class="popper-arrow"></span>';
            let popperArrow = reference.querySelector('.popper-arrow');

            /**
             * Create Popper Instance
             * @type {Instance}
             */
            let popperInstance = createPopper(reference, popper, popperOptions(popperArrow));
            window.popperInstances.push(popperInstance);
        });
    });
};

window.updatePopperOptions = () => {
    window.popperInstances.forEach(instance => {
        instance.setOptions(popperOptions());
    });
};

window.initPopperInstances();
window.addEventListener('resize', window.updatePopperOptions);
