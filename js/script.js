/* Script JS */
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {


    // --- Lenis Smooth Scroll Initialization ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
    });

    // Synchronize Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // --- GSAP Mobile Menu Animation (Out of the box!) ---
    const ttNavbar = document.getElementById('ttNavbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-item');

    ttNavbar.addEventListener('show.bs.collapse', () => {
        // Elastic scale-in from top right corner
        gsap.fromTo(ttNavbar,
            { opacity: 0, y: -30, scale: 0.85, transformOrigin: 'top right' },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.7)" }
        );

        // 3D flip-in stagger for links
        gsap.fromTo(navLinks,
            { opacity: 0, x: -30, y: 15, rotationX: -60 },
            { opacity: 1, x: 0, y: 0, rotationX: 0, duration: 0.7, stagger: 0.06, delay: 0.1, ease: "back.out(1.5)", clearProps: "all" }
        );
    });

    ttNavbar.addEventListener('hide.bs.collapse', () => {
        // Smooth slide out when closing
        gsap.to(ttNavbar,
            { opacity: 0, y: -15, scale: 0.95, duration: 0.3, ease: "power2.in" }
        );
        // Stagger the links out backwards
        gsap.to(navLinks,
            { opacity: 0, x: 20, duration: 0.2, stagger: -0.04, ease: "power2.in" }
        );
    });

    // --- Smooth Scroll Navigation for Anchor Links ---
    const headerNavLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(ttNavbar, { toggle: false });

    headerNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 80;
                lenis.scrollTo(targetEl, { offset: -headerHeight - 10 });

                // Close mobile nav if open
                if (ttNavbar.classList.contains('show')) {
                    bsCollapse.hide();
                }
            }
        });
    });

    //     // --- Header Scroll Handlers ---

    // =============================================
    // HERO SVG - DANCING ARM ANIMATIONS (GSAP)
    // Rotate around shoulder pivot in SVG coords:
    // Left arm  shoulder ≈ x:66,  y:102
    // Right arm shoulder ≈ x:267, y:81
    // Using svgOrigin keeps the pivot in SVG
    // coordinate space so fills match the outline.
    // =============================================

    const leftArm = document.getElementById('hero-left-arm');
    const rightArm = document.getElementById('hero-right-arm');

    if (leftArm && rightArm) {

        // --- Left Arm: UP ↑ / DOWN ↓  (rotate around shoulder) ---
        gsap.to(leftArm, {
            rotation: -18,
            svgOrigin: '66 102',
            duration: 0.55,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        });

        // --- Right Arm: LEFT ← / RIGHT → (rotate around shoulder) ---
        gsap.to(rightArm, {
            rotation: 15,
            svgOrigin: '267 81',
            duration: 0.45,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 0.18
        });

        // --- Subtle whole-body bob for life ---
        gsap.to('#hero-character-svg', {
            y: -4,
            duration: 0.7,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        });
    }

    const tl = gsap.timeline();

    // Step 1: Bottom words drop first
    tl.from(".hero-sub-content h2", {
        y: -800,
        //   opacity: 0,
        rotation: -8,
        scale: 0.85,
        duration: 1.8,
        stagger: 0.3,
        ease: "bounce.out"
    })

        // Step 2: Then Movement drops
        .from(".hero-content h1", {
            y: -800,
            //   opacity: 0,
            rotation: -8,
            scale: 0.85,
            duration: 1.8,
            ease: "bounce.out"
        }, "-=1.4") // slight overlap for smooth feel

        // Step 3: Paragraph and Buttons fade in (Smooth entry)
        .from(".hero-detail p, .hero-buttons", {
            y: 30,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=1.0");

    // =============================================
    // HEADER SCROLL HANDLER
    // =============================================
    // const mainHeader = document.querySelector('.main-header');

    // let scrollTimeout;
    // window.addEventListener('scroll', () => {
    //     if (!scrollTimeout) {
    //         window.requestAnimationFrame(() => {
    //             if (window.scrollY > 80) {
    //                 mainHeader.classList.add('scrolled');
    //             } else {
    //                 mainHeader.classList.remove('scrolled');
    //             }
    //             scrollTimeout = null;
    //         });
    //         scrollTimeout = true;
    //     }
    // });
    // =============================================
    // TESTIMONIALS SWIPER
    // =============================================
    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
        effect: 'cards',
        grabCursor: true,
        rewind: true,
        cardsEffect: {
            perSlideRotate: 3,
            perSlideOffset: 7,
            rotate: true,
            slideShadows: false,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });

    // =============================================
    // TIMELINE SWIPER
    // =============================================
    const timelineSwiper = new Swiper('.timeline-swiper', {
        slidesPerView: 1, /* Default for mobile (0px and up) */
        centeredSlides: true,
        spaceBetween: 0,
        breakpoints: {
            768: { /* Tablets and Desktop (768px and up) */
                slidesPerView: 2.2,
            }
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        watchOverflow: true,
        navigation: {
            nextEl: '.timeline-next',
            prevEl: '.timeline-prev',
        },
        on: {
            slideChange: function () {
                updateTimelineDots(this.activeIndex);
            }
        }
    });

    function updateTimelineDots(activeIndex) {
        const dots = document.querySelectorAll('.timeline-images ul li .icon-wrap svg');
        const texts = document.querySelectorAll('.timeline-images ul li .year');
        const cards = document.querySelectorAll('.timeline-swiper .time-line-cards');

        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        texts.forEach((text, index) => {
            if (index === activeIndex) {
                text.classList.add('active-text');
            } else {
                text.classList.remove('active-text');
            }
        });

        cards.forEach((card, index) => {
            if (index === activeIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    // Initialize first active state
    if (document.querySelector('.timeline-swiper')) {
        updateTimelineDots(0);

        // Allow click on dots to move to slide
        document.querySelectorAll('.timeline-images ul li').forEach((li, index) => {
            li.style.cursor = 'pointer';
            li.addEventListener('click', () => {
                timelineSwiper.slideTo(index);
            });
        });
    }
    // =============================================
    // COUNTER ANIMATION (Trusted Impact)
    // =============================================
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const targetValue = parseInt(counter.getAttribute('data-count'));
            const obj = { value: 0 };

            gsap.to(obj, {
                value: targetValue,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: counter,
                    start: "top 90%",
                    once: true
                },
                onUpdate: () => {
                    counter.innerText = Math.ceil(obj.value).toLocaleString();
                }
            });
        });
    }

    if (document.querySelector('.counter')) {
        initCounters();
    }

    // =============================================
    // OUT-OF-THE-BOX CREATIVE GSAP REDESIGN
    // =============================================

    // 1. Perspective Setup for 3D
    gsap.set("section:not(.meet-the-creator-main)", { perspective: 1200 });

    // 2. Creative Reveal Helper (3D Flip + Stagger)
    const creativeReveal = (elements, options = {}) => {
        const {
            y = 120,
            rotationX = -30,
            rotationY = 0,
            scale = 0.8,
            duration = 1.8,
            stagger = 0.2,
            ease = "expo.out",
            start = "top 80%"
        } = options;

        if (!elements || elements.length === 0) return;

        const groupsMap = new Map();
        elements.forEach(el => {
            // Group by the parent container (e.g., .problem-grid, .special-row, .tt-container)
            // This ensures multi-block sections animate part-by-part
            const group = el.parentElement || document.body;
            if (!groupsMap.has(group)) {
                groupsMap.set(group, []);
            }
            groupsMap.get(group).push(el);
        });

        groupsMap.forEach((items, group) => {
            gsap.from(items, {
                y, rotationX, rotationY, scale, opacity: 0,
                duration,
                stagger: {
                    each: stagger,
                    from: "start"
                },
                ease,
                scrollTrigger: {
                    trigger: items[0], // Trigger based on the first item in the group
                    start,
                    toggleActions: "play none none none"
                }
            });
        });
    };

    // --- High Impact Headers (3D Flip In) ---
    creativeReveal(document.querySelectorAll('section:not(.hero-main):not(.meet-the-creator-main) h2, section:not(.hero-main):not(.meet-the-creator-main) h3, .section-header span, .form-header span, .problem-card-header span, .inclusive-learning-header span, .school-result-header span, .trusted-impact-header span, .timeline-header span'), {
        y: 150, rotationX: -60, duration: 2.2, stagger: 0.3
    });

    // --- Interactive 3D Card Deal (Trusted, Problem, Results, Inclusive, Schools, Forms & Problem Grid) ---
    creativeReveal(document.querySelectorAll('.trusted-impact-card, .problem-card, .simple-effective-card, .school-result-card, .inclusive-cards, .main-form, .special-row, .problem-card-grid'), {
        y: 100, rotationY: 45, rotationX: 10, scale: 0.7, duration: 2, stagger: 0.25, ease: "back.out(1.5)"
    });

    // --- High Impact Large Cards (Inclusive Main, Forms & CTA Wraps) ---
    creativeReveal(document.querySelectorAll('.inclusive-learning-main-card, .main-form, .cta-wrap'), {
        y: 80, scale: 0.92, duration: 2, ease: "expo.out"
    });

    // --- Parallax Image Reveal (Masking effect) ---
    const bigImages = document.querySelectorAll('.simple-effective-img img, .inclusive-learning-img img, .inclusive-footer-content img, .simple-effective-bottom-images img');
    bigImages.forEach(img => {
        gsap.from(img, {
            scale: 1.2,
            y: 50,
            opacity: 0,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: img,
                start: "top 80%",
                scrub: 1.2
            }
        });
    });

    // --- Special Testimonial Section Sequence ---
    if (document.querySelector('.testimonials-main')) {

        // Decorative Circles (Elastic Reveal)
        creativeReveal(document.querySelectorAll('.testimonial-deco'), {
            scale: 0,
            rotation: 120,
            duration: 2,
            stagger: 0.4,
            ease: "elastic.out(1, 0.4)"
        });

        // Testimonial Cards (Staggered 3D Pop Up)
        creativeReveal(document.querySelectorAll('.testimonial-card'), {
            y: 100,
            rotationY: 40,
            rotationX: 10,
            scale: 0.8,
            duration: 2,
            stagger: 0.3,
            ease: "back.out(1.2)"
        });
    }

    // --- Creative List Stagger (Inclusive, Results, Forms, Features, School, Inclusive & Creator Headers) ---
    creativeReveal(document.querySelectorAll('.inclusive-learning-grid li, .feature-list li, .school-result-footer p, .form-content ol li, .form-content p, .form-content h3, .school-result-header p, .inclusive-learning-content p, .meet-the-creator-header span, .meet-the-creator-header h2, .meet-the-creator-content h3, .meet-the-creator-content p, .tagline h3'), {
        x: 50, rotationY: -20, opacity: 0, duration: 1.5, stagger: 0.15
    });

    // --- Popup Logos (Featured On) ---
    creativeReveal(document.querySelectorAll('.feature-imgs img'), {
        scale: 0, rotation: 180, duration: 1.2, stagger: 0.1, ease: "elastic.out(1, 0.5)"
    });

    // --- Timeline Ribbon (3D Wave Entry) ---
    if (document.querySelector('.timeline-main')) {
        gsap.from(".timeline-images ul li", {
            x: 100,
            rotationY: 90,
            opacity: 0,
            stagger: 0.1,
            duration: 1.8,
            ease: "expo.out",
            scrollTrigger: {
                trigger: ".timeline-images",
                start: "top 82%"
            }
        });
    }

    // --- Parallax Floating Background Elements (Optional but Out-of-the-box) ---
    // (If there were decorative circles or shapes, we'd animate them here)

    // Final Refresh
    ScrollTrigger.refresh();

});
Fancybox.bind("[data-fancybox]");