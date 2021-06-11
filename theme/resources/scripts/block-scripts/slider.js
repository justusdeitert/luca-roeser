// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper/core';

// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

window.sliderBlockInstances = {};

window.initSliderBlockInstances = () => {
    document.querySelectorAll('.slider-block').forEach(sliderBlock => {

        let sliderContainer = sliderBlock.querySelector('.slider-block__container')
        let breakpoints = {};
        // let pagination = {
        //     el: '.swiper-pagination',
        //     dynamicBullets: false,
        // }
        let initialSlidesPerView = 1;
        let sliderLoop = () => {
            return sliderBlock.dataset.sliderLoop === 'true';
        }

        if (sliderBlock.dataset.slidesPerView === "1") {
            initialSlidesPerView = 1
        }

        if (sliderBlock.dataset.slidesPerView === "2") {
            breakpoints = {
                [parseInt(window.bootstrapBreakpoints.xs)]: {
                    slidesPerView: 2,
                    pagination: {
                        dynamicBullets: false,
                    },
                },
            }
        }

        if (sliderBlock.dataset.slidesPerView === "3") {
            breakpoints = {
                [parseInt(window.bootstrapBreakpoints.xs)]: {
                    slidesPerView: 2,
                    pagination: {
                        dynamicBullets: false,
                    },
                },
                [parseInt(window.bootstrapBreakpoints.md)]: {
                    slidesPerView: 3,
                    pagination: {
                        dynamicBullets: false,
                    },
                }
            }
        }

        if (sliderBlock.dataset.slidesPerView === "4") {
            breakpoints = {
                [parseInt(window.bootstrapBreakpoints.xs)]: {
                    slidesPerView: 2,
                    pagination: {
                        dynamicBullets: false,
                    },
                },
                [parseInt(window.bootstrapBreakpoints.md)]: {
                    slidesPerView: 3,
                    pagination: {
                        dynamicBullets: false,
                    },
                },
                [parseInt(window.bootstrapBreakpoints.lg)]: {
                    slidesPerView: 4,
                    pagination: {
                        dynamicBullets: false,
                    },
                },
            }
        }

        let swiperInstance = new Swiper(sliderContainer, {
            // loop: true,
            slidesPerView: initialSlidesPerView,
            // wrapperClass: 'slider-block__slides-wrapper',
            // slideClass: 'slider-block__slide',
            touchEventsTarget: 'wrapper',

            /**
             * Pagination
             */
            pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true,
            },

            /**
             * Navigation arrows
             */
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            noSwiping: false,
            allowTouchMove: !document.body.classList.contains('block-editor-page'),
            autoHeight: false,

            /**
             * Breakpoints
             */
            breakpoints,

            /**
             * Loop Slider
             * Set to true to enable continuous loop mode
             */
            loop: sliderLoop(),

            /**
             * Base for breakpoints (beta). Can be window or container.
             */
            // breakpointsBase: 'container'
        });

        window.sliderBlockInstances[sliderBlock.dataset.sliderId] = swiperInstance;

        let addDynamicBulletClass = () => {
            if(window.innerWidth < parseInt(window.bootstrapBreakpoints.xs)) {
                sliderBlock.querySelector('.swiper-pagination').classList.add('swiper-pagination-bullets-dynamic')
            } else {
                sliderBlock.querySelector('.swiper-pagination').classList.remove('swiper-pagination-bullets-dynamic')
            }
        }

        swiperInstance.on('resize', () => {
            addDynamicBulletClass();
        });

        swiperInstance.on('init', () => {
            addDynamicBulletClass();
        });
    });
};

/**
 * Destroy all Slider Instances
 */
window.destroySliderBlockInstances = () => {
    Object.values(window.sliderBlockInstances).forEach((instance) => {
        instance.destroy();
    })
};

/**
 * Reinitialize all Slider Instances
 */
window.updateSliderBlockInstances = () => {
    if (!window.objectIsEmpty(window.sliderBlockInstances)) {
        window.destroySliderBlockInstances();
    }
    window.initSliderBlockInstances();
};

window.initSliderBlockInstances();
