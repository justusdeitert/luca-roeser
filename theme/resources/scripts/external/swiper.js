/**
 * core version + navigation, pagination modules:
 */
import Swiper, { Navigation, Pagination, Autoplay} from 'swiper/core';
import {bootstrapBreakpoints, objectIsEmpty, isGutenbergEditor} from '../utility'

/**
 * configure Swiper to use modules
 */
Swiper.use([Navigation, Pagination, Autoplay]);

window.sliderBlockInstances = {};

window.initSliderBlockInstances = () => {
    document.querySelectorAll('.slider-block').forEach(sliderBlock => {

        let sliderContainer = sliderBlock.querySelector('.slider-block__container');
        let breakpoints = {};
        let initialSlidesPerView = 1;

        // Two Slides on Mobile Settings
        let twoSlidesOnMobile = sliderBlock.classList.contains('two-slides-on-mobile');
        let twoSlidesBreakpoint = bootstrapBreakpoints.sm;
        if (twoSlidesOnMobile) {
            twoSlidesBreakpoint = bootstrapBreakpoints.xs;
        }

        let sliderLoop = () => {
            return sliderBlock.dataset.sliderLoop === 'true';
        }

        let sliderAutoplay = () => {
            if (sliderBlock.dataset.sliderAutoplay !== 'false') {
                return {
                    delay: parseInt(sliderBlock.dataset.sliderAutoplay),
                    pauseOnMouseEnter: true, // Could cause problems on Gutenberg Editor (when wanting to edit)
                    disableOnInteraction: false
                }
            } else {
                return false;
            }
        }

        if (sliderBlock.dataset.slidesPerView === "1") {
            initialSlidesPerView = 1;
        }

        if (sliderBlock.dataset.slidesPerView === "2") {
            breakpoints = {
                [parseInt(twoSlidesBreakpoint)]: {
                    slidesPerView: 2,
                    pagination: {
                        dynamicBullets: false,
                    },
                },
            }
        }

        if (sliderBlock.dataset.slidesPerView === "3") {
            breakpoints = {
                [parseInt(twoSlidesBreakpoint)]: {
                    slidesPerView: 2,
                    pagination: {
                        dynamicBullets: false,
                    },
                },
                [parseInt(bootstrapBreakpoints.md)]: {
                    slidesPerView: 3,
                    pagination: {
                        dynamicBullets: false,
                    },
                }
            }
        }

        if (sliderBlock.dataset.slidesPerView >= "4") {
            breakpoints = {
                [parseInt(twoSlidesBreakpoint)]: {
                    slidesPerView: 2,
                    pagination: {
                        dynamicBullets: false,
                    },
                },
                [parseInt(bootstrapBreakpoints.md)]: {
                    slidesPerView: 3,
                    pagination: {
                        dynamicBullets: false,
                    },
                },
                [parseInt(bootstrapBreakpoints.lg)]: {
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
             * Passive event listeners will be used by default where possible to improve scrolling performance on mobile devices
             */
            passiveListeners: true,

            /**
             * Pagination
             */
            pagination: {
                el: sliderBlock.querySelector('.swiper-pagination'),
                dynamicBullets: true,
            },

            /**
             * Navigation arrows
             */
            navigation: {
                nextEl: sliderBlock.querySelector('.swiper-button-next'),
                prevEl: sliderBlock.querySelector('.swiper-button-prev'),
            },

            /**
             * Scrollbar
             * TODO: Implement scrollbar control type for slider block
             */
            // scrollbar: {
            //     el: sliderBlock.querySelector('.swiper-scrollbar'),
            //     draggable: true,
            // },

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
             * Delay between transitions (in ms)
             * @link https://swiperjs.com/swiper-api#param-autoplay
             */
            autoplay: sliderAutoplay(),

            /**
             * Base for breakpoints (beta). Can be window or container.
             */
            // breakpointsBase: 'container'
        });

        window.sliderBlockInstances[sliderBlock.dataset.sliderId] = swiperInstance;

        let swiperPagination = sliderBlock.querySelector('.swiper-pagination');
        if(swiperPagination) {
            let addDynamicBulletClass = () => {
                if(window.innerWidth < parseInt(twoSlidesBreakpoint)) {
                    swiperPagination.classList.add('swiper-pagination-bullets-dynamic')
                } else {
                    swiperPagination.classList.remove('swiper-pagination-bullets-dynamic')
                }
            }

            swiperInstance.on('resize', () => {
                addDynamicBulletClass();
            });

            swiperInstance.on('init', () => {
                addDynamicBulletClass();
            });
        }
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
    if (!objectIsEmpty(window.sliderBlockInstances)) {
        window.destroySliderBlockInstances();
    }
    window.initSliderBlockInstances();
};

window.initSliderBlockInstances();
