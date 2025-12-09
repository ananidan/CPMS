// Wait for DOM and GSAP to be fully loaded
window.addEventListener('load', function() {
    // Register GSAP plugins
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        if (typeof ScrollToPlugin !== 'undefined') {
            gsap.registerPlugin(ScrollToPlugin);
        }
    }
    
    initHeroAnimations();
});

function initHeroAnimations() {
    const mainNav = document.getElementById('mainNav');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    function handleNavVisibility() {
        if (!mainNav) return;
        if (window.scrollY > 100) {
            mainNav.classList.add('visible');
        } else {
            mainNav.classList.remove('visible');
            if (navLinks) {
                navLinks.classList.remove('open');
            }
        }
    }

    handleNavVisibility();
    window.addEventListener('scroll', handleNavVisibility);

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
            }
        });
    });

    // Hero Content Entrance Animation
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Animate headline
    heroTimeline.to('.hero-headline', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Animate subtext
    heroTimeline.to('.hero-subtext', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5');
    
    // Animate CTA button
    heroTimeline.to('.cta-button', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5');
    
    // Animate helmet visual (static, no movement)
    heroTimeline.to('.hero-visual', {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out'
    }, '-=1');
    
    // Smooth scroll to services section
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                // Use ScrollToPlugin if available, otherwise fallback
                if (typeof ScrollToPlugin !== 'undefined' && gsap.plugins.scrollTo) {
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: {
                            y: servicesSection,
                            offsetY: 0
                        },
                        ease: 'power2.inOut'
                    });
                } else {
                    // Fallback to native smooth scroll
                    servicesSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
    
    // About Us Section Animations
    gsap.to('.about-visual', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out'
    });
    
    gsap.to('.about-text', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Stats Count-Up Animation
    function animateCounter(element, target, duration = 2) {
        const start = 0;
        const steps = duration * 60; // 60fps
        const increment = target / steps;
        let current = start;
        let frame = 0;
        const suffix = element.getAttribute('data-suffix') || '';
        
        const timer = setInterval(() => {
            frame++;
            current += increment;
            if (frame >= steps || current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 1000 / 60);
    }
    
    // Trigger count-up when stats come into view
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((stat, index) => {
        // Set initial value to 0
        const suffix = stat.getAttribute('data-suffix') || '';
        stat.textContent = '0' + suffix;
        
        ScrollTrigger.create({
            trigger: stat.parentElement,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                const target = parseInt(stat.getAttribute('data-target'));
                gsap.to(stat.parentElement, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    delay: index * 0.15,
                    onComplete: () => {
                        animateCounter(stat, target, 2);
                    }
                });
            }
        });
    });

    // Projects summary counters
    const summaryNumbers = document.querySelectorAll('.summary-number');
    summaryNumbers.forEach((summary, index) => {
        const suffix = summary.getAttribute('data-suffix') || '';
        summary.textContent = '0' + suffix;

        ScrollTrigger.create({
            trigger: summary.closest('.summary-card'),
            start: 'top 85%',
            once: true,
            onEnter: () => {
                const target = parseInt(summary.getAttribute('data-target'));
                gsap.to(summary.closest('.summary-card'), {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    delay: index * 0.1,
                    onComplete: () => animateCounter(summary, target, 2)
                });
            }
        });
    });
    
    // Services Section Animations
    gsap.to('.services-header', {
        scrollTrigger: {
            trigger: '.services-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Stagger animation for service cards
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.15
        });
    });

    // Projects section animations
    gsap.to('.projects-header', {
        scrollTrigger: {
            trigger: '.projects-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                once: true
            },
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: index * 0.1
        });
    });

    const progressFills = document.querySelectorAll('.progress-fill');
    progressFills.forEach(fill => {
        const progress = fill.getAttribute('data-progress');
        if (!progress) return;
        fill.style.width = '0%';
        ScrollTrigger.create({
            trigger: fill.closest('.project-card'),
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.to(fill, {
                    width: progress + '%',
                    duration: 1.2,
                    ease: 'power2.out'
                });
            }
        });
    });

    // Testimonials section animations
    gsap.to('.testimonials-header', {
        scrollTrigger: {
            trigger: '.testimonials-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                once: true
            },
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: index * 0.1
        });
    });

    gsap.to('.testimonial-highlight', {
        scrollTrigger: {
            trigger: '.testimonial-highlight',
            start: 'top 85%',
            once: true
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Contact section animations
    gsap.to('.contact-header', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.utils.toArray('.contact-info-card').forEach((card, index) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                once: true
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.1
        });
    });

    gsap.to('.contact-form-wrapper', {
        scrollTrigger: {
            trigger: '.contact-form-wrapper',
            start: 'top 85%',
            once: true
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Parallax effect on hero section
    gsap.to('.hero-visual', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: -100,
        ease: 'none'
    });
    
    // Fade out hero content on scroll
    gsap.to('.hero-content', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        opacity: 0,
        y: -50,
        ease: 'none'
    });
    
    // Parallax effect on about section illustration
    gsap.to('.about-image-wrapper', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: -50,
        ease: 'none'
    });
    
    // Parallax effect on services section
    gsap.to('.services-wrapper', {
        scrollTrigger: {
            trigger: '.services-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: -30,
        ease: 'none'
    });
    
    // CTA button hover effect enhancement
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }
}

