// import Swiper JS
import Swiper from 'swiper';

window.initSlider = () => {

    document.querySelectorAll('.slider-block > .block-editor-inner-blocks').forEach(sliderBlock => {

        // let editorContainer = sliderBlock.querySelector('> .block-editor-inner-blocks')


        // document.querySelectorAll('[data-type="custom/slider-item"]').forEach((element) => {
        //     element.classList.add('custom-slider-item');
        // });

        // const swiper = new Swiper(sliderBlock, {
        //     // Optional parameters
        //     // direction: 'vertical',
        //     // loop: true,
        //     slidesPerView: 1,
        //     wrapperClass: 'block-editor-block-list__layout',
        //     slideClass: 'custom-slider-item',
        //
        //     // If we need pagination
        //     // pagination: {
        //     //     el: '.swiper-pagination',
        //     // },
        //
        //     // Navigation arrows
        //     // navigation: {
        //     //     nextEl: '.swiper-button-next',
        //     //     prevEl: '.swiper-button-prev',
        //     // },
        //
        //     // And if we need scrollbar
        //     // scrollbar: {
        //     //     el: '.swiper-scrollbar',
        //     // },
        // });
    });
};

window.initSlider();
