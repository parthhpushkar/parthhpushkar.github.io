/* ============================================
   PARTH PUSHKAR – Portfolio JavaScript
   Typing Effect, Scroll Reveals, Particles,
   Preloader, Back to Top
   ============================================ */

// ==================== PRELOADER ====================
(function () {
    document.body.classList.add('loading');
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('preloaderProgress');
    let progress = 0;

    const progressInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 90) progress = 90;
        progressBar.style.width = progress + '%';
    }, 150);

    window.addEventListener('load', () => {
        clearInterval(progressInterval);
        progressBar.style.width = '100%';

        setTimeout(() => {
            preloader.classList.add('loaded');
            document.body.classList.remove('loading');
        }, 500);
    });
})();

document.addEventListener('DOMContentLoaded', () => {

    // ==================== TYPING EFFECT ====================
    const typedTextEl = document.getElementById('typedText');
    const phrases = [
        'Full Stack Developer',
        'AI/ML Enthusiast',
        'Gen AI Explorer',
        'MERN Stack Developer',
        'Problem Solver'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before next phrase
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // ==================== NAVBAR SCROLL ====================
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleNavScroll);

    // ==================== MOBILE NAV TOGGLE ====================
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('open');
    });

    // Close mobile nav on link click
    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('open');
        });
    });

    // ==================== SCROLL REVEAL ====================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    revealElements.forEach(el => revealObserver.observe(el));

    // ==================== STAT COUNTER ANIMATION ====================
    const statNumbers = document.querySelectorAll('.stat-number');

    const statObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    statObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    statNumbers.forEach(num => statObserver.observe(num));

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 40;
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(interval);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 40);
    }

    // ==================== PARTICLES ====================
    const particlesContainer = document.getElementById('heroParticles');

    function createParticles() {
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 8}s`;
            particle.style.animationDuration = `${6 + Math.random() * 6}s`;
            particle.style.width = `${2 + Math.random() * 3}px`;
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // ==================== CURSOR GLOW ====================
    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursorGlow() {
        cursorGlow.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        requestAnimationFrame(updateCursorGlow);
    }

    // Only enable cursor glow on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
        updateCursorGlow();
    } else {
        cursorGlow.style.display = 'none';
    }

    // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==================== STAGGERED REVEAL FOR GRID ITEMS ====================
    const gridCards = document.querySelectorAll('.project-card, .skill-category, .achievement-card');

    const staggerObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transitionDelay = '0s';
                    }, index * 100);
                }
            });
        },
        { threshold: 0.1 }
    );

    gridCards.forEach(card => staggerObserver.observe(card));

    // ==================== BACK TO TOP BUTTON ====================
    const backToTopBtn = document.getElementById('backToTop');

    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleBackToTop);

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
