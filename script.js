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
            spans.forEach(span => {
                span.classList.add('animate');
            });
            revealStages.forEach(stage => {
                stage.classList.add('visible');
            });
            // Remove event listener after animation triggered once
            window.removeEventListener('scroll', checkAnimation);
        }
    }

    window.addEventListener('scroll', checkAnimation);
    // Initial check in case already in viewport
    checkAnimation();

    // Floating love emojis animation
    const emojis = ['❤️', '💖', '💕', '💘', '💝', '💞', '💓', '❣️', '💗'];
    const floatingContainer = document.createElement('div');
    floatingContainer.id = 'floating-emojis';
    document.body.appendChild(floatingContainer);

    function createEmoji() {
        // Limit max emojis to 10
        if (floatingContainer.children.length >= 10) {
            return;
        }
        const emoji = document.createElement('div');
        emoji.classList.add('floating-emoji');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        emoji.style.animationDuration = (Math.random() * 3 + 3) + 's'; // reduced duration 3-6s
        emoji.style.animationDelay = (Math.random() * 3) + 's'; // reduced delay
        floatingContainer.appendChild(emoji);

        // Remove emoji after animation duration
        setTimeout(() => {
            floatingContainer.removeChild(emoji);
        }, (parseFloat(emoji.style.animationDuration) + parseFloat(emoji.style.animationDelay)) * 1000);
    }

    // Create emojis at intervals (further reduced frequency for better performance)
    setInterval(createEmoji, 4000);

    // Mouse trailing hearts effect
    const mouseTrailContainer = document.createElement('div');
    mouseTrailContainer.id = 'mouse-trail';
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
