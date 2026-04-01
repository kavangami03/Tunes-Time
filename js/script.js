/* Script JS - Clean Start */
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

    // --- Header Scroll Handlers ---
    const mainHeader = document.querySelector('.main-header');
    
    // Improved Throttle for Scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 80) {
                    mainHeader.classList.add('scrolled');
                } else {
                    mainHeader.classList.remove('scrolled');
                }
                scrollTimeout = null;
            });
            scrollTimeout = true;
        }
    });
});
