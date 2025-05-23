document.addEventListener('DOMContentLoaded', function () {
    const ourStory = document.querySelector('.our-story');
    const spans = ourStory.querySelectorAll('h1 span');
    const revealStages = ourStory.querySelectorAll('.reveal-stage');

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function checkAnimation() {
        if (isInViewport(ourStory)) {
            // Animate our-story h1 spans with GSAP
            spans.forEach((span, index) => {
                gsap.to(span, {
                    opacity: 1,
                    y: 0,
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: "power2.out",
                    force3D: true
                });
            });
            // Animate reveal-stage paragraphs with GSAP
            revealStages.forEach((stage, index) => {
                gsap.to(stage, {
                    opacity: 1,
                    y: 0,
                    delay: index * 0.2,
                    duration: 0.7,
                    ease: "power2.out",
                    force3D: true
                });
            });
            // Remove event listener after animation triggered once
            window.removeEventListener('scroll', checkAnimation);
        }
    }

    window.addEventListener('scroll', checkAnimation);
    // Initial check in case already in viewport
    checkAnimation();

    // Remove floating love emojis animation and replace with 3 static hearts with scroll-triggered animation
    const heartSizes = ['xxl', 'large', 'medium'];
    const heartContainer = document.createElement('div');
    heartContainer.id = 'static-hearts';
    document.body.appendChild(heartContainer);

    heartSizes.forEach(size => {
        const heart = document.createElement('div');
        heart.classList.add('static-heart', size);
        heart.textContent = '❤️';
        heartContainer.appendChild(heart);
    });

    function animateHeartsOnScroll() {
        heartContainer.classList.add('animate-hearts');
        window.removeEventListener('scroll', animateHeartsOnScroll);
    }

    window.addEventListener('scroll', animateHeartsOnScroll);

    // Mouse trailing hearts effect
    const mouseTrailContainer = document.createElement('div');
    mouseTrailContainer.id = 'mouse-trail';
    mouseTrailContainer.style.zIndex = '9999'; // Ensure it is on top
    document.body.appendChild(mouseTrailContainer);

    function createTrailHeart(x, y) {
        const heart = document.createElement('div');
        heart.classList.add('trail-heart');
        heart.textContent = '❤️';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        mouseTrailContainer.appendChild(heart);

        setTimeout(() => {
            mouseTrailContainer.removeChild(heart);
        }, 1000);
    }

    // Throttle mousemove event to limit heart creation frequency
    let lastTrailTime = 0;
    const trailInterval = 50; // milliseconds

    window.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTrailTime > trailInterval) {
            createTrailHeart(e.clientX, e.clientY);
            lastTrailTime = now;
        }
    });
});
