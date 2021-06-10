// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper/core';

// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

window.sliderBlockInstances = {};

window.initSliderBlockInstances = () => {
    document.querySelectorAll('.sliders-block').forEach(sliderBlock => {

        let sliderContainer = sliderBlock.querySelector('.slider-block__container')
        let breakpoints = {};
        let initialSlidesPerView = 1;
        let sliderLoop = () => {
            return sliderBlock.dataset.sliderLoop === 'true';
        }

        if (sliderBlock.dataset.slidesPerView === "1") {
            initialSlidesPerView = 1
        }

        if (sliderBlock.dataset.slidesPerView === "3") {
            breakpoints = {
                [parseInt(window.bootstrapBreakpoints.xs)]: {
                    slidesPerView: 2
                },
                [parseInt(window.bootstrapBreakpoints.md)]: {
                    slidesPerView: 3
                }
            }
        }

        if (sliderBlock.dataset.slidesPerView === "4") {
            breakpoints = {
                [parseInt(window.bootstrapBreakpoints.xs)]: {
                    slidesPerView: 2
                },
                [parseInt(window.bootstrapBreakpoints.md)]: {
                    slidesPerView: 3
                },
                [parseInt(window.bootstrapBreakpoints.lg)]: {
                    slidesPerView: 4
                },
            }
        }

        let swiperInstance = new Swiper(sliderContainer, {
            // loop: true,
            slidesPerView: initialSlidesPerView,
            // wrapperClass: 'slider-block__slides-wrapper',
            // slideClass: 'slider-block__slide',
            // touchEventsTarget: 'wrapper',

            /**
             * Pagination
             */
            pagination: {
                el: ".swiper-pagination",
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
        });

        window.sliderBlockInstances[sliderBlock.dataset.sliderId] = swiperInstance;
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
