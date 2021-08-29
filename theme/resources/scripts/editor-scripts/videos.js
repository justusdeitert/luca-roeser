const videoElements = document.querySelectorAll('.video-block__video');
let userInteracted = false;

window.addEventListener('click', () => {
    userInteracted = true;

    // Unmute all videos once user interacted
    // TODO: Implement filter for videoblock
    videoElements.forEach(videoElement => {
        videoElement.muted = false;
    })
});

videoElements.forEach(videoElement => {

    let videoIsClicked = false;

    videoElement.addEventListener('click', (event) => {
        if (videoElement.muted) {
            event.preventDefault();
        }

        videoIsClicked = true;
    });

    if (videoElement.classList.contains('play-in-view')) {
        window.ScrollTrigger.create({
            trigger: videoElement,
            start: 'top 65%',
            end: 'bottom 35%',
            // markers: true,
            onEnter: () => {
                if (!videoIsClicked && videoElement.paused) {
                    videoElement.play();
                    userInteracted && (videoElement.muted = false);
                }
            },
            onEnterBack: () => {
                if (!videoIsClicked && videoElement.paused) {
                    videoElement.play();
                    userInteracted && (videoElement.muted = false);
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
