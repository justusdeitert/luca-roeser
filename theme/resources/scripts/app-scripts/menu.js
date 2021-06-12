/**
 * Desktop Sub Menu
 */
let subMenuItems = document.querySelectorAll('.menu-item-has-children');

subMenuItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.classList.add('active');
    });

    item.addEventListener('mouseleave', () => {
        item.classList.remove('active');
    });
})

/**
 * Menu Business Hours
 */
let navigationBusinessHours = document.querySelectorAll('.navigation__business-hours');

navigationBusinessHours.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.classList.add('active');
    });

    item.addEventListener('mouseleave', () => {
        item.classList.remove('active');
    });
})

/**
 * Mobile Menu
 */

let navigationMobileWrapper = document.querySelector('.navigation__mobile__wrapper');

navigationMobileWrapper.addEventListener('click', () => {
    if(navigationMobileWrapper.classList.contains('active')) {
        navigationMobileWrapper.classList.remove('active');
    } else {
        navigationMobileWrapper.classList.add('active');
    }
});
