document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();
    initParallax();
    initRotatingWords();
});

function initHeroAnimation() {
    const heroContent = document.getElementById('hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
            heroContent.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.2, 1, 0.3, 1)';
        }, 100);
    }
}

function initParallax() {
    const hero = document.getElementById('hero');
    const elements = document.querySelectorAll('.parallax-element');
    if (!hero) return;

    const handleMove = (x, y) => {
        const moveX = (x - window.innerWidth / 2) / (window.innerWidth / 2);
        const moveY = (y - window.innerHeight / 2) / (window.innerHeight / 2);

        elements.forEach(el => {
            const depth = parseFloat(el.getAttribute('data-depth')) || 1;
            el.style.setProperty('--px', `${moveX * 50 * depth}px`);
            el.style.setProperty('--py', `${moveY * 50 * depth}px`);
        });
    };

    hero.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
    
    hero.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });
}

function initRotatingWords() {
    const rotatingWord = document.getElementById('rotating-word');
    if (!rotatingWord) return;

    const words = ["fancy", "fun", "lovely ♥", "weird", "🪩 funky", "💃🕺", "sexy", "🕶️ cool", "go 🚀", "🔥🔥🔥", "over-animated?", "pop ✨", "rock 🤘"];
    let index = 0;

    const updateWord = (newWord) => {
        // Prepare characters
        rotatingWord.innerHTML = '';
        const wrapper = document.createElement('span');
        wrapper.style.display = 'inline-flex';
        wrapper.style.flexWrap = 'wrap';
        wrapper.style.verticalAlign = 'bottom';
        wrapper.style.width = '100%';
        wrapper.style.justifyContent = 'center';
        
        [...newWord].forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.transform = 'translateY(100%)';
            span.style.opacity = '0';
            span.style.transition = `transform 0.6s cubic-bezier(0.2, 1, 0.3, 1) ${i * 0.03}s, opacity 0.6s ease ${i * 0.03}s`;
            wrapper.appendChild(span);
        });
        
        rotatingWord.appendChild(wrapper);

        // Animate in
        requestAnimationFrame(() => {
            wrapper.querySelectorAll('span').forEach(span => {
                span.style.transform = 'translateY(0)';
                span.style.opacity = '1';
            });
        });
    };

    // Initial word
    updateWord(words[0]);

    setInterval(() => {
        // Exit Current Word
        const spans = rotatingWord.querySelectorAll('span > span');
        spans.forEach((span, i) => {
            span.style.transition = `transform 0.4s cubic-bezier(0.2, 1, 0.3, 1) ${i * 0.03}s, opacity 0.4s ease ${i * 0.03}s`;
            span.style.transform = 'translateY(-120%)';
            span.style.opacity = '0';
        });

        setTimeout(() => {
            index = (index + 1) % words.length;
            updateWord(words[index]);
        }, 600);
    }, 3000);
}
