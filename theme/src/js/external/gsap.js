import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

/**
 * Import local dependencies
 */
import { bootstrapBreakpoints } from '../utility';

/**
 * Register gsap plugins
 */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * Bind gsap and scrollTrigger to the window object
 */
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
window.viewportWidth = window.innerWidth || document.documentElement.clientWidth;


/**
 * Eventlistener
 */
window.addEventListener('scroll', zoomOutVideos);
window.addEventListener('resize', zoomOutVideos);

/**
 * Custom video controls - click elements to close zoomed video
 */
let closeElementStrings = [
    '.overlay-background',
    '.spacer-block',
];

closeElementStrings.forEach((closeElementString) => {
    document.querySelectorAll(closeElementString).forEach(closeElement => {
        closeElement.addEventListener('click', () => {
            zoomOutVideos();
        });
    });
});

/**
 * Return top position of wrapper element
 * @param wrapperElement
 */
function returnVideoPosition(wrapperElement) {
    const { offsetTop, offsetHeight } = wrapperElement;
    const halfElementHeight = offsetHeight / 2;
    const halfWindowHeight = window.innerHeight / 2;
    const videoOffsetHeight = wrapperElement.querySelector('.spacer-block') ? wrapperElement.querySelector('.spacer-block').offsetHeight : 0;
    return offsetTop + halfElementHeight - halfWindowHeight + videoOffsetHeight + 40;
}

/**
 * Video Slide In Animations
 */
document.querySelectorAll('.wrapper-block').forEach(wrapperElement => {
    window.ScrollTrigger.create({
        trigger: wrapperElement,
        start: 'top 120%',
        end: 'bottom -10%',
        onEnter: () => {
            gsap.to(wrapperElement, {
                duration: 1.8, ease: 'power3.out', autoAlpha: 1, y: 0
            });
        },
        onEnterBack: () => {
            gsap.to(wrapperElement, {
                duration: 1.8, ease: 'power3.out', autoAlpha: 1, y: 0
            });
        },
        onLeave: () => {
            gsap.to(wrapperElement, {
                duration: 1.8, ease: 'power3.out', autoAlpha: 0, y: -200
            });
        },
        onLeaveBack: () => {
            gsap.to(wrapperElement, {
                duration: 1.8, ease: 'power3.out', autoAlpha: 0, y: 200
            });
        },
    });
});

/**
 * Video on click zoom in functions & animations
 */
let wrapperElements = document.querySelectorAll('.wrapper-block');
let reverseAnimateTreshold = false;
let fireOnce = true;

wrapperElements.forEach(wrapperElement => {
    wrapperElement.classList.add('normal')
});

function zoomInVideo(wrapperElement, index) {

    if (window.innerWidth > parseInt(bootstrapBreakpoints.md)) {

        // Add class to body to hide sidebar
        document.body.classList.add('video-is-focused');

        wrapperElements.forEach(wrapperElement => {
            wrapperElement.classList.add('is-unfocused')
            wrapperElement.classList.remove('normal')
            wrapperElement.querySelector('video')?.pause();
        });

        wrapperElement.classList.remove('is-unfocused');
        wrapperElement.classList.add('is-focused');

        let video = wrapperElement.querySelector('video');
        if (video) {
            video.currentTime = 0;
            video.muted = false;
            video.play();
        }

        gsap.timeline()
            .to(window, {
                duration: 0,
                delay: 0,
                scrollTo: returnVideoPosition(wrapperElement),
                ease: 'power3.inOut'
            })
            .to(wrapperElement, {
                duration: 0.8, ease: 'power3.inOut', marginLeft: -270
            })
            .to(['.overlay-background', wrapperElement.querySelector('.wrapper-block__close-button-wrapper')], {
                duration: 0.8, ease: 'power3.inOut', autoAlpha: 1
            }, '-=0.8')
            .to('.footer', {
                duration: 0.8, ease: 'power3.inOut', autoAlpha: 0
            }, '-=0.8')
            .add(() => {
                reverseAnimateTreshold = true;
                fireOnce = true;

                setTimeout(() => {
                    let video = wrapperElement.querySelector('video')
                    if (video) {
                        video.muted = false;
                        video.controls = true;
                    }
                }, 300)
            })
            .play();
    }
}

