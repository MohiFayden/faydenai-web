// Typing Animation
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.wordIndex = 0;
        this.txt = '';
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.innerHTML = this.txt;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (target === '∞') {
            element.textContent = '∞';
            clearInterval(timer);
        } else if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Enhanced particle system
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'dynamic-particle';
    particle.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: rgba(0, 245, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        animation: dynamicFloat ${Math.random() * 10 + 5}s linear infinite;
        left: ${Math.random() * 100}vw;
        top: 100vh;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 15000);
}

// Mouse interaction effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create trailing effect
    if (Math.random() < 0.1) {
        createMouseTrail(mouseX, mouseY);
    }
});

function createMouseTrail(x, y) {
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, rgba(0, 245, 255, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        animation: trailFade 1s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 1000);
}

// Performance-optimized parallax effect
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.node');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    ticking = false;
}

function requestParallaxUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing animation
    const typingElement = document.getElementById('typing-text');
    const aiWords = [
        'with Artificial Intelligence',
        'through Machine Learning',
        'via Neural Networks',
        'using Deep Learning',
        'powered by AI Innovation'
    ];
    
    if (typingElement) {
        new TypeWriter(typingElement, aiWords, 2000);
    }
    
    // Animate counters when visible
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target.getAttribute('data-target');
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Observe fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in-text');
    fadeElements.forEach(el => observer.observe(el));
    
    // Add scroll parallax
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    
    // Generate particles periodically
    setInterval(createParticle, 2000);
    
    // Add dynamic styles for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes dynamicFloat {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes trailFade {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0);
            }
        }
        
        .animate {
            animation-play-state: running !important;
        }
    `;
    document.head.appendChild(style);
    
    // Enhanced loading effect
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Add some interactive easter eggs
let clickCount = 0;
document.addEventListener('click', (e) => {
    clickCount++;
    if (clickCount % 10 === 0) {
        // Create a burst of particles on every 10th click
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createMouseTrail(e.clientX, e.clientY), i * 100);
        }
    }
});

// Keyboard interactions
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        // Space bar creates a particle burst
        e.preventDefault();
        for (let i = 0; i < 3; i++) {
            createParticle();
        }
    }
});

// Responsive adjustments
function handleResize() {
    const heroSection = document.querySelector('.hero-section');
    if (window.innerWidth < 768) {
        heroSection?.classList.add('mobile-layout');
    } else {
        heroSection?.classList.remove('mobile-layout');
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Call on load

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`FaydenAI page loaded in ${loadTime}ms`);
    });
} 