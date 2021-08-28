const videoElements = document.querySelectorAll('.video-block__video');

videoElements.forEach(videoElement => {
    window.ScrollTrigger.create({
        trigger: videoElement,
        onEnter: () => videoElement.play(),
        onEnterBack: () => videoElement.play(),
        onLeave: () => videoElement.pause(),
        onLeaveBack: () => videoElement.pause(),
    });
});