function zoomOutVideos() {

    // Only on Desktop
    if (window.innerWidth > parseInt(bootstrapBreakpoints.md)) {

        if (reverseAnimateTreshold && fireOnce) {

            fireOnce = false;

            // Remove class from body to show sidebar again
            document.body.classList.remove('video-is-focused');

            wrapperElements.forEach(wrapperElement => {
                wrapperElement.classList.remove('is-unfocused');
                wrapperElement.classList.remove('is-focused');
                wrapperElement.classList.add('normal');
            });

            gsap.timeline()
                .add(() => {
                    document.querySelectorAll('video').forEach(video => {
                        video.muted = true;
                        video.controls = false;
                    })
                })
                .to('.wrapper-block', {
                    duration: 0.6, ease: 'power3.inOut', marginLeft: 0
                })
                .to(['.overlay-background', '.wrapper-block__close-button-wrapper'], {
                    duration: 0.6, ease: 'power3.inOut', autoAlpha: 0
                }, '-=0.6')
                .to('.footer', {
                    duration: 0.6, ease: 'power3.inOut', autoAlpha: 1
                }, '-=0.6')
                .add(() => {
                    reverseAnimateTreshold = false;
                })
                .play();
        }
    }
}

wrapperElements.forEach((wrapperElement, index) => {

    let wrapperInner = wrapperElement.querySelector('.wrapper-block__inner');

    if (wrapperInner) {
        wrapperInner.addEventListener('click', (event) => {

            if (window.innerWidth > parseInt(bootstrapBreakpoints.md)) {

                if (wrapperElement.classList.contains('normal')) {
                    event.preventDefault();
                    zoomInVideo(wrapperElement, index);
                }

                if (wrapperElement.classList.contains('is-unfocused')) {
                    event.preventDefault();
                    zoomOutVideos();
                    setTimeout(() => {
                        zoomInVideo(wrapperElement, index);
                    }, 600);
                }

            } else {
                // Mobile: just play the video
                let videoElement = wrapperElement.querySelector('video');

                if (videoElement && videoElement.paused) {
                    event.preventDefault();

                    document.querySelectorAll('video').forEach(video => {
                        video.pause();
                    })

                    videoElement.play();
                    videoElement.controls = true;
                }
            }
        });
    }
});

/**
 * Add Close Icons to each video element
 */
document.querySelectorAll('.wrapper-block').forEach((wrapperBlock) => {
    let closeButton = document.createElement('div');

    closeButton.className = 'wrapper-block__close-button-wrapper'

    closeButton.innerHTML = `
        <div class="hamburger active">
            <span></span>
        </div>
    `;

    wrapperBlock.appendChild(closeButton);

    closeButton.addEventListener('click', () => {
        zoomOutVideos();
    });
});


/**
 * Mobile sidebar menu toggle
 */
function removeSideMenu() {
    if (window.innerWidth <= parseInt(bootstrapBreakpoints.md)) {
        gsap.to('.sidebar', {
            duration: 0.8, ease: 'power3.out', autoAlpha: 0
        });

        if (hamburgerElement) {
            hamburgerElement.classList.remove('active');
        }
    }
}


let hamburgerElement = document.querySelector('.navbar--mobile .hamburger');
if (hamburgerElement) {

    hamburgerElement.addEventListener('click', (event) => {
        const target = event.target;

        target.classList.toggle('active');

        if (target.classList.contains('active')) {
            gsap.to('.sidebar', {
                duration: 0.8, ease: 'power3.out', autoAlpha: 1
            });

        } else {
            removeSideMenu();
        }

    });

    window.addEventListener('scroll', function () {
        if (hamburgerElement.classList.contains('active')) {
            hamburgerElement.classList.remove('active');
        }
        removeSideMenu();
    });

    document.querySelectorAll('.sidebar').forEach(menuItem => {
        menuItem.addEventListener('click', () => {
            removeSideMenu();
        });
    });
}
