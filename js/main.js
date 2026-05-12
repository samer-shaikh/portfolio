document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initClickEffects();
});

// Shared Navbar Logic
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const updateNavbar = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            // Home page logic
            const isHome = window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('DAMO/');
            if (isHome) {
                navbar.classList.remove('scrolled');
            }
        }
    };

    window.addEventListener('scroll', updateNavbar);
    
    // Initial state
    const isHome = window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('DAMO/');
    if (!isHome) {
        navbar.classList.add('scrolled');
    }
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navOverlay = document.getElementById('nav-overlay');
    const sidebarClose = document.getElementById('sidebar-close');
    if (!hamburger || !navLinks) return;

    const toggleMenu = () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
        if (navOverlay) navOverlay.classList.toggle('active');
    };

    const closeMenu = () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('active');
    };

    hamburger.addEventListener('click', toggleMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMenu);
    if (sidebarClose) sidebarClose.addEventListener('click', closeMenu);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('open')) {
            closeMenu();
        }
    });
}

// Scroll Animations Hub
function initScrollAnimations() {
    const observerOptions = { threshold: 0.6, rootMargin: '0px' };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('reveal-char')) animateCharacters(entry.target);
                if (entry.target.classList.contains('reveal-word')) animateWords(entry.target);
            } else {
                // Exit animation
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.observe-scroll, .reveal-char, .reveal-word, .blur-reveal');
    elements.forEach(el => {
        if (el.classList.contains('reveal-char')) prepareChars(el);
        if (el.classList.contains('reveal-word')) prepareWords(el);
        observer.observe(el);
    });
}

function prepareChars(el) {
    const text = el.textContent.trim();
    el.textContent = '';
    [...text].forEach(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        el.appendChild(span);
    });
}

function animateCharacters(el) {
    el.querySelectorAll('span').forEach((span, i) => {
        setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
            span.style.filter = 'blur(0)';
        }, i * 30);
    });
}

function prepareWords(el) {
    const words = el.textContent.trim().split(' ');
    el.textContent = '';
    words.forEach(word => {
        const wrapper = document.createElement('span');
        wrapper.style.display = 'inline-block';
        wrapper.style.overflow = 'hidden';
        wrapper.style.marginRight = '8px';
        const inner = document.createElement('span');
        inner.textContent = word;
        inner.style.display = 'inline-block';
        inner.style.transform = 'translateY(100%)';
        inner.style.opacity = '0';
        wrapper.appendChild(inner);
        el.appendChild(wrapper);
    });
}

function animateWords(el) {
    el.querySelectorAll('span > span').forEach((span, i) => {
        setTimeout(() => {
            span.style.transform = 'translateY(0)';
            span.style.opacity = '1';
        }, i * 100);
    });
}

function initClickEffects() {
    ['mousedown', 'mouseup'].forEach(event => {
        document.addEventListener(event, (e) => {
            const btn = e.target.closest('.btn, .nav-link, .project-box, .project-card');
            if (btn) btn.style.transform = event === 'mousedown' ? 'scale(0.95)' : '';
        });
    });
}
