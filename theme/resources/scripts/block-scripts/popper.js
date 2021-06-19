import {createPopper} from '@popperjs/core';

let popperInstances = [
    ['.navbar__burger-menu-icon-wrapper', '#menu-mobile-primary'],
    ['.navbar__business-hours ', '.navbar .business-hours-template'],
];

let navbar = document.querySelector('.navbar__inner');
let navbarWidth = navbar.clientWidth;
let popperOverflowPadding = (window.innerWidth - navbarWidth) / 2;

popperInstances.forEach(element => {
    createPopper(document.querySelector(element[0]), document.querySelector(element[1]), {
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
            // {
            //     name: 'arrow',
            //     options: {
            //         element: arrow,
            //     },
            // },
        ],
    });
});

let menuItems = document.querySelectorAll('.menu-item-has-children');
menuItems.forEach(element => {
    let link = element.querySelector('a')
    let subMenu = element.querySelector('.sub-menu')

    createPopper(link, subMenu, {
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
            // {
            //     name: 'arrow',
            //     options: {
            //         element: arrow,
            //     },
            // },
        ],
    });
});
