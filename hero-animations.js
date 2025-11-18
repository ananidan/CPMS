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
    
    // Animate crane visual
    heroTimeline.to('.hero-visual', {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out'
    }, '-=1');
    
    // Simple Crane Animation - Clean rebuild
    const jib = document.querySelector('.crane-jib');
    const cableGroup = document.querySelector('.cable-group');
    const hookGroup = document.querySelector('.hook-group');
    const block = document.querySelector('.concrete-block');
    const cable = document.querySelector('.crane-cable');
    
    if (jib && cableGroup && hookGroup && block && cable) {
        // Set transform origins
        gsap.set(jib, { transformOrigin: "300px 216px", rotation: -40 });
        gsap.set(cableGroup, { transformOrigin: "300px 216px", rotation: -40 });
        gsap.set(hookGroup, { transformOrigin: "300px 216px", rotation: -40, x: 0, y: 84 });
        gsap.set(block, { transformOrigin: "300px 320px", x: -170, y: 0 });
        
        // Initial cable position
        cable.setAttribute('x1', '300');
        cable.setAttribute('y1', '216');
        cable.setAttribute('x2', '300');
        cable.setAttribute('y2', '300');
        
        // Animation function
        function animateCrane() {
            const tl = gsap.timeline({
                repeat: -1,
                defaults: { ease: "power2.inOut" }
            });
            
            // 1. Rotate to left, lower hook
            tl.to([jib, cableGroup, hookGroup], {
                rotation: -40,
                duration: 1.5
            })
            .to(block, {
                x: -170,
                duration: 1.5
            }, '<')
            .to(cable, {
                attr: { y2: 320 },
                duration: 1.5
            }, '<')
            .to(hookGroup, {
                y: 104,
                duration: 1.5
            }, '<')
            
            // 2. Lift block
            .to(block, {
                y: -120,
                duration: 2
            })
            .to(hookGroup, {
                y: -36,
                duration: 2
            }, '<')
            .to(cable, {
                attr: { y2: 180 },
                duration: 2
            }, '<')
            
            // 3. Rotate to right
            .to([jib, cableGroup, hookGroup], {
                rotation: 40,
                duration: 2.5
            })
            .to(block, {
                x: 170,
                rotation: 5,
                duration: 2.5
            }, '<')
            
            // 4. Lower block
            .to(block, {
                y: 0,
                duration: 2
            })
            .to(hookGroup, {
                y: 84,
                duration: 2
            }, '<')
            .to(cable, {
                attr: { y2: 300 },
                duration: 2
            }, '<')
            
            // 5. Bounce
            .to(block, {
                y: 5,
                duration: 0.2,
                ease: "power2.out"
            })
            .to(block, {
                y: 0,
                duration: 0.3,
                ease: "power2.in"
            })
            
            // 6. Lift hook
            .to(hookGroup, {
                y: -36,
                duration: 1.5
            })
            .to(cable, {
                attr: { y2: 180 },
                duration: 1.5
            }, '<')
            
            // 7. Rotate back to left
            .to([jib, cableGroup, hookGroup], {
                rotation: -40,
                duration: 2.5
            })
            .to(hookGroup, {
                x: 0,
                duration: 2.5
            }, '<')
            
            // 8. Lower hook
            .to(hookGroup, {
                y: 84,
                duration: 1.5
            })
            .to(cable, {
                attr: { y2: 300 },
                duration: 1.5
            }, '<')
            
            // Pause
            .to({}, { duration: 0.5 });
        }
        
        // Start animation
        gsap.delayedCall(1, animateCrane);
    }
    
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
        
        const timer = setInterval(() => {
            frame++;
            current += increment;
            if (frame >= steps || current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 1000 / 60);
    }
    
    // Trigger count-up when stats come into view
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((stat, index) => {
        // Set initial value to 0
        stat.textContent = '0';
        
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

