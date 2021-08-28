const videoElements = document.querySelectorAll('.video-block__video');

videoElements.forEach(videoElement => {

    let videoIsClicked = false;

    videoElement.addEventListener('click', () => {
        videoIsClicked = true;
    });

    if (videoElement.classList.contains('play-in-view')) {
        window.ScrollTrigger.create({
            trigger: videoElement,
            start: 'top 80%',
            end: 'bottom 20%',
            markers: true,
            onEnter: () => {
                if (!videoIsClicked && videoElement.paused) {
                    videoElement.play();
                }
            },
            onEnterBack: () => {
                if (!videoIsClicked && videoElement.paused) {
                    videoElement.play();
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
