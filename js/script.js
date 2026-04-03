/* Script JS */
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

    // --- GSAP Mobile Menu Animation ---
    const ttNavbar = document.getElementById('ttNavbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-item');
    
    ttNavbar.addEventListener('show.bs.collapse', () => {
        gsap.fromTo(ttNavbar, 
            { opacity: 0, y: -20, scale: 0.95 }, 
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
        
        gsap.fromTo(navLinks, 
            { opacity: 0, x: -10 }, 
            { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, delay: 0.1, ease: "power2.out" }
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

    const leftArm  = document.getElementById('hero-left-arm');
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
}, "-=1.4"); // slight overlap for smooth feel

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
        slidesPerView: 2.2,
        centeredSlides: true,
        spaceBetween: 0,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
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

});
 