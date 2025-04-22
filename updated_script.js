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
        gsap.to(heartContainer.children, {
            opacity: 0.6,
            scale: 1.1,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
            force3D: true
        });
        window.removeEventListener('scroll', animateHeartsOnScroll);
    }

    window.addEventListener('scroll', animateHeartsOnScroll);

    // Mouse trailing hearts effect using GSAP with max limit and requestAnimationFrame throttling
    const mouseTrailContainer = document.createElement('div');
    mouseTrailContainer.id = 'mouse-trail';
    mouseTrailContainer.style.zIndex = '9999'; // Ensure it is on top
    document.body.appendChild(mouseTrailContainer);

    function createTrailHeart(x, y) {
        if (mouseTrailContainer.children.length >= 20) {
            return; // Limit max hearts on screen
        }
        const heart = document.createElement('div');
        heart.classList.add('trail-heart');
        heart.textContent = '❤️';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        mouseTrailContainer.appendChild(heart);

        gsap.to(heart, {
            y: -20,
            opacity: 0,
            duration: 0.7,
            ease: "power1.out",
            force3D: true,
            onComplete: () => {
                mouseTrailContainer.removeChild(heart);
            }
        });
    }

    let lastTrailTime = 0;
    let scheduled = false;
    let lastX = 0;
    let lastY = 0;

    function onMouseMove() {
        const now = Date.now();
        if (now - lastTrailTime > 50) {
            createTrailHeart(lastX, lastY);
            lastTrailTime = now;
            scheduled = false;
        } else {
            scheduled = false;
        }
    }

    window.addEventListener('mousemove', (e) => {
        lastX = e.clientX;
        lastY = e.clientY;
        if (!scheduled) {
            scheduled = true;
            requestAnimationFrame(onMouseMove);
        }
    });
});
