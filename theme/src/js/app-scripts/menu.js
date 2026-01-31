/**
 * Desktop Sub Menu
 */

/**
 * Navbar Menu Items
 */
let subMenuItems = document.querySelectorAll('.menu-item-has-children');
if (subMenuItems) {

    subMenuItems.forEach(item => {
        let subMenu = item.querySelector('.popper-wrapper');

        item.addEventListener('mouseover', () => {
            subMenu.classList.add('active');
        });

        item.addEventListener('mouseleave', () => {
            subMenu.classList.remove('active');
        });
    })
}

/**
 * Menu Business Hours
 */
let navigationBusinessHours = document.querySelector('.navbar__business-hours');

if (navigationBusinessHours) {

    let navbarBusinessHoursTemplate = navigationBusinessHours.querySelector('.popper-wrapper');

    navigationBusinessHours.addEventListener('mouseover', () => {
        navbarBusinessHoursTemplate.classList.add('active');
    });

    navigationBusinessHours.addEventListener('mouseleave', () => {
        navbarBusinessHoursTemplate.classList.remove('active');
    });
}

/**
 * Mobile Menu
 * TODO: Different Mobile Menu Variants...
 */
let burgerMenuIconWrapper = document.querySelector('.navbar__burger-menu-icon-wrapper');

if (burgerMenuIconWrapper) {
    let burgerMenuIcon = document.querySelector('.navbar__burger-menu-icon');
    let primaryMobileMenu = burgerMenuIconWrapper.querySelector('.popper-wrapper');

    burgerMenuIconWrapper.addEventListener('click', () => {
        // TODO: Easier Close Icon Switch
        if (primaryMobileMenu.classList.contains('active')) {
            primaryMobileMenu.classList.remove('active');
            burgerMenuIcon.classList.add('icon-menu');
            burgerMenuIcon.classList.remove('icon-close');
        } else {
            primaryMobileMenu.classList.add('active');
            burgerMenuIcon.classList.add('icon-close');
            burgerMenuIcon.classList.remove('icon-menu');
        }
    });
}
