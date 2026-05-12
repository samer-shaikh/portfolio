document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('petal-container');
    const petalCount = 30; // Number of petals active at once

    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Randomize size
        const size = Math.random() * 15 + 10 + 'px';
        petal.style.width = size;
        petal.style.height = size;
        
        // Randomize starting position
        petal.style.left = Math.random() * 100 + 'vw';
        
        // Randomize animation duration and delay
        const duration = Math.random() * 5 + 5 + 's';
        const delay = Math.random() * 5 + 's';
        
        petal.style.animation = `fall ${duration} linear ${delay} infinite`;
        
        // Randomize horizontal movement (sway) using a unique keyframe or inline style
        // For simplicity, we use the CSS 'fall' animation but randomize the translation in a custom way if needed
        // Here we just let the CSS animation handle it, but we can randomize the 'left' offset
        
        container.appendChild(petal);

        // Remove petal after animation to keep DOM clean (if not infinite)
        // Since it's infinite, we just leave it.
    }

    // Initialize petals
    for (let i = 0; i < petalCount; i++) {
        createPetal();
    }
});
