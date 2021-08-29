const videoElements = document.querySelectorAll('.video-block__video');

let userVideoInteraction = false;

videoElements.forEach(videoElement => {

    let videoIsClicked = false;

    videoElement.addEventListener('click', (event) => {
        if (videoElement.muted) {
            event.preventDefault();
            userVideoInteraction = true;
            videoElement.muted = false;
            videoElement.play();
        }

        videoIsClicked = true;
    });

    if (videoElement.classList.contains('play-in-view')) {
        window.ScrollTrigger.create({
            trigger: videoElement,
            start: 'top 70%',
            end: 'bottom 30%',
            // markers: true,
            onEnter: () => {
                if (!videoIsClicked && videoElement.paused) {
                    videoElement.play();
                    userVideoInteraction && (videoElement.muted = false);
                }
            },
            onEnterBack: () => {
                if (!videoIsClicked && videoElement.paused) {
                    videoElement.play();
                    userVideoInteraction && (videoElement.muted = false);
                }
            },
            onLeave: () => {
                if (!videoElement.paused) {
                    videoIsClicked = false;
                    videoElement.pause();
                }
            },
            onLeaveBack: () => {
                if (!videoElement.paused) {
                    videoIsClicked = false;
                    videoElement.pause();
                }
            },
        });
    }
});
